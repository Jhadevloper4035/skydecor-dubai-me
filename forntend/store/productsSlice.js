import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  buildLocalProductFilterOptions,
  filterProductsLocally,
  findFallbackProduct,
  getProductFiltersFromApi,
  getProductFromApi,
  getProductsFromApi,
  localProducts,
  normalizeProduct,
} from "@/lib/productsApi";

const normalizeParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
  );

export const buildProductQueryKey = (params = {}) =>
  JSON.stringify(normalizeParams(params));

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}) => {
    const normalizedParams = normalizeParams(params);
    const apiProducts = await getProductsFromApi(normalizedParams);

    return {
      key: buildProductQueryKey(normalizedParams),
      products: apiProducts || filterProductsLocally(localProducts, normalizedParams),
    };
  },
  {
    condition: (params = {}, { getState }) => {
      const key = buildProductQueryKey(normalizeParams(params));
      const productsState = getState().products;

      if (productsState?.itemsStatus === "loading" && productsState.activeQueryKey === key) {
        return false;
      }

      return productsState?.itemsStatus !== "succeeded" || productsState.activeQueryKey !== key;
    },
  }
);

export const fetchProductFilters = createAsyncThunk(
  "products/fetchProductFilters",
  async (params = {}) => {
    const normalizedParams = normalizeParams(params);
    const options = await getProductFiltersFromApi(normalizedParams);

    return {
      key: buildProductQueryKey(normalizedParams),
      options,
    };
  },
  {
    condition: (params = {}, { getState }) => {
      const key = buildProductQueryKey(normalizeParams(params));
      const productsState = getState().products;

      if (
        productsState?.filterOptionsStatus === "loading" &&
        productsState.activeFilterOptionsKey === key
      ) {
        return false;
      }

      return (
        productsState?.filterOptionsStatus !== "succeeded" ||
        productsState.activeFilterOptionsKey !== key
      );
    },
  }
);

export const fetchNavigationFilters = createAsyncThunk(
  "products/fetchNavigationFilters",
  async () => getProductFiltersFromApi(),
  {
    condition: (_, { getState }) => {
      const status = getState().products?.navigationStatus;
      return status !== "loading" && status !== "succeeded";
    },
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (slugOrId) => {
    const product = (await getProductFromApi(slugOrId)) || findFallbackProduct(slugOrId);

    return normalizeProduct(product);
  }
);

const initialFilterOptions = buildLocalProductFilterOptions(localProducts);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: localProducts,
    itemsStatus: "idle",
    itemsError: null,
    itemsByQuery: {},
    activeQueryKey: buildProductQueryKey(),
    filterOptions: initialFilterOptions,
    filterOptionsStatus: "idle",
    filterOptionsError: null,
    filterOptionsByQuery: {},
    activeFilterOptionsKey: buildProductQueryKey(),
    navigationOptions: initialFilterOptions,
    navigationStatus: "idle",
    navigationError: null,
    selectedProduct: null,
    selectedProductStatus: "idle",
    selectedProductError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.itemsStatus = "loading";
        state.itemsError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.itemsStatus = "succeeded";
        state.items = action.payload.products;
        state.activeQueryKey = action.payload.key;
        state.itemsByQuery[action.payload.key] = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.itemsStatus = "failed";
        state.itemsError = action.error.message;
      })
      .addCase(fetchProductFilters.pending, (state) => {
        state.filterOptionsStatus = "loading";
        state.filterOptionsError = null;
      })
      .addCase(fetchProductFilters.fulfilled, (state, action) => {
        state.filterOptionsStatus = "succeeded";
        state.filterOptions = action.payload.options;
        state.activeFilterOptionsKey = action.payload.key;
        state.filterOptionsByQuery[action.payload.key] = action.payload.options;
      })
      .addCase(fetchProductFilters.rejected, (state, action) => {
        state.filterOptionsStatus = "failed";
        state.filterOptionsError = action.error.message;
      })
      .addCase(fetchNavigationFilters.pending, (state) => {
        state.navigationStatus = "loading";
        state.navigationError = null;
      })
      .addCase(fetchNavigationFilters.fulfilled, (state, action) => {
        state.navigationStatus = "succeeded";
        state.navigationOptions = action.payload;
      })
      .addCase(fetchNavigationFilters.rejected, (state, action) => {
        state.navigationStatus = "failed";
        state.navigationError = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductStatus = "loading";
        state.selectedProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductStatus = "failed";
        state.selectedProductError = action.error.message;
      });
  },
});

export const selectProductItems = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.itemsStatus;
export const selectProductFilterOptions = (state) => state.products.filterOptions;
export const selectNavigationFilterOptions = (state) => state.products.navigationOptions;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

export default productsSlice.reducer;
