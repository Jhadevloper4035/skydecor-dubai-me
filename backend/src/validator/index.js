import { validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

// Drop this after your validation rules on any route.
// Collects all errors and sends one 400 AppError to the central error handler.

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => `${e.path}: ${e.msg}`);
    return next(new AppError(messages.join(', '), 400, 'VALIDATION_ERROR'));
  }
  next();
};
