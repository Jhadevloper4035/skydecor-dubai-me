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
  .get(listQRCodesValidator, validate, getQRCodes)
  .post(createQRCodeValidator, validate, createQRCode);
router.get('/stats', getQRCodeStats);
router.post(
  '/image/presigned-url',
  singleImagePresignedUrlValidator,
  validate,
  createQRCodeImagePresignedUrl,
);
router.get('/scan/:code', scanQRCodeRedirectValidator, validate, redirectQRCodeScan);
router.post('/scan/:productType/:productCode', scanQRCodeValidator, validate, scanQRCode);
router
  .route('/:id')
  .get(qrCodeIdValidator, validate, getQRCode)
  .patch(qrCodeIdValidator, updateQRCodeValidator, validate, updateQRCode)
  .delete(qrCodeIdValidator, validate, deleteQRCode);
export default router;
