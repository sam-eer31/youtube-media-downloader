// Media service — orchestrates ytdl-core, FFmpeg, and tmpfiles.org uploads
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import ytdl from '@distube/ytdl-core';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { config } from '../config/env';
import { MediaInfo, JobStatus, QualityOption, JobStage } from '../types';
import { getFfmpegExecutable, formatDuration, estimateFileSize } from '../utils/ffmpeg';
import { generateJobId } from '../utils/helpers';

/** In-memory job store */
const jobs = new Map<string, JobStatus>();

let agent: ytdl.Agent | undefined;
try {
  if (process.env.YOUTUBE_COOKIES) {
    const cookies = JSON.parse(process.env.YOUTUBE_COOKIES);
    agent = ytdl.createAgent(cookies);
    console.log('[ytdl-core] Initialized agent with provided cookies.');
  } else {
    console.warn('[ytdl-core] Warning: YOUTUBE_COOKIES environment variable is not set. Downloads may be blocked by YouTube.');
  }
} catch (error) {
  console.error('[ytdl-core] Failed to parse YOUTUBE_COOKIES. Ensure it is a valid JSON array.', error);
}

export async function fetchMediaInfo(url: string): Promise<MediaInfo> {
  try {
    const info = await ytdl.getBasicInfo(url, { agent });
    const duration = parseInt(info.videoDetails.lengthSeconds, 10) || 0;

    const videoQualities: QualityOption[] = [
      { label: '360p', value: '360p', estimatedSize: estimateFileSize(700, duration) },
      { label: '480p', value: '480p', estimatedSize: estimateFileSize(1200, duration) },
      { label: '720p', value: '720p', estimatedSize: estimateFileSize(2500, duration) },
      { label: '1080p', value: '1080p', estimatedSize: estimateFileSize(4500, duration) },
      { label: 'Highest Available', value: 'highest', estimatedSize: estimateFileSize(8000, duration) },
    ];

    const audioQualities: QualityOption[] = [
      { label: '128 kbps', value: '128', estimatedSize: estimateFileSize(128, duration) },
      { label: '256 kbps', value: '256', estimatedSize: estimateFileSize(256, duration) },
      { label: '320 kbps', value: '320', estimatedSize: estimateFileSize(320, duration) },
    ];

    return {
      title: info.videoDetails.title || 'Unknown Title',
      thumbnail: info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url || '',
      duration,
      durationFormatted: formatDuration(duration),
      uploader: info.videoDetails.author.name || 'Unknown',
      url,
      videoQualities,
      audioQualities,
    };
  } catch (error: any) {
    console.error('[fetchMediaInfo error]', error);
    if (error.message.includes('Sign in to confirm')) {
      throw new Error('YouTube blocked the request. Please configure YOUTUBE_COOKIES in Render.');
    }
    throw new Error('Could not fetch media information. ' + error.message);
  }
}

export function startDownload(url: string, format: 'mp3' | 'mp4', quality: string): string {
  const jobId = generateJobId();
  const job: JobStatus = { id: jobId, stage: 'queued', progress: 0, createdAt: Date.now() };
  jobs.set(jobId, job);

  processDownload(jobId, url, format, quality).catch((err) => {
    const existingJob = jobs.get(jobId);
    if (existingJob) {
      existingJob.stage = 'failed';
      existingJob.error = err.message || 'Download failed.';
    }
  });

  return jobId;
}

export function getJobStatus(jobId: string): JobStatus | undefined {
  return jobs.get(jobId);
}

