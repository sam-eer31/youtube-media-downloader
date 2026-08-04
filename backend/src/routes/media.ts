// Media API routes

import { Router } from 'express';
import { getMediaInfo, initiateDownload, getProgress, serveFile } from '../controllers/mediaController';
import { validateMediaInfoRequest, validateDownloadRequest } from '../middleware/validator';
import { downloadLimiter } from '../middleware/rateLimiter';

const router = Router();

// Fetch media information
router.post('/info', validateMediaInfoRequest, getMediaInfo);

// Start download/conversion (stricter rate limit)
router.post('/download', downloadLimiter, validateDownloadRequest, initiateDownload);

// Check download progress
router.get('/progress/:jobId', getProgress);

// Proxy file download
router.get('/file/:jobId', serveFile);

export default router;
