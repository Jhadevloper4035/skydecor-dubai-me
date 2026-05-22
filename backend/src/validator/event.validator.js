import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const slugParam = () => param('slug').trim().notEmpty().withMessage('is required');
const eventStatus = ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'];

const locationValidators = [
  body('location').optional().isObject().withMessage('must be an object'),
  body('location.name').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('location.address').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('location.city').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('location.country').optional().trim().notEmpty().withMessage('cannot be empty'),
];

const dateOrderValidator = body('endDate')
  .optional()
  .custom((endDate, { req }) => {
    if (req.body.startDate && new Date(endDate) < new Date(req.body.startDate)) {
      throw new Error('must be after startDate');
    }
    return true;
  });

export const createEventValidator = [
  body('title').trim().notEmpty().withMessage('is required'),
  body('slug').trim().notEmpty().withMessage('is required'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('must be at most 300 chars'),
  body('description').trim().notEmpty().withMessage('is required'),
  body('startDate').isISO8601().withMessage('must be a valid ISO 8601 date'),
  body('endDate').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
  dateOrderValidator,
  ...locationValidators,
  body('images').optional().isArray().withMessage('must be an array'),
  body('images.*').optional().trim().isURL().withMessage('must be a URL'),
  body('registrationUrl').optional().trim().isURL().withMessage('must be a URL'),
  body('metaTitle').optional().trim().isLength({ max: 70 }).withMessage('must be at most 70 chars'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('status').optional().isIn(eventStatus).withMessage('has invalid value'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
];

export const updateEventValidator = [
  body('title').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('slug').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('must be at most 300 chars'),
  body('description').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('startDate').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
  body('endDate').optional().isISO8601().withMessage('must be a valid ISO 8601 date'),
  dateOrderValidator,
  ...locationValidators,
  body('images').optional().isArray().withMessage('must be an array'),
  body('images.*').optional().trim().isURL().withMessage('must be a URL'),
  body('registrationUrl').optional().trim().isURL().withMessage('must be a URL'),
  body('metaTitle').optional().trim().isLength({ max: 70 }).withMessage('must be at most 70 chars'),
  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 170 })
    .withMessage('must be at most 170 chars'),
  body('status').optional().isIn(eventStatus).withMessage('has invalid value'),
  body('isFeatured').optional().isBoolean().withMessage('must be boolean'),
];

export const listEventsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(eventStatus),
  query('isFeatured').optional().isBoolean().withMessage('must be boolean'),
  query('search').optional().trim().notEmpty(),
];

export const eventIdValidator = [objectIdParam()];
export const eventSlugValidator = [slugParam()];
