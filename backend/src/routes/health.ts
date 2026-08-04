// Health check route
import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();
const COBALT_API_URL = process.env.COBALT_API_URL || 'https://cobalt-api.pewpew.moe';

router.get('/', async (req, res) => {
  let cobaltStatus = 'unknown';
  try {
    const response = await fetch(COBALT_API_URL, { method: 'GET' });
    cobaltStatus = response.ok ? 'up' : `error: ${response.status}`;
  } catch (error: any) {
    cobaltStatus = `down: ${error.message}`;
  }

  res.json({
    status: 'ok',
    timestamp: Date.now(),
    cobaltUrl: COBALT_API_URL,
    cobaltStatus
  });
});

export default router;
