import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const statuses = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

export const createJobApplicationValidator = [
  body('jobSlug').trim().notEmpty().withMessage('is required'),
  body('fullName').trim().notEmpty().withMessage('is required'),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('phone').trim().notEmpty().withMessage('is required'),
  body('currentCompany').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('portfolioUrl').optional().trim().isURL().withMessage('must be a URL'),
  body('resumeUrl').optional().trim().isURL().withMessage('must be a URL'),
  body('message').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const updateJobApplicationValidator = [
  body('status').optional().isIn(statuses).withMessage('has invalid value'),
  body('notes').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const listJobApplicationsValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(statuses).withMessage('has invalid value'),
  query('jobSlug').optional().trim().notEmpty(),
  query('email').optional().trim().isEmail().withMessage('must be a valid email'),
  query('search').optional().trim().notEmpty(),
];

export const jobApplicationIdValidator = [objectIdParam()];
