import Contact2 from "@/components/otherPages/Contact2";
import React from "react";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = pageSeoMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <Contact2 />
      <iframe
        src="https://www.google.com/maps?q=Dubai%2C%20United%20Arab%20Emirates&output=embed"
        title="Skydecor Dubai location"
        width={600}
        height={450}
        style={{ border: 0, width: "100%" }}
        allowFullScreen=""
        loading="lazy"
      />
    </>
  );
}
