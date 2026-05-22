import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import env from './config/env.js';
import AppError from './utils/appError.js';
import errorHandler from './middleware/errorHandler.js';
import limiter from './middleware/rateLimiter.js';
import requestLogger from './middleware/requestLogger.js';
import docsRouter from './route/docs.js';
import healthRouter from './route/health.js';
import scanRouter from './route/scan.js';
import apiRouter from './route/index.js';

const { ALLOWED_ORIGINS, JSON_BODY_LIMIT, TRUST_PROXY, URLENCODED_BODY_LIMIT } = env;

const app = express();

if (TRUST_PROXY) {
  app.set('trust proxy', Number.isNaN(Number(TRUST_PROXY)) ? TRUST_PROXY : Number(TRUST_PROXY));
}

app.use(requestLogger);

// apply rate limiting to all requests
app.use(limiter);

// security middlewares
const allowedOrigins = ALLOWED_ORIGINS;

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// set security-related HTTP headers
app.use(helmet());

// gzip compress all responses above 1kb
app.use(compression());

// body parsing middlewares
app.use(express.json({ limit: JSON_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: URLENCODED_BODY_LIMIT }));
app.use(cookieParser());

app.use(docsRouter);
app.use(healthRouter);
app.use('/scan', scanRouter);
app.use('/api/v1', apiRouter);

// catch any route that didn't match above and forward a structured 404
app.use((req, res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found.`, 404, 'ROUTE_NOT_FOUND'));
});

// global error handling middleware
app.use(errorHandler);

export default app;
