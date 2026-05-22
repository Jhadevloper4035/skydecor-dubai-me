import { createClient } from 'redis';

import env from './env.js';
import logger from '../utils/logger.js';

const { REDIS_URL } = env;

let client;
let connectPromise;
let listenersRegistered = false;

const registerRedisListeners = (redisClient) => {
  if (listenersRegistered) return;
  listenersRegistered = true;

  redisClient.on('connect', () => {
    logger.info('Redis connection established');
  });

  redisClient.on('ready', () => {
    logger.info('Redis cache ready');
  });

  redisClient.on('reconnecting', () => {
    logger.warn('Redis cache reconnecting');
  });

  redisClient.on('end', () => {
    logger.warn('Redis connection closed');
  });

  redisClient.on('error', (err) => {
    logger.error('Redis connection error', { err });
  });
};

export const connectRedis = async () => {
  if (!REDIS_URL) {
    logger.info('Redis cache disabled. Set REDIS_URL to enable QR-code scan caching.');
    return null;
  }

  if (client?.isOpen) return client;
  if (connectPromise) return connectPromise;

  client = createClient({ url: REDIS_URL });
  registerRedisListeners(client);

  connectPromise = client
    .connect()
    .then(() => client)
    .catch((err) => {
      logger.error('Failed to connect Redis cache. Continuing without cache.', { err });
      return null;
    })
    .finally(() => {
      connectPromise = null;
    });

  return connectPromise;
};

export const getRedisClient = () => {
  if (!client?.isReady) return null;
  return client;
};

export const closeRedis = async () => {
  if (!client?.isOpen) return;

  await client.quit();
  logger.info('Redis connection closed gracefully');
};

export default connectRedis;
