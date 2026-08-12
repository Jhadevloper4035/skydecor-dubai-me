import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="flat-spacing sd-home-collections">
      <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-home-collection-card">
          <div className="banner-text style-2 bg-brown-2 mb-0 sd-home-collection-card__content">
            <div className="box-title">
              <p className="text-btn-uppercase">Product Type</p>
              <h2 className="banner-heading">Ambience collection</h2>
              <p className="body-text-1">
                Durable decorative HPL for interior wall panels, furniture
                surfaces, and a wide range of textures and finishes.
              </p>
            </div>
            <div className="box-btn">
              <Link
                href="/products/product-type/decorative-hpl/category/ambience"
                className="btn-line"
              >
                View Products
              </Link>
            </div>
          </div>
          <div className="image-100">
            <Image
              src="/images/collections/0.8mm.jpeg"
              alt="Ambience HPL collection"
              className="lazyload"
              width={400}
              height={484}
            />
          </div>
        </div>
      </div>
      <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-home-collection-card">
          <div className="image-100">
            <Image
              src="/images/collections/1mm.jpeg"
              alt="Design Master HPL collection"
              className="lazyload"
              width={400}
              height={300}
            />
          </div>
          <div className="banner-text style-2 bg-brown-2 mb-0 sd-home-collection-card__content">
            <div className="box-title">
              <p className="text-btn-uppercase">Product Type</p>
              <h2 className="banner-heading">Design Master</h2>
              <p className="body-text-1">
                A premium HPL finish for high-traffic surfaces, modular
                kitchens, and commercial interiors across Dubai & UAE.
              </p>
            </div>
            <div className="box-btn">
              <Link
                href="/products/product-type/decorative-hpl/category/design-master"
                className="btn-line"
              >
                View Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
