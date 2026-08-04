// Media service — orchestrates Cobalt API fetching
import { MediaInfo, JobStatus, QualityOption, JobStage } from '../types';
import { generateJobId } from '../utils/helpers';
import fetch from 'node-fetch';

/** In-memory job store */
const jobs = new Map<string, JobStatus>();

const COBALT_API_URL = process.env.COBALT_API_URL || 'https://cobalt-api.pewpew.moe';

/** Fetch media metadata using YouTube oEmbed */
export async function fetchMediaInfo(url: string): Promise<MediaInfo> {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube returned status ${response.status}`);
    }

    const info = await response.json() as any;

    // Build video quality options (statically supported by Cobalt)
    const videoQualities: QualityOption[] = [
      { label: '360p', value: '360', estimatedSize: 'Unknown' },
      { label: '480p', value: '480', estimatedSize: 'Unknown' },
      { label: '720p', value: '720', estimatedSize: 'Unknown' },
      { label: '1080p', value: '1080', estimatedSize: 'Unknown' },
      { label: 'Highest Available', value: 'max', estimatedSize: 'Unknown' },
    ];

    // Build audio quality options
    const audioQualities: QualityOption[] = [
      { label: '128 kbps', value: '128', estimatedSize: 'Unknown' },
      { label: '256 kbps', value: '256', estimatedSize: 'Unknown' },
      { label: '320 kbps', value: '320', estimatedSize: 'Unknown' },
    ];

    return {
      title: info.title || 'Unknown Title',
      thumbnail: info.thumbnail_url || '',
      duration: 0,
      durationFormatted: 'Unknown',
      uploader: info.author_name || 'Unknown',
      url,
      videoQualities,
      audioQualities,
    };
  } catch (error: any) {
    console.error('[fetchMediaInfo error]', error);
    throw new Error('Could not fetch media information. Please check the URL and try again.');
  }
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

/** Internal: process the download via Cobalt API */
async function processDownload(jobId: string, url: string, format: 'mp3' | 'mp4', quality: string): Promise<void> {
  const job = jobs.get(jobId);
  if (!job) return;

  try {
    updateJob(jobId, 'fetching', 20);

    const payload: any = {
      url: url,
      filenameStyle: 'basic'
    };

    if (format === 'mp3') {
      payload.downloadMode = 'audio';
      payload.audioFormat = 'mp3';
      payload.audioBitrate = quality || '128';
    } else {
      payload.videoQuality = quality === 'highest' ? 'max' : quality.replace('p', '');
      payload.youtubeVideoCodec = 'h264';
    }

    updateJob(jobId, 'processing', 50);

    const response = await fetch(`${COBALT_API_URL}/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errJson = JSON.parse(errorText);
        errorText = errJson.error?.code || errorText;
      } catch {}
      throw new Error(`Cobalt API error: ${errorText}`);
    }

    const result = await response.json() as any;

    if (result.status === 'error') {
      throw new Error(result.error?.code || 'Cobalt returned an error status.');
    }

    const downloadUrl = result.url;
    if (!downloadUrl) {
      throw new Error('Cobalt did not return a valid download URL.');
    }

    updateJob(jobId, 'completed', 100);
    const completedJob = jobs.get(jobId);
    if (completedJob) {
      completedJob.filename = `download${format === 'mp3' ? '.mp3' : '.mp4'}`;
      completedJob.downloadUrl = downloadUrl;
    }

  } catch (error) {
    console.error('[processDownload error]', error);
    const errMsg = error instanceof Error ? error.message : 'An unknown error occurred.';
    updateJob(jobId, 'failed', 0);
    const failedJob = jobs.get(jobId);
    if (failedJob) {
      failedJob.error = errMsg;
    }
  }
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
  const maxAge = 60 * 60 * 1000; // 1 hour

  for (const [jobId, job] of jobs.entries()) {
    if (now - job.createdAt > maxAge) {
      jobs.delete(jobId);
    }
  }
}
