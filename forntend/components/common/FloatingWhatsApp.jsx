"use client";

import { contactDetails } from "@/data/contactDetails";

export default function FloatingWhatsApp() {
  return (
    <div className="sd-floating-whatsapp">
      <a
        className="sd-floating-whatsapp__button"
        href={contactDetails.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Skydecor on WhatsApp"
      >
        <i className="fab fa-whatsapp" aria-hidden="true" />
      </a>
    </div>
  );
}
