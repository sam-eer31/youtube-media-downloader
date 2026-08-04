// Health check route
import { Router } from 'express';
import { checkFfmpeg, checkYtDlp, getYtDlpExecutable } from '../utils/ffmpeg';
import { execSync } from 'child_process';

const router = Router();

router.get('/', (req, res) => {
  let ytdlpOutput = 'not run';
  let ytdlpCookieTest = 'not run';
  
  try {
    ytdlpOutput = execSync(`"${getYtDlpExecutable()}" --version`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
  } catch (error: any) {
    ytdlpOutput = error.message || error.toString();
  }

  try {
    const fs = require('fs');
    const cookiesPath = require('path').join(require('../config/env').config.tempDir, 'youtube_cookies.txt');
    ytdlpCookieTest = `Exists: ${fs.existsSync(cookiesPath)}. Size: ${fs.existsSync(cookiesPath) ? fs.statSync(cookiesPath).size : 0}`;
    if (fs.existsSync(cookiesPath)) {
        ytdlpCookieTest += `. Content start: ` + fs.readFileSync(cookiesPath, 'utf8').substring(0, 200);
    }
  } catch (error: any) {
    ytdlpCookieTest = error.toString();
  }

  res.json({
    status: 'ok',
    timestamp: Date.now(),
    ffmpeg: checkFfmpeg(),
    ytdlp: checkYtDlp(),
    ytdlpOutput,
    ytdlpCookieTest,
    cookiesConfigured: !!process.env.YOUTUBE_COOKIES
  });
});

export default router;
