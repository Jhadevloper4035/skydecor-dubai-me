import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subcategory: {
      type: String,
      trim: true,
      lowercase: true,
    },
    productType: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    // Assets
    qrCodeImage: {
      type: String,
      required: true,
      trim: true,
    },
    linkInQrCode: {
      type: String,
      required: true,
      trim: true,
    },
    productPdfPath: {
      type: String,
      required: true,
      trim: true,
    },
    productImageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    // Scan tracking
    scanCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastScannedAt: {
      type: Date,
      default: null,
    },
    scanHistory: [
      {
        scannedAt: {
          type: Date,
          default: Date.now,
        },
        ipAddress: {
          type: String,
        },
        userAgent: {
          type: String,
        },
      },
    ],

    // Status & lifecycle
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    generatedBy: {
      type: String,
      default: 'system',
      trim: true,
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

/* ─────────────────────────────────────────────
   Indexes
───────────────────────────────────────────── */

qrCodeSchema.index({ productCode: 1, status: 1 });
qrCodeSchema.index({ productType: 1, status: 1 });
qrCodeSchema.index({ productCode: 1, productType: 1 });

/* ─────────────────────────────────────────────
   Virtuals
───────────────────────────────────────────── */

qrCodeSchema.virtual('isExpired').get(function () {
  return this.expiryDate ? new Date() > this.expiryDate : false;
});

qrCodeSchema.virtual('fullProductName').get(function () {
  return `${this.productName} - ${this.productCode}`;
});

/**
 * Increment scan count and optionally append to scan history.
 * Keeps history capped at 100 entries.
 */

qrCodeSchema.methods.incrementScan = async function (scanData = {}) {
  await this.constructor.recordScan(this._id, scanData);
  return this.constructor.findById(this._id);
};

qrCodeSchema.statics.recordScan = function (qrCodeId, scanData = {}) {
  const { ipAddress, userAgent } = scanData;
  const scannedAt = new Date();
  const update = {
    $inc: { scanCount: 1 },
    $set: { lastScannedAt: scannedAt },
  };

  if (ipAddress || userAgent) {
    update.$push = {
      scanHistory: {
        $each: [
          {
            scannedAt,
            ipAddress,
            userAgent,
          },
        ],
        $slice: -100,
      },
    };
  }

  return this.findByIdAndUpdate(qrCodeId, update, {
    new: true,
    runValidators: true,
  });
};

/**
 * Returns true if the QR code is active and not expired.
 */
qrCodeSchema.methods.isValid = function () {
  return this.status === 'active' && !(this.expiryDate && new Date() > this.expiryDate);
};

/* ─────────────────────────────────────────────
   Static Methods
───────────────────────────────────────────── */

qrCodeSchema.statics.findByProductCode = function (productCode) {
  return this.find({
    productCode: productCode.toUpperCase(),
    status: 'active',
  });
};

qrCodeSchema.statics.findByCategory = function (category) {
  return this.find({
    category: category.toLowerCase(),
    status: 'active',
  });
};

qrCodeSchema.statics.getPaginated = function (page = 1, limit = 20, filter = {}) {
  const skip = (page - 1) * limit;
  return this.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
};

qrCodeSchema.statics.searchQRCodes = function (searchTerm) {
  const re = new RegExp(searchTerm, 'i');
  return this.find({
    status: 'active',
    $or: [{ productName: re }, { productCode: re }, { category: re }, { subcategory: re }],
  });
};

const QRCode = mongoose.model('QRCode', qrCodeSchema);
export default QRCode;
