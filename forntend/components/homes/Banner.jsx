import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="flat-spacing sd-home-collections">
      <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-home-collection-card">
          <div className="image-100 sd-home-collection-card__image">
            <Image
              src="/images/collections/1mm.jpeg"
              alt="Design Master HPL collection"
              className="lazyload"
              width={400}
              height={300}
            />
          </div>
          <div className="banner-text style-2 bg-brown-2 mb-0 sd-home-collection-card__content">
            <div className="box-title sd-home-collection-card__heading">
              <p className="text-btn-uppercase">Product Type</p>
              <h2 className="banner-heading">Design Master</h2>
            </div>
            <div className="sd-home-collection-card__details">
              <div className="sd-home-collection-card__copy">
                <p className="body-text-1">
                  Our HPL offers superior strength and a premium finish,
                  ideal for high-traffic surfaces, modular kitchens, and
                  commercial interiors across Dubai & UAE.
                </p>
                <p className="body-text-1">
                  Built for demanding environments, it delivers dependable
                  performance and design flexibility across every space.
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
      </div>
      <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-home-collection-card">
          <div className="banner-text style-2 bg-brown-2 mb-0 sd-home-collection-card__content">
            <div className="box-title sd-home-collection-card__heading">
              <p className="text-btn-uppercase">Product Type</p>
              <h2 className="banner-heading">Ambience collection</h2>
            </div>
            <div className="sd-home-collection-card__details">
              <div className="sd-home-collection-card__copy">
                <p className="body-text-1">
                  Lightweight yet durable, our HPL is perfect for
                  interior wall panels, furniture surfaces, and decorative
                  applications — available in a wide range of textures and finishes.
                </p>
                <p className="body-text-1">
                  Its versatile construction brings a clean, durable finish to
                  everyday interior projects without compromising practicality.
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
          </div>
          <div className="image-100 sd-home-collection-card__image">
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
    </section>
  );
}
