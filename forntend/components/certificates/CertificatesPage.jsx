"use client";

import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  certificateCategories,
  certificates,
  getCertificateCategoryLabel,
} from "@/data/certificates";

export default function CertificatesPage() {
  const lightboxRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleCertificates = useMemo(
    () =>
      activeCategory === "all"
        ? certificates
        : certificates.filter(
            (certificate) => certificate.category === activeCategory,
          ),
    [activeCategory],
  );

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-certificates-grid",
      children: ".sd-certificate-card__image",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [visibleCertificates]);

  return (
    <main className="sd-certificates-page">
      <section className="sd-certificates-library flat-spacing">
        <div className="container">
          <div className="sd-certificates-library__head">
            <div>
              <span className="sd-events-kicker">Document Library</span>
              <h3 className="heading">Our certifications</h3>
            </div>
            <p aria-live="polite">
              Showing <strong>{visibleCertificates.length}</strong>{" "}
              {visibleCertificates.length === 1
                ? "certificate"
                : "certificates"}
            </p>
          </div>

          <div
            className="sd-certificates-tabs"
            role="tablist"
            aria-label="Filter certificates"
          >
            {certificateCategories.map((category) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === category.value}
                className={activeCategory === category.value ? "active" : ""}
                onClick={() => setActiveCategory(category.value)}
                key={category.value}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="sd-certificates-grid">
            {visibleCertificates.map((certificate) => (
              <article className="sd-certificate-card" key={certificate.id}>
                <a
                  className="sd-certificate-card__image"
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-pswp-width="1200"
                  data-pswp-height="1600"
                  aria-label={`View ${certificate.title}`}
                >
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    width={360}
                    height={480}
                  />
                  <span>
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    View
                  </span>
                </a>
                <div className="sd-certificate-card__body">
                  <span
                    className={`sd-certificate-card__badge sd-certificate-card__badge--${certificate.category}`}
                  >
                    {getCertificateCategoryLabel(certificate.category)}
                  </span>
                  <h4>{certificate.title}</h4>
                  <a
                    href={certificate.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sd-certificate-card__download"
                    aria-label={`Download ${certificate.title} PDF`}
                  >
                    <i className="fa-solid fa-arrow-down" />
                    Download PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
