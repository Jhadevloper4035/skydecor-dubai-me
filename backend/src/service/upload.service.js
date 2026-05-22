import crypto from 'crypto';
import path from 'path';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { getS3Config, s3 } from '../config/s3.js';
import AppError from '../utils/appError.js';
import env from '../config/env.js';
import { imageContentTypes, imageExtensionsByContentType } from '../utils/uploadConstraints.js';

const allowedImageTypes = new Set(
  env.UPLOAD_ALLOW_SVG
    ? imageContentTypes
    : imageContentTypes.filter((contentType) => contentType !== 'image/svg+xml'),
);

const sanitizePathSegment = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]/g, '-')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter((part) => part && part !== '.' && part !== '..')
    .join('/');

const sanitizeFileName = (fileName) =>
  path
    .basename(fileName)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '-')
    .replace(/-+/g, '-');

const getPublicUrl = ({ bucket, key, publicBaseUrl, region }) => {
  const encodedKey = key
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

  if (publicBaseUrl) {
    return `${publicBaseUrl.replace(/\/$/, '')}/${encodedKey}`;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const assertS3Ready = ({ bucket, region }) => {
  if (!bucket || !region) {
    throw new AppError(
      'S3 is not configured. Set AWS_REGION and S3_BUCKET.',
      500,
      'S3_NOT_CONFIGURED',
    );
  }
};

const buildObjectKey = ({ fileName, contentType, folder, keyPrefix }) => {
  const cleanPrefix = sanitizePathSegment(keyPrefix);
  const cleanFolder = sanitizePathSegment(folder);
  const cleanName = sanitizeFileName(fileName);
  const parsed = path.parse(cleanName);
  const extension = parsed.ext || imageExtensionsByContentType[contentType]?.[0] || '';
  const baseName = parsed.name || 'image';
  const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${baseName}${extension}`;

  return [cleanPrefix, cleanFolder, uniqueName].filter(Boolean).join('/');
};

const assertImageUploadAllowed = ({ fileName, contentType, fileSize }) => {
  if (!allowedImageTypes.has(contentType)) {
    throw new AppError('Only image uploads are allowed.', 400, 'INVALID_IMAGE_TYPE');
  }

  if (!Number.isInteger(Number(fileSize)) || Number(fileSize) < 1) {
    throw new AppError('Image file size is required.', 400, 'IMAGE_SIZE_REQUIRED');
  }

  if (Number(fileSize) > env.UPLOAD_MAX_IMAGE_BYTES) {
    throw new AppError('Image file size exceeds the upload limit.', 400, 'IMAGE_TOO_LARGE');
  }

  const extension = path.extname(fileName).toLowerCase();
  const allowedExtensions = imageExtensionsByContentType[contentType] || [];

  if (!allowedExtensions.includes(extension)) {
    throw new AppError(
      'File extension does not match image type.',
      400,
      'IMAGE_EXTENSION_MISMATCH',
    );
  }
};

export const createImagePresignedUrl = async ({ fileName, contentType, fileSize, folder }) => {
  assertImageUploadAllowed({ fileName, contentType, fileSize });

  const s3Config = getS3Config();
  assertS3Ready(s3Config);

  const key = buildObjectKey({
    fileName,
    contentType,
    folder,
    keyPrefix: s3Config.keyPrefix,
  });

  const command = new PutObjectCommand({
    Bucket: s3Config.bucket,
    Key: key,
    ContentType: contentType,
    ContentLength: Number(fileSize),
    CacheControl: 'public, max-age=31536000, immutable',
  });

  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: s3Config.expiresIn,
  });

  return {
    key,
    uploadUrl,
    url: getPublicUrl({ ...s3Config, key }),
    method: 'PUT',
    expiresIn: s3Config.expiresIn,
    maxFileSize: env.UPLOAD_MAX_IMAGE_BYTES,
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(fileSize),
    },
  };
};

export const createMultipleImagePresignedUrls = (files, fallbackFolder) =>
  Promise.all(
    files.map((file) =>
      createImagePresignedUrl({
        ...file,
        folder: file.folder ?? fallbackFolder,
      }),
    ),
  );
