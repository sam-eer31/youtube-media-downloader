// TypeScript type definitions for the media conversion backend

/** Supported output formats */
export type MediaFormat = 'mp3' | 'mp4';

/** MP4 quality options */
export type VideoQuality = '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | 'highest';

/** MP3 bitrate options */
export type AudioQuality = '64' | '128' | '192' | '256' | '320';

/** Stages during a download/conversion job */
export type JobStage = 'queued' | 'fetching' | 'processing' | 'converting' | 'uploading' | 'completed' | 'failed';

/** Format info returned from yt-dlp for a single stream */
export interface FormatInfo {
  formatId: string;
  ext: string;
  quality: string;
  resolution?: string;
  filesize?: number;
  tbr?: number; // total bitrate
  acodec?: string;
  vcodec?: string;
}

/** Media metadata returned to the frontend */
export interface MediaInfo {
  title: string;
  thumbnail: string;
  duration: number;        // seconds
  durationFormatted: string;
  uploader: string;
  url: string;
  videoQualities: QualityOption[];
  audioQualities: QualityOption[];
}

/** A single quality option */
export interface QualityOption {
  label: string;
  value: string;
  estimatedSize: string;
}

/** Current state of a download/conversion job */
export interface JobStatus {
  id: string;
  stage: JobStage;
  progress: number;        // 0-100
  filename?: string;
  downloadUrl?: string;    // tmpfiles.org URL
  error?: string;
  createdAt: number;
}

/** Request body for /api/media/info */
export interface MediaInfoRequest {
  url: string;
}

/** Request body for /api/media/download */
export interface DownloadRequest {
  url: string;
  format: MediaFormat;
  quality: string;
}

/** Standard API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
