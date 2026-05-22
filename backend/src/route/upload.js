import { Router } from 'express';

import {
  createMultipleImagePresignedUrls,
  createSingleImagePresignedUrl,
} from '../controller/upload.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  multipleImagePresignedUrlsValidator,
  singleImagePresignedUrlValidator,
} from '../validator/upload.validator.js';

const router = Router();

router.post(
  '/presigned-url',
  requireAdmin,
  singleImagePresignedUrlValidator,
  validate,
  createSingleImagePresignedUrl,
);
router.post(
  '/presigned-urls',
  requireAdmin,
  multipleImagePresignedUrlsValidator,
  validate,
  createMultipleImagePresignedUrls,
);

export default router;
