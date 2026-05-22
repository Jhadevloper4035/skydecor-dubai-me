"use client";

import { useEffect } from "react";

import Breadcumb from "@/components/productDetails/Breadcumb";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { findFallbackProduct, normalizeProduct } from "@/lib/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  fetchProducts,
  selectProductItems,
  selectProductsStatus,
  selectSelectedProduct,
} from "@/store/productsSlice";

const isMatchingProduct = (product, id) => {
  const lookupValue = String(id).toLowerCase();

  return (
    String(product?._id || "") === String(id) ||
    String(product?.id || "") === String(id) ||
    String(product?.productCodeSlug || "").toLowerCase() === lookupValue ||
    String(product?.productCode || "").toLowerCase() === lookupValue
  );
};

export default function ProductDetailStoreView({ id }) {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const products = useAppSelector(selectProductItems);
  const productsStatus = useAppSelector(selectProductsStatus);
  const fallbackProduct = normalizeProduct(findFallbackProduct(id));
  const product = isMatchingProduct(selectedProduct, id) ? selectedProduct : fallbackProduct;

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 1000, isActive: true }));
  }, [dispatch]);

  return (
    <>
      <Breadcumb product={product} />
      <Details1 product={product} />
      <RelatedProducts product={product} products={products} productsStatus={productsStatus} />
    </>
  );
}
