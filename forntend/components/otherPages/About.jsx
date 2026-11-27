"use client";

import Image from "next/image";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useEffect, useRef } from "react";
import WhyChooseUs from "@/components/WhyChooseUs";
import DirectorSection from "@/components/otherPages/DirectorSection";

const companyStory = [
  "Established in 2016, skydecor creates decorative, acrylic, and PVC HPL with a focus on design, precision, and dependable quality.",
  "Our advanced manufacturing facilities and Dubai warehouse support customers across the Middle East and global markets with versatile surfaces for modern interiors.",
];

const commitments = [
  {
    title: "Vision",
    text: "At skydecor HPL, our vision is to be recognized as a premier brand that elevates the beauty of homes. We strive to infuse global expertise and distinctive design aesthetics into every space we transform.",
  },
  {
    title: "Mission",
    text: "We aim to achieve global excellence in our industry by seamlessly blending Western work practices with Indian ethical values. Our mission is to bring world-class expertise and unique design sensibilities to every environment we enhance.",
  },
  {
    title: "Core Values",
    text: "skydecor is committed to integrating eco-friendly materials and sustainable practices, fostering a greener and more sustainable future. Our objective is to deliver products that are both aesthetically captivating and environmentally conscious, ensuring safety and responsibility in every creation.",
  },
];

const manufacturingGallery = [
  {
    src: "/images/warehouse/1.jpeg",
    alt: "skydecor warehouse team loading laminate sheets for delivery",
  },
  {
    src: "/images/warehouse/2.jpeg",
    alt: "Laminate sheets being loaded onto a skydecor delivery vehicle",
  },
  {
    src: "/images/warehouse/3.jpeg",
    alt: "Entrance to the skydecor warehouse in Dubai",
  },
  {
    src: "/images/warehouse/4.jpeg",
    alt: "Laminate sheets being prepared for dispatch at the skydecor warehouse",
  },
  {
    src: "/images/warehouse/5.jpeg",
    alt: "Laminate racks and packaged stock inside the skydecor warehouse",
  },
  {
    src: "/images/warehouse/6.jpeg",
    alt: "Laminate racks and packaged stock inside the skydecor warehouse",
  },
  {
    src: "/images/warehouse/7.jpeg",
    alt: "Organized laminate sheet storage racks at the skydecor warehouse",
  },
  {
    src: "/images/warehouse/8.jpeg",
    alt: "Packaged inventory inside the skydecor warehouse",
  },
  {
    src: "/images/warehouse/9.jpeg",
    alt: "Warehouse operations office at the skydecor Dubai facility",
  },
];

const aboutBenefits = [
  {
    icon: "fa-link",
    title: "Design & Material Expertise",
    description:
      "We create decorative, acrylic, and PVC HPL with a focus on design, precision, and dependable quality.",
  },
  {
    icon: "fa-gears",
    title: "Advanced Manufacturing",
    description:
      "Modern machinery, skilled teams, and consistent quality control support an annual capacity of more than five million sheets.",
  },
  {
    icon: "fa-globe",
    title: "Regional & Global Reach",
    description:
      "Our Dubai warehouse supports customers across the Middle East and global markets.",
  },
  {
    icon: "fa-shield-halved",
    title: "Made for Everyday Use",
    description:
      "Easy-care surfaces and durable finishes are designed to retain their character through regular use.",
  },
  {
    icon: "fa-house",
    title: "Versatile Interior Applications",
    description:
      "Our surface range works across furniture, wall panels, kitchens, and other interior applications.",
  },
  {
    icon: "fa-leaf",
    title: "Sustainability in Focus",
    description:
      "We are committed to integrating eco-friendly materials and sustainable practices into our work.",
  },
];

export default function About() {
  const lightboxRef = useRef(null);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: ".sd-about-manufacturing__gallery",
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
      <section className="flat-spacing sd-about-story">
        <div className="container wow fadeInUp" data-wow-delay="0s">
          <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-about-story__card">
            <div className="image-100 sd-about-story__image">
              <Image
                src="/images/about-us-image-1.jpg"
                alt="skydecor HPL in a contemporary interior"
                width={906}
                height={1000}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>

            <div className="banner-text style-2 bg-brown-2 mb-0 sd-about-story__content">
              <div className="box-title">
                <p className="text-btn-uppercase">skydecor HPL</p>
                <h2 className="banner-heading">
                  HPL made for better spaces
                </h2>
              </div>

              <div className="sd-about-story__copy">
                {companyStory.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DirectorSection />

      <section className="sd-about-commitments">
        <div className="container wow fadeInUp" data-wow-delay="0.1s">
          <div className="sd-about-section-head sd-about-section-head--light sd-about-section-head--centered">
            <p className="sd-about-eyebrow">Our core commitments</p>
            <h2>What guides us</h2>
            <span
              aria-hidden="true"
              className="sd-about-section-head__divider"
            />
          </div>

          <div className="sd-about-commitments__grid">
            {commitments.map((item) => (
              <article className="sd-about-commitment" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flat-spacing sd-about-manufacturing">
        <div className="container wow fadeInUp" data-wow-delay="0.2s">
          <div className="sd-about-manufacturing__intro sd-about-section-head--centered">
            <div>
              <p className="sd-about-eyebrow">Manufacturing</p>
              <h2>Precision at every stage</h2>
              <span
                aria-hidden="true"
                className="sd-about-section-head__divider"
              />
              <p className="sd-about-manufacturing__description">
                Modern machinery, skilled teams, and consistent quality control
                support an annual capacity of more than five million sheets.
              </p>
            </div>
          </div>

          <div className="sd-about-manufacturing__gallery">
            {manufacturingGallery.map((image, index) => (
              <a
                className="sd-about-manufacturing__gallery-item"
                href={image.src}
                key={image.src}
                data-pswp-width="1280"
                data-pswp-height="960"
                target="_blank"
                rel="noreferrer"
                aria-label={`Open manufacturing unit gallery image ${index + 1}`}
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
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs
        heading="What Makes skydecor Different"
        intro="Established in 2016, skydecor combines design-led surfaces, advanced manufacturing, and a Dubai warehouse serving customers across the Middle East and global markets."
        benefits={aboutBenefits}
      />
    </>
  );
}
