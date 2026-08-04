// Express application setup

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { requestLogger } from './middleware/logger';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import mediaRoutes from './routes/media';
import healthRoutes from './routes/health';
import publicApiRoutes from './routes/publicApi';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Request logging
app.use(requestLogger);

// General rate limiting
app.use(generalLimiter);

// API routes
app.use('/api/media', mediaRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/v1/public', publicApiRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found.' });
});

// Global error handler
app.use(errorHandler);

export default app;
