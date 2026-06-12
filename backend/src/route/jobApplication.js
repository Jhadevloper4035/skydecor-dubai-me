import { Router } from 'express';

import {
  createJobApplication,
  deleteJobApplication,
  getJobApplication,
  getJobApplications,
  updateJobApplication,
} from '../controller/jobApplication.controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../validator/index.js';
import {
  createJobApplicationValidator,
  jobApplicationIdValidator,
  listJobApplicationsValidator,
  updateJobApplicationValidator,
} from '../validator/jobApplication.validator.js';

const router = Router();

router
  .route('/')
  .get(requireAdmin, listJobApplicationsValidator, validate, getJobApplications)
  .post(createJobApplicationValidator, validate, createJobApplication);

router
  .route('/:id')
  .get(requireAdmin, jobApplicationIdValidator, validate, getJobApplication)
  .patch(
    requireAdmin,
    jobApplicationIdValidator,
    updateJobApplicationValidator,
    validate,
    updateJobApplication,
  )
  .delete(requireAdmin, jobApplicationIdValidator, validate, deleteJobApplication);

export default router;
