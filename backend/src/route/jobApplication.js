import { Router } from 'express';

import {
  createJobApplication,
  deleteJobApplication,
  getJobApplication,
  getJobApplications,
  updateJobApplication,
} from '../controller/jobApplication.controller.js';
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
  .get(listJobApplicationsValidator, validate, getJobApplications)
  .post(createJobApplicationValidator, validate, createJobApplication);
router
  .route('/:id')
  .get(jobApplicationIdValidator, validate, getJobApplication)
  .patch(
    jobApplicationIdValidator,
    updateJobApplicationValidator,
    validate,
    updateJobApplication,
  )
  .delete(jobApplicationIdValidator, validate, deleteJobApplication);
export default router;
