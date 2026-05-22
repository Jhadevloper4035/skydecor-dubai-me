import env from '../config/env.js';
import { getRedisClient } from '../config/redis.js';
import logger from '../utils/logger.js';

const { QR_CODE_CACHE_TTL_SECONDS } = env;
const QR_CODE_SCAN_KEY_PREFIX = 'qrcode:scan';

const normalizeProductCode = (productCode) => productCode.trim().toUpperCase();
const normalizeProductType = (productType) => productType?.trim().toLowerCase() || 'any';

export const buildQRCodeScanCacheKey = ({ productCode, productType }) =>
  `${QR_CODE_SCAN_KEY_PREFIX}:${normalizeProductType(productType)}:${normalizeProductCode(productCode)}`;

export const getCachedQRCodeScan = async ({ productCode, productType }) => {
  const redis = getRedisClient();
  if (!redis) return null;

  const cacheKey = buildQRCodeScanCacheKey({ productCode, productType });

  try {
    const cachedQRCode = await redis.get(cacheKey);
    return cachedQRCode ? JSON.parse(cachedQRCode) : null;
  } catch (err) {
    logger.warn('Failed to read QR-code scan cache', { err, cacheKey });
    return null;
  }
};

export const cacheQRCodeScan = async ({ productCode, productType, qrCode }) => {
  const redis = getRedisClient();
  if (!redis || !qrCode) return;

  const cacheKey = buildQRCodeScanCacheKey({ productCode, productType });
  const cachePayload = JSON.stringify(qrCode.toObject ? qrCode.toObject() : qrCode);

  try {
    await redis.set(cacheKey, cachePayload, {
      EX: QR_CODE_CACHE_TTL_SECONDS,
    });
  } catch (err) {
    logger.warn('Failed to write QR-code scan cache', { err, cacheKey });
  }
};

export const clearQRCodeScanCache = async () => {
  const redis = getRedisClient();
  if (!redis) return;

  try {
    const keys = [];

    for await (const key of redis.scanIterator({
      MATCH: `${QR_CODE_SCAN_KEY_PREFIX}:*`,
      COUNT: 100,
    })) {
      keys.push(key);
    }

    if (keys.length > 0) {
      await redis.unlink(keys);
    }
  } catch (err) {
    logger.warn('Failed to clear QR-code scan cache', { err });
  }
};
