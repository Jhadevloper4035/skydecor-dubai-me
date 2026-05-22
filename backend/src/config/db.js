import mongoose from 'mongoose';
import dns from 'dns';
import env from './env.js';
import logger from '../utils/logger.js';

const {
  DB_AUTO_INDEX,
  DB_HEARTBEAT_FREQUENCY_MS,
  DB_MAX_POOL_SIZE,
  DB_MAX_IDLE_TIME_MS,
  DB_MIN_POOL_SIZE,
  DB_SERVER_SELECTION_TIMEOUT_MS,
  DB_SOCKET_TIMEOUT_MS,
  DNS_SERVERS,
  MONGO_URI,
  NODE_ENV,
} = env;

let listenersRegistered = false;

const registerConnectionListeners = () => {
  if (listenersRegistered) return;
  listenersRegistered = true;

  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connection established', {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    });
  });

  mongoose.connection.on('reconnected', () => {
    logger.warn('MongoDB connection re-established', {
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB connection disconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error', { err });
  });
};

const connectDB = async () => {
  const uri = MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  if (DNS_SERVERS.length > 0) {
    dns.setServers(DNS_SERVERS);
    // logger.info('Custom DNS servers configured for database resolution', {
    //   dnsServers: DNS_SERVERS,
    // });
  }

  mongoose.set('autoIndex', DB_AUTO_INDEX);
  mongoose.set('autoCreate', DB_AUTO_INDEX);
  registerConnectionListeners();

  await mongoose.connect(uri, {
    autoCreate: DB_AUTO_INDEX,
    autoIndex: DB_AUTO_INDEX,
    heartbeatFrequencyMS: DB_HEARTBEAT_FREQUENCY_MS,
    maxPoolSize: DB_MAX_POOL_SIZE,
    maxIdleTimeMS: DB_MAX_IDLE_TIME_MS,
    minPoolSize: DB_MIN_POOL_SIZE,
    serverSelectionTimeoutMS: DB_SERVER_SELECTION_TIMEOUT_MS,
    socketTimeoutMS: DB_SOCKET_TIMEOUT_MS,
  });

  logger.info('MongoDB connection pool ready', {
    autoIndex: DB_AUTO_INDEX,
    environment: NODE_ENV,
    heartbeatFrequencyMs: DB_HEARTBEAT_FREQUENCY_MS,
    maxIdleTimeMs: DB_MAX_IDLE_TIME_MS,
    maxPoolSize: DB_MAX_POOL_SIZE,
    minPoolSize: DB_MIN_POOL_SIZE,
    serverSelectionTimeoutMs: DB_SERVER_SELECTION_TIMEOUT_MS,
    socketTimeoutMs: DB_SOCKET_TIMEOUT_MS,
  });
};

export const closeDB = async () => {
  if (mongoose.connection.readyState === 0) return;

  await mongoose.connection.close(false);
  logger.info('MongoDB connection closed');
};

export default connectDB;
