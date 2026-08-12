import { Router } from 'express';

import {
  createJob,
  deleteJob,
  getJob,
  getJobBySlug,
  getJobs,
  updateJob,
} from '../controller/job.controller.js';
import { validate } from '../validator/index.js';
import {
  createJobValidator,
  jobIdValidator,
  jobSlugValidator,
  listJobsValidator,
  updateJobValidator,
} from '../validator/job.validator.js';
const router = Router();
router
  .route('/')
  .get(listJobsValidator, validate, getJobs)
  .post(createJobValidator, validate, createJob);
router.get('/slug/:slug', jobSlugValidator, validate, getJobBySlug);
router
  .route('/:id')
  .get(jobIdValidator, validate, getJob)
  .patch(jobIdValidator, updateJobValidator, validate, updateJob)
  .delete(jobIdValidator, validate, deleteJob);
export default router;
