import { body, query } from 'express-validator';

const statuses = ['subscribed', 'unsubscribed'];
const sources = ['footer', 'website', 'admin'];

export const createNewsletterSubscriberValidator = [
  body('email').trim().isEmail().withMessage('must be a valid email'),
  body('source').optional().isIn(sources).withMessage('has invalid value'),
];

export const listNewsletterSubscribersValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('must be between 1 and 100'),
  query('status').optional().isIn(statuses).withMessage('has invalid value'),
  query('email').optional().trim().isEmail().withMessage('must be a valid email'),
];
