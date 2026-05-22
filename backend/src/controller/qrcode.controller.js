import QRCode from '../model/qrcode.model.js';
import {
  cacheQRCodeScan,
  clearQRCodeScanCache,
  getCachedQRCodeScan,
} from '../service/qrcodeCache.service.js';
import { createImagePresignedUrl } from '../service/upload.service.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import logger from '../utils/logger.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const qrCodeFields = [
  'id',
  'productCode',
  'productName',
  'category',
  'subcategory',
  'productType',
  'qrCodeImage',
  'linkInQrCode',
  'productPdfPath',
  'productImageUrl',
  'status',
  'expiryDate',
  'generatedBy',
];

const pickQRCodeFields = (body) =>
  qrCodeFields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

const getNextQRCodeId = async () => {
  const lastQRCode = await QRCode.findOne().sort({ id: -1 }).select('id').lean();
  return (lastQRCode?.id || 0) + 1;
};

const findQRCodeForScan = async ({ productCode, productType }) => {
  const cachedQRCode = await getCachedQRCodeScan({ productCode, productType });

  if (cachedQRCode) {
    return QRCode.hydrate(cachedQRCode);
  }

  const filter = { productCode: productCode.toUpperCase() };

  if (productType) {
    filter.productType = productType.toLowerCase();
  }

  const qrCode = await QRCode.findOne(filter);
  await cacheQRCodeScan({ productCode, productType, qrCode });

  return qrCode;
};

export const createQRCode = catchAsync(async (req, res) => {
  const payload = pickQRCodeFields(req.body);

  if (!payload.id) {
    payload.id = await getNextQRCodeId();
  }

  const qrCode = await QRCode.create(payload);
  await clearQRCodeScanCache();

  sendCreated(res, { qrCode });
});

export const createQRCodeImagePresignedUrl = catchAsync(async (req, res) => {
  const presignedUrl = await createImagePresignedUrl({
    ...req.body,
    folder: req.body.folder ?? 'qrcodes',
  });

  sendSuccess(res, { presignedUrl });
});

export const getQRCodes = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, category, subcategory, productType, productCode, search } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (category) filter.category = category.toLowerCase();
  if (subcategory) filter.subcategory = subcategory.toLowerCase();
  if (productType) filter.productType = productType.toLowerCase();
  if (productCode) filter.productCode = productCode.toUpperCase();
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ productName: re }, { productCode: re }, { category: re }, { subcategory: re }];
  }

  const [qrCodes, total] = await Promise.all([
    QRCode.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    QRCode.countDocuments(filter),
  ]);

  sendList(res, 'qrCodes', qrCodes, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getQRCode = catchAsync(async (req, res, next) => {
  const qrCode = await QRCode.findById(req.params.id);

  if (!qrCode) {
    return next(new AppError('QR code not found.', 404, 'QR_CODE_NOT_FOUND'));
  }

  sendSuccess(res, { qrCode });
});

export const updateQRCode = catchAsync(async (req, res, next) => {
  const payload = pickQRCodeFields(req.body);

  const qrCode = await QRCode.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!qrCode) {
    return next(new AppError('QR code not found.', 404, 'QR_CODE_NOT_FOUND'));
  }

  await clearQRCodeScanCache();

  sendSuccess(res, { qrCode });
});

export const deleteQRCode = catchAsync(async (req, res, next) => {
  const qrCode = await QRCode.findByIdAndDelete(req.params.id);

  if (!qrCode) {
    return next(new AppError('QR code not found.', 404, 'QR_CODE_NOT_FOUND'));
  }

  await clearQRCodeScanCache();

  sendNoContent(res);
});

export const scanQRCode = catchAsync(async (req, res, next) => {
  const { productCode, productType } = req.params;

  const qrCode = await findQRCodeForScan({ productCode, productType });

  if (!qrCode) {
    return next(new AppError('QR code not found.', 404, 'QR_CODE_NOT_FOUND'));
  }

  if (!qrCode.isValid()) {
    return next(new AppError('QR code is inactive or expired.', 410, 'QR_CODE_NOT_ACTIVE'));
  }

  if (req.body?.location) {
    logger.debug('QR code scan location received', {
      requestId: req.id,
      productCode,
      productType,
    });
  }

  const updatedQRCode = await qrCode.incrementScan({
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });

  sendSuccess(res, { qrCode: updatedQRCode });
});

export const redirectQRCodeScan = catchAsync(async (req, res, next) => {
  const productCode = req.params.code || req.params.productCode;
  const { productType } = req.params;
  const qrCode = await findQRCodeForScan({ productCode, productType });

  if (!qrCode) {
    return next(new AppError('QR code not found.', 404, 'QR_CODE_NOT_FOUND'));
  }

  if (!qrCode.isValid()) {
    return next(new AppError('QR code is inactive or expired.', 410, 'QR_CODE_NOT_ACTIVE'));
  }

  if (!qrCode.productPdfPath) {
    return next(new AppError('QR code PDF URL not found.', 404, 'QR_CODE_PDF_NOT_FOUND'));
  }

  await QRCode.recordScan(qrCode._id, {
    ipAddress: req.ip,
    userAgent: req.get('User-Agent'),
  });

  logger.info('QR code scanned and redirected', {
    requestId: req.id,
    productCode: qrCode.productCode,
    productType: qrCode.productType,
    redirectUrl: qrCode.productPdfPath,
  });

  res.redirect(302, qrCode.productPdfPath);
});

export const getQRCodeStats = catchAsync(async (req, res) => {
  const [totals] = await QRCode.aggregate([
    {
      $group: {
        _id: null,
        totalQRCodes: { $sum: 1 },
        totalScans: { $sum: '$scanCount' },
        activeQRCodes: {
          $sum: {
            $cond: [{ $eq: ['$status', 'active'] }, 1, 0],
          },
        },
        inactiveQRCodes: {
          $sum: {
            $cond: [{ $eq: ['$status', 'inactive'] }, 1, 0],
          },
        },
        expiredQRCodes: {
          $sum: {
            $cond: [{ $eq: ['$status', 'expired'] }, 1, 0],
          },
        },
      },
    },
  ]);

  sendSuccess(res, {
    stats: totals || {
      totalQRCodes: 0,
      totalScans: 0,
      activeQRCodes: 0,
      inactiveQRCodes: 0,
      expiredQRCodes: 0,
    },
  });
});
