"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useContextElement } from "@/context/Context";
import { getProductDetailHref } from "@/lib/productsApi";
import useComparedProducts from "@/lib/useComparedProducts";

const titleCase = (value = "") =>
  String(value)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const upperValue = (value = "") => String(value || "").trim().toUpperCase();

const displayValue = (value, fallback = "-") => {
  if (value === undefined || value === null || value === "") return fallback;
  return titleCase(value);
};

const displayCode = (product = {}) =>
  upperValue(product.productCode || product.productCodeSlug || product._id || product.id);

const normalizeLookup = (value) => String(value || "").trim().toLowerCase();

const productLookupValues = (product = {}) =>
  [product._id, product.id, product.productCodeSlug, product.productCode].filter(Boolean);

const findCompareItemId = (product = {}, compareItem = []) =>
  compareItem.find((id) =>
    productLookupValues(product).some(
      (value) => normalizeLookup(value) === normalizeLookup(id)
    )
  ) || product._id || product.id;

const displayName = (product = {}) =>
  upperValue(product.productName || product.title || product.designName || product.productCode);

const formatThickness = (value = "") => {
  const normalized = String(value).trim();
  if (!normalized) return "-";

  return normalized.replace(/\s*mm$/i, " mm").replace(/(\d)(mm)$/i, "$1 mm");
};

const productRows = [
  ["Product Name", displayName],
  ["Design Name", (product) => displayValue(product.designName)],
  ["Product Type", (product) => displayValue(product.productType)],
  ["Category", (product) => displayValue(product.category)],
  ["Sub Category", (product) => displayValue(product.subCategory)],
  ["Texture", (product) => displayValue(product.texture)],
  ["Texture Code", (product) => upperValue(product.textureCode) || "-"],
  ["Size", (product) => product.size || "-"],
  ["Thickness", (product) => formatThickness(product.thickness)],
  ["Width", (product) => product.width || "-"],
  [
    "Availability",
    (product) =>
      product.inStock || product.status === "active" || product.isActive
        ? "Available"
        : "Unavailable",
  ],
];

export default function ProductCompare() {
  const { compareItem, removeFromCompareItem } = useContextElement();
  const items = useComparedProducts(compareItem);

  return (
    <section className="flat-spacing">
      <div className="container">
        {!items.length ? (
          <div>
            No items to compare yet. Add products to your comparison list and
            decide smarter!{" "}
            <Link className="btn-line" href="/shop-default-grid">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="tf-compare-table">
            <div className="tf-compare-row tf-compare-grid">
              <div className="tf-compare-col d-md-block d-none" />
              {items.map((product) => (
                <div
                  key={product._id || product.id || product.productCode}
                  className="tf-compare-col"
                >
                  <div className="tf-compare-item">
                    <button
                      type="button"
                      className="sky-compare-remove"
                      aria-label={`Remove ${displayCode(product)} from compare`}
                      onClick={() =>
                        removeFromCompareItem(findCompareItemId(product, compareItem))
                      }
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                    <Link
                      className="tf-compare-image"
                      href={getProductDetailHref(product)}
                    >
                      <Image
                        loading="lazy"
                        decoding="async"
                        className="lazyload"
                        alt={displayCode(product)}
                        src={product.imgSrc}
                        width={600}
                        height={800}
                      />
                    </Link>
                    <div className="tf-compare-content">
                      <Link
                        className="link text-title text-line-clamp-1"
                        href={getProductDetailHref(product)}
                      >
                        {displayCode(product)}
                      </Link>
                      <p className="desc text-caption-1">
                        {[displayValue(product.designName), displayValue(product.texture)]
                          .filter((value) => value !== "-")
                          .join(" - ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {productRows.map(([label, getValue]) => (
              <div key={label} className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>{label}</h6>
                </div>
                {items.map((product) => (
                  <div
                    key={`${product._id || product.id || product.productCode}-${label}`}
                    className="tf-compare-col tf-compare-field text-center"
                  >
                    <span className="tf-compare-value">{getValue(product)}</span>
                  </div>
                ))}
              </div>
            ))}

            <div className="tf-compare-row">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Product PDF</h6>
              </div>
              {items.map((product) => (
                <div
                  key={`${product._id || product.id || product.productCode}-pdf`}
                  className="tf-compare-col tf-compare-field text-center"
                >
                  {product.pdfUrlPath ? (
                    <a
                      className="btn-line"
                      href={product.pdfUrlPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      Download PDF
                    </a>
                  ) : (
                    <span className="tf-compare-value">-</span>
                  )}
                </div>
              ))}
            </div>

            <div className="tf-compare-row">
              <div className="tf-compare-col tf-compare-field d-md-block d-none">
                <h6>Details</h6>
              </div>
              {items.map((product) => (
                <div
                  key={`${product._id || product.id || product.productCode}-details`}
                  className="tf-compare-col tf-compare-field tf-compare-viewcart text-center"
                >
                  <Link className="btn-view-cart" href={getProductDetailHref(product)}>
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
