import mongoose from 'mongoose';

import createSlug from '../utils/slug.js';

const pageSeoSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      trim: true,
    },
    pageSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      set: createSlug,
    },
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 170,
    },
    metaKeywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    canonicalUrl: {
      type: String,
      trim: true,
    },
    ogTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    ogDescription: {
      type: String,
      trim: true,
      maxlength: 170,
    },
    ogImage: {
      type: String,
      trim: true,
    },
    twitterTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    twitterDescription: {
      type: String,
      trim: true,
      maxlength: 170,
    },
    twitterImage: {
      type: String,
      trim: true,
    },
    robots: {
      type: String,
      enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
      default: 'index,follow',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

pageSeoSchema.index({ pageSlug: 1, status: 1 });

pageSeoSchema.statics.findActiveBySlug = function (pageSlug) {
  return this.findOne({
    pageSlug: createSlug(pageSlug),
    status: 'active',
  });
};

const PageSeo = mongoose.model('PageSeo', pageSeoSchema);
export default PageSeo;
