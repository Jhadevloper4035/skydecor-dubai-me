import PageSeo from '../model/pageSeo.model.js';
import { createImagePresignedUrl } from '../service/upload.service.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';
import createSlug from '../utils/slug.js';

const pageSeoFields = [
  'pageName',
  'pageSlug',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'canonicalUrl',
  'ogTitle',
  'ogDescription',
  'ogImage',
  'twitterTitle',
  'twitterDescription',
  'twitterImage',
  'robots',
  'status',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createPageSeo = catchAsync(async (req, res) => {
  const pageSeo = await PageSeo.create(pickFields(req.body, pageSeoFields));

  sendCreated(res, { pageSeo });
});

export const createPageSeoImagePresignedUrl = catchAsync(async (req, res) => {
  const presignedUrl = await createImagePresignedUrl({
    ...req.body,
    folder: req.body.folder ?? 'page-seo',
  });

  sendSuccess(res, { presignedUrl });
});

export const getPageSeos = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ pageName: re }, { pageSlug: re }, { metaTitle: re }];
  }

  const [pageSeos, total] = await Promise.all([
    PageSeo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    PageSeo.countDocuments(filter),
  ]);

  sendList(res, 'pageSeos', pageSeos, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getPageSeo = catchAsync(async (req, res, next) => {
  const pageSeo = await PageSeo.findById(req.params.id);

  if (!pageSeo) {
    return next(new AppError('Page SEO not found.', 404, 'PAGE_SEO_NOT_FOUND'));
  }

  sendSuccess(res, { pageSeo });
});

export const getPageSeoBySlug = catchAsync(async (req, res, next) => {
  const pageSeo = await PageSeo.findOne({ pageSlug: createSlug(req.params.slug) });

  if (!pageSeo) {
    return next(new AppError('Page SEO not found.', 404, 'PAGE_SEO_NOT_FOUND'));
  }

  sendSuccess(res, { pageSeo });
});

export const updatePageSeo = catchAsync(async (req, res, next) => {
  const pageSeo = await PageSeo.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body, pageSeoFields),
    {
      new: true,
      runValidators: true,
    },
  );

  if (!pageSeo) {
    return next(new AppError('Page SEO not found.', 404, 'PAGE_SEO_NOT_FOUND'));
  }

  sendSuccess(res, { pageSeo });
});

export const deletePageSeo = catchAsync(async (req, res, next) => {
  const pageSeo = await PageSeo.findByIdAndDelete(req.params.id);

  if (!pageSeo) {
    return next(new AppError('Page SEO not found.', 404, 'PAGE_SEO_NOT_FOUND'));
  }

  sendNoContent(res);
});
