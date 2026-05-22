import winston from 'winston';

const { combine, errors, json, printf, splat, timestamp, colorize } = winston.format;

const environment = process.env.NODE_ENV ?? 'development';
const isProduction = environment === 'production';

const serializeError = (err) => ({
  name: err.name,
  message: err.message,
  stack: err.stack,
  code: err.code,
  statusCode: err.statusCode,
});

const errorMetaFormat = winston.format((info) => {
  if (info.err instanceof Error) {
    info.err = serializeError(info.err);
  }

  return info;
});

const devFormat = printf(({ timestamp: time, level, message, stack, ...meta }) => {
  const metaOutput = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `${time} ${level}: ${stack || message}${metaOutput}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
  defaultMeta: {
    service: 'skydecor-api',
    environment,
  },
  format: combine(
    errors({ stack: true }),
    errorMetaFormat(),
    splat(),
    timestamp(),
    isProduction ? json() : combine(colorize(), devFormat),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
