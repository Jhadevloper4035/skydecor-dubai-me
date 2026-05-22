import { body } from 'express-validator';
import path from 'path';

import env from '../config/env.js';
import { imageContentTypes, imageExtensionsByContentType } from '../utils/uploadConstraints.js';

const allowedImageTypes = env.UPLOAD_ALLOW_SVG
  ? imageContentTypes
  : imageContentTypes.filter((contentType) => contentType !== 'image/svg+xml');

const fileNameValidator = (field) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage('is required')
    .isLength({ max: 180 })
    .withMessage('must be 180 characters or less')
    .matches(/^[^/\\]+$/)
    .withMessage('must be a file name, not a path')
    .matches(/^[a-zA-Z0-9][a-zA-Z0-9._ -]*$/)
    .withMessage('can only contain letters, numbers, spaces, dots, underscores, and dashes');

const contentTypeValidator = (field) =>
  body(field).isIn(allowedImageTypes).withMessage('must be a supported image MIME type');

const fileSizeValidator = (field) =>
  body(field)
    .isInt({ min: 1, max: env.UPLOAD_MAX_IMAGE_BYTES })
    .withMessage(`must be between 1 byte and ${env.UPLOAD_MAX_IMAGE_BYTES} bytes`);

const extensionMatchesContentTypeValidator = (fileNameField, contentTypeField) =>
  body(fileNameField).custom((fileName, { req, path: fieldPath }) => {
    const contentTypePath = fieldPath.replace(/fileName$/, 'contentType');
    const contentType =
      contentTypeField === 'contentType'
        ? req.body.contentType
        : contentTypePath
            .split('.')
            .reduce((value, key) => (value === undefined ? undefined : value[key]), req.body);
    const extension = path.extname(fileName).toLowerCase();
    const allowedExtensions = imageExtensionsByContentType[contentType] || [];

    if (!extension || !allowedExtensions.includes(extension)) {
      throw new Error(`extension must match ${contentType}`);
    }

    return true;
  });

const folderValidator = (field) =>
  body(field)
    .optional()
    .trim()
    .matches(/^[a-zA-Z0-9/_-]+$/)
    .withMessage('can only contain letters, numbers, slash, underscore, and dash');

export const singleImagePresignedUrlValidator = [
  fileNameValidator('fileName'),
  contentTypeValidator('contentType'),
  fileSizeValidator('fileSize'),
  extensionMatchesContentTypeValidator('fileName', 'contentType'),
  folderValidator('folder'),
];

export const multipleImagePresignedUrlsValidator = [
  body('files')
    .isArray({ min: 1, max: env.UPLOAD_MAX_BATCH_FILES })
    .withMessage(`must contain 1 to ${env.UPLOAD_MAX_BATCH_FILES} files`),
  fileNameValidator('files.*.fileName'),
  contentTypeValidator('files.*.contentType'),
  fileSizeValidator('files.*.fileSize'),
  extensionMatchesContentTypeValidator('files.*.fileName', 'files.*.contentType'),
  folderValidator('folder'),
  folderValidator('files.*.folder'),
];
