import { Router } from 'express';

import {
  createBlog,
  createBlogImagePresignedUrl,
  deleteBlog,
  getBlog,
  getBlogBySlug,
  getBlogs,
  updateBlog,
} from '../controller/blog.controller.js';
import { validate } from '../validator/index.js';
import {
  blogIdValidator,
  blogSlugValidator,
  createBlogValidator,
  listBlogsValidator,
  updateBlogValidator,
} from '../validator/blog.validator.js';
import { singleImagePresignedUrlValidator } from '../validator/upload.validator.js';
const router = Router();
router
  .route('/')
  .get(listBlogsValidator, validate, getBlogs)
  .post(createBlogValidator, validate, createBlog);
router.get('/slug/:slug', blogSlugValidator, validate, getBlogBySlug);
router.post(
  '/image/presigned-url',
  singleImagePresignedUrlValidator,
  validate,
  createBlogImagePresignedUrl,
);
router
  .route('/:id')
  .get(blogIdValidator, validate, getBlog)
  .patch(blogIdValidator, updateBlogValidator, validate, updateBlog)
  .delete(blogIdValidator, validate, deleteBlog);
export default router;
