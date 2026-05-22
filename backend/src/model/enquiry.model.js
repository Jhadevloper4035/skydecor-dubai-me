import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'email', 'admin'],
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_progress', 'closed', 'cancelled'],
      default: 'new',
    },
    assignedTo: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
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

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ email: 1, createdAt: -1 });
enquirySchema.index({ service: 1, status: 1 });

enquirySchema.statics.findOpen = function (filter = {}) {
  return this.find({
    ...filter,
    status: { $in: ['new', 'contacted', 'in_progress'] },
  }).sort({ createdAt: -1 });
};

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
