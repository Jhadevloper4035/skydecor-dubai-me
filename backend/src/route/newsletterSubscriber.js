import { Router } from 'express';

import {
  createNewsletterSubscriber,
  getNewsletterSubscribers,
} from '../controller/newsletterSubscriber.controller.js';
import { validate } from '../validator/index.js';
import {
  createNewsletterSubscriberValidator,
  listNewsletterSubscribersValidator,
} from '../validator/newsletterSubscriber.validator.js';
const router = Router();
router
  .route('/')
  .get(listNewsletterSubscribersValidator, validate, getNewsletterSubscribers)
  .post(createNewsletterSubscriberValidator, validate, createNewsletterSubscriber);
export default router;
