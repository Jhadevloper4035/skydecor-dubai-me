"use client";

import { useEffect, useMemo } from "react";

import { allProducts } from "@/data/products";
import {
  fetchProducts,
  selectProductItems,
  selectProductsStatus,
  selectSelectedProduct,
} from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { localProducts, normalizeProduct } from "@/lib/productsApi";

const normalizeLookup = (value) => String(value || "").trim().toLowerCase();

const getProductLookupValues = (product = {}) =>
  [
    product._id,
    product.id,
    product.productCodeSlug,
    product.productCode,
  ].filter((value) => value !== undefined && value !== null && value !== "");

const matchesProductId = (product, id) => {
  const lookupId = normalizeLookup(id);

  return getProductLookupValues(product).some(
    (value) => normalizeLookup(value) === lookupId
  );
};

const uniqueCatalogProducts = (products = []) => {
  const seen = new Set();

  return products.filter((product) => {
    if (!product) return false;

    const key =
      normalizeLookup(product._id) ||
      normalizeLookup(product.id) ||
      normalizeLookup(product.productCodeSlug) ||
      normalizeLookup(product.productCode);

    if (!key || seen.has(key)) return false;
    seen.add(key);

    return true;
  });
};

export default function useComparedProducts(compareItem = []) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductItems);
  const productsStatus = useAppSelector(selectProductsStatus);
  const selectedProduct = useAppSelector(selectSelectedProduct);

  useEffect(() => {
    if (compareItem.length && productsStatus === "idle") {
      dispatch(fetchProducts({ limit: 1000, isActive: true }));
    }
  }, [compareItem.length, dispatch, productsStatus]);

  return useMemo(() => {
    const catalog = uniqueCatalogProducts([
      selectedProduct,
      ...products,
      ...localProducts,
      ...allProducts.map(normalizeProduct),
    ]);

    return compareItem
      .map((id) => catalog.find((product) => matchesProductId(product, id)))
      .filter(Boolean)
      .map(normalizeProduct);
  }, [compareItem, products, selectedProduct]);
}
