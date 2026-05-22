import mongoose from 'mongoose';

import createSlug from '../utils/slug.js';

const eventSchema = new mongoose.Schema(
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
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    location: {
      name: {
        type: String,
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        default: 'Dubai',
        trim: true,
      },
      country: {
        type: String,
        default: 'UAE',
        trim: true,
      },
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    registrationUrl: {
      type: String,
      trim: true,
    },
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
      enum: ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'draft',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

eventSchema.index({ slug: 1, status: 1 });
eventSchema.index({ status: 1, startDate: 1 });

eventSchema.virtual('hasEnded').get(function () {
  const compareDate = this.endDate || this.startDate;
  return compareDate ? new Date() > compareDate : false;
});

eventSchema.statics.findPublicEvents = function (filter = {}) {
  return this.find({
    ...filter,
    status: { $in: ['upcoming', 'ongoing', 'completed'] },
  }).sort({ startDate: 1 });
};

eventSchema.statics.findPublicBySlug = function (slug) {
  return this.findOne({
    slug: createSlug(slug),
    status: { $in: ['upcoming', 'ongoing', 'completed'] },
  });
};

const Event = mongoose.model('Event', eventSchema);
export default Event;
