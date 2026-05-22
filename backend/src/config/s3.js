import { S3Client } from '@aws-sdk/client-s3';

import env from './env.js';

const credentials =
  env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined;

export const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials,
});

export const getS3Config = () => ({
  bucket: env.S3_BUCKET,
  region: env.AWS_REGION,
  publicBaseUrl: env.S3_PUBLIC_BASE_URL,
  keyPrefix: env.S3_KEY_PREFIX,
  expiresIn: env.S3_PRESIGNED_EXPIRES_SECONDS,
});
