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
  .post(createEventValidator, validate, createEvent);
router.get('/slug/:slug', eventSlugValidator, validate, getEventBySlug);
router.post(
  '/image/presigned-url',
  singleImagePresignedUrlValidator,
  validate,
  createEventImagePresignedUrl,
);
router.post(
  '/images/presigned-urls',
  multipleImagePresignedUrlsValidator,
  validate,
  createEventImagesPresignedUrls,
);
router
  .route('/:id')
  .get(eventIdValidator, validate, getEvent)
  .patch(eventIdValidator, updateEventValidator, validate, updateEvent)
  .delete(eventIdValidator, validate, deleteEvent);
export default router;
