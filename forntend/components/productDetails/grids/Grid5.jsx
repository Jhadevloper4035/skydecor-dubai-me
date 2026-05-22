"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { images } from "@/data/singleProductSliders";
import Image from "next/image";

export default function Grid5({
  activeColor = "gray",
  setActiveColor = () => {},
  firstItem,
}) {
  const finalItems = useMemo(
    () =>
      images.map((image, index) =>
        index === 0 && firstItem ? { ...image, src: firstItem } : { ...image }
      ),
    [firstItem]
  );

  // itemsFinal2[0].src = products[0].imgSrc;

  const observerRef = useRef(null);

  const scrollToTarget = useCallback(() => {
    // Find the element with the specific data-value attribute
    const scrollContainerElemt = document.querySelector(".wrap-quick-view");
    if (!scrollContainerElemt) return;

    const heightScroll = scrollContainerElemt.scrollTop;
    const targetElement = scrollContainerElemt.querySelector(
      `[data-scroll='${activeColor}']`
    );

    // Check if the element exists
    if (targetElement) {
      // Get the element's bounding rectangle
      setTimeout(() => {
        if (scrollContainerElemt?.scrollTop == heightScroll) {
          targetElement?.scrollIntoView({
            behavior: "smooth", // Smooth scrolling animation
            block: "center", // Center the element in the viewport
          });
        }
      }, 200);

      // Scroll only if the element is not already in view
    }
  }, [activeColor]);

  useEffect(() => {
    scrollToTarget();
  }, [scrollToTarget]);

  useEffect(() => {
    const options = {
      rootMargin: "-50% 0px",
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scrollValue = entry.target.getAttribute("data-scroll");
          setActiveColor(scrollValue);
        }
      });
    }, options);

    // Observe all items
    const elements = document.querySelectorAll(".item-scroll-quickview");
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setActiveColor]);
  return (
    <div className="tf-quick-view-image">
      <div className="wrap-quick-view wrapper-scroll-quickview">
        {finalItems.map((link, index) => (
          <div
            className="quickView-item item-scroll-quickview"
            data-scroll={link.dataScroll}
            key={index}
          >
            <Image
            loading="lazy"
            decoding="async"
              className="lazyload"
              alt={""}
              src={link.src}
              width={600}
              height={800}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
