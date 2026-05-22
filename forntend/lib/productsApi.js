import { allProducts } from "@/data/products";
import productCatalog from "@/data/products.json";

const SERVER_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:8000/api/v1";

const API_BASE_URL =
  typeof window === "undefined" ? SERVER_API_BASE_URL : "/api/v1";

const buildUrl = (path, params = {}) => {
  const isAbsoluteUrl = /^https?:\/\//.test(API_BASE_URL);
  const url = isAbsoluteUrl
    ? new URL(`${API_BASE_URL}${path}`)
    : new URL(`${API_BASE_URL}${path}`, "http://localhost");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return isAbsoluteUrl ? url.toString() : `${url.pathname}${url.search}`;
};

const sortValues = (values) =>
  [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

const buildProductTypeGroups = (products = []) => {
  const groupsByType = products.reduce((groups, product) => {
    if (!product.productType) return groups;

    const group = groups.get(product.productType) || {
      name: product.productType,
      categories: new Set(),
    };

    if (product.category) group.categories.add(product.category);
    groups.set(product.productType, group);

    return groups;
  }, new Map());

  return Array.from(groupsByType.values())
    .map((group) => ({
      name: group.name,
      categories: sortValues(Array.from(group.categories)),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
};

const normalizeChoice = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const buildProductImageUrl = (product = {}) => {
  const productType = normalizeChoice(product.productType);
  const productCode = String(product.productCode || product.productCodeSlug || "")
    .trim()
    .toUpperCase();

  if (!productType || !productCode) return "";

  return `https://skydecor-bucket-dubai.s3.ap-south-1.amazonaws.com/assets/products/${productType}/${productCode}.jpg`;
};

const matchesChoice = (product, field, slugField, value) => {
  if (!value) return true;

  const normalizedValue = normalizeChoice(value);
  return (
    normalizeChoice(product[field]) === normalizedValue ||
    normalizeChoice(product[slugField]) === normalizedValue
  );
};

const productContainsQuery = (product, query) => {
  if (!query) return true;

  const normalizedQuery = String(query).trim().toLowerCase();
  const searchableValues = [
    product.productName,
    product.title,
    product.designName,
    product.productCode,
    product.productType,
    product.category,
    product.subCategory,
    product.texture,
    product.textureCode,
    product.size,
    product.thickness,
    product.width,
  ];

  return searchableValues.some((value) =>
    String(value || "").toLowerCase().includes(normalizedQuery)
  );
};

export const getProductDetailHref = (product = {}) => {
  const lookupValue =
    product.productCodeSlug || product.productCode || product._id || product.id;

  return `/product-detail/${lookupValue}`;
};

export const normalizeProduct = (product = {}) => {
  const id = product._id || product.id;
  const productImages = product.images?.length
    ? product.images
    : Array.isArray(product.image)
      ? product.image.filter(Boolean)
      : [product.image].filter(Boolean);
  const images = productImages.length ? productImages : [buildProductImageUrl(product)].filter(Boolean);
  const title = product.productName || product.title || product.designName || "Product";

  return {
    ...product,
    id,
    title,
    productName: product.productName || title,
    imgSrc: product.imgSrc || images[0] || "/images/placeholder.jpg",
    imgHover: product.imgHover || images[1] || images[0] || "/images/placeholder.jpg",
    images,
    price: Number(product.price ?? 0),
    filterBrands: product.filterBrands || [product.productType, product.category].filter(Boolean),
    filterColor: product.filterColor || [product.texture].filter(Boolean),
    filterSizes: product.filterSizes || [product.size].filter(Boolean),
    inStock: product.inStock ?? product.isActive ?? true,
  };
};

export const normalizeProducts = (products = []) => products.map(normalizeProduct);

export const localProducts = normalizeProducts(productCatalog);

export const buildLocalProductFilterOptions = (products = localProducts, selected = {}) => {
  const productType = selected.productType || "";
  const category = selected.category || "";
  const subCategory = selected.subCategory || "";
  const texture = selected.texture || "";

  const matches = (product, field, value) =>
    !value || normalizeChoice(product[field]) === normalizeChoice(value);

  const productTypeProducts = products;
  const categoryProducts = productTypeProducts.filter((product) =>
    matches(product, "productType", productType)
  );
  const subCategoryProducts = categoryProducts.filter((product) =>
    matches(product, "category", category)
  );
  const textureProducts = subCategoryProducts.filter((product) =>
    matches(product, "subCategory", subCategory)
  );
  const selectedProducts = textureProducts.filter((product) =>
    matches(product, "texture", texture)
  );

  return {
    selected: {
      productType: productType || null,
      category: category || null,
      subCategory: subCategory || null,
      texture: texture || null,
    },
    productTypes: sortValues(productTypeProducts.map((product) => product.productType)),
    productTypeGroups: buildProductTypeGroups(productTypeProducts),
    categories: sortValues(categoryProducts.map((product) => product.category)),
    subCategories: sortValues(subCategoryProducts.map((product) => product.subCategory)),
    textures: sortValues(textureProducts.map((product) => product.texture)),
    sizes: sortValues(selectedProducts.map((product) => product.size)),
    thicknesses: sortValues(selectedProducts.map((product) => product.thickness)),
    widths: sortValues(selectedProducts.map((product) => product.width)),
  };
};

export const createProductFilterHref = ({ productType, category, subCategory, query } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subCategory) params.set("subCategory", subCategory);
  if (query) params.set("query", query);

  const queryString = params.toString();
  const path = productType
    ? `/shop-default-grid/product-type/${encodeURIComponent(normalizeChoice(productType))}`
    : "/shop-default-grid";

  return queryString ? `${path}?${queryString}` : path;
};

export const buildProductNavigationLinks = (
  options = buildLocalProductFilterOptions(localProducts)
) => ({
  allProductsLink: {
    href: "/shop-default-grid",
    name: "All Products",
  },
  laminatesLink: {
    href: "/shop-default-grid",
    name: "Laminates",
  },
  productTypeGroups: (
    options.productTypeGroups ||
    (options.productTypes || []).map((productType) => ({
      name: productType,
      categories: options.categories || [],
    }))
  ).map((group) => ({
    name: group.name,
    href: createProductFilterHref({ productType: group.name }),
    categoryLinks: (group.categories || []).map((category) => ({
      href: createProductFilterHref({ productType: group.name, category }),
      name: category,
    })),
  })),
  productTypeLinks: (options.productTypes || []).map((productType) => ({
    href: createProductFilterHref({ productType }),
    name: productType,
  })),
  categoryLinks: (options.categories || []).map((category) => ({
    href: createProductFilterHref({ category }),
    name: category,
  })),
});

export const filterProductsLocally = (products = localProducts, filters = {}) =>
  products.filter(
    (product) =>
      matchesChoice(product, "productType", "productTypeSlug", filters.productType) &&
      matchesChoice(product, "category", "categorySlug", filters.category) &&
      matchesChoice(product, "subCategory", "subCategorySlug", filters.subCategory) &&
      matchesChoice(product, "texture", "textureSlug", filters.texture) &&
      (!filters.size || product.size === filters.size) &&
      (!filters.thickness || product.thickness === filters.thickness) &&
      (!filters.width || product.width === filters.width) &&
      productContainsQuery(product, filters.query)
  );

const getProductsFromPayload = (payload = {}) => payload.data?.products || [];

const getPaginationFromPayload = (payload = {}) =>
  payload.pagination || payload.data?.pagination || null;

export const getProductsFromApi = async (params = {}) => {
  try {
    const requestedLimit = Number(params.limit) || 20;
    const limit = Math.min(Math.max(requestedLimit, 1), 100);
    const firstPageParams = { ...params, page: params.page || 1, limit };
    const response = await fetch(buildUrl("/products", firstPageParams), {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    const products = getProductsFromPayload(payload);
    const pagination = getPaginationFromPayload(payload);
    const total = Number(pagination?.total || payload.total || 0);
    const pages = Number(pagination?.pages || (total ? Math.ceil(total / limit) : 1));

    if (requestedLimit <= 100 || pages <= 1) {
      return normalizeProducts(products);
    }

    const remainingResponses = await Promise.all(
      Array.from({ length: pages - 1 }, (_, index) =>
        fetch(buildUrl("/products", { ...params, page: index + 2, limit }), {
          cache: "no-store",
        })
      )
    );
    const remainingPayloads = await Promise.all(
      remainingResponses
        .filter((remainingResponse) => remainingResponse.ok)
        .map((remainingResponse) => remainingResponse.json())
    );

    return normalizeProducts([
      ...products,
      ...remainingPayloads.flatMap(getProductsFromPayload),
    ]);
  } catch {
    return null;
  }
};

export const getProductFiltersFromApi = async (params = {}) => {
  try {
    const response = await fetch(buildUrl("/products/filters", params), {
      cache: "no-store",
    });

    if (!response.ok) {
      return buildLocalProductFilterOptions(localProducts, params);
    }

    const payload = await response.json();
    return payload.data?.options || buildLocalProductFilterOptions(localProducts, params);
  } catch {
    return buildLocalProductFilterOptions(localProducts, params);
  }
};

export const getProductFromApi = async (slugOrId) => {
  try {
    const response = await fetch(buildUrl(`/products/lookup/${slugOrId}`), {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = await response.json();
    return normalizeProduct(payload.data?.product);
  } catch {
    return null;
  }
};

export const findFallbackProduct = (slugOrId) =>
  [...localProducts, ...allProducts.map(normalizeProduct)].find(
    (product) => {
      const lookupValue = String(slugOrId).toLowerCase();
      return (
      String(product.id) === String(slugOrId) ||
      product.productCodeSlug === lookupValue ||
      String(product.productCode || "").toLowerCase() === lookupValue
      );
    },
  ) || localProducts[0] || normalizeProduct(allProducts[0]);
