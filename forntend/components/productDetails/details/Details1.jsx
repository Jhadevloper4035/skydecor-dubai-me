"use client";

import Drift from "drift-zoom";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductInquiryModal from "../ProductInquiryModal";
import ProductShareModal from "../ProductShareModal";

const FALLBACK_IMAGE = "/images/placeholder.jpg";
const LIGHTBOX_IMAGE_WIDTH =300;
const LIGHTBOX_IMAGE_HEIGHT = 600;

const DEFAULT_DESCRIPTION =
  "Explore premium Skydecor surface finishes for reliable interior applications, furniture, wall panels, and project-ready design details.";

const DEFAULT_FEATURES = [
  "Premium decorative HPL surface",
  "Durable finish for residential and commercial interiors",
  "Easy to clean and maintain",
  "Suitable for furniture, wall panels, and cabinetry",
  "Available for project and sample inquiries",
];

const DEFAULT_WARRANTY =
  "Warranty and performance terms vary by collection, thickness, and product application.";

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

const getProductImages = (product = {}) => {
  const images = product?.images?.length
    ? product.images
    : [
        product?.imgSrc,
        ...(Array.isArray(product?.image) ? product.image : [product?.image]),
      ];

  const cleanImages = images.filter(Boolean);
  return cleanImages.length ? cleanImages : [FALLBACK_IMAGE];
};

const getProductFeatures = (product = {}) => {
  const features = Array.isArray(product.features)
    ? product.features
    : String(product.features || "")
        .split(/\n|,/)
        .map((feature) => feature.trim())
        .filter(Boolean);

  return features.length ? features : DEFAULT_FEATURES;
};

const getProductSpecs = (product = {}) =>
  [
    ["Product Code", upperValue(product.productCode || product.productCodeSlug)],
    ["Product Name", displayValue(product.productName || product.title)],
    ["Design Name", displayValue(product.designName)],
    ["Product Type", displayValue(product.productType)],
    ["Category", displayValue(product.category)],
    ["Sub Category", displayValue(product.subCategory)],
    ["Texture Code", upperValue(product.textureCode)],
    ["Texture", displayValue(product.texture)],
    ["Size", displayValue(product.size)],
    ["Thickness", "Starting from 0.5mm to 18mm"],
    ["Width", displayValue(product.width)],
  ].filter(([, value]) => value && value !== "-");

export default function Details1({ product = {} }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryRef = useRef(null);
  const productName = displayValue(
    product.productName || product.title || product.designName || product.productCode,
    "Product"
  );

  const productImages = useMemo(() => getProductImages(product), [product]);
  const thumbnailImages = productImages.slice(0, 4);
  const activeImage = productImages[activeImageIndex] || productImages[0];

  const productPath = [
    displayValue(product.productType),
    displayValue(product.category),
    displayValue(product.subCategory),
  ]
    .filter((value) => value && value !== "-")
    .join(" / ");

  const detailsHref = product.pdfUrlPath || "#";
  const subtitle = [
    upperValue(product.textureCode),
    upperValue(product.designName),
  ]
    .filter(Boolean)
    .join(" / ");
  const description =
    product.description || product.shortDescription || DEFAULT_DESCRIPTION;
  const specs = getProductSpecs(product);
  const features = getProductFeatures(product);
  const warranty = product.warrantyText || product.warranty || DEFAULT_WARRANTY;

  useEffect(() => {
    const root = galleryRef.current;
    const zoomImage = root?.querySelector(".tf-image-zoom");
    if (!zoomImage) return undefined;

    const drift = new Drift(zoomImage, {
      zoomFactor: 2,
      inlinePane: true,
      handleTouch: false,
      containInline: true,
    });
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#product-detail-gallery",
      children: ".product-detail__preview-link",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    return () => {
      drift.destroy?.();
      lightbox.destroy();
    };
  }, [activeImage]);

  return (
    <>
      <section className="product-detail sky-product-detail-section section-image-zoom">
        <div className="container-lg">
          <div className="product-detail__layout">
            <div
              className="product-detail__gallery"
              id="product-detail-gallery"
              ref={galleryRef}
              aria-label={`${productName} images`}
            >
              <figure className="product-detail__preview">
                <a
                  className="product-detail__preview-link"
                  href={activeImage}
                  data-pswp-width={LIGHTBOX_IMAGE_WIDTH}
                  data-pswp-height={LIGHTBOX_IMAGE_HEIGHT}
                >
                  <img
                    className="tf-image-zoom"
                    src={activeImage}
                    data-zoom={activeImage}
                    alt={productName}
                  />
                </a>
                <span className="product-detail__zoom-icon" aria-hidden="true">
                  <i className="fas fa-magnifying-glass" />
                </span>
              </figure>
              <div className="product-detail__thumbs" aria-label="Application images">
                {thumbnailImages.map((image, index) => (
                  <button
                    className={index === activeImageIndex ? "active" : ""}
                    type="button"
                    key={`${image}-${index}`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show ${productName} image ${index + 1}`}
                  >
                    <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail__summary">
              <h1>{productName}</h1>
              <p className="product-detail__eyebrow">
                {subtitle || productPath || "Skydecor Product"}
              </p>
              <p className="product-detail__copy">{description}</p>

              <div className="product-detail__specs">
                <h2>Specifications</h2>
                <table>
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{value || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="product-detail__actions">
                <a
                  className="product-detail__inquiry"
                  href="#product_inquiry"
                  data-bs-toggle="modal"
                >
                  <span>Make an Inquiry</span>
                  <i className="far fa-comment" />
                </a>
                <a
                  className={`product-detail__download ${product.pdfUrlPath ? "" : "disabled"}`}
                  href={detailsHref}
                  target={product.pdfUrlPath ? "_blank" : undefined}
                  rel={product.pdfUrlPath ? "noopener noreferrer" : undefined}
                  download
                  aria-disabled={!product.pdfUrlPath}
                >
                  <span>Download PDF</span>
                  <i className="fas fa-download" />
                </a>
                <a
                  className="product-detail__share"
                  href="#share_social"
                  data-bs-toggle="modal"
                >
                  <span>Share</span>
                  <i className="fas fa-share-nodes" />
                </a>
              </div>

              <div className="product-detail__tabs">
                <ul className="nav" role="tablist">
                  <li role="presentation">
                    <button
                      className="active"
                      id="features-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#features-panel"
                      type="button"
                      role="tab"
                      aria-controls="features-panel"
                      aria-selected="true"
                    >
                      Features
                    </button>
                  </li>
                  <li role="presentation">
                    <button
                      id="warranty-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#warranty-panel"
                      type="button"
                      role="tab"
                      aria-controls="warranty-panel"
                      aria-selected="false"
                    >
                      Warranty
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="features-panel"
                    role="tabpanel"
                    aria-labelledby="features-tab"
                  >
                    <ul>
                      {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="warranty-panel"
                    role="tabpanel"
                    aria-labelledby="warranty-tab"
                  >
                    <p>{warranty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductInquiryModal product={product} />
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
