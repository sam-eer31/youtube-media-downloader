// Cleanup service — removes old temporary files and expired jobs

import fs from 'fs';
import path from 'path';
import { config } from '../config/env';
import { cleanupOldJobs } from './mediaService';

/** Start the periodic cleanup interval */
export function startCleanupService(): void {
  const intervalMs = 10 * 60 * 1000; // Every 10 minutes

  setInterval(() => {
    cleanupTempFiles();
    cleanupOldJobs();
  }, intervalMs);

  console.log(`[Cleanup] Service started — runs every 10 minutes`);
}

/** Remove temporary files older than the configured max age */
function cleanupTempFiles(): void {
  try {
    if (!fs.existsSync(config.tempDir)) return;

    const files = fs.readdirSync(config.tempDir);
    const now = Date.now();
    const maxAge = config.maxFileAgeMinutes * 60 * 1000;
    let cleaned = 0;

    for (const file of files) {
      const filePath = path.join(config.tempDir, file);
      try {
        const stat = fs.statSync(filePath);
        if (now - stat.mtimeMs > maxAge) {
          fs.unlinkSync(filePath);
          cleaned++;
        }
      } catch {
        // Skip files that can't be accessed
      }
    }

    if (cleaned > 0) {
      console.log(`[Cleanup] Removed ${cleaned} expired temp file(s)`);
    }
  } catch (err) {
    console.error('[Cleanup] Error during cleanup:', err);
  }
}
