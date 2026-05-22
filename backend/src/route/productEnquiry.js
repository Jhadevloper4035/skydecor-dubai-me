import { Router } from 'express';

import {
  createProductEnquiry,
  deleteProductEnquiry,
  getProductEnquiries,
  getProductEnquiry,
  updateProductEnquiry,
} from '../controller/productEnquiry.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  createProductEnquiryValidator,
  listProductEnquiriesValidator,
  productEnquiryIdValidator,
  updateProductEnquiryValidator,
} from '../validator/productEnquiry.validator.js';

const router = Router();

router
  .route('/')
  .get(requireAdmin, listProductEnquiriesValidator, validate, getProductEnquiries)
  .post(createProductEnquiryValidator, validate, createProductEnquiry);

router
  .route('/:id')
  .get(requireAdmin, productEnquiryIdValidator, validate, getProductEnquiry)
  .patch(
    requireAdmin,
    productEnquiryIdValidator,
    updateProductEnquiryValidator,
    validate,
    updateProductEnquiry,
  )
  .delete(requireAdmin, productEnquiryIdValidator, validate, deleteProductEnquiry);

export default router;
