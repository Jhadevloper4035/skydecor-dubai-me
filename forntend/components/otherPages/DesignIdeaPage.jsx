"use client";

import Image from "next/image";
import Link from "next/link";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useRef } from "react";

import { designIdeaGalleryPlaceholders } from "@/data/designIdeas";

export default function DesignIdeaPage({ idea }) {
  const lightboxRef = useRef(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-design-idea__gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="page-title product-listing-banner">
        <picture className="product-listing-banner__artwork">
          <source
            media="(min-width: 1200px)"
            srcSet="/images/banners/product-desktop.jpeg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/banners/product-tablet.jpeg"
          />
          <img src="/images/banners/product-mobile.jpeg" alt="" />
        </picture>
        <div className="product-listing-banner__content">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h1 className="heading text-start">{idea.title}</h1>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>
                    <Link className="link" href="/#design-ideas">
                      Design Ideas
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>{idea.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="flat-spacing sd-design-idea">
        <div className="container">
          <div className="sd-about-manufacturing__intro sd-about-section-head--centered">
            <div>
              <p className="sd-about-eyebrow">Design Ideas</p>
              <h2>{idea.title}</h2>
              <span
                aria-hidden="true"
                className="sd-about-section-head__divider"
              />
              <p className="sd-about-manufacturing__description">
                {idea.intro}
              </p>
            </div>
          </div>

          <div className="sd-about-manufacturing__gallery sd-design-idea__gallery">
            {[{ src: idea.image, alt: idea.imageAlt }, ...designIdeaGalleryPlaceholders].map(
              (image, index) => (
                <a
                  className="sd-about-manufacturing__gallery-item"
                  href={image.src}
                  key={`${image.src}-${index}`}
                  data-pswp-width="1200"
                  data-pswp-height="800"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${image.alt}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
                  />
                  <span
                    className="sd-about-manufacturing__gallery-zoom"
                    aria-hidden="true"
                  >
                    <i className="fa-solid fa-magnifying-glass-plus" />
                  </span>
                </a>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
