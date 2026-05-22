import { Router } from 'express';

import {
  createQRCode,
  createQRCodeImagePresignedUrl,
  deleteQRCode,
  getQRCode,
  getQRCodes,
  getQRCodeStats,
  redirectQRCodeScan,
  scanQRCode,
  updateQRCode,
} from '../controller/qrcode.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  createQRCodeValidator,
  listQRCodesValidator,
  qrCodeIdValidator,
  scanQRCodeRedirectValidator,
  scanQRCodeValidator,
  updateQRCodeValidator,
} from '../validator/qrcode.validator.js';
import { singleImagePresignedUrlValidator } from '../validator/upload.validator.js';

const router = Router();

router
  .route('/')
  .get(requireAdmin, listQRCodesValidator, validate, getQRCodes)
  .post(requireAdmin, createQRCodeValidator, validate, createQRCode);

router.get('/stats', requireAdmin, getQRCodeStats);
router.post(
  '/image/presigned-url',
  requireAdmin,
  singleImagePresignedUrlValidator,
  validate,
  createQRCodeImagePresignedUrl,
);

router.get('/scan/:code', scanQRCodeRedirectValidator, validate, redirectQRCodeScan);
router.post('/scan/:productType/:productCode', scanQRCodeValidator, validate, scanQRCode);

router
  .route('/:id')
  .get(requireAdmin, qrCodeIdValidator, validate, getQRCode)
  .patch(requireAdmin, qrCodeIdValidator, updateQRCodeValidator, validate, updateQRCode)
  .delete(requireAdmin, qrCodeIdValidator, validate, deleteQRCode);

export default router;
