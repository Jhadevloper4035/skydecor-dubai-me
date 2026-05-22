import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const productStatuses = ['active', 'inactive'];

const productCodeRule = (field, optional = false) => {
  const chain = body(field);
  if (optional) chain.optional();
  return chain
    .trim()
    .notEmpty()
    .withMessage(optional ? 'cannot be empty' : 'is required')
    .matches(/^[A-Za-z0-9\s-]+$/)
    .withMessage('must contain only letters, numbers, spaces, and hyphens');
};

const requiredString = (field, label, max = 100) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} is required`)
    .isLength({ max })
    .withMessage(`${label} must be less than ${max} characters`);

const optionalString = (field, label, max = 100) =>
  body(field)
    .optional()
    .trim()
    .notEmpty()
    .withMessage(`${label} cannot be empty`)
    .isLength({ max })
    .withMessage(`${label} must be less than ${max} characters`);

const nullableString = (field, label, max = 100) =>
  body(field)
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max })
    .withMessage(`${label} must be less than ${max} characters`);

const optionalUrl = (field, label) =>
  body(field)
    .optional()
    .trim()
    .isURL({ require_protocol: true })
    .withMessage(`${label} must be a URL`);

const requiredUrl = (field, label) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} is required`)
    .isURL({ require_protocol: true })
    .withMessage(`${label} must be a URL`);

const imageValidator = (optional = false) => {
  const chain = body('image');
  if (optional) chain.optional();
  return chain
    .customSanitizer((value) => {
      if (Array.isArray(value)) return value;
      if (typeof value === 'string' && value.trim()) return [value.trim()];
      return [];
    })
    .isArray({ min: optional ? 0 : 1 })
    .withMessage('Image must be an array with at least one URL');
};

const imageUrlValidator = () =>
  body('image.*')
    .optional()
    .trim()
    .isURL({ require_protocol: true })
    .withMessage('Image must be a URL');

export const createProductValidator = [
  body('id').optional().isInt({ min: 1 }).withMessage('id must be a positive integer'),
  productCodeRule('productCode'),
  requiredString('productType', 'Product type', 100),
  requiredString('productName', 'Product name', 100).isLength({ min: 2 }),
  body('designName')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Design name must be less than 100 characters'),
  requiredString('category', 'Category', 50),
  requiredString('subCategory', 'Sub-category', 50).isLength({ min: 2 }),
  nullableString('textureCode', 'Texture code', 50),
  nullableString('texture', 'Texture name', 50),
  requiredString('size', 'Size', 50),
  requiredString('thickness', 'Thickness', 50),
  requiredString('width', 'Width', 50),
  imageValidator(),
  imageUrlValidator(),
  requiredUrl('pdfUrlPath', 'PDF URL'),
  body('status').optional().isIn(productStatuses).withMessage('status must be active or inactive'),
  body('isActive').optional().isBoolean().withMessage('isActive must be true or false'),
];

export const updateProductValidator = [
  body('id').optional().isInt({ min: 1 }).withMessage('id must be a positive integer'),
  productCodeRule('productCode', true),
  optionalString('productType', 'Product type', 100),
  optionalString('productName', 'Product name', 100).isLength({ min: 2 }),
  body('designName')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Design name must be less than 100 characters'),
  optionalString('category', 'Category', 50),
  optionalString('subCategory', 'Sub-category', 50).isLength({ min: 2 }),
  nullableString('textureCode', 'Texture code', 50),
  nullableString('texture', 'Texture name', 50),
  optionalString('size', 'Size', 50),
  optionalString('thickness', 'Thickness', 50),
  optionalString('width', 'Width', 50),
  imageValidator(true),
  imageUrlValidator(),
  optionalUrl('pdfUrlPath', 'PDF URL'),
  body('status').optional().isIn(productStatuses).withMessage('status must be active or inactive'),
  body('isActive').optional().isBoolean().withMessage('isActive must be true or false'),
];

export const listProductsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('query').optional().trim().notEmpty(),
  query('productType').optional().trim().notEmpty(),
  query('category').optional().trim().notEmpty(),
  query('subCategory').optional().trim().notEmpty(),
  query('texture').optional().trim().notEmpty(),
  query('textureCode').optional().trim().notEmpty(),
  query('size').optional().trim().notEmpty(),
  query('thickness').optional().trim().notEmpty(),
  query('width').optional().trim().notEmpty(),
  query('productCode').optional().trim().notEmpty(),
  query('status').optional().isIn(productStatuses).withMessage('must be active or inactive'),
  query('isActive').optional().isBoolean().withMessage('must be true or false'),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'productName', 'productCode', 'category', 'productType'])
    .withMessage('is not a supported sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('must be asc or desc'),
];

export const productFilterOptionsValidator = [
  query('productType').optional().trim().notEmpty(),
  query('category').optional().trim().notEmpty(),
  query('subCategory').optional().trim().notEmpty(),
  query('texture').optional().trim().notEmpty(),
];

export const autocompleteProductsValidator = [
  query('query').trim().isLength({ min: 2 }).withMessage('must be at least 2 characters'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('must be between 1 and 50'),
];

export const productIdValidator = [objectIdParam()];
export const productLookupValidator = [
  param('slugOrId').trim().notEmpty().withMessage('is required'),
];
