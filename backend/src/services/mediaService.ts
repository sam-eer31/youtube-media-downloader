// Media service — orchestrates downloads using RapidAPI and metadata via YouTube oEmbed
import fetch from 'node-fetch';
import { MediaInfo, JobStatus, QualityOption, JobStage } from '../types';
import { generateJobId } from '../utils/helpers';

const jobs = new Map<string, JobStatus>();

// RapidAPI configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'f5e656d1c5msh8b29c8cff437605p1930c3jsn81b4b7d5bda7';
const RAPIDAPI_HOST = 'youtube-mp4-mp3-downloader.p.rapidapi.com';

function extractVideoId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match ? match[1] : null;
}

/** Fetch media metadata using YouTube oEmbed (Free, Unblocked) */
export async function fetchMediaInfo(url: string): Promise<MediaInfo> {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  
  try {
    const res = await fetch(oembedUrl);
    if (!res.ok) {
      throw new Error('Video not found or is private.');
    }
    const data = await res.json() as any;

    const videoQualities: QualityOption[] = [
      { label: '360p', value: '360', estimatedSize: 'Unknown' },
      { label: '720p', value: '720', estimatedSize: 'Unknown' },
      { label: '1080p', value: '1080', estimatedSize: 'Unknown' },
    ];

    const audioQualities: QualityOption[] = [
      { label: '128 kbps', value: '128', estimatedSize: 'Unknown' },
      { label: '320 kbps', value: '320', estimatedSize: 'Unknown' },
    ];

    return {
      title: data.title || 'Unknown Title',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      duration: 0,
      durationFormatted: 'Unknown',
      uploader: data.author_name || 'YouTube',
      url,
      videoQualities,
      audioQualities,
    };
  } catch (error) {
    throw new Error('Failed to retrieve video information. It might be private or region-locked.');
  }
}

/** Start a download using RapidAPI */
export function startDownload(url: string, format: 'mp3' | 'mp4', quality: string): string {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const jobId = generateJobId();
  const job: JobStatus = { id: jobId, stage: 'queued', progress: 0, createdAt: Date.now() };
  jobs.set(jobId, job);

  processRapidApiDownload(jobId, videoId, format, quality).catch((err) => {
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

/** Internal: call RapidAPI and store the progress ID to poll later */
async function processRapidApiDownload(jobId: string, videoId: string, formatType: 'mp3' | 'mp4', quality: string): Promise<void> {
  const job = jobs.get(jobId);
  if (!job) return;

  job.stage = 'fetching';
  job.progress = 10;

  // Format mapping
  // format=720 or 1080 for video, format=mp3 for audio
  const formatParam = formatType === 'mp3' ? 'mp3' : quality.replace('p', '');
  const audioQualityParam = formatType === 'mp3' ? quality : '128';

  const rapidApiUrl = `https://${RAPIDAPI_HOST}/api/v1/download?format=${formatParam}&id=${videoId}&audioQuality=${audioQualityParam}&addInfo=false&allowExtendedDuration=false`;

  const response = await fetch(rapidApiUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[RapidAPI Error]', text);
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json() as any;
  if (!data.success || !data.progressId) {
    throw new Error('Failed to initiate download job with API.');
  }

  // Save the progressId so the client polling can check it
  job.rapidApiProgressId = data.progressId;
  job.stage = 'processing';
  job.progress = 20;

  // We will start a background polling loop to update the status in our memory
  pollRapidApiProgress(jobId, data.progressId);
}

/** Poll RapidAPI until finished */
async function pollRapidApiProgress(jobId: string, progressId: string) {
  const job = jobs.get(jobId);
  if (!job) return;

  const maxAttempts = 120; // 4 minutes max
  let attempts = 0;

  const pollInterval = setInterval(async () => {
    attempts++;
    if (attempts > maxAttempts) {
      clearInterval(pollInterval);
      job.stage = 'failed';
      job.error = 'Download timed out.';
      return;
    }

    try {
      const res = await fetch(`https://${RAPIDAPI_HOST}/api/v1/progress?id=${progressId}`, {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST
        }
      });

      if (!res.ok) return; // Wait for next tick

      const data = await res.json() as any;

      if (data.finished && data.downloadUrl) {
        clearInterval(pollInterval);
        job.stage = 'completed';
        job.progress = 100;
        job.downloadUrl = data.downloadUrl;
        job.filename = 'download' + (data.downloadUrl.includes('.mp3') ? '.mp3' : '.mp4');
      } else {
        // Just update progress slightly
        job.stage = 'processing';
        const apiProgress = data.progress ? (data.progress / 1000) * 80 : 0; // if it returns progress out of 1000
        job.progress = 20 + apiProgress;
      }
    } catch (error) {
      // ignore network errors during polling, try next tick
    }
  }, 2000); // Poll every 2 seconds
}

export function cleanupOldJobs(): void {
  const now = Date.now();
  const maxAge = 60 * 60 * 1000; // 1 hour
  for (const [jobId, job] of jobs.entries()) {
    if (now - job.createdAt > maxAge) jobs.delete(jobId);
  }
}
