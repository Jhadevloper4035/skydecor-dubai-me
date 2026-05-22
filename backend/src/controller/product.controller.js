import mongoose from 'mongoose';

import Product from '../model/product.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { sendCreated, sendList, sendNoContent, sendSuccess } from '../utils/response.js';
import createSlug from '../utils/slug.js';

const productFields = [
  'id',
  'productCode',
  'productType',
  'productName',
  'designName',
  'category',
  'subCategory',
  'textureCode',
  'texture',
  'size',
  'thickness',
  'width',
  'image',
  'pdfUrlPath',
  'status',
  'isActive',
];

const pickProductFields = (body) =>
  productFields.reduce((payload, field) => {
    if (body[field] !== undefined) payload[field] = body[field];
    return payload;
  }, {});

const findProductBySlugOrId = (slugOrId) => {
  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    return Product.findById(slugOrId);
  }

  return Product.findOne({
    $or: [{ productCodeSlug: createSlug(slugOrId) }, { productCode: slugOrId.toLowerCase() }],
  });
};

const getNextProductId = async () => {
  const lastProduct = await Product.findOne().sort({ id: -1 }).select('id').lean();
  return (lastProduct?.id || 0) + 1;
};

export const createProduct = catchAsync(async (req, res) => {
  const payload = pickProductFields(req.body);

  if (!payload.id) {
    payload.id = await getNextProductId();
  }

  const product = await Product.create(payload);

  sendCreated(res, { product });
});

export const getProducts = catchAsync(async (req, res) => {
  const searchParams = {
    ...req.query,
    isActive: req.query.isActive === undefined ? true : req.query.isActive === 'true',
  };

  const { products, pagination } = await Product.searchProducts(searchParams);

  sendList(res, 'products', products, pagination);
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await findProductBySlugOrId(req.params.slugOrId);

  if (!product) {
    return next(new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND'));
  }

  sendSuccess(res, { product });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND'));
  }

  Object.assign(product, pickProductFields(req.body));
  await product.save();

  sendSuccess(res, { product });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND'));
  }

  sendNoContent(res);
});

export const getProductFilterOptions = catchAsync(async (req, res) => {
  const options = await Product.getFilterOptions(req.query);

  sendSuccess(res, { options });
});

export const getProductAutocomplete = catchAsync(async (req, res) => {
  const suggestions = await Product.getAutocompleteSuggestions(req.query.query, req.query.limit);

  sendSuccess(res, { suggestions }, 200, { results: suggestions.length });
});
