import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const sources = ['website', 'whatsapp', 'phone', 'email', 'admin'];
const statuses = ['new', 'contacted', 'in_progress', 'closed', 'cancelled'];

export const createEnquiryValidator = [
  body('name').trim().notEmpty().withMessage('is required'),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('phone').trim().notEmpty().withMessage('is required'),
  body('subject').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('service').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('message').trim().notEmpty().withMessage('is required'),
  body('source').optional().isIn(sources).withMessage('has invalid value'),
  body('status').optional().isIn(statuses).withMessage('has invalid value'),
  body('assignedTo').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('notes').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const updateEnquiryValidator = [
  body('name').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('email').optional().trim().isEmail().withMessage('must be a valid email'),
  body('phone').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('subject').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('service').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('message').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('source').optional().isIn(sources).withMessage('has invalid value'),
  body('status').optional().isIn(statuses).withMessage('has invalid value'),
  body('assignedTo').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('notes').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const listEnquiriesValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(statuses),
  query('service').optional().trim().notEmpty(),
  query('email').optional().trim().isEmail().withMessage('must be a valid email'),
  query('search').optional().trim().notEmpty(),
];

export const enquiryIdValidator = [objectIdParam()];
