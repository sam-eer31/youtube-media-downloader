// Server entry point

import app from './app';
import { config } from './config/env';
import { startCleanupService } from './services/cleanupService';
import { checkFfmpeg, checkYtDlp } from './utils/ffmpeg';
import fs from 'fs';

// Ensure temp directory exists
if (!fs.existsSync(config.tempDir)) {
  fs.mkdirSync(config.tempDir, { recursive: true });
}

// Check dependencies on startup
const ffmpegInstalled = checkFfmpeg();
const ytdlpInstalled = checkYtDlp();

if (!ffmpegInstalled) {
  console.warn('⚠️  FFmpeg is not installed or not in PATH. Conversion features will not work.');
}
if (!ytdlpInstalled) {
  console.warn('⚠️  yt-dlp is not installed or not in PATH. Download features will not work.');
}

// Start cleanup service
startCleanupService();

// Start server
app.listen(config.port, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║       MediaFlow Backend Server       ║
  ╠══════════════════════════════════════╣
  ║  Port:     ${String(config.port).padEnd(25)}║
  ║  Env:      ${config.nodeEnv.padEnd(25)}║
  ║  CORS:     ${config.corsOrigin.substring(0, 25).padEnd(25)}║
  ║  FFmpeg:   ${(ffmpegInstalled ? '✅ Ready' : '❌ Missing').padEnd(25)}║
  ║  yt-dlp:   ${(ytdlpInstalled ? '✅ Ready' : '❌ Missing').padEnd(25)}║
  ╚══════════════════════════════════════╝
  `);
});
