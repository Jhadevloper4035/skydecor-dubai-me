import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const slugParam = () => param('slug').trim().notEmpty().withMessage('is required');
const stringArray = (field) =>
  body(field).optional().isArray().withMessage('must be an array').bail();

const blogStatus = ['draft', 'published', 'archived'];

export const createBlogValidator = [
  body('title').trim().notEmpty().withMessage('is required'),
  body('slug').trim().notEmpty().withMessage('is required'),
  body('excerpt').optional().trim().isLength({ max: 300 }).withMessage('must be at most 300 chars'),
  body('content').trim().notEmpty().withMessage('is required'),
  body('coverImage').optional().trim().isURL().withMessage('must be a URL'),
  body('authorName').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('categories'),
  body('categories.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('tags'),
  body('tags.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('metaTitle').optional().trim().isLength({ max: 70 }).withMessage('must be at most 70 chars'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('status').optional().isIn(blogStatus).withMessage('must be draft, published, or archived'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  body('publishedAt').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
];

export const updateBlogValidator = [
  body('title').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('slug').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('excerpt').optional().trim().isLength({ max: 300 }).withMessage('must be at most 300 chars'),
  body('content').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('coverImage').optional().trim().isURL().withMessage('must be a URL'),
  body('authorName').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('categories'),
  body('categories.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('tags'),
  body('tags.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('metaTitle').optional().trim().isLength({ max: 70 }).withMessage('must be at most 70 chars'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('status').optional().isIn(blogStatus).withMessage('must be draft, published, or archived'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  body('publishedAt').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
];

export const listBlogsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(blogStatus),
  query('category').optional().trim().notEmpty(),
  query('tag').optional().trim().notEmpty(),
  query('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  query('search').optional().trim().notEmpty(),
];

export const blogIdValidator = [objectIdParam()];
export const blogSlugValidator = [slugParam()];
