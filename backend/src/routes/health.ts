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
    const cookiesPath = require('path').join(require('../config/env').config.tempDir, 'youtube_cookies.txt');
    ytdlpCookieTest = execSync(`"${getYtDlpExecutable()}" --cookies "${cookiesPath}" --dump-json --no-warnings --no-playlist "https://www.youtube.com/watch?v=jNQXAC9IVRw"`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().substring(0, 100);
  } catch (error: any) {
    ytdlpCookieTest = (error.stderr ? error.stderr.toString() : (error.message || error.toString()));
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
