import NewsletterSubscriber from '../model/newsletterSubscriber.model.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList } from '../utils/response.js';

export const createNewsletterSubscriber = catchAsync(async (req, res) => {
  const email = String(req.body.email || '')
    .trim()
    .toLowerCase();
  const now = new Date();

  const subscriber = await NewsletterSubscriber.findOneAndUpdate(
    { email },
    {
      $set: {
        email,
        source: req.body.source || 'footer',
        status: 'subscribed',
        lastSubmittedAt: now,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
      },
      $setOnInsert: {
        subscribedAt: now,
      },
    },
    {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      upsert: true,
    },
  );

  sendCreated(res, { subscriber });
});

export const getNewsletterSubscribers = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  if (req.query.email) filter.email = String(req.query.email).toLowerCase();

  const [subscribers, total] = await Promise.all([
    NewsletterSubscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    NewsletterSubscriber.countDocuments(filter),
  ]);

  sendList(res, 'subscribers', subscribers, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});
