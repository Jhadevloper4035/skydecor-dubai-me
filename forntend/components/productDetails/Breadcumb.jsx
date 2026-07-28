"use client";
import Link from "next/link";
import React from "react";

import { createProductFilterHref } from "@/lib/productsApi";

const formatLabel = (value = "") =>
  String(value)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatSlug = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

export default function Breadcumb({ product = {}, currentSlug = "" }) {
  const productType = String(product.productType || "").trim();
  const category = String(product.category || "").trim();
  const productCode = formatSlug(
    product.productCodeSlug ||
      currentSlug ||
    product.productCode ||
      product.title ||
      product._id ||
      product.id ||
      "Product",
  );
  const breadcrumbLinks = [
    productType
      ? {
          label: formatLabel(productType),
          href: createProductFilterHref({ productType }),
        }
      : null,
    category
      ? {
          label: formatLabel(category),
          href: createProductFilterHref({ productType, category }),
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="tf-breadcrumb">
      <div className="container">
        <div className="tf-breadcrumb-wrap">
          <div className="tf-breadcrumb-list">
            <Link href="/" className="text text-caption-1 text-decoration-none">
              Home
            </Link>

            {breadcrumbLinks.map((link) => (
              <React.Fragment key={link.href}>
                <span className="text text-caption-1" aria-hidden="true">
                  &gt;
                </span>
                <Link
                  href={link.href}
                  className="text text-caption-1 text-decoration-none"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}

            <span className="text text-caption-1" aria-hidden="true">
              &gt;
            </span>
            <span className="text text-caption-1">
              {productCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
