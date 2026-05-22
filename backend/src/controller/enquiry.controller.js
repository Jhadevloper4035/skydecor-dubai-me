import Enquiry from '../model/enquiry.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const enquiryFields = [
  'name',
  'email',
  'phone',
  'subject',
  'service',
  'message',
  'source',
  'status',
  'assignedTo',
  'notes',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createEnquiry = catchAsync(async (req, res) => {
  const payload = pickFields(req.body, enquiryFields);
  payload.ipAddress = req.ip;
  payload.userAgent = req.get('User-Agent');

  const enquiry = await Enquiry.create(payload);

  sendCreated(res, { enquiry });
});

export const getEnquiries = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, service, email, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (service) filter.service = service.toLowerCase();
  if (email) filter.email = email.toLowerCase();
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ name: re }, { email: re }, { phone: re }, { subject: re }, { message: re }];
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  sendList(res, 'enquiries', enquiries, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    return next(new AppError('Enquiry not found.', 404, 'ENQUIRY_NOT_FOUND'));
  }

  sendSuccess(res, { enquiry });
});

export const updateEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body, enquiryFields),
    {
      new: true,
      runValidators: true,
    },
  );

  if (!enquiry) {
    return next(new AppError('Enquiry not found.', 404, 'ENQUIRY_NOT_FOUND'));
  }

  sendSuccess(res, { enquiry });
});

export const deleteEnquiry = catchAsync(async (req, res, next) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

  if (!enquiry) {
    return next(new AppError('Enquiry not found.', 404, 'ENQUIRY_NOT_FOUND'));
  }

  sendNoContent(res);
});
