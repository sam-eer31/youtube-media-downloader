// Input validation middleware

import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { MediaFormat } from '../types';

/** Validate the URL in a media info request */
export function validateMediaInfoRequest(req: Request, res: Response, next: NextFunction): void {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ success: false, error: 'URL is required.' });
    return;
  }

  const trimmedUrl = url.trim();

  if (!validator.isURL(trimmedUrl, { protocols: ['http', 'https'], require_protocol: true })) {
    res.status(400).json({ success: false, error: 'Please provide a valid URL starting with http:// or https://' });
    return;
  }

  // Sanitize the URL
  req.body.url = validator.trim(trimmedUrl);
  next();
}

/** Validate the download request body */
export function validateDownloadRequest(req: Request, res: Response, next: NextFunction): void {
  const { url, format, quality } = req.body;

  if (!url || typeof url !== 'string') {
    res.status(400).json({ success: false, error: 'URL is required.' });
    return;
  }

  const trimmedUrl = url.trim();
  if (!validator.isURL(trimmedUrl, { protocols: ['http', 'https'], require_protocol: true })) {
    res.status(400).json({ success: false, error: 'Please provide a valid URL.' });
    return;
  }

  const validFormats: MediaFormat[] = ['mp3', 'mp4'];
  if (!format || !validFormats.includes(format)) {
    res.status(400).json({ success: false, error: 'Format must be "mp3" or "mp4".' });
    return;
  }

  const allowedVideoQualities = ['144p', '240p', '360', '360p', '480', '480p', '720', '720p', '1080', '1080p', 'max', 'highest'];
  const validAudioQualities = ['64', '128', '192', '256', '320'];

  if (format === 'mp4' && !allowedVideoQualities.includes(quality)) {
    res.status(400).json({ success: false, error: `Invalid video quality. Choose from: ${allowedVideoQualities.join(', ')}` });
    return;
  }

  if (format === 'mp3' && !validAudioQualities.includes(quality)) {
    res.status(400).json({ success: false, error: `Invalid audio quality. Choose from: ${validAudioQualities.join(', ')} kbps` });
    return;
  }

  req.body.url = validator.trim(trimmedUrl);
  next();
}
