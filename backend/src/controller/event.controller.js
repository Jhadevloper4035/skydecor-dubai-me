import Event from '../model/events.model.js';
import {
  createImagePresignedUrl,
  createMultipleImagePresignedUrls,
} from '../service/upload.service.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';
import createSlug from '../utils/slug.js';

const eventFields = [
  'title',
  'slug',
  'shortDescription',
  'description',
  'startDate',
  'endDate',
  'location',
  'images',
  'registrationUrl',
  'metaTitle',
  'metaDescription',
  'status',
  'isFeatured',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createEvent = catchAsync(async (req, res) => {
  const event = await Event.create(pickFields(req.body, eventFields));

  sendCreated(res, { event });
});

export const createEventImagePresignedUrl = catchAsync(async (req, res) => {
  const presignedUrl = await createImagePresignedUrl({
    ...req.body,
    folder: req.body.folder ?? 'events',
  });

  sendSuccess(res, { presignedUrl });
});

export const createEventImagesPresignedUrls = catchAsync(async (req, res) => {
  const presignedUrls = await createMultipleImagePresignedUrls(
    req.body.files,
    req.body.folder ?? 'events',
  );

  sendSuccess(res, { presignedUrls }, 200, { results: presignedUrls.length });
});

export const getEvents = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, isFeatured, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ title: re }, { shortDescription: re }, { description: re }];
  }

  const [events, total] = await Promise.all([
    Event.find(filter).sort({ startDate: 1, createdAt: -1 }).skip(skip).limit(limit),
    Event.countDocuments(filter),
  ]);

  sendList(res, 'events', events, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('Event not found.', 404, 'EVENT_NOT_FOUND'));
  }

  sendSuccess(res, { event });
});

export const getEventBySlug = catchAsync(async (req, res, next) => {
  const event = await Event.findOne({ slug: createSlug(req.params.slug) });

  if (!event) {
    return next(new AppError('Event not found.', 404, 'EVENT_NOT_FOUND'));
  }

  sendSuccess(res, { event });
});

export const updateEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndUpdate(req.params.id, pickFields(req.body, eventFields), {
    new: true,
    runValidators: true,
  });

  if (!event) {
    return next(new AppError('Event not found.', 404, 'EVENT_NOT_FOUND'));
  }

  sendSuccess(res, { event });
});

export const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError('Event not found.', 404, 'EVENT_NOT_FOUND'));
  }

  sendNoContent(res);
});
