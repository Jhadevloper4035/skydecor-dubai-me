import env from '../config/env.js';
import logger from '../utils/logger.js';

const { NODE_ENV } = env;

//logger.debug('Error handler initialized', { environment: NODE_ENV });

const errorHandler = (err, req, res, _next) => {
  err.statusCode = err.statusCode || err.status || 500;
  err.status = err.status || 'error';

  const logMeta = {
    requestId: req.id,
    method: req.method,
    path: req.originalUrl,
    statusCode: err.statusCode,
    code: err.code || null,
    err,
  };

  if (err.statusCode >= 500) {
    logger.error('Request failed', logMeta);
  } else {
    logger.warn('Request rejected', logMeta);
  }

  if (NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.code || null,
      message: err.message,
      requestId: req.id,
      stack: err.stack,
      error: err,
    });
  }

  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      status: 'fail',
      code: 'PAYLOAD_TOO_LARGE',
      message: 'Request body is too large.',
      requestId: req.id,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      code: err.code || null,
      message: err.message,
      requestId: req.id,
    });
  }

  // unknown error — log internally, never expose details to client
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong. Please try again later.',
    requestId: req.id,
  });
};

export default errorHandler;
