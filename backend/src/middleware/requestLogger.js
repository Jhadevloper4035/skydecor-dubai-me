import { randomUUID } from 'crypto';

import logger from '../utils/logger.js';

const requestLogger = (req, res, next) => {
  const requestId = req.get('X-Request-Id') || randomUUID();
  const startedAt = Date.now();

  req.id = requestId;
  res.setHeader('X-Request-Id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    logger.log(level, 'HTTP request completed', {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    });
  });

  next();
};

export default requestLogger;
