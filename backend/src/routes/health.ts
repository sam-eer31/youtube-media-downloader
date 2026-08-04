// Health check route
import { Router } from 'express';
import { checkFfmpeg } from '../utils/ffmpeg';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    ffmpeg: checkFfmpeg(),
    ytdlCore: true,
    cookiesConfigured: !!process.env.YOUTUBE_COOKIES
  });
});

export default router;
