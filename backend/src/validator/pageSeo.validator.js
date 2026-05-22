import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const slugParam = () => param('slug').trim().notEmpty().withMessage('is required');
const robots = ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'];
const status = ['active', 'inactive'];

const seoValidators = [
  body('metaKeywords').optional().isArray().withMessage('must be an array'),
  body('metaKeywords.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('canonicalUrl').optional().trim().isURL().withMessage('must be a URL'),
  body('ogTitle').optional().trim().isLength({ max: 70 }).withMessage('must be at most 70 chars'),
  body('ogDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('ogImage').optional().trim().isURL().withMessage('must be a URL'),
  body('twitterTitle')
    .optional()
    .trim()
    .isLength({ max: 70 })
    .withMessage('must be at most 70 chars'),
  body('twitterDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('twitterImage').optional().trim().isURL().withMessage('must be a URL'),
  body('robots').optional().isIn(robots).withMessage('has invalid value'),
  body('status').optional().isIn(status).withMessage('must be active or inactive'),
];

export const createPageSeoValidator = [
  body('pageName').trim().notEmpty().withMessage('is required'),
  body('pageSlug').trim().notEmpty().withMessage('is required'),
  body('metaTitle').trim().notEmpty().withMessage('is required').isLength({ max: 70 }),
  body('metaDescription')
    .trim()
    .notEmpty()
    .withMessage('is required')
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  ...seoValidators,
];

export const updatePageSeoValidator = [
  body('pageName').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('pageSlug').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('metaTitle').optional().trim().notEmpty().isLength({ max: 70 }),
  body('metaDescription')
    .optional()
    .trim()
    .notEmpty()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  ...seoValidators,
];

export const listPageSeosValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(status),
  query('search').optional().trim().notEmpty(),
];

export const pageSeoIdValidator = [objectIdParam()];
export const pageSeoSlugValidator = [slugParam()];
