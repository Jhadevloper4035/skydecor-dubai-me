"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { getProductsFromApi, localProducts } from "@/lib/productsApi";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const titleize = (value = "") =>
  String(value)
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const getProductTypeKey = (product = {}) =>
  String(product.productTypeSlug || product.productType || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const getProductTypeLabel = (product = {}) =>
  titleize(product.productType || product.productTypeSlug || "Products");

export default function Products3({ parentClass = "flat-spacing-3" }) {
  const [products, setProducts] = useState(localProducts);
  const [activeTabKey, setActiveTabKey] = useState("");

  useEffect(() => {
    let isMounted = true;

    getProductsFromApi({ limit: 1000, isActive: true }).then((apiProducts) => {
      if (isMounted && apiProducts?.length) {
        setProducts(apiProducts);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const tabs = useMemo(() => {
    const productTypeMap = new Map();

    products.forEach((product) => {
      const key = getProductTypeKey(product);
      if (!key) return;

      const existingTab = productTypeMap.get(key) || {
        key,
        label: getProductTypeLabel(product),
        products: [],
      };

      existingTab.products.push(product);
      productTypeMap.set(key, existingTab);
    });

    return Array.from(productTypeMap.values()).sort((left, right) =>
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
  const filteredProducts = activeTab?.products.slice(0, 8) || [];

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Our Products</h3>
          <p className="subheading text-secondary">
            Explore our premium laminate collection
          </p>
        </div>
        <div className="flat-animate-tab">
          <ul className="tab-product justify-content-sm-center" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.key} className="nav-tab-item">
                <a
                  href="#"
                  className={activeTab?.key === tab.key ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTabKey(tab.key);
                  }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show tabFilter filtered"
              role="tabpanel"
            >
              <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="wow fadeInUp"
                    data-wow-delay={`${index * 0.1}s`}
                  >
                    <ProductCard1 product={product} />
                  </div>
                ))}
              </div>
              <div className="sec-btn text-center">
                <Link href="/shop-default-grid" className="btn-line">
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
