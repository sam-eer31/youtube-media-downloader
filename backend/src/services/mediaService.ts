// Media service — orchestrates yt-dlp, FFmpeg, and tmpfiles.org uploads

import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';
import { MediaInfo, JobStatus, QualityOption, JobStage } from '../types';
import { checkFfmpeg, getYtDlpExecutable, formatDuration, estimateFileSize } from '../utils/ffmpeg';
import { generateJobId, sanitizeFilename } from '../utils/helpers';
import fetch from 'node-fetch';
import FormData from 'form-data';

/** In-memory job store */
const jobs = new Map<string, JobStatus>();

/** Fetch media metadata using yt-dlp */
export async function fetchMediaInfo(url: string): Promise<MediaInfo> {
  return new Promise((resolve, reject) => {
    const args = ['--dump-json', '--no-warnings', '--no-playlist', url];
    const proc = spawn(getYtDlpExecutable(), args);

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data: Buffer) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data: Buffer) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.error('[yt-dlp error]', stderr);
        const errorMsg = stderr.split('\n')[0] || 'Unknown error';
        reject(new Error(`yt-dlp failed: ${errorMsg}. Please check the URL and try again.`));
        return;
      }

      try {
        const info = JSON.parse(stdout);
        const duration = info.duration || 0;

        // Build video quality options
        const videoQualities: QualityOption[] = [
          { label: '144p', value: '144p', estimatedSize: estimateFileSize(200, duration) },
          { label: '240p', value: '240p', estimatedSize: estimateFileSize(400, duration) },
          { label: '360p', value: '360p', estimatedSize: estimateFileSize(700, duration) },
          { label: '480p', value: '480p', estimatedSize: estimateFileSize(1200, duration) },
          { label: '720p', value: '720p', estimatedSize: estimateFileSize(2500, duration) },
          { label: '1080p', value: '1080p', estimatedSize: estimateFileSize(4500, duration) },
          { label: 'Highest Available', value: 'highest', estimatedSize: estimateFileSize(8000, duration) },
        ];

        // Build audio quality options
        const audioQualities: QualityOption[] = [
          { label: '64 kbps', value: '64', estimatedSize: estimateFileSize(64, duration) },
          { label: '128 kbps', value: '128', estimatedSize: estimateFileSize(128, duration) },
          { label: '192 kbps', value: '192', estimatedSize: estimateFileSize(192, duration) },
          { label: '256 kbps', value: '256', estimatedSize: estimateFileSize(256, duration) },
          { label: '320 kbps', value: '320', estimatedSize: estimateFileSize(320, duration) },
        ];

        const result: MediaInfo = {
          title: info.title || 'Unknown Title',
          thumbnail: info.thumbnail || info.thumbnails?.[info.thumbnails.length - 1]?.url || '',
          duration,
          durationFormatted: formatDuration(duration),
          uploader: info.uploader || info.channel || 'Unknown',
          url,
          videoQualities,
          audioQualities,
        };

        resolve(result);
      } catch (parseError) {
        reject(new Error('Failed to parse media information.'));
      }
    });

    proc.on('error', () => {
      reject(new Error('yt-dlp is not installed or not found in PATH. Please install it first.'));
    });
  });
}

/** Start a download/conversion job */
export function startDownload(url: string, format: 'mp3' | 'mp4', quality: string): string {
  const jobId = generateJobId();

  const job: JobStatus = {
    id: jobId,
    stage: 'queued',
    progress: 0,
    createdAt: Date.now(),
  };

  jobs.set(jobId, job);

  // Process asynchronously
  processDownload(jobId, url, format, quality).catch((err) => {
    const existingJob = jobs.get(jobId);
    if (existingJob) {
      existingJob.stage = 'failed';
      existingJob.error = err.message || 'Download failed.';
    }
  });

  return jobId;
}

/** Get the current status of a job */
export function getJobStatus(jobId: string): JobStatus | undefined {
  return jobs.get(jobId);
}

