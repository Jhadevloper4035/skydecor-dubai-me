"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  getProductDetailHref,
  getProductsFromApi,
  localProducts,
  normalizeProduct,
} from "@/lib/productsApi";
import ProductCard1 from "../productCards/ProductCard1";

const RECENTLY_VIEWED_KEY = "skydecor_recently_viewed_products";
const DEFAULT_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 4;
const MAX_SUGGESTIONS = 24;

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
    const keys = JSON.parse(window.localStorage.getItem(RECENTLY_VIEWED_KEY) || "[]");
    return Array.isArray(keys) ? keys.filter(Boolean) : [];
  } catch {
    return [];
  }
};

const getSearchableText = (product = {}) =>
  [
    product.productCode,
    product.productCodeSlug,
    product.productName,
    product.title,
    product.designName,
    product.productType,
    product.productTypeSlug,
    product.category,
    product.categorySlug,
    product.subCategory,
    product.subCategorySlug,
    product.texture,
    product.textureSlug,
    product.textureCode,
    product.size,
    product.thickness,
    product.width,
    ...(Array.isArray(product.tags) ? product.tags : [product.tags]),
    ...(product.filterBrands || []),
    ...(product.filterColor || []),
    ...(product.filterSizes || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

const searchProducts = (products = [], query = "") => {
  const terms = normalizeValue(query)
    .split(/\s+/)
    .filter(Boolean);

  if (!terms.length) return [];

  return products.filter((product) => {
    const searchableText = getSearchableText(product);
    return terms.every((term) => searchableText.includes(term));
  });
};

const buildKeywordTags = (products = []) => {
  const tagValues = products.flatMap((product) => [
    product.productType,
    product.category,
    product.subCategory,
    product.texture,
    product.textureCode,
  ]);

  return [...new Set(tagValues.filter(Boolean))]
    .sort((left, right) => left.localeCompare(right))
    .slice(0, 8);
};

const getProductTitle = (product = {}) =>
  product.productName || product.title || product.designName || product.productCode || "Product";

export default function SearchModal() {
  const router = useRouter();
  const hasRequestedProducts = useRef(false);
  const [backendProducts, setBackendProducts] = useState([]);
  const [productsStatus, setProductsStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);
  const [recentlyViewedKeys, setRecentlyViewedKeys] = useState([]);
  const catalogProducts = useMemo(() => {
    const sourceProducts = backendProducts.length ? backendProducts : localProducts;

    return uniqueProducts(sourceProducts.map(normalizeProduct));
  }, [backendProducts]);
  const keywordTags = useMemo(() => buildKeywordTags(catalogProducts), [catalogProducts]);
  const searchResults = useMemo(
    () => searchProducts(catalogProducts, query),
    [catalogProducts, query]
  );
  const hasQuery = Boolean(query.trim());
  const suggestionProducts = hasQuery ? searchResults.slice(0, MAX_SUGGESTIONS) : [];
  const recentlyViewedProducts = useMemo(() => {
    const productByKey = new Map(
      catalogProducts.map((product) => [getProductKey(product), product])
    );

    return recentlyViewedKeys
      .map((key) => productByKey.get(key))
      .filter(Boolean);
  }, [catalogProducts, recentlyViewedKeys]);
  const productsToRender = recentlyViewedProducts;
  const visibleProducts = productsToRender.slice(0, visibleCount);
  const emptyText = "Recently viewed products will appear here after you open product detail pages.";

  useEffect(() => {
    let shouldUpdate = true;

    const loadProducts = async () => {
      if (hasRequestedProducts.current) return;

      hasRequestedProducts.current = true;
      setProductsStatus("loading");
      const products = await getProductsFromApi({ limit: 1000, isActive: true });

      if (!shouldUpdate) return;

      if (products?.length) {
        setBackendProducts(products);
        setProductsStatus("succeeded");
      } else {
        hasRequestedProducts.current = false;
        setProductsStatus("failed");
      }
    };

    const refreshRecentlyViewed = () => setRecentlyViewedKeys(readRecentlyViewedKeys());
    const handleSearchModalShown = () => {
      refreshRecentlyViewed();
      loadProducts();
    };

    refreshRecentlyViewed();

    const searchModal = document.getElementById("search");
    searchModal?.addEventListener("shown.bs.modal", handleSearchModalShown);

    return () => {
      shouldUpdate = false;
      searchModal?.removeEventListener("shown.bs.modal", handleSearchModalShown);
    };
  }, []);

  useEffect(() => {
    setVisibleCount(DEFAULT_VISIBLE_COUNT);
  }, [query]);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((currentCount) => currentCount + LOAD_MORE_COUNT);
      setLoading(false);
    }, 250);
  };

  const applyKeyword = (keyword) => {
    setQuery(keyword);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    router.push(`/shop-default-grid?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="modal fade modal-search" id="search">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="d-flex justify-content-between align-items-center">
            <h5>Search</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <form className="form-search sky-search-form" onSubmit={handleSearchSubmit}>
            <fieldset className="text">
              <input
                type="text"
                placeholder="Search by product code, type, category, texture..."
                className=""
                name="text"
                tabIndex={0}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-required="true"
                autoComplete="off"
              />
            </fieldset>
            {hasQuery && (
              <button
                className="sky-search-clear"
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
            <button className="sky-search-submit" type="submit" aria-label="Search products">
              <svg
                className="icon"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.35 21.0004L17 16.6504"
                  stroke="#181818"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          {hasQuery ? (
            <div className="sky-search-suggestions">
              {productsStatus === "loading" && !suggestionProducts.length ? (
                <p className="sky-search-suggestion-empty">Searching products...</p>
              ) : suggestionProducts.length ? (
                suggestionProducts.map((product) => (
                  <Link
                    href={getProductDetailHref(product)}
                    className="sky-search-suggestion-item"
                    data-bs-dismiss="modal"
                    key={getProductKey(product)}
                  >
                    <Image
                      src={product.imgSrc || "/images/placeholder.jpg"}
                      alt={getProductTitle(product)}
                      width={72}
                      height={72}
                      loading="lazy"
                    />
                    <span className="sky-search-suggestion-content">
                      <span className="sky-search-suggestion-title">
                        {getProductTitle(product)}
                      </span>
                      <span className="sky-search-suggestion-meta">
                        {product.productCode || product.productCodeSlug || product.designName}
                      </span>
                      <span className="sky-search-suggestion-texture">
                        {product.texture || product.category || product.productType}
                      </span>
                    </span>
                  </Link>
                ))
              ) : (
                <p className="sky-search-suggestion-empty">
                  No suggestions found for &quot;{query.trim()}&quot;
                </p>
              )}
            </div>
          ) : (
            <>
              <div>
                <h5 className="mb_16">Featured keywords today</h5>
                <ul className="list-tags">
                  {keywordTags.map((keyword) => (
                    <li key={keyword}>
                      <button
                        type="button"
                        className="radius-60 link sky-search-tag"
                        onClick={() => applyKeyword(keyword)}
                      >
                        {keyword}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="mb_16">Recently viewed products</h6>
                {productsStatus === "loading" && (
                  <p className="text-caption-1 text-secondary mb_16">Loading products...</p>
                )}
                {!visibleProducts.length && productsStatus !== "loading" && (
                  <p className="text-caption-1 text-secondary mb_16">{emptyText}</p>
                )}
                <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                  {visibleProducts.map((product) => (
                    <ProductCard1 product={product} key={getProductKey(product)} />
                  ))}
                </div>
              </div>
              {/* Load Item */}

              {visibleCount >= productsToRender.length ? (
                ""
              ) : (
                <div
                  className="wd-load view-more-button text-center"
                  onClick={() => handleLoad()}
                >
                  <button
                    className={`tf-loading btn-loadmore tf-btn btn-reset ${
                      loading ? "loading" : ""
                    } `}
                  >
                    <span className="text text-btn text-btn-uppercase">
                      Load more
                    </span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
