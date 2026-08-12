import { Router } from 'express';

import {
  createPageSeo,
  createPageSeoImagePresignedUrl,
  deletePageSeo,
  getPageSeo,
  getPageSeoBySlug,
  getPageSeos,
  updatePageSeo,
} from '../controller/pageSeo.controller.js';
import { validate } from '../validator/index.js';
import {
  createPageSeoValidator,
  listPageSeosValidator,
  pageSeoIdValidator,
  pageSeoSlugValidator,
  updatePageSeoValidator,
} from '../validator/pageSeo.validator.js';
import { singleImagePresignedUrlValidator } from '../validator/upload.validator.js';
const router = Router();
router
  .route('/')
  .get(listPageSeosValidator, validate, getPageSeos)
  .post(createPageSeoValidator, validate, createPageSeo);
router.get('/slug/:slug', pageSeoSlugValidator, validate, getPageSeoBySlug);
router.post(
  '/image/presigned-url',
  singleImagePresignedUrlValidator,
  validate,
  createPageSeoImagePresignedUrl,
);
router
  .route('/:id')
  .get(pageSeoIdValidator, validate, getPageSeo)
  .patch(pageSeoIdValidator, updatePageSeoValidator, validate, updatePageSeo)
  .delete(pageSeoIdValidator, validate, deletePageSeo);
export default router;
