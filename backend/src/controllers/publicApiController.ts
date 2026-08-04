import { Request, Response } from 'express';
import validator from 'validator';
import { startPublicDownload, getPublicJobStatus, cleanupOldPublicJobs } from '../services/publicApiService';

export const initiatePublicDownload = (req: Request, res: Response) => {
  cleanupOldPublicJobs();

  // Accept URL via query params (GET) or body (POST)
  const url = (req.query.url as string) || req.body.url;
  const format = ((req.query.format as string) || req.body.format || 'mp4') as 'mp3' | 'mp4';
  const quality = ((req.query.quality as string) || req.body.quality || (format === 'mp3' ? '320' : '720p'));

  if (!url || !validator.isURL(url, { require_protocol: true }) || !url.includes('youtu')) {
    return res.status(400).json({ success: false, error: 'A valid YouTube URL is required.' });
  }

  if (!['mp3', 'mp4'].includes(format)) {
    return res.status(400).json({ success: false, error: 'Invalid format. Must be mp3 or mp4.' });
  }

  try {
    const jobId = startPublicDownload(url, format, quality);
    const host = req.get('host');
    const protocol = req.protocol || 'https';
    
    return res.json({
      success: true,
      jobId,
      statusUrl: `${protocol}://${host}/api/v1/public/status/${jobId}`,
      message: "Download initiated. Poll the statusUrl to get logs and the final download link."
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to start download';
    return res.status(500).json({ success: false, error: message });
  }
};

export const getPublicDownloadStatus = (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  const job = getPublicJobStatus(jobId);

  if (!job) {
    return res.status(404).json({ success: false, error: 'Job not found or has expired.' });
  }

  return res.json({
    success: true,
    jobId: job.jobId,
    status: job.status,
    progress: job.progress,
    logs: job.logs,
    downloadUrl: job.downloadUrl || null,
    error: job.error || null
  });
};
