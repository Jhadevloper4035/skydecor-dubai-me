import ProductEnquiry from '../model/productEnquiry.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';

const productEnquiryFields = [
  'productCode',
  'productName',
  'name',
  'email',
  'phone',
  'companyName',
  'quantity',
  'message',
  'source',
  'status',
  'assignedTo',
  'notes',
];

const pickFields = (body, fields) =>
  fields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

export const createProductEnquiry = catchAsync(async (req, res) => {
  const payload = pickFields(req.body, productEnquiryFields);
  payload.ipAddress = req.ip;
  payload.userAgent = req.get('User-Agent');

  const productEnquiry = await ProductEnquiry.create(payload);

  sendCreated(res, { productEnquiry });
});

export const getProductEnquiries = catchAsync(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  const { status, productCode, email, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (productCode) filter.productCode = productCode.toUpperCase();
  if (email) filter.email = email.toLowerCase();
  if (search) {
    const re = new RegExp(search, 'i');
    filter.$or = [{ productName: re }, { productCode: re }, { name: re }, { email: re }];
  }

  const [productEnquiries, total] = await Promise.all([
    ProductEnquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ProductEnquiry.countDocuments(filter),
  ]);

  sendList(res, 'productEnquiries', productEnquiries, {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  });
});

export const getProductEnquiry = catchAsync(async (req, res, next) => {
  const productEnquiry = await ProductEnquiry.findById(req.params.id);

  if (!productEnquiry) {
    return next(new AppError('Product enquiry not found.', 404, 'PRODUCT_ENQUIRY_NOT_FOUND'));
  }

  sendSuccess(res, { productEnquiry });
});

export const updateProductEnquiry = catchAsync(async (req, res, next) => {
  const productEnquiry = await ProductEnquiry.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body, productEnquiryFields),
    {
      new: true,
      runValidators: true,
    },
  );

  if (!productEnquiry) {
    return next(new AppError('Product enquiry not found.', 404, 'PRODUCT_ENQUIRY_NOT_FOUND'));
  }

  sendSuccess(res, { productEnquiry });
});

export const deleteProductEnquiry = catchAsync(async (req, res, next) => {
  const productEnquiry = await ProductEnquiry.findByIdAndDelete(req.params.id);

  if (!productEnquiry) {
    return next(new AppError('Product enquiry not found.', 404, 'PRODUCT_ENQUIRY_NOT_FOUND'));
  }

  sendNoContent(res);
});
