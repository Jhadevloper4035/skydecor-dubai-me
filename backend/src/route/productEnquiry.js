import { Router } from 'express';

import {
  createProductEnquiry,
  deleteProductEnquiry,
  getProductEnquiries,
  getProductEnquiry,
  updateProductEnquiry,
} from '../controller/productEnquiry.controller.js';
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
  .get(listProductEnquiriesValidator, validate, getProductEnquiries)
  .post(createProductEnquiryValidator, validate, createProductEnquiry);
router
  .route('/:id')
  .get(productEnquiryIdValidator, validate, getProductEnquiry)
  .patch(
    productEnquiryIdValidator,
    updateProductEnquiryValidator,
    validate,
    updateProductEnquiry,
  )
  .delete(productEnquiryIdValidator, validate, deleteProductEnquiry);
export default router;
