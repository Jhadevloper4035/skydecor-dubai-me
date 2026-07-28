"use client";

import { create } from "zustand";

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

const buildQueryKey = (params = {}) => JSON.stringify(normalizeParams(params));

const isSameProductId = (left, right) =>
  String(left).toLowerCase() === String(right).toLowerCase();

const uniqueProductIds = (ids = []) =>
  ids.reduce((uniqueIds, id) => {
    if (
      id !== undefined &&
      id !== null &&
      !uniqueIds.some((itemId) => isSameProductId(itemId, id))
    ) {
      uniqueIds.push(id);
    }

    return uniqueIds;
  }, []);

const initialFilterOptions = buildLocalProductFilterOptions(localProducts);

const useProductStore = create((set, get) => ({
  items: localProducts,
  itemsStatus: "idle",
  itemsError: null,
  itemsByQuery: {},
  activeQueryKey: buildQueryKey(),
  filterOptions: initialFilterOptions,
  filterOptionsStatus: "idle",
  filterOptionsError: null,
  filterOptionsByQuery: {},
  activeFilterOptionsKey: buildQueryKey(),
  navigationOptions: initialFilterOptions,
  navigationStatus: "idle",
  navigationError: null,
  selectedProduct: null,
  selectedProductStatus: "idle",
  selectedProductError: null,
  compareItems: [],

  fetchProducts: async (params = {}, force = false) => {
    const normalizedParams = normalizeParams(params);
    const key = buildQueryKey(normalizedParams);
    const state = get();

    if (!force && state.itemsStatus === "loading" && state.activeQueryKey === key) return;
    if (!force && state.itemsStatus === "succeeded" && state.activeQueryKey === key) return;

    set({ itemsStatus: "loading", itemsError: null });
    try {
      const apiProducts = await getProductsFromApi(normalizedParams);
      const products = apiProducts || filterProductsLocally(localProducts, normalizedParams);
      set((current) => ({
        itemsStatus: "succeeded",
        items: products,
        activeQueryKey: key,
        itemsByQuery: { ...current.itemsByQuery, [key]: products },
      }));
    } catch (error) {
      set({ itemsStatus: "failed", itemsError: error.message });
    }
  },

  fetchProductFilters: async (params = {}, force = false) => {
    const normalizedParams = normalizeParams(params);
    const key = buildQueryKey(normalizedParams);
    const state = get();

    if (
      !force &&
      state.filterOptionsStatus === "loading" &&
      state.activeFilterOptionsKey === key
    ) return;
    if (
      !force &&
      state.filterOptionsStatus === "succeeded" &&
      state.activeFilterOptionsKey === key
    ) return;

    set({ filterOptionsStatus: "loading", filterOptionsError: null });
    try {
      const options = await getProductFiltersFromApi(normalizedParams);
      set((current) => ({
        filterOptionsStatus: "succeeded",
        filterOptions: options,
        activeFilterOptionsKey: key,
        filterOptionsByQuery: { ...current.filterOptionsByQuery, [key]: options },
      }));
    } catch (error) {
      set({ filterOptionsStatus: "failed", filterOptionsError: error.message });
    }
  },

  fetchNavigationFilters: async (force = false) => {
    const { navigationStatus } = get();
    if (!force && (navigationStatus === "loading" || navigationStatus === "succeeded")) return;

    set({ navigationStatus: "loading", navigationError: null });
    try {
      const options = await getProductFiltersFromApi();
      set({ navigationStatus: "succeeded", navigationOptions: options });
    } catch (error) {
      set({ navigationStatus: "failed", navigationError: error.message });
    }
  },

  fetchProductById: async (slugOrId) => {
    set({ selectedProductStatus: "loading", selectedProductError: null });
    try {
      const product = (await getProductFromApi(slugOrId)) || findFallbackProduct(slugOrId);
      const selectedProduct = product ? normalizeProduct(product) : null;
      set({
        selectedProductStatus: selectedProduct ? "succeeded" : "failed",
        selectedProduct,
        selectedProductError: selectedProduct ? null : "Product not found",
      });
    } catch (error) {
      set({ selectedProductStatus: "failed", selectedProductError: error.message });
    }
  },

  setCompareItems: (items) => set({ compareItems: uniqueProductIds(items) }),
  addCompareItem: (id) =>
    set((state) => ({
      compareItems: uniqueProductIds([...state.compareItems, id]),
    })),
  removeCompareItem: (id) =>
    set((state) => ({
      compareItems: state.compareItems.filter((itemId) => !isSameProductId(itemId, id)),
    })),
  clearCompareItems: () => set({ compareItems: [] }),
}));

export default useProductStore;
