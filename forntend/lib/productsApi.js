import { allProducts } from "@/data/products";

const productCatalog = allProducts;

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
  [...new Set(values.filter(Boolean).map((value) => String(value)))].sort((a, b) =>
    a.localeCompare(b)
  );

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

const normalizeProductHierarchy = (product = {}) => {
  const legacyProductType = normalizeChoice(product.productType);

  if (!["design-master", "ambience"].includes(legacyProductType)) {
    return product;
  }

  return {
    ...product,
    productType: "decorative-hpl",
    productTypeSlug: "decorative-hpl",
    category: legacyProductType,
    categorySlug: legacyProductType,
  };
};

const buildProductImageUrl = (product = {}) => {
  const productType = normalizeChoice(product.productType);
  const category = normalizeChoice(product.category);
  const assetCollection =
    productType === "decorative-hpl" && category ? category : productType;
  const productCode = String(product.productCode || product.productCodeSlug || "")
    .trim()
    .toUpperCase();

  if (!assetCollection || !productCode) return "";

  return `https://skydecor-bucket-dubai.s3.ap-south-1.amazonaws.com/assets/products/${assetCollection}/${productCode}.jpg`;
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
  const normalizedHierarchy = normalizeProductHierarchy(product);
  const id = normalizedHierarchy._id || normalizedHierarchy.id;
  const productImages = normalizedHierarchy.images?.length
    ? normalizedHierarchy.images
    : Array.isArray(normalizedHierarchy.image)
      ? normalizedHierarchy.image.filter(Boolean)
      : [normalizedHierarchy.image].filter(Boolean);
  const images = productImages.length
    ? productImages
    : [buildProductImageUrl(normalizedHierarchy)].filter(Boolean);
  const title =
    normalizedHierarchy.productName ||
    normalizedHierarchy.title ||
    normalizedHierarchy.designName ||
    "Product";

  return {
    ...normalizedHierarchy,
    id,
    title,
    productName: normalizedHierarchy.productName || title,
    imgSrc: normalizedHierarchy.imgSrc || images[0] || "/images/placeholder.jpg",
    imgHover:
      normalizedHierarchy.imgHover || images[1] || images[0] || "/images/placeholder.jpg",
    images,
    price: Number(normalizedHierarchy.price ?? 0),
    filterBrands:
      normalizedHierarchy.filterBrands ||
      [normalizedHierarchy.productType, normalizedHierarchy.category].filter(Boolean),
    filterColor:
      normalizedHierarchy.filterColor || [normalizedHierarchy.texture].filter(Boolean),
    filterSizes:
      normalizedHierarchy.filterSizes || [normalizedHierarchy.size].filter(Boolean),
    inStock: normalizedHierarchy.inStock ?? normalizedHierarchy.isActive ?? true,
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
  if (query) params.set("query", query);

  const productTypeSlug = normalizeChoice(productType);
  const categorySlug = normalizeChoice(category);
  const subCategorySlug = normalizeChoice(subCategory);
  let path = "/products";

  if (productTypeSlug) {
    path += `/product-type/${encodeURIComponent(productTypeSlug)}`;
    if (categorySlug) path += `/category/${encodeURIComponent(categorySlug)}`;
    if (categorySlug && subCategorySlug) {
      path += `/sub-category/${encodeURIComponent(subCategorySlug)}`;
    } else if (subCategorySlug) {
      params.set("subCategory", subCategory);
    }
  } else if (categorySlug) {
    path += `/${encodeURIComponent(categorySlug)}`;
    if (subCategorySlug) path += `/${encodeURIComponent(subCategorySlug)}`;
  } else if (subCategorySlug) {
    params.set("subCategory", subCategory);
  }

  const queryString = params.toString();

  return queryString ? `${path}?${queryString}` : path;
};

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
    const options = payload.data?.options;
    const requestedProductType = normalizeChoice(params.productType);
    const hasRequestedProductType =
      !requestedProductType ||
      (options?.productTypes || []).some(
        (productType) => normalizeChoice(productType) === requestedProductType
      );

    if (options && hasRequestedProductType) return options;

    const apiProducts = await getProductsFromApi({ limit: 1000, isActive: true });
    return buildLocalProductFilterOptions(apiProducts || localProducts, params);
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

export const submitProductEnquiry = async (payload) => {
  const postProductEnquiry = async (url) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));

    return { data, response };
  };
  let primaryError;

  try {
    const { data, response } = await postProductEnquiry(buildUrl("/product-enquiries"));

    if (response.ok) return data.data?.productEnquiry;

    primaryError = new Error(data.message || "Unable to submit product enquiry.");

    if (response.status !== 404 && response.status < 500) {
      throw primaryError;
    }
  } catch (error) {
    primaryError = error;
  }

  const { data, response } = await postProductEnquiry("/api/product-enquiries");

  if (!response.ok) {
    throw new Error(
      data.message || primaryError?.message || "Unable to submit product enquiry."
    );
  }

  return data.data?.productEnquiry;
};

export const submitGeneralEnquiry = async (payload) => {
  const response = await fetch(buildUrl("/enquiries"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, source: "website" }),
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to send your message.");
  }

  return data.data?.enquiry;
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
