"use client";

import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  catalogCategories,
  catalogs,
  getCatalogCategoryLabel,
} from "@/data/catalogs";

export default function CatalogsPage() {
  const lightboxRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleCatalogs = useMemo(
    () =>
      activeCategory === "all"
        ? catalogs
        : catalogs.filter((catalog) => catalog.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-catalogs-grid",
      children: ".sd-catalog-card__image",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [visibleCatalogs]);

  return (
    <main className="sd-catalogs-page">
      <section className="sd-catalogs-library flat-spacing">
        <div className="container">
          <div className="sd-catalogs-library__head">
            <div>
              <span className="sd-events-kicker">Browse Collections</span>
              <h3 className="heading">E-Catalogues</h3>
            </div>
            <p aria-live="polite">
              Showing <strong>{visibleCatalogs.length}</strong>{" "}
              {visibleCatalogs.length === 1 ? "catalogue" : "catalogues"}
            </p>
          </div>

          <div
            className="sd-catalogs-tabs"
            role="tablist"
            aria-label="Filter catalogues"
          >
            {catalogCategories.map((category) => (
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

          <div className="sd-catalogs-grid">
            {visibleCatalogs.map((catalog) => (
              <article className="sd-catalog-card" key={catalog.id}>
                <a
                  className="sd-catalog-card__image"
                  href={catalog.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-pswp-width="1240"
                  data-pswp-height="1520"
                  aria-label={`View ${catalog.title} catalogue cover`}
                >
                  <Image
                    src={catalog.image}
                    alt={`${catalog.title} catalogue cover`}
                    width={620}
                    height={760}
                  />
                  <span className="sd-catalog-card__tag">
                    {getCatalogCategoryLabel(catalog.category)}
                  </span>
                  <span className="sd-catalog-card__preview">
                    <i className="fa-solid fa-magnifying-glass-plus" />
                    View catalogue
                  </span>
                </a>
                <div className="sd-catalog-card__body">
                  <h4>{catalog.title}</h4>
                  <p>{catalog.description}</p>
                  <a
                    href={catalog.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={catalog.fileName}
                    className="sd-catalog-card__download"
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
