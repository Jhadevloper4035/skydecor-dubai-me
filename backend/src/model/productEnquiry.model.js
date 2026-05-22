import mongoose from 'mongoose';

const productEnquirySchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      trim: true,
      uppercase: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
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
    companyName: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },
    message: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      enum: ['website', 'whatsapp', 'phone', 'email', 'admin'],
      default: 'website',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'closed', 'cancelled'],
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

productEnquirySchema.index({ status: 1, createdAt: -1 });
productEnquirySchema.index({ productCode: 1, status: 1 });
productEnquirySchema.index({ email: 1, createdAt: -1 });

productEnquirySchema.statics.findOpen = function (filter = {}) {
  return this.find({
    ...filter,
    status: { $in: ['new', 'contacted', 'quoted'] },
  }).sort({ createdAt: -1 });
};

const ProductEnquiry = mongoose.model('ProductEnquiry', productEnquirySchema);
export default ProductEnquiry;
