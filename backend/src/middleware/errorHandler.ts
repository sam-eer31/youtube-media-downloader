// Global error handling middleware

import { Request, Response, NextFunction } from 'express';

/** Custom application error with HTTP status code */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/** Global error handler — catches all unhandled errors */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || 'An unexpected error occurred.';

  console.error(`[ERROR] ${req.method} ${req.path} — ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/** Async route wrapper to catch errors in async handlers */
export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
