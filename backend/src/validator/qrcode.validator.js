import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');

const statusValidator = () =>
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'expired'])
    .withMessage('must be active, inactive, or expired');

export const createQRCodeValidator = [
  body('id').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  body('productCode').trim().notEmpty().withMessage('is required'),
  body('productName').trim().notEmpty().withMessage('is required'),
  body('category').trim().notEmpty().withMessage('is required'),
  body('subcategory').trim().notEmpty().withMessage('is required'),
  body('productType').trim().notEmpty().withMessage('is required'),
  body('qrCodeImage')
    .trim()
    .notEmpty()
    .withMessage('is required')
    .isURL()
    .withMessage('must be a URL'),
  body('linkInQrCode')
    .trim()
    .notEmpty()
    .withMessage('is required')
    .isURL()
    .withMessage('must be a URL'),
  body('productPdfPath').trim().notEmpty().withMessage('is required'),
  body('productImageUrl')
    .trim()
    .notEmpty()
    .withMessage('is required')
    .isURL()
    .withMessage('must be a URL'),
  statusValidator(),
  body('expiryDate').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
  body('generatedBy').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const updateQRCodeValidator = [
  body('id').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  body('productCode').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('productName').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('category').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('subcategory').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('productType').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('qrCodeImage').optional().trim().isURL().withMessage('must be a URL'),
  body('linkInQrCode').optional().trim().isURL().withMessage('must be a URL'),
  body('productPdfPath').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('productImageUrl').optional().trim().isURL().withMessage('must be a URL'),
  statusValidator(),
  body('expiryDate').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
  body('generatedBy').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const listQRCodesValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(['active', 'inactive', 'expired']),
  query('category').optional().trim().notEmpty(),
  query('subcategory').optional().trim().notEmpty(),
  query('productType').optional().trim().notEmpty(),
  query('productCode').optional().trim().notEmpty(),
  query('search').optional().trim().notEmpty(),
];

export const scanQRCodeValidator = [
  param('productCode').trim().notEmpty().withMessage('is required'),
  param('productType').trim().notEmpty().withMessage('is required'),
  body('location').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const scanQRCodeRedirectValidator = [
  param('code').optional().trim().notEmpty().withMessage('is required'),
  param('productCode').optional().trim().notEmpty().withMessage('is required'),
  param('productType').optional().trim().notEmpty().withMessage('is required'),
];

export const qrCodeIdValidator = [objectIdParam()];
