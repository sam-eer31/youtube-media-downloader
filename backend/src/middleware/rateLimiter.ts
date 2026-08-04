// Rate limiting middleware for different endpoint tiers

import rateLimit from 'express-rate-limit';
import { config } from '../config/env';

/** General rate limiter — 30 requests per minute per IP */
export const generalLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

/** Stricter rate limiter for download endpoints — 10 per minute per IP */
export const downloadLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitDownloadMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many download requests. Please wait before trying again.',
  },
});
