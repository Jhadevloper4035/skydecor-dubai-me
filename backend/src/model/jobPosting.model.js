import mongoose from 'mongoose';

import createSlug from '../utils/slug.js';

const jobPostingSchema = new mongoose.Schema(
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
    department: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: 'Dubai, UAE',
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    experienceLevel: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 360,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    benefits: [
      {
        type: String,
        trim: true,
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'open', 'closed'],
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

jobPostingSchema.index({ slug: 1, status: 1 });
jobPostingSchema.index({ status: 1, publishedAt: -1 });
jobPostingSchema.index({ department: 1, status: 1 });

jobPostingSchema.pre('save', function (next) {
  if (this.status === 'open' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  next();
});

jobPostingSchema.statics.findPublic = function (filter = {}) {
  return this.find({ ...filter, status: 'open' }).sort({
    isFeatured: -1,
    publishedAt: -1,
    createdAt: -1,
  });
};

jobPostingSchema.statics.findPublicBySlug = function (slug) {
  return this.findOne({
    slug: createSlug(slug),
    status: 'open',
  });
};

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);
export default JobPosting;
