import ProductDetailStoreView from "@/components/productDetails/ProductDetailStoreView";
import React from "react";

export const metadata = {
  title: "Product Detail || skydecor Dubai",
  description: "skydecor Dubai product detail",
};

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return <ProductDetailStoreView id={id} />;
}
