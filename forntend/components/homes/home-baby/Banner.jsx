import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="flat-spacing " style={{ backgroundColor: "#f4f0e9"}}>
      <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden">
          <div className="banner-text style-2 bg-brown-2 mb-0 d-md-flex flex-md-column justify-content-md-center h-md-100">
            <div className="box-title">
              <p className="text-btn-uppercase">Laminate Collection</p>
              <h2 className="banner-heading">
                0.8mm Laminates
              </h2>
              <p className="body-text-1">
                Lightweight yet durable, our 0.8mm laminates are perfect for
                interior wall panels, furniture surfaces, and decorative
                applications — available in a wide range of textures and finishes.
              </p>
            </div>
            <div className="box-btn">
              <a href="#" className="btn-line">
                Shop Now
              </a>
            </div>
          </div>
          <div className="image-100">
            <Image
              src="/images/collections/0.8mm.jpeg"
              data-=""
              alt=""
              className="lazyload"
              width={400}
              height={484}
            />
          </div>
        </div>
      </div>
       <div className="container wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s">
        <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden">
          <div className="image-100">
            <Image
              src="/images/collections/1mm.jpeg"
              data-=""
              alt=""
              className="lazyload"
              width={400}
              height={300}
            />
          </div>
          <div className="banner-text style-2 bg-brown-2 mb-0 d-md-flex flex-md-column justify-content-md-center h-md-100">
            <div className="box-title">
              <p className="text-btn-uppercase">Laminate Collection</p>
              <h2 className="banner-heading">
                1mm Laminates
              </h2>
              <p className="body-text-1">
                Our 1mm laminates offer superior strength and a premium finish,
                ideal for high-traffic surfaces, modular kitchens, and
                commercial interiors across Dubai & UAE.
              </p>
            </div>
            <div className="box-btn">
              <a href="#" className="btn-line">
                Shop Now
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
