import JobApplication from '../model/jobApplication.model.js';
import JobPosting from '../model/jobPosting.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import createSlug from '../utils/slug.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const applicationFields = [
  'fullName',
  'email',
  'phone',
  'currentCompany',
  'portfolioUrl',
  'resumeUrl',
  'message',
  'status',
  'notes',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined && body[field] !== '') payload[field] = body[field];
    return payload;
  }, {});

export const createJobApplication = catchAsync(async (req, res, next) => {
  const job = await JobPosting.findPublicBySlug(req.body.jobSlug);

  if (!job) {
    return next(new AppError('Job not found or no longer open.', 404, 'JOB_NOT_FOUND'));
  }

  const payload = {
    ...pickFields(req.body, applicationFields),
    job: job._id,
    jobSlug: job.slug,
    jobTitle: job.title,
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  };

  try {
    const application = await JobApplication.create(payload);
    sendCreated(res, { application });
  } catch (err) {
    if (err?.code === 11000) {
      return next(
        new AppError(
          'You have already applied for this job with this email.',
          409,
          'JOB_APPLICATION_EXISTS',
        ),
      );
    }

    throw err;
  }
});

export const getJobApplications = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, jobSlug, email, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (jobSlug) filter.jobSlug = createSlug(jobSlug);
  if (email) filter.email = email.toLowerCase();
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ fullName: re }, { email: re }, { phone: re }, { jobTitle: re }];
  }

  const [applications, total] = await Promise.all([
    JobApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    JobApplication.countDocuments(filter),
  ]);

  sendList(res, 'applications', applications, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getJobApplication = catchAsync(async (req, res, next) => {
  const application = await JobApplication.findById(req.params.id);

  if (!application) {
    return next(new AppError('Application not found.', 404, 'JOB_APPLICATION_NOT_FOUND'));
  }

  sendSuccess(res, { application });
});

export const updateJobApplication = catchAsync(async (req, res, next) => {
  const application = await JobApplication.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body, applicationFields),
    {
      new: true,
      runValidators: true,
    },
  );

  if (!application) {
    return next(new AppError('Application not found.', 404, 'JOB_APPLICATION_NOT_FOUND'));
  }

  sendSuccess(res, { application });
});

export const deleteJobApplication = catchAsync(async (req, res, next) => {
  const application = await JobApplication.findByIdAndDelete(req.params.id);

  if (!application) {
    return next(new AppError('Application not found.', 404, 'JOB_APPLICATION_NOT_FOUND'));
  }

  sendNoContent(res);
});
