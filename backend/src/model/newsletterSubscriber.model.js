import mongoose from 'mongoose';

const newsletterSubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must be a valid email'],
    },
    source: {
      type: String,
      enum: ['footer', 'website', 'admin'],
      default: 'footer',
    },
    status: {
      type: String,
      enum: ['subscribed', 'unsubscribed'],
      default: 'subscribed',
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    lastSubmittedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

newsletterSubscriberSchema.index({ status: 1, createdAt: -1 });

const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);

export default NewsletterSubscriber;
