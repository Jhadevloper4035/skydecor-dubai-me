import { Router } from 'express';

import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
} from '../controller/enquiry.controller.js';
import { validate } from '../validator/index.js';
import {
  createEnquiryValidator,
  enquiryIdValidator,
  listEnquiriesValidator,
  updateEnquiryValidator,
} from '../validator/enquiry.validator.js';
const router = Router();
router
  .route('/')
  .get(listEnquiriesValidator, validate, getEnquiries)
  .post(createEnquiryValidator, validate, createEnquiry);
router
  .route('/:id')
  .get(enquiryIdValidator, validate, getEnquiry)
  .patch(enquiryIdValidator, updateEnquiryValidator, validate, updateEnquiry)
  .delete(enquiryIdValidator, validate, deleteEnquiry);
export default router;