/** Internal: process the download, convert, and upload */
async function processDownload(jobId: string, url: string, format: 'mp3' | 'mp4', quality: string): Promise<void> {
  const job = jobs.get(jobId);
  if (!job) return;

  // Ensure temp directory exists
  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir, { recursive: true });
  }

  const outputBase = path.join(config.tempDir, jobId);

  try {
    // Stage 1: Fetching
    updateJob(jobId, 'fetching', 10);

    let ytdlpArgs: string[];

    if (format === 'mp3') {
      const audioBitrate = quality; // e.g., "128"
      ytdlpArgs = [
        '-x',
        '--audio-format', 'mp3',
        '--audio-quality', `${audioBitrate}K`,
        '--no-playlist',
        '--no-warnings',
        '--newline',              // Progress on new lines
        '-o', `${outputBase}.%(ext)s`,
        url,
      ];
    } else {
      // MP4
      const hasFfmpeg = checkFfmpeg();
      let formatString: string;
      
      if (hasFfmpeg) {
        if (quality === 'highest') {
          formatString = 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best';
        } else {
          const height = quality.replace('p', '');
          formatString = `bestvideo[height<=${height}][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=${height}]+bestaudio/best[height<=${height}]`;
        }
      } else {
        // Fallback to pre-merged formats if FFmpeg is not installed
        if (quality === 'highest') {
          formatString = 'best[ext=mp4]/best';
        } else {
          const height = quality.replace('p', '');
          formatString = `best[height<=${height}][ext=mp4]/best[ext=mp4]/best`;
        }
      }

      ytdlpArgs = [
        '-f', formatString,
        '--no-playlist',
        '--no-warnings',
        '--newline',
        '-o', `${outputBase}.%(ext)s`,
        url,
      ];
      
      if (hasFfmpeg) {
        ytdlpArgs.splice(2, 0, '--merge-output-format', 'mp4');
      }
    }

    // Stage 2: Processing / Downloading
    updateJob(jobId, 'processing', 20);

    await new Promise<void>((resolve, reject) => {
      const proc = spawn(getYtDlpExecutable(), ytdlpArgs);

      proc.stdout.on('data', (data: Buffer) => {
        const line = data.toString().trim();
        // Parse yt-dlp progress: [download]  45.2% of ~5.00MiB ...
        const progressMatch = line.match(/\[download\]\s+([\d.]+)%/);
        if (progressMatch) {
          const dlProgress = parseFloat(progressMatch[1]);
          // Map download progress (0-100%) to our progress (20-70%)
          const mappedProgress = 20 + (dlProgress / 100) * 50;
          updateJob(jobId, 'processing', Math.min(Math.round(mappedProgress), 70));
        }

        // Detect merging stage
        if (line.includes('[Merger]') || line.includes('[ExtractAudio]')) {
          updateJob(jobId, 'converting', 75);
        }
      });

      proc.stderr.on('data', (data: Buffer) => {
        const line = data.toString().trim();
        if (line) {
          console.error(`[yt-dlp stderr] ${line}`);
        }
      });

      proc.on('close', (code) => {
        if (code !== 0) {
          reject(new Error('Download/conversion failed. The media may not be available.'));
        } else {
          resolve();
        }
      });

      proc.on('error', () => {
        reject(new Error('yt-dlp is not installed or not found in PATH.'));
      });
    });

    // Stage 3: Find the output file
    updateJob(jobId, 'converting', 80);

    const ext = format === 'mp3' ? '.mp3' : '.mp4';
    let outputFile = `${outputBase}${ext}`;

    // yt-dlp might use slightly different naming, look for the file
    if (!fs.existsSync(outputFile)) {
      const files = fs.readdirSync(config.tempDir).filter(f => f.startsWith(jobId));
      if (files.length > 0) {
        outputFile = path.join(config.tempDir, files[0]);
      } else {
        throw new Error('Output file not found after conversion.');
      }
    }

    // Stage 4: Upload to tmpfiles.org
    updateJob(jobId, 'uploading', 85);

    const downloadUrl = await uploadToTmpFiles(outputFile);

    // Clean up local temp file
    try {
      fs.unlinkSync(outputFile);
    } catch {
      // Non-critical, cleanup service will handle it
    }

    // Stage 5: Complete
    const basename = path.basename(outputFile);
    updateJob(jobId, 'completed', 100);
    const completedJob = jobs.get(jobId);
    if (completedJob) {
      completedJob.filename = basename;
      completedJob.downloadUrl = downloadUrl;
    }

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'An unknown error occurred.';
    updateJob(jobId, 'failed', 0);
    const failedJob = jobs.get(jobId);
    if (failedJob) {
      failedJob.error = errMsg;
    }

    // Clean up any leftover files
    try {
      const files = fs.readdirSync(config.tempDir).filter(f => f.startsWith(jobId));
      files.forEach(f => fs.unlinkSync(path.join(config.tempDir, f)));
    } catch {
      // Ignore cleanup errors
    }
  }
}

/** Upload a file to tmpfiles.org and return the download URL */
async function uploadToTmpFiles(filePath: string): Promise<string> {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    throw new Error(`tmpfiles.org upload failed with status ${response.status}`);
  }

  const result = await response.json() as { status: string; data: { url: string } };

  if (result.status !== 'success' || !result.data?.url) {
    throw new Error('tmpfiles.org upload failed: unexpected response');
  }

  // Fetch the HTML page to scrape the actual download token URL
  const pageResponse = await fetch(result.data.url);
  const pageHtml = await pageResponse.text();
  
  // Scrape: <a class="download" href="https://tmpfiles.org/dl/...">Download
  const match = pageHtml.match(/href="(https:\/\/tmpfiles\.org\/dl\/[^"]+)"/);
  
  if (!match || !match[1]) {
    throw new Error('Could not find the direct download link on tmpfiles.org');
  }

  return match[1];
}

/** Helper to update a job's stage and progress */
function updateJob(jobId: string, stage: JobStage, progress: number): void {
  const job = jobs.get(jobId);
  if (job) {
    job.stage = stage;
    job.progress = progress;
  }
}

/** Clean up old jobs from memory */
export function cleanupOldJobs(): void {
  const now = Date.now();
  const maxAge = config.maxFileAgeMinutes * 60 * 1000;

  for (const [jobId, job] of jobs.entries()) {
    if (now - job.createdAt > maxAge) {
      jobs.delete(jobId);
    }
  }
}
