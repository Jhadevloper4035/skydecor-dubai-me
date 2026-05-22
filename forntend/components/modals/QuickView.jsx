"use client";
import React, { useState } from "react";
import Image from "next/image";
import Grid5 from "../productDetails/grids/Grid5";
import { useContextElement } from "@/context/Context";

export default function QuickView() {
  const [activeColor, setActiveColor] = useState("gray");
  
  const {
    quickViewItem,
  } = useContextElement();

  const openModalSizeChoice = () => {
    const bootstrap = require("bootstrap"); 
    var myModal = new bootstrap.Modal(document.getElementById("size-guide"), {
      keyboard: false,
    });

    myModal.show();
    document
      .getElementById("size-guide")
      .addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    const backdrops = document.querySelectorAll(".modal-backdrop");
    if (backdrops.length > 1) {
      // Apply z-index to the last backdrop
      const lastBackdrop = backdrops[backdrops.length - 1];
      lastBackdrop.style.zIndex = "1057";
    }
  };
  return (
    <div className="modal fullRight fade modal-quick-view" id="quickView">
      <div className="modal-dialog">
        <div className="modal-content">
          <Grid5
            firstItem={quickViewItem.images?.[0] || quickViewItem.imgSrc}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <div className="wrap mw-100p-hidden">
            <div className="header">
              <h5 className="title">{quickViewItem.productType}</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="tf-product-info-list">
              <div className="tf-product-info-heading">
                <div className="tf-product-info-name">
                  <div className="text text-btn-uppercase">{quickViewItem.category}</div>
                  <h3 className="name">{quickViewItem.productName || quickViewItem.title}</h3>
                  <div className="sub">
                    <div className="tf-product-info-rate">
                      <div className="list-star">
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                        <i className="icon icon-star" />
                      </div>
                      <div className="text text-caption-1">(134 reviews)</div>
                    </div>
                    <div className="tf-product-info-sold">
                      <i className="icon icon-lightning" />
                      <div className="text text-caption-1">
                        18&nbsp;sold in last&nbsp;32&nbsp;hours
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tf-product-info-desc">
                  <p>
                    The garments labelled as Committed are products that have
                    been produced using sustainable fibres or processes,
                    reducing their environmental impact.
                  </p>
                  <div className="tf-product-info-liveview">
                    <i className="icon icon-eye" />
                    <p className="text-caption-1">
                      <span className="liveview-count">28</span> people are
                      viewing this right now
                    </p>
                  </div>
                </div>
              </div>
              <div className="tf-product-info-choose-option">

                <div>
                  <div className="tf-product-info-by-btn mb_10">
                    <a
                      href={`/product-detail/${quickViewItem.productCodeSlug || quickViewItem._id || quickViewItem.id}`}
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
