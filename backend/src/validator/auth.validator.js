import { body, param } from 'express-validator';

export const loginAdminValidator = [
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('password').isString().notEmpty().withMessage('is required'),
];

export const createAdminValidator = [
  body('name').trim().notEmpty().withMessage('is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 characters'),
  body('role').optional().isIn(['admin', 'superadmin']).withMessage('must be admin or superadmin'),
  body('isActive').optional().isBoolean().withMessage('must be true or false'),
];

export const updateAdminValidator = [
  body('name').optional().trim().notEmpty().withMessage('cannot be empty').isLength({ max: 100 }),
  body('email').optional().trim().isEmail().withMessage('must be a valid email'),
  body('password').optional().isLength({ min: 8 }).withMessage('must be at least 8 characters'),
  body('role').optional().isIn(['admin', 'superadmin']).withMessage('must be admin or superadmin'),
  body('isActive').optional().isBoolean().withMessage('must be true or false'),
];

export const adminIdValidator = [
  param('id').isMongoId().withMessage('must be a valid MongoDB ObjectId'),
];
