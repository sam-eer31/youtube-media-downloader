// API client for communicating with the backend

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const cleanApiUrl = rawApiUrl.replace(/\/$/, '');
export const API_BASE = cleanApiUrl.endsWith('/api') ? cleanApiUrl : `${cleanApiUrl}/api`;

/** Standard API response wrapper */
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Quality option from the backend */
export interface QualityOption {
  label: string;
  value: string;
  estimatedSize: string;
}

/** Media info returned from the backend */
export interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: number;
  durationFormatted: string;
  uploader: string;
  url: string;
  videoQualities: QualityOption[];
  audioQualities: QualityOption[];
}

/** Job status from the backend */
export interface JobStatus {
  id: string;
  stage: 'queued' | 'fetching' | 'processing' | 'converting' | 'uploading' | 'completed' | 'failed';
  progress: number;
  filename?: string;
  downloadUrl?: string;
  error?: string;
}

/** Fetch media info from a URL */
export async function fetchMediaInfo(url: string): Promise<MediaInfo> {
  const response = await fetch(`${API_BASE}/media/info`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const result: ApiResponse<MediaInfo> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch media information.');
  }

  return result.data;
}

/** Start a download/conversion job */
export async function startDownload(url: string, format: 'mp3' | 'mp4', quality: string): Promise<string> {
  const response = await fetch(`${API_BASE}/media/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, format, quality }),
  });

  const result: ApiResponse<{ jobId: string }> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to start download.');
  }

  return result.data.jobId;
}

/** Poll the progress of a download job */
export async function getJobProgress(jobId: string): Promise<JobStatus> {
  const response = await fetch(`${API_BASE}/media/progress/${jobId}`);

  const result: ApiResponse<JobStatus> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch job progress.');
  }

  return result.data;
}
