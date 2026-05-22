import { Router } from 'express';

import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
} from '../controller/enquiry.controller.js';
import { requireAdmin } from '../middleware/auth.js';
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
  .get(requireAdmin, listEnquiriesValidator, validate, getEnquiries)
  .post(createEnquiryValidator, validate, createEnquiry);

router
  .route('/:id')
  .get(requireAdmin, enquiryIdValidator, validate, getEnquiry)
  .patch(requireAdmin, enquiryIdValidator, updateEnquiryValidator, validate, updateEnquiry)
  .delete(requireAdmin, enquiryIdValidator, validate, deleteEnquiry);

export default router;
