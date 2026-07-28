"use client";

import { useEffect } from "react";

import Breadcumb from "@/components/productDetails/Breadcumb";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { findFallbackProduct, normalizeProduct } from "@/lib/productsApi";
import useProductStore from "@/store/productStore";

const isMatchingProduct = (product, id) => {
  const lookupValue = String(id).toLowerCase();

  return (
    String(product?._id || "") === String(id) ||
    String(product?.id || "") === String(id) ||
    String(product?.productCodeSlug || "").toLowerCase() === lookupValue ||
    String(product?.productCode || "").toLowerCase() === lookupValue
  );
};

export default function ProductDetailStoreView({ id, initialProduct = null }) {
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const products = useProductStore((state) => state.items);
  const productsStatus = useProductStore((state) => state.itemsStatus);
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const fallbackProduct = normalizeProduct(initialProduct || findFallbackProduct(id));
  const product = isMatchingProduct(selectedProduct, id) ? selectedProduct : fallbackProduct;

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  useEffect(() => {
    fetchProducts({ limit: 1000, isActive: true });
  }, [fetchProducts]);

  return (
    <>
      <Breadcumb product={product} currentSlug={id} />
      <Details1 product={product} />
      <RelatedProducts product={product} products={products} productsStatus={productsStatus} />
    </>
  );
}
