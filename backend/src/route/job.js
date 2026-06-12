import { Router } from 'express';

import {
  createJob,
  deleteJob,
  getJob,
  getJobBySlug,
  getJobs,
  updateJob,
} from '../controller/job.controller.js';
import { requireAdmin } from '../middleware/auth.js';
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
  .post(requireAdmin, createJobValidator, validate, createJob);

router.get('/slug/:slug', jobSlugValidator, validate, getJobBySlug);

router
  .route('/:id')
  .get(requireAdmin, jobIdValidator, validate, getJob)
  .patch(requireAdmin, jobIdValidator, updateJobValidator, validate, updateJob)
  .delete(requireAdmin, jobIdValidator, validate, deleteJob);

export default router;
