"use client";

import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  catalogueCategories,
  catalogues,
  getCatalogueCategoryLabel,
} from "@/data/catalogues";

export default function CataloguesPage() {
  const lightboxRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleCatalogues = useMemo(
    () =>
      activeCategory === "all"
        ? catalogues
        : catalogues.filter(
            (catalogue) => catalogue.category === activeCategory,
          ),
    [activeCategory],
  );

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-catalogues-grid",
      children: ".sd-catalogue-card__image",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [visibleCatalogues]);

  return (
    <main className="sd-catalogues-page">
      <section className="sd-catalogues-library flat-spacing">
        <div className="container">
          <div className="sd-catalogues-library__head">
            <div>
              <span className="sd-events-kicker">Browse Collections</span>
              <h3 className="heading">E-catalogues</h3>
            </div>
            <p aria-live="polite">
              Showing <strong>{visibleCatalogues.length}</strong>{" "}
              {visibleCatalogues.length === 1 ? "catalogue" : "catalogues"}
            </p>
          </div>

          <div
            className="sd-catalogues-tabs"
            role="tablist"
            aria-label="Filter catalogues"
          >
            {catalogueCategories.map((category) => (
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

          <div className="sd-catalogues-grid">
            {visibleCatalogues.map((catalogue) => (
              <article className="sd-catalogue-card" key={catalogue.id}>
                <a
                  className="sd-catalogue-card__image"
                  href={catalogue.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-pswp-width="1240"
                  data-pswp-height="1520"
                  aria-label={`View ${catalogue.title} catalogue cover`}
                >
                  <Image
                    src={catalogue.image}
                    alt={`${catalogue.title} catalogue cover`}
                    width={620}
                    height={760}
                  />
                  <span className="sd-catalogue-card__tag">
                    {getCatalogueCategoryLabel(catalogue.category)}
                  </span>
                  <span className="sd-catalogue-card__preview">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    View catalogue
                  </span>
                </a>
                <div className="sd-catalogue-card__body">
                  <h4>{catalogue.title}</h4>
                  <p>{catalogue.description}</p>
                  <a
                    href={catalogue.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={catalogue.fileName}
                    className="sd-catalogue-card__download"
                  >
                    Download PDF
                    <i className="fa-solid fa-arrow-down" />
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
