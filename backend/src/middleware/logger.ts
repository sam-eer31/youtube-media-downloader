// Request logging middleware

import morgan from 'morgan';
import { Request, Response } from 'express';

/** Custom morgan token for colored status codes */
morgan.token('statusColor', (_req: Request, res: Response) => {
  const status = res.statusCode;
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // Red
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // Yellow
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // Cyan
  return `\x1b[32m${status}\x1b[0m`; // Green
});

/** HTTP request logger using Morgan with custom format */
export const requestLogger = morgan(
  ':method :url :statusColor :response-time ms - :res[content-length]',
  {
    skip: (req: Request) => req.url === '/api/health',
  }
);
