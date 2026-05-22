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
import { requireAdmin } from '../middleware/auth.js';
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
  .post(requireAdmin, createPageSeoValidator, validate, createPageSeo);

router.get('/slug/:slug', pageSeoSlugValidator, validate, getPageSeoBySlug);
router.post(
  '/image/presigned-url',
  requireAdmin,
  singleImagePresignedUrlValidator,
  validate,
  createPageSeoImagePresignedUrl,
);

router
  .route('/:id')
  .get(pageSeoIdValidator, validate, getPageSeo)
  .patch(requireAdmin, pageSeoIdValidator, updatePageSeoValidator, validate, updatePageSeo)
  .delete(requireAdmin, pageSeoIdValidator, validate, deletePageSeo);

export default router;
