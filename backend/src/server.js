import app from './index.js';
import connectDB, { closeDB } from './config/db.js';
import connectRedis, { closeRedis } from './config/redis.js';
import env from './config/env.js';
import { bootstrapSuperAdmin } from './service/bootstrapAdmin.service.js';
import logger from './utils/logger.js';

const { PORT, NODE_ENV } = env;

async function start() {
  await connectDB();
  await connectRedis();
  await bootstrapSuperAdmin();

  const server = app.listen(PORT, () => {
    logger.info('Server started', { port: PORT, environment: NODE_ENV });
  });

  let isShuttingDown = false;

  const shutdown = (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info('Shutdown signal received', { signal });

    const forceExitTimer = globalThis.setTimeout(() => {
      logger.error('Forced shutdown after timeout', { signal });
      process.exit(1);
    }, 10000);
    forceExitTimer.unref();

    server.close(async () => {
      logger.info('HTTP server closed');
      try {
        await closeDB();
        await closeRedis();
        globalThis.clearTimeout(forceExitTimer);
        process.exit(0);
      } catch (err) {
        logger.error('Failed to close MongoDB connection during shutdown', { err });
        globalThis.clearTimeout(forceExitTimer);
        process.exit(1);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled promise rejection', { err });
    shutdown('unhandledRejection');
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', { err });
    process.exit(1);
  });
}

start().catch((err) => {
  logger.error('Failed to start server', { err });
  process.exit(1);
});
