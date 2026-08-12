"use client";
import React, { useState } from "react";
import Image from "next/image";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";
import { getProductDetailHref } from "@/lib/productsApi";

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

const getQuickProductSpecs = (product = {}) =>
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
<<<<<<< HEAD
    ["Thickness", "Starting from 0.5mm to 18mm"],
=======
>>>>>>> 3775944 (skydecor dubai final changes)
    ["Width", displayValue(product.width)],
  ].filter(([, value]) => value && value !== "-");

const getQuickProductImage = (product = {}) =>
  product.images?.[0] ||
  product.imgSrc ||
  (Array.isArray(product.image) ? product.image[0] : product.image) ||
  "/images/placeholder.jpg";

export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  const { quickViewItem = {} } = useContextElement();
  const productName = displayValue(
    quickViewItem.productName ||
      quickViewItem.title ||
      quickViewItem.designName ||
      quickViewItem.productCode,
    "Product"
  );
  const productPath = [
    displayValue(quickViewItem.productType),
    displayValue(quickViewItem.category),
    displayValue(quickViewItem.subCategory),
  ]
    .filter((value) => value && value !== "-")
    .join(" / ");
  const subtitle = [
    upperValue(quickViewItem.textureCode),
    upperValue(quickViewItem.designName),
  ]
    .filter(Boolean)
    .join(" / ");
  const specs = getQuickProductSpecs(quickViewItem);

  return (
    <div className="modal fullRight fade modal-quick-view" id="quickView">
      <div className="modal-dialog">
        <div className="modal-content">
          <Grid5
            firstItem={getQuickProductImage(quickViewItem)}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <div className="wrap mw-100p-hidden">
            <div className="header">
              <h5 className="title">{displayValue(quickViewItem.productType, "Quick View")}</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="tf-product-info-list sd-quick-product">
              <div className="tf-product-info-heading">
                <div className="tf-product-info-name">
                  <div className="text text-btn-uppercase">{subtitle || productPath}</div>
                  <h3 className="name">{productName}</h3>
                  {productPath && <p className="sd-quick-product__path">{productPath}</p>}
                </div>

                <div className="sd-quick-product__specs">
                  <h6>Specifications</h6>
                  <table>
                    <tbody>
                      {specs.map(([label, value]) => (
                        <tr key={label}>
                          <th scope="row">{label}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tf-product-info-choose-option">

                <div>
                  <div className="tf-product-info-by-btn mb_10">
                    <a
                      href={getProductDetailHref(quickViewItem)}
                      className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6"
                      data-bs-dismiss="modal"
                    >
                      <i className="far fa-eye me-2" />
                      View Product
                    </a>
                  </div>
                  {quickViewItem.pdfUrlPath && (
                    <a
                      href={quickViewItem.pdfUrlPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="btn-style-3 text-btn-uppercase"
                    >
                      <i className="far fa-file-pdf me-2" />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
