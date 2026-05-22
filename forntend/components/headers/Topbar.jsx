"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function Topbar9() {
  return (
    <div className="tf-topbar style-2 type-space-lg topbar-fullwidth-2 bg-main">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 d-none d-xl-block">
            <div className="tf-cur">

              <ul className="topbar-left">
                <li>
                  <a className="text-caption-1 text-white" href="tel:315-666-6688">
                    315-666-6688
                  </a>
                </li>
                <li>
                  <a className="text-caption-1 text-white" href="#">
                    info@skydecor.eu
                  </a>
                </li>

              </ul>


            </div>
          </div>
          <div className="col-xl-6 col-12 text-center">
            <Swiper
              dir="ltr"
              className="swiper tf-sw-top_bar"
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
              }}
              loop
              speed={2000}
            >
              <SwiperSlide className="swiper-slide">
                <p className="top-bar-text text-line-clamp-1 text-btn-uppercase fw-semibold letter-1 text-white">
                  Premium Laminates &amp; Wall Panels — Transform Your Space with
                  <span className="text-primary"> SkyDecor</span>
                </p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <p className="top-bar-text text-line-clamp-1 text-btn-uppercase fw-semibold letter-1 text-white">
                 Premium Laminates & Wall Panels — brand intro with SkyDecor highlight
                </p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <p className="top-bar-text text-line-clamp-1 text-btn-uppercase fw-semibold letter-1 text-white">
                  Free Delivery on Laminate Orders — across Dubai & UAE
                </p>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-xl-3 d-none d-xl-block">
            <ul className="tf-social-icon style-fill style-fill-2 justify-content-end">
              <li>
                <a href="#" className="social-facebook">
                  <i className="fab fa-facebook-f fa-xs" />
                </a>
              </li>

              <li>
                <a href="#" className="social-instagram">
                  <i className="fab fa-instagram fa-xs" />
                </a>
              </li>


              <li>
                <a href="#" className="social-whatsapp">
                  <i className="fab fa-whatsapp fa-xs" />
                </a>
              </li>

              <li>
                <a href="#" className="social-youtube">
                  <i className="fab fa-youtube fa-xs" />
                </a>
              </li>
             
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
