import { contactDetails } from "./contactDetails";

// Kept as a reference for the unused legacy footer component.
export const socialLinks = contactDetails.socialLinks;

export const footerLinks = [
  {
    heading: "Information",
    items: [
      { label: "About Us", href: "/about-us", isLink: true },
      { label: "Our Stories", href: "#", isLink: false },
      { label: "Size Guide", href: "#", isLink: false },
      { label: "Contact us", href: "/contact", isLink: true },
      { label: "Career", href: "/career", isLink: true },
      { label: "Catalogues", href: "/catalog", isLink: true },
      { label: "Certificates", href: "/certificates", isLink: true },
    ],
  },
  {
    heading: "Customer Services",
    items: [
      { label: "Shipping", href: "#", isLink: false },
      { label: "Return & Refund", href: "#", isLink: false },
      { label: "Privacy Policy", href: "/privacy-policy", isLink: true },
      { label: "Terms & Conditions", href: "/term-of-use", isLink: true },
      { label: "Orders FAQs", href: "/FAQs", isLink: true },
    ],
  },
];
