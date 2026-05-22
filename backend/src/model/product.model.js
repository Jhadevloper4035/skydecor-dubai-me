import mongoose from 'mongoose';
import createSlug from '../utils/slug.js';

const trimStringList = (values) => {
  const valueList = Array.isArray(values)
    ? values
    : typeof values === 'string' && values.trim()
      ? [values]
      : [];

  return valueList.map((value) => (typeof value === 'string' ? value.trim() : '')).filter(Boolean);
};

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'Product id is required'],
      unique: true,
      min: [1, 'Product id must be a positive number'],
    },
    productCode: {
      type: String,
      required: [true, 'Product code is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9 -]+$/, 'Invalid product code format'],
    },
    productCodeSlug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    productType: {
      type: String,
      required: [true, 'Product type is required'],
      trim: true,
    },
    productTypeSlug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      maxlength: [100, 'Product name must be less than 100 characters'],
    },
    designName: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Design name must be less than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: [50, 'Category must be less than 50 characters'],
    },
    categorySlug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    subCategory: {
      type: String,
      required: [true, 'Sub-category is required'],
      trim: true,
      minlength: [2, 'Sub-category must be at least 2 characters'],
      maxlength: [50, 'Sub-category must be less than 50 characters'],
    },
    subCategorySlug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    textureCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [50, 'Texture code must be less than 50 characters'],
      default: '',
    },
    texture: {
      type: String,
      trim: true,
      maxlength: [50, 'Texture name must be less than 50 characters'],
      default: '',
    },
    textureSlug: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    size: {
      type: String,
      required: [true, 'Size is required'],
      trim: true,
    },
    thickness: {
      type: String,
      required: [true, 'Thickness is required'],
      trim: true,
    },
    width: {
      type: String,
      required: [true, 'Width is required'],
      trim: true,
    },
    image: {
      type: [String],
      required: [true, 'Image URL is required'],
      set: trimStringList,
    },
    pdfUrlPath: {
      type: String,
      required: [true, 'PDF URL is required'],
      trim: true,
    },
    searchText: {
      type: String,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      trim: true,
      lowercase: true,
      default: 'active',
    },
  },
  {
    id: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.index(
  {
    productName: 'text',
    designName: 'text',
    productCode: 'text',
    category: 'text',
    subCategory: 'text',
    texture: 'text',
  },
  {
    weights: {
      productCode: 10,
      productName: 8,
      designName: 6,
      category: 4,
      subCategory: 3,
      texture: 2,
    },
    name: 'product_text_search',
  },
);

productSchema.index({ productType: 1 });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ texture: 1 });
productSchema.index({ textureCode: 1 });
productSchema.index({ status: 1 });
productSchema.index({ productType: 1, category: 1 });
productSchema.index({ category: 1, thickness: 1 });
productSchema.index({ isActive: 1, productType: 1 });
productSchema.index({ isActive: 1, category: 1 });
productSchema.index({ isActive: 1, productType: 1, category: 1, subCategory: 1, texture: 1 });
productSchema.index({ productCodeSlug: 1 });
productSchema.index({ productTypeSlug: 1 });
productSchema.index({ categorySlug: 1 });
productSchema.index({ subCategorySlug: 1 });
productSchema.index({ textureSlug: 1 });

