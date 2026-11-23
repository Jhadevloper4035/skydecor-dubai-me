import Contact2 from "@/components/otherPages/Contact2";
import { contactDetails } from "@/data/contactDetails";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Contact skydecor Dubai",
  description:
    "Contact skydecor Dubai for HPL samples, product information, catalogs, and project support across the UAE.",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-title product-listing-banner">
        <picture className="product-listing-banner__artwork">
          <source
            media="(min-width: 1200px)"
            srcSet="/images/banners/product-desktop.jpeg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/banners/product-tablet.jpeg"
          />
          <img src="/images/banners/product-mobile.jpeg" alt="" />
        </picture>
        <div className="product-listing-banner__content">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h1 className="heading text-start">Contact Us</h1>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact2 />
      <iframe
        src={contactDetails.mapEmbedUrl}
        title="skydecor Dubai location"
        width={600}
        height={450}
        style={{ border: 0, width: "100%" }}
        allowFullScreen=""
        loading="lazy"
      />
    </>
  );
}
