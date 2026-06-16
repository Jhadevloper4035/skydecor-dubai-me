"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { getProductDetailHref } from "@/lib/productsApi";

const normalizeProductPathValue = (value = "") =>
  String(value).trim().toLowerCase().replace(/\s+/g, "-");

const formatProductLabel = (value = "") =>
  String(value)
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const buildProductImageUrl = (product = {}) => {
  const productType = normalizeProductPathValue(product.productType);
  const category = normalizeProductPathValue(product.category);
  const assetCollection =
    productType === "decorative-hpl" && category ? category : productType;
  const productCode = String(product.productCode || product.productCodeSlug || "")
    .trim()
    .toUpperCase();

  if (!assetCollection || !productCode) return "";

  return `https://skydecor-bucket-dubai.s3.ap-south-1.amazonaws.com/assets/products/${assetCollection}/${productCode}.jpg`;
};

const getProductImages = (product = {}) => {
  const images = product.images?.length
    ? product.images
    : Array.isArray(product.image)
      ? product.image
      : [product.image].filter(Boolean);

  const normalizedImages = images.filter(Boolean);
  const firstImage =
    product.imgSrc ||
    normalizedImages[0] ||
    buildProductImageUrl(product) ||
    "/images/placeholder.jpg";
  const secondImage = product.imgHover || normalizedImages[1] || firstImage;

  return {
    imgSrc: firstImage,
    imgHover: secondImage,
  };
};

export default function ProductCard1({
  product,
  gridClass = "",
  parentClass = "card-product wow fadeInUp",
  isNotImageRatio = false,
  radiusClass = "",
}) {
  const { imgSrc, imgHover } = getProductImages(product);
  const productId = product._id || product.id;
  const productHref = getProductDetailHref(product);

  const [currentImage, setCurrentImage] = useState(imgSrc);

  const {
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(getProductImages(product).imgSrc);
  }, [product]);

  return (
    <div className={`${parentClass} ${gridClass}`}>
      <div
        className={`card-product-wrapper ${
          isNotImageRatio ? "aspect-ratio-0" : ""
        } ${radiusClass}`}
      >
        <Link
          href={productHref}
          className="product-img"
        >
          <Image
            loading="lazy"
            decoding="async"
            className="lazyload img-product"
            src={currentImage}
            alt={product.productName || product.designName || "Product"}
            width={600}
            height={800}
          />
          <Image
            loading="lazy"
            decoding="async"
            className="lazyload img-hover"
            src={imgHover}
            alt={product.productName || product.designName || "Product"}
            width={600}
            height={800}
          />
        </Link>

        <div className="list-product-btn product-card-actions">
          {product.pdfUrlPath && (
            <a
              href={product.pdfUrlPath}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="box-icon btn-icon-action product-card-action"
              aria-label="Download PDF"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3.75h6.25L17 7.5v12.75H7z" />
                <path d="M13 3.75V7.5h4" />
                <path d="M12 10.5v6" />
                <path d="m9.75 14.25 2.25 2.25 2.25-2.25" />
              </svg>
              <span className="tooltip">Download PDF</span>
            </a>
          )}
          <a
            href="#quickView"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon quickview tf-btn-loading product-card-action"
            aria-label="Quick View"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 12s3.1-5 8.5-5 8.5 5 8.5 5-3.1 5-8.5 5-8.5-5-8.5-5Z" />
              <circle cx="12" cy="12" r="2.25" />
            </svg>
            <span className="tooltip">Quick View</span>
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="compare"
            onClick={() => addToCompareItem(productId)}
            className="box-icon compare btn-icon-action product-card-action"
            aria-label={
              isAddedtoCompareItem(productId) ? "Already compared" : "Compare"
            }
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h13" />
              <path d="m15 5 3 3-3 3" />
              <path d="M19 16H6" />
              <path d="m9 13-3 3 3 3" />
            </svg>
            <span className="tooltip">
              {isAddedtoCompareItem(productId) ? "Already compared" : "Compare"}
            </span>
          </a>
        </div>

        <div className="list-btn-main">
          <Link
            href={productHref}
            className="btn-main-product"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="card-product-info">
        <Link
          href={productHref}
          className="title link text-uppercase"
        >
          {product.productName}
        </Link>
        {product.designName && (
          <p className="text-caption-1 text-secondary text-uppercase">
            {formatProductLabel(product.category || product.productType)}
          </p>
        )}
       
      </div>
    </div>
  );
}
