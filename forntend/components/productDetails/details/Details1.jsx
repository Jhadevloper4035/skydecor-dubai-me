"use client";

import React, { useMemo, useState } from "react";
import Slider1 from "../sliders/Slider1";
import ProductEnquiryModal from "../ProductEnquiryModal";
import ProductShareModal from "../ProductShareModal";
import { useContextElement } from "@/context/Context";

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

const formatProductName = (product = {}) =>
  upperValue(product.productName || product.title || product.designName || product.productCode);

const formatProductCode = (product = {}) =>
  upperValue(product.productCode || product.productCodeSlug || product._id || product.id);

const formatThickness = (value = "") => {
  const normalized = String(value).trim();
  if (!normalized) return "-";
  return normalized
    .replace(/\s*mm$/i, " mm")
    .replace(/(\d)(mm)$/i, "$1 mm");
};

const ProductSpecRow = ({ label, value }) => (
  <div className="sky-product-spec-row">
    <div className="sky-product-spec-label">{label}</div>
    <div className="sky-product-spec-value">{value || "-"}</div>
  </div>
);

export default function Details1({ product = {} }) {
  const [activeColor, setActiveColor] = useState("gray");
  const productId = product._id || product.id || product.productCode;
  const productTitle = formatProductCode(product);
  const productName = formatProductName(product);
  const designName = displayValue(product?.designName);
  const {
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  const safeProductImages = useMemo(() => {
    const productImages = product?.images?.length
      ? product.images
      : [
          product?.imgSrc,
          ...(Array.isArray(product?.image) ? product.image : [product?.image]),
        ].filter(Boolean);

    return productImages.length ? productImages : ["/images/placeholder.jpg"];
  }, [product]);
  const slideItems = useMemo(
    () =>
      safeProductImages.map((src, index) => ({
        id: index + 1,
        color: "gray",
        src,
        alt: productTitle,
        width: 600,
        height: 800,
      })),
    [productTitle, safeProductImages]
  );
  const collectionPath = [
    displayValue(product.productType),
    displayValue(product.category),
    displayValue(product.subCategory),
  ]
    .filter((value) => value && value !== "-")
    .join(" / ");
  const detailsHref = product.pdfUrlPath || "#";

  return (
    <>
      <section className="flat-spacing sky-product-detail-section">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  <div className="tf-zoom-main" />
                  <Slider1
                    setActiveColor={setActiveColor}
                    activeColor={activeColor}
                    firstItem={safeProductImages[0]}
                    slideItems={slideItems}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="sky-product-detail-panel tf-product-info-list">
                  <header className="sky-product-detail-header">
                    <h1>{productTitle}</h1>
                    <p>
                      {[upperValue(product.textureCode), upperValue(product.designName)]
                        .filter(Boolean)
                        .join(" - ")}
                    </p>
                  </header>

                  <div className="sky-product-meta">
                    <span>
                      <i className="fa-solid fa-layer-group" />
                      {collectionPath || "Skydecor Products"}
                    </span>
                    <span>
                      <i className="fa-solid fa-palette" />
                      Code: {productTitle}
                    </span>
                  </div>

                  <div className="sky-product-specs">
                    <ProductSpecRow label="Product Name" value={productName} />
                    <ProductSpecRow label="Design Name" value={designName} />
                    <ProductSpecRow label="Product Type" value={displayValue(product.productType)} />
                    <ProductSpecRow label="Category" value={displayValue(product.category)} />
                    <ProductSpecRow label="Sub Category" value={displayValue(product.subCategory)} />
                    <ProductSpecRow label="Texture" value={displayValue(product.texture)} />
                    <ProductSpecRow label="Thickness" value={formatThickness(product.thickness)} />
                  </div>

                  <div className="tf-product-info-by-btn sky-product-action-row mb_10 mt_24">
                    <a
                      href="#ask_question"
                      data-bs-toggle="modal"
                      className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
                    >
                      <span>Product Enquiry</span>
                    </a>
                    <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      aria-controls="compare"
                      onClick={() => addToCompareItem(productId)}
                      className="box-icon hover-tooltip compare btn-icon-action"
                    >
                      <i className="fas fa-right-left" />
                      <span className="tooltip text-caption-2">
                        {isAddedtoCompareItem(productId) ? "Already compared" : "Compare"}
                      </span>
                    </a>
                  </div>

                  <a
                    href={detailsHref}
                    target={product.pdfUrlPath ? "_blank" : undefined}
                    rel={product.pdfUrlPath ? "noopener noreferrer" : undefined}
                    download
                    className={`btn-style-3 text-btn-uppercase ${
                      product.pdfUrlPath ? "" : "disabled"
                    }`}
                    aria-disabled={!product.pdfUrlPath}
                  >
                    Download Product PDF
                  </a>

                  <div className="tf-product-info-help mt_24">
                    <div className="tf-product-info-extra-link">
                      <a
                        href="#delivery_return"
                        data-bs-toggle="modal"
                        className="tf-product-extra-icon"
                      >
                        <div className="icon">
                          <i className="fas fa-truck" />
                        </div>
                        <p className="text-caption-1">Delivery &amp; Return</p>
                      </a>
                      <a
                        href="#ask_question"
                        data-bs-toggle="modal"
                        className="tf-product-extra-icon"
                      >
                        <div className="icon">
                          <i className="far fa-circle-question" />
                        </div>
                        <p className="text-caption-1">Ask A Question</p>
                      </a>
                      <a
                        href="#share_social"
                        data-bs-toggle="modal"
                        className="tf-product-extra-icon sky-product-extra-button"
                      >
                        <div className="icon">
                          <i className="fas fa-share" />
                        </div>
                        <p className="text-caption-1">Share</p>
                      </a>
                    </div>
                    <div className="tf-product-info-time">
                      <div className="icon">
                        <i className="far fa-clock" />
                      </div>
                      <p className="text-caption-1">
                        Estimated Delivery:&nbsp;&nbsp;<span>12-26 days</span>
                        (International), <span>3-6 days</span> (United States)
                      </p>
                    </div>
                    <div className="dropdown dropdown-store-location">
                      <div
                        className="dropdown-title dropdown-backdrop"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                      >
                        <div className="tf-product-info-view link">
                          <div className="icon">
                            <i className="fas fa-location-dot" />
                          </div>
                          <span>View Store Information</span>
                        </div>
                      </div>
                      <div className="dropdown-menu dropdown-menu-end">
                        <div className="dropdown-content">
                          <div className="dropdown-content-heading">
                            <h5>Store Location</h5>
                            <i className="icon icon-close" />
                          </div>
                          <div className="line-bt" />
                          <div>
                            <h6>SkyDecor Dubai</h6>
                            <p>Product consultations and laminate enquiries available.</p>
                          </div>
                          <div>
                            <p>Dubai, United Arab Emirates</p>
                            <p>Call: 315-666-6688</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductEnquiryModal product={product} />
      <ProductShareModal product={product} />
      <div className="modal fade modalCentered" id="delivery_return">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Delivery &amp; Return</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="tf-product-popup-delivery">
                <div className="title">Delivery</div>
                <p>
                  Estimated delivery is 12-26 days for international shipments and
                  3-6 days for United States shipments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
