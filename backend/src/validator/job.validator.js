import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const slugParam = () => param('slug').trim().notEmpty().withMessage('is required');
const jobStatuses = ['draft', 'open', 'closed'];
const employmentTypes = ['full-time', 'part-time', 'contract', 'internship'];

const stringArray = (field) =>
  body(field).optional().isArray().withMessage('must be an array').bail();

export const createJobValidator = [
  body('title').trim().notEmpty().withMessage('is required'),
  body('slug').trim().notEmpty().withMessage('is required'),
  body('department').trim().notEmpty().withMessage('is required'),
  body('location').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('employmentType').optional().isIn(employmentTypes).withMessage('has invalid value'),
  body('experienceLevel').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('summary').trim().notEmpty().isLength({ max: 360 }).withMessage('must be at most 360 chars'),
  body('description').trim().notEmpty().withMessage('is required'),
  stringArray('responsibilities'),
  body('responsibilities.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('requirements'),
  body('requirements.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('benefits'),
  body('benefits.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('status').optional().isIn(jobStatuses).withMessage('has invalid value'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  body('publishedAt').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
];

export const updateJobValidator = [
  body('title').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('slug').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('department').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('location').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('employmentType').optional().isIn(employmentTypes).withMessage('has invalid value'),
  body('experienceLevel').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('summary').optional().trim().notEmpty().isLength({ max: 360 }).withMessage('must be at most 360 chars'),
  body('description').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('responsibilities'),
  body('responsibilities.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('requirements'),
  body('requirements.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  stringArray('benefits'),
  body('benefits.*').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('status').optional().isIn(jobStatuses).withMessage('has invalid value'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  body('publishedAt').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
];

export const listJobsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('department').optional().trim().notEmpty(),
  query('employmentType').optional().isIn(employmentTypes).withMessage('has invalid value'),
  query('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  query('search').optional().trim().notEmpty(),
];

export const jobIdValidator = [objectIdParam()];
export const jobSlugValidator = [slugParam()];
