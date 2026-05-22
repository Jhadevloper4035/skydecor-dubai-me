import { body, param, query } from 'express-validator';

const objectIdParam = () => param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId');
const sources = ['website', 'whatsapp', 'phone', 'email', 'admin'];
const statuses = ['new', 'contacted', 'quoted', 'closed', 'cancelled'];

export const createProductEnquiryValidator = [
  body('productCode').trim().notEmpty().withMessage('is required'),
  body('productName').trim().notEmpty().withMessage('is required'),
  body('name').trim().notEmpty().withMessage('is required'),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('phone').trim().notEmpty().withMessage('is required'),
  body('companyName').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('must be at least 1'),
  body('message').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('source').optional().isIn(sources).withMessage('has invalid value'),
  body('status').optional().isIn(statuses).withMessage('has invalid value'),
  body('assignedTo').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('notes').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const updateProductEnquiryValidator = [
  body('productCode').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('productName').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('name').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('email').optional().trim().isEmail().withMessage('must be a valid email'),
  body('phone').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('companyName').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('must be at least 1'),
  body('message').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('source').optional().isIn(sources).withMessage('has invalid value'),
  body('status').optional().isIn(statuses).withMessage('has invalid value'),
  body('assignedTo').optional().trim().notEmpty().withMessage('cannot be empty'),
  body('notes').optional().trim().notEmpty().withMessage('cannot be empty'),
];

export const listProductEnquiriesValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(statuses),
  query('productCode').optional().trim().notEmpty(),
  query('email').optional().trim().isEmail().withMessage('must be a valid email'),
  query('search').optional().trim().notEmpty(),
];

export const productEnquiryIdValidator = [objectIdParam()];
