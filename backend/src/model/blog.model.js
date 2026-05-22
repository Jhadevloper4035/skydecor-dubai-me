import mongoose from 'mongoose';

import createSlug from '../utils/slug.js';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      set: createSlug,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    authorName: {
      type: String,
      default: 'SkyDecor Dubai',
      trim: true,
    },
    categories: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 170,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.index({ slug: 1, status: 1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ categories: 1, status: 1 });

blogSchema.pre('save', function (next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

blogSchema.statics.findPublished = function (filter = {}) {
  return this.find({ ...filter, status: 'published' }).sort({ publishedAt: -1 });
};

blogSchema.statics.findPublishedBySlug = function (slug) {
  return this.findOne({
    slug: createSlug(slug),
    status: 'published',
  });
};

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
