// Backend environment variable configuration

import path from 'path';

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  tempDir: path.resolve(process.env.TEMP_DIR || './temp'),
  maxFileAgeMinutes: parseInt(process.env.MAX_FILE_AGE_MINUTES || '15', 10),
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '30', 10),
  rateLimitDownloadMax: parseInt(process.env.RATE_LIMIT_DOWNLOAD_MAX || '10', 10),
  tmpfilesExpireSeconds: parseInt(process.env.TMPFILES_EXPIRE_SECONDS || '172800', 10), // 48 hours
};
