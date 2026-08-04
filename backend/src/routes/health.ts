// Health check route

import { Router, Request, Response } from 'express';
import { checkFfmpeg, checkYtDlp } from '../utils/ffmpeg';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const ffmpegOk = checkFfmpeg();
  const ytdlpOk = checkYtDlp();

  const status = ffmpegOk && ytdlpOk ? 'healthy' : 'degraded';

  res.status(ffmpegOk && ytdlpOk ? 200 : 503).json({
    success: true,
    data: {
      status,
      timestamp: new Date().toISOString(),
      dependencies: {
        ffmpeg: ffmpegOk ? 'ok' : 'missing',
        'yt-dlp': ytdlpOk ? 'ok' : 'missing',
      },
    },
  });
});

export default router;
