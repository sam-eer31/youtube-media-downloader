// General helper utilities

import { v4 as uuidv4 } from 'uuid';

/** Generate a unique job ID */
export function generateJobId(): string {
  return uuidv4();
}

/** Sanitize a filename by removing special characters */
export function sanitizeFilename(name: string): string {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '') // Remove invalid filename chars
    .replace(/\s+/g, '_')                     // Replace spaces with underscores
    .substring(0, 200);                        // Limit length
}

/** Sleep for a given number of milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
