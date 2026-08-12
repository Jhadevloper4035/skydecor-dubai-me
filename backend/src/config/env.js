import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const mode = process.env.NODE_ENV ?? 'development';
dotenv.config({ path: path.resolve(rootDir, `.env.${mode}`), debug: false });

const parsePort = (value, fallback) => {
  const port = parseInt(value, 10) || fallback;

  if (port < 1 || port > 65535) {
    throw new Error(`PORT must be a valid port number between 1 and 65535. Received: ${value}`);
  }

  return port;
};

const parsePositiveInt = (value, fallback) => {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const parseByteSize = (value, fallback) => {
  if (!value) return fallback;

  const match = String(value)
    .trim()
    .match(/^(\d+)(b|kb|mb)?$/i);

  if (!match) return fallback;

  const amount = Number(match[1]);
  const unit = (match[2] || 'b').toLowerCase();
  const multipliers = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
  };

  return amount * multipliers[unit];
};

const parseBoolean = (value, fallback) => {
  if (value === undefined || value === null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const parseAllowedOrigins = () =>
  process.env.ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const parseList = (value) =>
  value
    ?.split(',')
    .map((item) => item.trim())
    .filter(Boolean) ?? [];

const configs = {
  development: {
    NODE_ENV: 'development',
    PORT: parsePort(process.env.PORT, 8000),
    MONGO_URI: process.env.MONGO_URI,
    ALLOWED_ORIGINS: parseAllowedOrigins(),
    TRUST_PROXY: process.env.TRUST_PROXY,
    DNS_SERVERS: parseList(process.env.DNS_SERVERS),
    DB_MIN_POOL_SIZE: parsePositiveInt(process.env.DB_MIN_POOL_SIZE, 2),
    DB_MAX_POOL_SIZE: parsePositiveInt(process.env.DB_MAX_POOL_SIZE, 10),
    DB_SERVER_SELECTION_TIMEOUT_MS: parsePositiveInt(
      process.env.DB_SERVER_SELECTION_TIMEOUT_MS,
      10000,
    ),
    DB_SOCKET_TIMEOUT_MS: parsePositiveInt(process.env.DB_SOCKET_TIMEOUT_MS, 45000),
    DB_HEARTBEAT_FREQUENCY_MS: parsePositiveInt(process.env.DB_HEARTBEAT_FREQUENCY_MS, 10000),
    DB_MAX_IDLE_TIME_MS: parsePositiveInt(process.env.DB_MAX_IDLE_TIME_MS, 0),
    DB_AUTO_INDEX: parseBoolean(process.env.DB_AUTO_INDEX, true),
    JSON_BODY_LIMIT: process.env.JSON_BODY_LIMIT ?? '1mb',
    URLENCODED_BODY_LIMIT: process.env.URLENCODED_BODY_LIMIT ?? '1mb',
    UPLOAD_MAX_IMAGE_BYTES: parseByteSize(process.env.UPLOAD_MAX_IMAGE_BYTES, 5 * 1024 * 1024),
    UPLOAD_MAX_BATCH_FILES: parsePositiveInt(process.env.UPLOAD_MAX_BATCH_FILES, 10),
    UPLOAD_ALLOW_SVG: parseBoolean(process.env.UPLOAD_ALLOW_SVG, false),
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
    REDIS_URL: process.env.REDIS_URL,
    QR_CODE_CACHE_TTL_SECONDS: parsePositiveInt(process.env.QR_CODE_CACHE_TTL_SECONDS, 300),
    BOOTSTRAP_SUPERADMIN_NAME: process.env.BOOTSTRAP_SUPERADMIN_NAME,
    BOOTSTRAP_SUPERADMIN_EMAIL: process.env.BOOTSTRAP_SUPERADMIN_EMAIL,
    BOOTSTRAP_SUPERADMIN_PASSWORD: process.env.BOOTSTRAP_SUPERADMIN_PASSWORD,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_PUBLIC_BASE_URL: process.env.S3_PUBLIC_BASE_URL,
    S3_KEY_PREFIX: process.env.S3_KEY_PREFIX ?? 'uploads/images',
    S3_PRESIGNED_EXPIRES_SECONDS: parsePositiveInt(process.env.S3_PRESIGNED_EXPIRES_SECONDS, 300),
  },
  production: {
    NODE_ENV: 'production',
    PORT: parsePort(process.env.PORT, 8080),
    MONGO_URI: process.env.MONGO_URI,
    ALLOWED_ORIGINS: parseAllowedOrigins(),
    TRUST_PROXY: process.env.TRUST_PROXY ?? '1',
    DNS_SERVERS: parseList(process.env.DNS_SERVERS),
    DB_MIN_POOL_SIZE: parsePositiveInt(process.env.DB_MIN_POOL_SIZE, 2),
    DB_MAX_POOL_SIZE: parsePositiveInt(process.env.DB_MAX_POOL_SIZE, 20),
    DB_SERVER_SELECTION_TIMEOUT_MS: parsePositiveInt(
      process.env.DB_SERVER_SELECTION_TIMEOUT_MS,
      10000,
    ),
    DB_SOCKET_TIMEOUT_MS: parsePositiveInt(process.env.DB_SOCKET_TIMEOUT_MS, 45000),
    DB_HEARTBEAT_FREQUENCY_MS: parsePositiveInt(process.env.DB_HEARTBEAT_FREQUENCY_MS, 10000),
    DB_MAX_IDLE_TIME_MS: parsePositiveInt(process.env.DB_MAX_IDLE_TIME_MS, 30000),
    DB_AUTO_INDEX: parseBoolean(process.env.DB_AUTO_INDEX, false),
    JSON_BODY_LIMIT: process.env.JSON_BODY_LIMIT ?? '1mb',
    URLENCODED_BODY_LIMIT: process.env.URLENCODED_BODY_LIMIT ?? '1mb',
    UPLOAD_MAX_IMAGE_BYTES: parseByteSize(process.env.UPLOAD_MAX_IMAGE_BYTES, 5 * 1024 * 1024),
    UPLOAD_MAX_BATCH_FILES: parsePositiveInt(process.env.UPLOAD_MAX_BATCH_FILES, 10),
    UPLOAD_ALLOW_SVG: parseBoolean(process.env.UPLOAD_ALLOW_SVG, false),
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
    REDIS_URL: process.env.REDIS_URL,
    QR_CODE_CACHE_TTL_SECONDS: parsePositiveInt(process.env.QR_CODE_CACHE_TTL_SECONDS, 300),
    BOOTSTRAP_SUPERADMIN_NAME: process.env.BOOTSTRAP_SUPERADMIN_NAME,
    BOOTSTRAP_SUPERADMIN_EMAIL: process.env.BOOTSTRAP_SUPERADMIN_EMAIL,
    BOOTSTRAP_SUPERADMIN_PASSWORD: process.env.BOOTSTRAP_SUPERADMIN_PASSWORD,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_PUBLIC_BASE_URL: process.env.S3_PUBLIC_BASE_URL,
    S3_KEY_PREFIX: process.env.S3_KEY_PREFIX ?? 'uploads/images',
    S3_PRESIGNED_EXPIRES_SECONDS: parsePositiveInt(process.env.S3_PRESIGNED_EXPIRES_SECONDS, 300),
  },
  test: {
    NODE_ENV: 'test',
    PORT: parsePort(process.env.PORT, 4000),
    MONGO_URI: process.env.MONGO_URI,
    ALLOWED_ORIGINS: parseAllowedOrigins(),
    TRUST_PROXY: process.env.TRUST_PROXY,
    DNS_SERVERS: parseList(process.env.DNS_SERVERS),
    DB_MIN_POOL_SIZE: parsePositiveInt(process.env.DB_MIN_POOL_SIZE, 1),
    DB_MAX_POOL_SIZE: parsePositiveInt(process.env.DB_MAX_POOL_SIZE, 5),
    DB_SERVER_SELECTION_TIMEOUT_MS: parsePositiveInt(
      process.env.DB_SERVER_SELECTION_TIMEOUT_MS,
      5000,
    ),
    DB_SOCKET_TIMEOUT_MS: parsePositiveInt(process.env.DB_SOCKET_TIMEOUT_MS, 10000),
    DB_HEARTBEAT_FREQUENCY_MS: parsePositiveInt(process.env.DB_HEARTBEAT_FREQUENCY_MS, 5000),
    DB_MAX_IDLE_TIME_MS: parsePositiveInt(process.env.DB_MAX_IDLE_TIME_MS, 0),
    DB_AUTO_INDEX: parseBoolean(process.env.DB_AUTO_INDEX, true),
    JSON_BODY_LIMIT: process.env.JSON_BODY_LIMIT ?? '256kb',
    URLENCODED_BODY_LIMIT: process.env.URLENCODED_BODY_LIMIT ?? '256kb',
    UPLOAD_MAX_IMAGE_BYTES: parseByteSize(process.env.UPLOAD_MAX_IMAGE_BYTES, 5 * 1024 * 1024),
    UPLOAD_MAX_BATCH_FILES: parsePositiveInt(process.env.UPLOAD_MAX_BATCH_FILES, 10),
    UPLOAD_ALLOW_SVG: parseBoolean(process.env.UPLOAD_ALLOW_SVG, false),
    JWT_SECRET: process.env.JWT_SECRET ?? 'test-jwt-secret',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1h',
    REDIS_URL: process.env.REDIS_URL,
    QR_CODE_CACHE_TTL_SECONDS: parsePositiveInt(process.env.QR_CODE_CACHE_TTL_SECONDS, 60),
    BOOTSTRAP_SUPERADMIN_NAME: process.env.BOOTSTRAP_SUPERADMIN_NAME,
    BOOTSTRAP_SUPERADMIN_EMAIL: process.env.BOOTSTRAP_SUPERADMIN_EMAIL,
    BOOTSTRAP_SUPERADMIN_PASSWORD: process.env.BOOTSTRAP_SUPERADMIN_PASSWORD,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_PUBLIC_BASE_URL: process.env.S3_PUBLIC_BASE_URL,
    S3_KEY_PREFIX: process.env.S3_KEY_PREFIX ?? 'uploads/images',
    S3_PRESIGNED_EXPIRES_SECONDS: parsePositiveInt(process.env.S3_PRESIGNED_EXPIRES_SECONDS, 300),
  },
};

const env = configs[mode];
const allowedModes = Object.keys(configs).join(', ');

if (!env) {
  throw new Error(`Invalid NODE_ENV "${mode}". Expected one of: ${allowedModes}.`);
}

if (!env.MONGO_URI) {
  throw new Error('MONGO_URI environment variable is required.');
}

if (env.NODE_ENV === 'production' && env.ALLOWED_ORIGINS.length === 0) {
  throw new Error('ALLOWED_ORIGINS must contain at least one origin in production.');
}

if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET environment variable is required and must be at least 32 characters.',
  );
}

export default env;
