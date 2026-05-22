"use client";
import { slides2 } from "@/data/singleProductSliders";
import Drift from "drift-zoom";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Slider4({
  activeVarient = "30ml",
  setActiveVarient = () => {},
  firstItem,
  slideItems = slides2,
}) {
  const items = useMemo(
    () =>
      slideItems.map((item, index) =>
        index === 0 && firstItem ? { ...item, src: firstItem } : { ...item }
      ),
    [firstItem, slideItems]
  );

  useEffect(() => {
    // Function to initialize Drift
    const imageZoom = () => {
      const driftAll = document.querySelectorAll(".tf-image-zoom");
      const pane = document.querySelector(".tf-zoom-main");

      driftAll.forEach((el) => {
        new Drift(el, {
          zoomFactor: 2,
          paneContainer: pane,
          inlinePane: false,
          handleTouch: false,
          hoverBoundingBox: true,
          containInline: true,
        });
      });
    };
    imageZoom();
    const zoomElements = document.querySelectorAll(".tf-image-zoom");

    const handleMouseOver = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.add("zoom-active");
      }
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.closest(".section-image-zoom");
      if (parent) {
        parent.classList.remove("zoom-active");
      }
    };

    zoomElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array to run only once on mount

  const lightboxRef = useRef(null);
  useEffect(() => {
    // Initialize PhotoSwipeLightbox
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();

    // Store the lightbox instance in the ref for later use
    lightboxRef.current = lightbox;

    // Cleanup: destroy the lightbox when the component unmounts
    return () => {
      lightbox.destroy();
    };
  }, []);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  useEffect(() => {
    if (!swiperRef.current || !items[activeIndex]) return;

    if (items[activeIndex].variant != activeVarient) {
      const slideIndex = items.findIndex((elm) => elm.variant == activeVarient);
      if (slideIndex >= 0) {
      swiperRef.current.slideTo(slideIndex);
    }
    }
  }, [activeIndex, activeVarient, items]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const slideIndex = items.findIndex((elm) => elm.variant == activeVarient);
      if (swiperRef.current && slideIndex >= 0) {
        swiperRef.current.slideTo(slideIndex);
      }
    });
    return () => clearTimeout(timeoutId);
  }, [activeVarient, items]);

  return (
    <div className="thumbs-slider">
      <Swiper
        className="swiper tf-product-media-thumbs other-image-zoom"
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={6}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        initialSlide={1}
        breakpoints={{
          0: {
            direction: "horizontal",
          },
          1200: {
            direction: "vertical",
          },
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide className="swiper-slide stagger-item" key={index}>
            <div className="item">
              <Image
            loading="lazy"
            decoding="async"
                className="lazyload"
                data-src={slide.src}
                alt={slide.alt}
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        dir="ltr"
        className="swiper tf-product-media-main"
        id="gallery-swiper-started"
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          if (items[swiper.activeIndex]) {
            setActiveIndex(swiper.activeIndex);
            setActiveVarient(items[swiper.activeIndex]?.variant.toLowerCase());
          }
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <a
              href={slide.src}
              target="_blank"
              rel="noreferrer"
              className="item"
              data-pswp-width={slide.width}
              data-pswp-height={slide.height}
              //   onClick={() => openLightbox(index)}
            >
              <Image
            loading="lazy"
            decoding="async"
                className="tf-image-zoom lazyload"
                data-zoom={slide.src}
                data-src={slide.src}
                alt=""
                src={slide.src}
                width={slide.width}
                height={slide.height}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
