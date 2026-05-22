"use client";
import { slides } from "@/data/singleProductSliders";
import Drift from "drift-zoom";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useMemo, useRef, useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Slider1({
  activeColor = "gray",
  setActiveColor = () => {},
  firstItem,
  slideItems = slides,
  thumbSlidePerView = 6,
  thumbSlidePerViewOnMobile = 6,
}) {
  const sliderRef = useRef(null);
  const items = useMemo(() => {
    const sourceItems = slideItems?.length ? slideItems : slides;
    const normalizedItems = sourceItems
      .filter((slide) => slide?.src)
      .map((slide, index) => ({
        id: slide.id ?? index + 1,
        color: slide.color || "gray",
        src: slide.src,
        alt: slide.alt || "",
        width: slide.width || 600,
        height: slide.height || 800,
      }));

    if (firstItem && normalizedItems[0]) {
      normalizedItems[0] = { ...normalizedItems[0], src: firstItem };
    }

    return normalizedItems;
  }, [firstItem, slideItems]);

  useEffect(() => {
    const root = sliderRef.current;
    if (!root) return undefined;

    const zoomElements = root.querySelectorAll(".tf-image-zoom");
    const pane = root.closest(".tf-main-product")?.querySelector(".tf-zoom-main");
    const hasZoomPane = pane instanceof HTMLElement;
    const driftInstances = Array.from(zoomElements).map(
      (el) =>
        new Drift(el, {
          zoomFactor: 2,
          ...(hasZoomPane ? { paneContainer: pane, inlinePane: false } : { inlinePane: true }),
          handleTouch: false,
          hoverBoundingBox: hasZoomPane,
          containInline: true,
        })
    );

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

    return () => {
      zoomElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      driftInstances.forEach((instance) => instance.destroy?.());
    };
  }, [items]);

  const lightboxRef = useRef(null);
  useEffect(() => {
    if (!items.length) return undefined;

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-swiper-started",
      children: ".item",
      pswpModule: () => import("photoswipe"),
    });

    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
      lightboxRef.current = null;
    };
  }, [items]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  useEffect(() => {
    if (!items[activeIndex]) return;

    if (!(items[activeIndex].color == activeColor)) {
      const slideIndex =
        items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
      if (Number.isFinite(slideIndex) && swiperRef.current) {
        swiperRef.current.slideTo(slideIndex);
      }
    }
  }, [activeColor, activeIndex, items]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(items.length > 1 ? 1 : 0);
        const slideIndex = items.filter((elm) => elm.color == activeColor)[0]?.id - 1;
        if (Number.isFinite(slideIndex)) {
          swiperRef.current.slideTo(slideIndex);
        }
      }
    });
    return () => clearTimeout(timeoutId);
  }, [activeColor, items]);

  return (
    <div className="thumbs-slider" ref={sliderRef}>
      <Swiper
        className="swiper tf-product-media-thumbs other-image-zoom"
        dir="ltr"
        direction="vertical"
        spaceBetween={10}
        slidesPerView={thumbSlidePerView}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        initialSlide={items.length > 1 ? 1 : 0}
        breakpoints={{
          0: {
            direction: "horizontal",
            slidesPerView: thumbSlidePerViewOnMobile,
          },
          820: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 1
                : thumbSlidePerViewOnMobile,
          },
          920: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2
                : thumbSlidePerViewOnMobile,
          },
          1020: {
            direction: "horizontal",
            slidesPerView:
              thumbSlidePerViewOnMobile < 4
                ? thumbSlidePerViewOnMobile + 2.5
                : thumbSlidePerViewOnMobile,
          },
          1200: {
            direction: "vertical",
            slidesPerView: thumbSlidePerView,
          },
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide
            className="swiper-slide stagger-item"
            data-color={slide.color}
            key={index}
          >
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
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Thumbs]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          if (items[swiper.activeIndex]) {
            setActiveIndex(swiper.activeIndex);
            setActiveColor(items[swiper.activeIndex]?.color.toLowerCase());
          }
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide" data-color="gray">
            <a
              href={slide.src}
              target="_blank"
              rel="noopener noreferrer"
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
