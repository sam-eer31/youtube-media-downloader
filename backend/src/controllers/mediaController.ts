// Media controller — handles API route logic

import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { fetchMediaInfo, startDownload, getJobStatus } from '../services/mediaService';

/** POST /api/media/info — Fetch media metadata */
export const getMediaInfo = asyncHandler(async (req: Request, res: Response) => {
  const { url } = req.body;

  const info = await fetchMediaInfo(url);

  res.status(200).json({
    success: true,
    data: info,
  });
});

/** POST /api/media/download — Start a download/conversion job */
export const initiateDownload = asyncHandler(async (req: Request, res: Response) => {
  const { url, format, quality } = req.body;

  const jobId = startDownload(url, format, quality);

  res.status(202).json({
    success: true,
    data: { jobId },
  });
});

/** GET /api/media/progress/:jobId — Check job progress */
export const getProgress = asyncHandler(async (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;

  const job = getJobStatus(jobId);

  if (!job) {
    res.status(404).json({
      success: false,
      error: 'Job not found. It may have expired.',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

import fetch from 'node-fetch';

/** GET /api/media/file/:jobId — Proxy file download to force attachment */
export const serveFile = asyncHandler(async (req: Request, res: Response) => {
  const jobId = req.params.jobId as string;
  const job = getJobStatus(jobId);

  if (!job || !job.downloadUrl) {
    res.status(404).send('File not found or expired.');
    return;
  }

  try {
    const response = await fetch(job.downloadUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch from tmpfiles: ${response.statusText}`);
    }

    res.setHeader('Content-Disposition', `attachment; filename="${job.filename || 'download'}"`);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');

    if (response.body) {
      response.body.pipe(res);
    } else {
      res.status(500).send('Empty response from cloud storage.');
    }
  } catch (error) {
    console.error('[serveFile] Error proxying file:', error);
    res.status(500).send('Failed to proxy the download.');
  }
});
