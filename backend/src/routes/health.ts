// Health check route
import { Router } from 'express';
import { checkFfmpeg, checkYtDlp, getYtDlpExecutable } from '../utils/ffmpeg';
import { execSync } from 'child_process';

const router = Router();

router.get('/', (req, res) => {
  let ytdlpOutput = 'not run';
  try {
    ytdlpOutput = execSync(`"${getYtDlpExecutable()}" --version`, { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
  } catch (error: any) {
    ytdlpOutput = error.message || error.toString();
  }

  res.json({
    status: 'ok',
    timestamp: Date.now(),
    ffmpeg: checkFfmpeg(),
    ytdlp: checkYtDlp(),
    ytdlpOutput,
    cookiesConfigured: !!process.env.YOUTUBE_COOKIES
  });
});

export default router;
