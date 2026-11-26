"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import { slides } from "@/data/heroSlides";

export default function Hero() {
  const swiperRef = useRef(null);

  return (
    <section className="tf-slideshow slider-default slider-effect-fade">
      <Swiper
        effect="fade"
        spaceBetween={0}
        centeredSlides={false}
        slidesPerView={1}
        loop={true}
        modules={[EffectFade, Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        dir="ltr"
        className="swiper tf-sw-slideshow"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive, isNext, isPrev }) => (
            <div
              className={`wrap-slider${
                slide.tabletImgSrc ? " home-hero-banner" : ""
              }`}
            >
              {(index === 0 || isActive || isNext || isPrev) && (slide.tabletImgSrc ? (
                <picture className="home-hero-picture">
                  {slide.mobileImgSrc && (
                    <source
                      media="(max-width: 767px)"
                      srcSet={slide.mobileImgSrc}
                    />
                  )}
                  <source
                    media="(max-width: 1024px)"
                    srcSet={slide.tabletImgSrc}
                  />
                  <Image
                    alt={slide.alt}
                    src={slide.imgSrc}
                    fill
                    sizes="100vw"
                    fetchPriority="high"
                    loading="eager"
                  />
                </picture>
              ) : slide.mobileImgSrc ? (
                <picture>
                  <source media="(max-width: 767px)" srcSet={slide.mobileImgSrc} />
                  <Image
                    alt={slide.alt}
                    src={slide.imgSrc}
                    width={1920}
                    height={803}
                  />
                </picture>
              ) : (
                <Image
                  alt={slide.alt}
                  src={slide.imgSrc}
                  width={1920}
                  height={803}
                />
              ))}
              <div className="box-content">
                <div className="content-slider">
                  <div className="box-title-slider">
                    {/* <p className="fade-item fade-item-1 subheading text-btn-uppercase text-white">
                      {slide.subheading}
                    </p> */}
                    {/* <div className="fade-item fade-item-2 heading text-white title-display">
                      {slide.heading.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div> */}
                  </div>
                  <div className="fade-item fade-item-3 box-btn-slider">
                    {/* <Link href="/products" className="tf-btn btn-fill btn-white">
                      <span className="text">{slide.btnText}</span>
                      <i className="icon icon-arrowUpRight" />
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="home-hero-nav home-hero-nav--previous"
        aria-label="Show previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5L8 12L15 19" />
        </svg>
      </button>
      <button
        type="button"
        className="home-hero-nav home-hero-nav--next"
        aria-label="Show next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 5L16 12L9 19" />
        </svg>
      </button>
      <div className="wrap-pagination">
        <div className="container">
          <div className="sw-dots sw-pagination-slider type-circle white-circle justify-content-center spd55" />
        </div>
      </div>
    </section>
  );
}
