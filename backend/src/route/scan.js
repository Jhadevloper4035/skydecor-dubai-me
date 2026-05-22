import { Router } from 'express';

import { redirectQRCodeScan } from '../controller/qrcode.controller.js';
import { validate } from '../validator/index.js';
import { scanQRCodeRedirectValidator } from '../validator/qrcode.validator.js';

const router = Router();

router.get(
  '/qr-code/:productType/:productCode',
  scanQRCodeRedirectValidator,
  validate,
  redirectQRCodeScan,
);
router.get('/:code', scanQRCodeRedirectValidator, validate, redirectQRCodeScan);

export default router;
