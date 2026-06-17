"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { contactDetails } from "@/data/contactDetails";
import { socialLinks } from "@/data/footerLinks";

export default function Topbar() {
  return (
    <div className="tf-topbar style-2 type-space-lg topbar-fullwidth-2 bg-main">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-4 d-none d-xl-block">
            <div className="tf-cur">
              <ul className="topbar-left">
                <li>
                  <a
                    className="text-caption-1 text-white sd-topbar-contact-pill"
                    href={contactDetails.phoneHref}
                  >
                    {contactDetails.phoneLabel}
                  </a>
                </li>
                <li>
                  <a
                    className="text-caption-1 text-white"
                    href={`mailto:${contactDetails.email}`}
                  >
                    {contactDetails.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-5 col-12 text-center">
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
                  Premium Laminates &amp; Wall Panels - Transform Your Space with
                  <span className="text-primary"> skydecor</span>
                </p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <p className="top-bar-text text-line-clamp-1 text-btn-uppercase fw-semibold letter-1 text-white">
                  Surface solutions for residential and commercial interiors
                </p>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <p className="top-bar-text text-line-clamp-1 text-btn-uppercase fw-semibold letter-1 text-white">
                  Supporting interior projects across Dubai &amp; the UAE
                </p>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-xl-3 d-none d-xl-block">
            <ul className="tf-social-icon style-fill style-fill-2 justify-content-end">
              {socialLinks.map((link) => (
                <li key={link.className}>
                  <a
                    href={link.href}
                    className={link.className}
                    aria-label={link.className.replace("social-", "")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={link.iconClass} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
