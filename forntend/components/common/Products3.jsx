"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { localProducts } from "@/lib/productsApi";
import useProductStore from "@/store/productStore";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const titleize = (value = "") =>
  String(value)
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const normalizeKey = (value = "") =>
  String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

    
const getProductCollection = (product = {}) => {
  const productType = normalizeKey(product.productTypeSlug || product.productType);
  const category = normalizeKey(product.categorySlug || product.category);

  if (productType === "decorative-hpl" && category) {
    return {
      key: category,
      label: titleize(product.category || product.categorySlug),
      href: `/products/product-type/decorative-hpl/category/${category}`,
    };
  }

  return {
    key: productType,
    label: titleize(product.productType || product.productTypeSlug || "Products"),
    href: productType
      ? `/products/product-type/${productType}`
      : "/products",
  };
};

export default function Products3({ parentClass = "flat-spacing-3" }) {
  const storeProducts = useProductStore((state) => state.items);
  const productsStatus = useProductStore((state) => state.itemsStatus);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [activeTabKey, setActiveTabKey] = useState("");
  const products = productsStatus === "succeeded" ? storeProducts : localProducts;

  useEffect(() => {
    fetchProducts({ limit: 1000, isActive: true });
  }, [fetchProducts]);

  const tabs = useMemo(() => {
    const collectionMap = new Map();

    products.forEach((product) => {
      const collection = getProductCollection(product);
      const { key } = collection;
      if (!key) return;

      const existingTab = collectionMap.get(key) || {
        ...collection,
        products: [],
      };

      existingTab.products.push(product);
      collectionMap.set(key, existingTab);
    });

    return Array.from(collectionMap.values()).sort((left, right) =>
      left.label.localeCompare(right.label)
    );
  }, [products]);

  useEffect(() => {
    if (!tabs.length) return;

    if (!activeTabKey || !tabs.some((tab) => tab.key === activeTabKey)) {
      setActiveTabKey(tabs[0].key);
    }
  }, [activeTabKey, tabs]);

  const activeTab = tabs.find((tab) => tab.key === activeTabKey) || tabs[0];
  const filteredProducts = activeTab?.products.slice(0, 10) || [];

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Our Products Range</h3>
        </div>
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.key} className="nav-tab-item">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab?.key === tab.key}
                  className={`sd-tab-button ${
                    activeTab?.key === tab.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTabKey(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-5 sd-product-range-grid">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id || product.id || product.productCode || index}
                    className="wow fadeInUp"
                    data-wow-delay={`${index * 0.1}s`}
                  >
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link
                  href={activeTab?.href || "/products"}
                  className="btn-line"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
