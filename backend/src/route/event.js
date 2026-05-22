import { Router } from 'express';

import {
  createEvent,
  createEventImagePresignedUrl,
  createEventImagesPresignedUrls,
  deleteEvent,
  getEvent,
  getEventBySlug,
  getEvents,
  updateEvent,
} from '../controller/event.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  createEventValidator,
  eventIdValidator,
  eventSlugValidator,
  listEventsValidator,
  updateEventValidator,
} from '../validator/event.validator.js';
import {
  multipleImagePresignedUrlsValidator,
  singleImagePresignedUrlValidator,
} from '../validator/upload.validator.js';

const router = Router();

router
  .route('/')
  .get(listEventsValidator, validate, getEvents)
  .post(requireAdmin, createEventValidator, validate, createEvent);

router.get('/slug/:slug', eventSlugValidator, validate, getEventBySlug);
router.post(
  '/image/presigned-url',
  requireAdmin,
  singleImagePresignedUrlValidator,
  validate,
  createEventImagePresignedUrl,
);
router.post(
  '/images/presigned-urls',
  requireAdmin,
  multipleImagePresignedUrlsValidator,
  validate,
  createEventImagesPresignedUrls,
);

router
  .route('/:id')
  .get(eventIdValidator, validate, getEvent)
  .patch(requireAdmin, eventIdValidator, updateEventValidator, validate, updateEvent)
  .delete(requireAdmin, eventIdValidator, validate, deleteEvent);

export default router;
