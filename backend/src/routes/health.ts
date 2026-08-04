// Health check route
import { Router } from 'express';
import fetch from 'node-fetch';
import { getWorkingCobaltApi } from '../services/mediaService';

const router = Router();

router.get('/', async (req, res) => {
  let cobaltStatus = 'unknown';
  let apiUrl = 'unknown';
  try {
    apiUrl = await getWorkingCobaltApi();
    const response = await fetch(apiUrl, { method: 'GET' });
    cobaltStatus = response.ok ? 'up' : `error: ${response.status}`;
  } catch (error: any) {
    cobaltStatus = `down: ${error.message}`;
  }

  res.json({
    status: 'ok',
    timestamp: Date.now(),
    cobaltUrl: apiUrl,
    cobaltStatus
  });
});

export default router;
