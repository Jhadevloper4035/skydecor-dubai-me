"use client";

import { useEffect, useMemo, useState } from "react";

const getProductTitle = (product = {}) =>
  String(product.productCode || product.productCodeSlug || product.productName || "SkyDecor Product")
    .trim()
    .toUpperCase();

export default function ProductShareModal({ product = {} }) {
  const [shareUrl, setShareUrl] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const productTitle = getProductTitle(product);
  const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);
  const encodedTitle = useMemo(() => encodeURIComponent(productTitle), [productTitle]);

  useEffect(() => {
    setShareUrl(window.location.href);
    setCopyLabel("Copy");
  }, [productTitle]);

  const copyShareUrl = async (event) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyLabel("Copied");
    } catch {
      setCopyLabel("Copy");
    }
  };

  return (
    <div className="modal fade tf-product-modal" id="share_social">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="demo-title">Share</div>
            <button
              type="button"
              className="sky-share-close"
              data-bs-dismiss="modal"
              aria-label="Close share modal"
            >
              <i className="fas fa-xmark" />
            </button>
          </div>

          <ul className="tf-social-icon d-flex gap-3">
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="box-icon social-facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="box-icon social-twiter"
              >
                <i className="fab fa-x-twitter" />
              </a>
            </li>
            <li>
              <a
                href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="box-icon social-instagram"
              >
                <i className="fab fa-whatsapp" />
              </a>
            </li>
            <li>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="box-icon social-tiktok"
              >
                <i className="fas fa-link" />
              </a>
            </li>
            <li>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="box-icon social-pinterest"
              >
                <i className="fab fa-pinterest-p" />
              </a>
            </li>
          </ul>

          <form className="form-share" onSubmit={copyShareUrl}>
            <input type="text" value={shareUrl} readOnly aria-label="Product share link" />
            <div className="button-submit">
              <button type="submit" className="tf-btn btn-fill">
                <span className="text">{copyLabel}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