async function processDownload(jobId: string, url: string, format: 'mp3' | 'mp4', quality: string): Promise<void> {
  const job = jobs.get(jobId);
  if (!job) return;

  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir, { recursive: true });
  }

  const outputBase = path.join(config.tempDir, jobId);
  let finalOutputFile = '';

  try {
    updateJob(jobId, 'fetching', 10);
    const info = await ytdl.getInfo(url, { agent });

    if (format === 'mp3') {
      updateJob(jobId, 'processing', 20);
      
      const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      if (!audioFormat) throw new Error('No audio format found.');

      const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat, agent });
      finalOutputFile = `${outputBase}.mp3`;
      
      updateJob(jobId, 'converting', 40);
      await new Promise<void>((resolve, reject) => {
        const ffmpegProc = spawn(getFfmpegExecutable(), [
          '-i', 'pipe:0',
          '-acodec', 'libmp3lame',
          '-b:a', `${quality}k`,
          '-f', 'mp3',
          finalOutputFile
        ]);

        audioStream.pipe(ffmpegProc.stdin);

        ffmpegProc.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error('FFmpeg conversion failed.'));
        });
        ffmpegProc.on('error', reject);
        audioStream.on('error', reject);
      });

    } else {
      updateJob(jobId, 'processing', 20);

      // Select Video Format
      let videoFormat;
      if (quality === 'highest') {
        videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
      } else {
        const targetHeight = parseInt(quality.replace('p', ''), 10);
        const videoFormats = ytdl.filterFormats(info.formats, 'videoonly');
        videoFormats.sort((a, b) => (b.height || 0) - (a.height || 0));
        videoFormat = videoFormats.find(f => (f.height || 0) <= targetHeight) || videoFormats[0];
      }

      if (!videoFormat) throw new Error('No compatible video format found.');

      // Select Audio Format
      const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      if (!audioFormat) throw new Error('No audio format found.');

      const videoFile = `${outputBase}_video.mp4`;
      const audioFile = `${outputBase}_audio.mp4`;
      finalOutputFile = `${outputBase}.mp4`;

      updateJob(jobId, 'processing', 30);
      
      // Download Video and Audio concurrently
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          const stream = ytdl.downloadFromInfo(info, { format: videoFormat, agent });
          stream.pipe(fs.createWriteStream(videoFile));
          stream.on('end', resolve);
          stream.on('error', reject);
        }),
        new Promise<void>((resolve, reject) => {
          const stream = ytdl.downloadFromInfo(info, { format: audioFormat, agent });
          stream.pipe(fs.createWriteStream(audioFile));
          stream.on('end', resolve);
          stream.on('error', reject);
        })
      ]);

      updateJob(jobId, 'converting', 60);

      // Merge with FFmpeg
      await new Promise<void>((resolve, reject) => {
        const ffmpegProc = spawn(getFfmpegExecutable(), [
          '-i', videoFile,
          '-i', audioFile,
          '-c:v', 'copy',
          '-c:a', 'aac',
          finalOutputFile
        ]);
        ffmpegProc.on('close', (code) => {
          if (code === 0) resolve();
          else reject(new Error('FFmpeg merge failed.'));
        });
        ffmpegProc.on('error', reject);
      });

      // Cleanup temp streams
      fs.unlinkSync(videoFile);
      fs.unlinkSync(audioFile);
    }

    updateJob(jobId, 'uploading', 85);

    const downloadUrl = await uploadToTmpFiles(finalOutputFile);

    try { fs.unlinkSync(finalOutputFile); } catch {}

    updateJob(jobId, 'completed', 100);
    const completedJob = jobs.get(jobId);
    if (completedJob) {
      completedJob.filename = path.basename(finalOutputFile);
      completedJob.downloadUrl = downloadUrl;
    }

  } catch (error) {
    console.error('[processDownload error]', error);
    const errMsg = error instanceof Error ? error.message : 'An unknown error occurred.';
    updateJob(jobId, 'failed', 0);
    const failedJob = jobs.get(jobId);
    if (failedJob) failedJob.error = errMsg;
  }
}

async function uploadToTmpFiles(filePath: string): Promise<string> {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) throw new Error(`tmpfiles.org upload failed with status ${response.status}`);
  const result = await response.json() as { status: string; data: { url: string } };
  if (result.status !== 'success' || !result.data?.url) throw new Error('tmpfiles.org upload failed: unexpected response');

  const pageResponse = await fetch(result.data.url);
  const pageHtml = await pageResponse.text();
  const match = pageHtml.match(/href="(https:\/\/tmpfiles\.org\/dl\/[^"]+)"/);
  
  if (!match || !match[1]) throw new Error('Could not find the direct download link on tmpfiles.org');
  return match[1];
}

function updateJob(jobId: string, stage: JobStage, progress: number): void {
  const job = jobs.get(jobId);
  if (job) { job.stage = stage; job.progress = progress; }
}

export function cleanupOldJobs(): void {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000;
  for (const [jobId, job] of jobs.entries()) {
    if (now - job.createdAt > maxAge) jobs.delete(jobId);
  }
}
