import JobPosting from '../model/jobPosting.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const jobFields = [
  'title',
  'slug',
  'department',
  'location',
  'employmentType',
  'experienceLevel',
  'summary',
  'description',
  'responsibilities',
  'requirements',
  'benefits',
  'status',
  'isFeatured',
  'publishedAt',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createJob = catchAsync(async (req, res) => {
  const job = await JobPosting.create(pickFields(req.body, jobFields));

  sendCreated(res, { job });
});

export const getJobs = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { department, employmentType, isFeatured, search } = req.query;
  const filter = {};

  if (department) filter.department = new RegExp(department, 'i');
  if (employmentType) filter.employmentType = employmentType;
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ title: re }, { department: re }, { summary: re }, { description: re }];
  }

  const [jobs, total] = await Promise.all([
    JobPosting.findPublic(filter).skip(skip).limit(limit),
    JobPosting.countDocuments({ ...filter, status: 'open' }),
  ]);

  sendList(res, 'jobs', jobs, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getJob = catchAsync(async (req, res, next) => {
  const job = await JobPosting.findById(req.params.id);

  if (!job) {
    return next(new AppError('Job not found.', 404, 'JOB_NOT_FOUND'));
  }

  sendSuccess(res, { job });
});

export const getJobBySlug = catchAsync(async (req, res, next) => {
  const job = await JobPosting.findPublicBySlug(req.params.slug);

  if (!job) {
    return next(new AppError('Job not found.', 404, 'JOB_NOT_FOUND'));
  }

  sendSuccess(res, { job });
});

export const updateJob = catchAsync(async (req, res, next) => {
  const payload = pickFields(req.body, jobFields);

  if (payload.status === 'open' && payload.publishedAt === undefined) {
    payload.publishedAt = new Date();
  }

  const job = await JobPosting.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return next(new AppError('Job not found.', 404, 'JOB_NOT_FOUND'));
  }

  sendSuccess(res, { job });
});

export const deleteJob = catchAsync(async (req, res, next) => {
  const job = await JobPosting.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(new AppError('Job not found.', 404, 'JOB_NOT_FOUND'));
  }

  sendNoContent(res);
});
