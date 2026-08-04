// FFmpeg utility helpers

import { execSync } from 'child_process';

/** Check if FFmpeg is installed and accessible */
export function checkFfmpeg(): boolean {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** Check if yt-dlp is installed and accessible */
export function checkYtDlp(): boolean {
  try {
    execSync('yt-dlp --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** Format seconds into MM:SS or HH:MM:SS */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Format bytes into human-readable file size */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
}

/** Estimate file size based on bitrate and duration */
export function estimateFileSize(bitrate: number, durationSeconds: number): string {
  const bytes = (bitrate * 1000 * durationSeconds) / 8;
  return formatFileSize(bytes);
}

/** Parse height string like "720p" to numeric height */
export function parseHeight(quality: string): number | null {
  const match = quality.match(/^(\d+)p$/);
  return match ? parseInt(match[1], 10) : null;
}
