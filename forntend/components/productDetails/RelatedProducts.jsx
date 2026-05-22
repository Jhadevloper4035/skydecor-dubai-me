"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { localProducts, normalizeProduct } from "@/lib/productsApi";
import ProductCard1 from "../productCards/ProductCard1";

const RECENTLY_VIEWED_KEY = "skydecor_recently_viewed_products";
const MAX_RECENT_PRODUCTS = 12;
const MAX_SLIDER_PRODUCTS = 8;

const normalizeValue = (value = "") => String(value || "").trim().toLowerCase();

const getProductKey = (product = {}) =>
  normalizeValue(product.productCodeSlug || product.productCode || product._id || product.id);

const uniqueProducts = (products = []) => {
  const seen = new Set();

  return products.filter((product) => {
    const key = getProductKey(product);
    if (!key || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const readRecentlyViewedKeys = () => {
  try {
    const storedValue = window.localStorage.getItem(RECENTLY_VIEWED_KEY);
    const keys = JSON.parse(storedValue || "[]");

    return Array.isArray(keys) ? keys.filter(Boolean) : [];
  } catch {
    return [];
  }
};

const writeRecentlyViewedKeys = (keys = []) => {
  try {
    window.localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(keys.slice(0, MAX_RECENT_PRODUCTS))
    );
  } catch {
    // Ignore storage failures so product details still render normally.
  }
};

const scoreRelatedProduct = (candidate = {}, currentProduct = {}) => {
  const scoringFields = [
    ["productType", 8],
    ["category", 6],
    ["subCategory", 4],
    ["texture", 2],
    ["designName", 1],
  ];

  return scoringFields.reduce((score, [field, weight]) => {
    const left = normalizeValue(candidate[field]);
    const right = normalizeValue(currentProduct[field]);

    return left && right && left === right ? score + weight : score;
  }, 0);
};

const ProductSlider = ({ products, paginationClass, emptyText }) => {
  if (!products.length) {
    return <p className="text-center text-secondary mt_30 mb_20">{emptyText}</p>;
  }

  return (
    <Swiper
      className="swiper tf-sw-latest"
      dir="ltr"
      spaceBetween={15}
      breakpoints={{
        0: { slidesPerView: 2, spaceBetween: 15 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1200: { slidesPerView: 4, spaceBetween: 30 },
      }}
      modules={[Pagination]}
      pagination={{
        clickable: true,
        el: `.${paginationClass}`,
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={getProductKey(product)} className="swiper-slide">
          <ProductCard1 product={product} />
        </SwiperSlide>
      ))}

      <div
        className={`sw-pagination-latest ${paginationClass} sw-dots type-circle justify-content-center`}
      />
    </Swiper>
  );
};

export default function RelatedProducts({ product = {}, products = [], productsStatus = "idle" }) {
  const [recentlyViewedKeys, setRecentlyViewedKeys] = useState([]);
  const productKey = getProductKey(product);
  const catalogProducts = useMemo(() => {
    const backendProducts =
      productsStatus === "succeeded" && products.length ? products : null;
    const sourceProducts = backendProducts || localProducts;

    return uniqueProducts(sourceProducts.map(normalizeProduct));
  }, [products, productsStatus]);
  const relatedProducts = useMemo(() => {
    const currentKey = getProductKey(product);
    const scoredProducts = catalogProducts
      .filter((candidate) => getProductKey(candidate) !== currentKey)
      .map((candidate, index) => ({
        product: candidate,
        index,
        score: scoreRelatedProduct(candidate, product),
      }))
      .sort((left, right) => right.score - left.score || left.index - right.index);

    return scoredProducts
      .filter((item) => item.score > 0)
      .concat(scoredProducts.filter((item) => item.score === 0))
      .slice(0, MAX_SLIDER_PRODUCTS)
      .map((item) => item.product);
  }, [catalogProducts, product]);
  const recentlyViewedProducts = useMemo(() => {
    const productByKey = new Map(
      catalogProducts.map((catalogProduct) => [getProductKey(catalogProduct), catalogProduct])
    );

    return recentlyViewedKeys
      .map((key) => productByKey.get(key))
      .filter(Boolean)
      .slice(0, MAX_SLIDER_PRODUCTS);
  }, [catalogProducts, recentlyViewedKeys]);

  useEffect(() => {
    if (!productKey) return;

    const currentKeys = readRecentlyViewedKeys();
    setRecentlyViewedKeys(currentKeys.filter((key) => key !== productKey));
    writeRecentlyViewedKeys([
      productKey,
      ...currentKeys.filter((key) => key !== productKey),
    ]);
  }, [productKey]);

  return (
    <section className="flat-spacing">
      <div className="container flat-animate-tab">
        <ul
          className="tab-product justify-content-sm-center wow fadeInUp"
          data-wow-delay="0s"
          role="tablist"
        >
          <li className="nav-tab-item" role="presentation">
            <a href="#relatedProducts" className="active" data-bs-toggle="tab">
              Related Products
            </a>
          </li>
          <li className="nav-tab-item" role="presentation">
            <a href="#recentlyViewed" data-bs-toggle="tab">
              Recently Viewed
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="relatedProducts"
            role="tabpanel"
          >
            <ProductSlider
              products={relatedProducts}
              paginationClass="spd4"
              emptyText="No related products found."
            />
          </div>
          <div className="tab-pane" id="recentlyViewed" role="tabpanel">
            <ProductSlider
              products={recentlyViewedProducts}
              paginationClass="spd5"
              emptyText="Recently viewed products will appear here after you open more products."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
