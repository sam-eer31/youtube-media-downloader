import { Router } from 'express';
import { initiatePublicDownload, getPublicDownloadStatus } from '../controllers/publicApiController';

const router = Router();

// Allow developers to use GET or POST to initiate
router.get('/download', initiatePublicDownload);
router.post('/download', initiatePublicDownload);

// Endpoint to poll for logs and status
router.get('/status/:jobId', getPublicDownloadStatus);

export default router;