productSchema.pre('validate', function generateProductSlugs() {
  if (this.productCode) this.productCodeSlug = createSlug(this.productCode);
  if (this.productType) this.productTypeSlug = createSlug(this.productType);
  if (this.category) this.categorySlug = createSlug(this.category);
  if (this.subCategory) this.subCategorySlug = createSlug(this.subCategory);
  this.textureSlug = this.texture ? createSlug(this.texture) : '';
  if (this.isModified('isActive') && !this.isModified('status')) {
    this.status = this.isActive ? 'active' : 'inactive';
  } else if (this.status) {
    this.isActive = this.status === 'active';
  }

  this.searchText = [
    this.productCode,
    this.productName,
    this.designName,
    this.category,
    this.subCategory,
    this.texture,
    this.textureCode,
    this.productType,
    this.size,
    this.thickness,
    this.width,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
});

productSchema.virtual('images').get(function productImages() {
  return this.image;
});

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const addChoiceFilter = (filter, field, slugField, value) => {
  if (!value || !value.trim()) return filter;

  const trimmedValue = value.trim();
  const choiceFilter = {
    $or: [
      { [field]: new RegExp(`^${escapeRegExp(trimmedValue)}$`, 'i') },
      { [slugField]: createSlug(trimmedValue) },
    ],
  };

  return {
    ...filter,
    $and: [...(filter.$and || []), choiceFilter],
  };
};

const sortValues = (values) => values.filter(Boolean).sort((a, b) => a.localeCompare(b));

productSchema.statics.searchProducts = async function searchProducts(searchParams = {}) {
  const {
    query = '',
    productType,
    category,
    subCategory,
    texture,
    textureCode,
    size,
    thickness,
    width,
    productCode,
    status,
    isActive = true,
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = searchParams;

  const parsedPage = Number(page) || 1;
  const parsedLimit = Number(limit) || 20;
  let filter = {};
  if (status) {
    filter.status = status;
  } else {
    filter.isActive = isActive;
  }
  const options = {
    skip: (parsedPage - 1) * parsedLimit,
    limit: parsedLimit,
    sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
  };

  if (query?.trim()) {
    filter.$text = { $search: query.trim() };
    options.sort = { score: { $meta: 'textScore' } };
  }

  if (productType) filter = addChoiceFilter(filter, 'productType', 'productTypeSlug', productType);
  if (category) filter = addChoiceFilter(filter, 'category', 'categorySlug', category);
  if (subCategory) filter = addChoiceFilter(filter, 'subCategory', 'subCategorySlug', subCategory);
  if (texture) filter = addChoiceFilter(filter, 'texture', 'textureSlug', texture);
  if (textureCode) filter.textureCode = textureCode.toUpperCase();
  if (size) filter.size = size;
  if (thickness) filter.thickness = thickness;
  if (width) filter.width = width;
  if (productCode) filter.productCode = new RegExp(escapeRegExp(productCode), 'i');

  const projection = query?.trim() ? { score: { $meta: 'textScore' } } : {};
  const [products, total] = await Promise.all([
    this.find(filter, projection).sort(options.sort).skip(options.skip).limit(options.limit),
    this.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit),
      limit: parsedLimit,
    },
  };
};

productSchema.statics.getFilterOptions = async function getFilterOptions(filters = {}) {
  const { productType, category, subCategory, texture } = filters;
  const baseFilter = { isActive: true };
  const categoryFilter = addChoiceFilter(baseFilter, 'productType', 'productTypeSlug', productType);
  const subCategoryFilter = addChoiceFilter(categoryFilter, 'category', 'categorySlug', category);
  const textureFilter = addChoiceFilter(
    subCategoryFilter,
    'subCategory',
    'subCategorySlug',
    subCategory,
  );
  const selectedFilter = addChoiceFilter(textureFilter, 'texture', 'textureSlug', texture);

  const [
    productTypes,
    productTypeGroups,
    categories,
    subCategories,
    textures,
    sizes,
    thicknesses,
    widths,
  ] =
    await Promise.all([
      this.distinct('productType', baseFilter),
      this.aggregate([
        { $match: baseFilter },
        {
          $group: {
            _id: {
              productType: '$productType',
              category: '$category',
            },
          },
        },
        {
          $group: {
            _id: '$_id.productType',
            categories: { $addToSet: '$_id.category' },
          },
        },
      ]),
      this.distinct('category', categoryFilter),
      this.distinct('subCategory', subCategoryFilter),
      this.distinct('texture', textureFilter),
      this.distinct('size', selectedFilter),
      this.distinct('thickness', selectedFilter),
      this.distinct('width', selectedFilter),
    ]);

  return {
    selected: {
      productType: productType || null,
      category: category || null,
      subCategory: subCategory || null,
      texture: texture || null,
    },
    productTypes: sortValues(productTypes),
    productTypeGroups: productTypeGroups
      .filter((group) => group._id)
      .map((group) => ({
        name: group._id,
        categories: sortValues(group.categories || []),
      }))
      .sort((left, right) => left.name.localeCompare(right.name)),
    categories: sortValues(categories),
    subCategories: sortValues(subCategories),
    textures: sortValues(textures),
    sizes: sortValues(sizes),
    thicknesses: sortValues(thicknesses),
    widths: sortValues(widths),
  };
};

productSchema.statics.getAutocompleteSuggestions = function getAutocompleteSuggestions(
  query,
  limit = 10,
) {
  if (!query || query.trim().length < 2) return [];

  const regex = new RegExp(escapeRegExp(query.trim()), 'i');

  return this.find(
    {
      $or: [
        { productName: regex },
        { productCode: regex },
        { category: regex },
        { subCategory: regex },
        { designName: regex },
        { productType: regex },
        { size: regex },
        { thickness: regex },
        { texture: regex },
      ],
      isActive: true,
    },
    {
      productName: 1,
      productCode: 1,
      productCodeSlug: 1,
      category: 1,
      categorySlug: 1,
      subCategory: 1,
      subCategorySlug: 1,
      designName: 1,
      productType: 1,
      productTypeSlug: 1,
      size: 1,
      thickness: 1,
      image: 1,
    },
  )
    .limit(Number(limit) || 10)
    .lean();
};

const Product = mongoose.model('Product', productSchema);
export default Product;
