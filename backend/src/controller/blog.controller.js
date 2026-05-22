import Blog from '../model/blog.model.js';
import { createImagePresignedUrl } from '../service/upload.service.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';
import createSlug from '../utils/slug.js';

const blogFields = [
  'title',
  'slug',
  'excerpt',
  'content',
  'coverImage',
  'authorName',
  'categories',
  'tags',
  'metaTitle',
  'metaDescription',
  'status',
  'isFeatured',
  'publishedAt',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createBlog = catchAsync(async (req, res) => {
  const blog = await Blog.create(pickFields(req.body, blogFields));

  sendCreated(res, { blog });
});

export const createBlogImagePresignedUrl = catchAsync(async (req, res) => {
  const presignedUrl = await createImagePresignedUrl({
    ...req.body,
    folder: req.body.folder ?? 'blogs',
  });

  sendSuccess(res, { presignedUrl });
});

export const getBlogs = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, category, tag, isFeatured, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (category) filter.categories = category.toLowerCase();
  if (tag) filter.tags = tag.toLowerCase();
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ title: re }, { excerpt: re }, { content: re }];
  }

  const [blogs, total] = await Promise.all([
    Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit),
    Blog.countDocuments(filter),
  ]);

  sendList(res, 'blogs', blogs, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new AppError('Blog not found.', 404, 'BLOG_NOT_FOUND'));
  }

  sendSuccess(res, { blog });
});

export const getBlogBySlug = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: createSlug(req.params.slug) });

  if (!blog) {
    return next(new AppError('Blog not found.', 404, 'BLOG_NOT_FOUND'));
  }

  sendSuccess(res, { blog });
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, pickFields(req.body, blogFields), {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return next(new AppError('Blog not found.', 404, 'BLOG_NOT_FOUND'));
  }

  sendSuccess(res, { blog });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    return next(new AppError('Blog not found.', 404, 'BLOG_NOT_FOUND'));
  }

  sendNoContent(res);
});
