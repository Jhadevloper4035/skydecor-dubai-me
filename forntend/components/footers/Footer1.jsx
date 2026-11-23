"use client";

import Image from "next/image";
import Link from "next/link";

import { contactDetails } from "@/data/contactDetails";
import { productNavigation } from "@/data/menu";
import ScrollTop from "../common/ScrollTop";

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "All Products", href: "/products" },
      { label: "Catalogs", href: "/catalog" },
      { label: "Certificates", href: "/certificates" },
      { label: "Blog", href: "/blog-default" },
      { label: "Careers", href: "/career" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Design Ideas",
    links: [
      { label: "Bedroom Design", href: "/bedroom-design" },
      { label: "Living Room Design", href: "/living-room-design" },
      { label: "Kitchen Design", href: "/kitchen-design" },
      { label: "Workspace Design", href: "/workspace-design" },
      { label: "Kidroom design", href: "/kidroom-design" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/term-of-use" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "FAQs", href: "/FAQs" },
    ],
  },
];

const footerProductRanges = productNavigation.ranges.filter(
  (range) => range.name === "Decorative HPL"
);

export default function Footer1({ hasPaddingBottom = false }) {
  return (
    <>
      <footer
        id="footer"
        className={`sd-footer ${hasPaddingBottom ? "has-pb" : ""}`}
      >
        <div className="container-full">
          <div className="sd-footer__brand">
            <Link href="/" aria-label="skydecor home">
              <Image
                src="/images/logo/white-logo.png"
                alt="skydecor"
                width={230}
                height={87}
              />
            </Link>
          </div>

          <div className="sd-footer__directory">
            <section className="sd-footer__contact" aria-labelledby="footer-contact">
              <h2 id="footer-contact">Headquarters &amp; Contact</h2>
              <address>
                {contactDetails.addresses.map((address) => (
                  <div className="sd-footer__contact-item" key={address.label}>
                    <span className="sd-footer__contact-label">{address.label}</span>
                    <p>{address.value}</p>
                  </div>
                ))}
                <div className="sd-footer__contact-item">
                  <span className="sd-footer__contact-label">Email</span>
                  {contactDetails.emails.map((email) => (
                    <a key={email.href} href={email.href}>
                      {email.label}
                    </a>
                  ))}
                </div>
                <div className="sd-footer__contact-item">
                  <span className="sd-footer__contact-label">Phone</span>
                  {contactDetails.phones.map((phone) => (
                    <a key={phone.href} href={phone.href}>
                      {phone.label}
                    </a>
                  ))}
                </div>
              </address>

              <div className="sd-footer__contact-actions">
                <Link href="/contact" className="sd-footer__request-link">
                  Request info
                  <i className="icon-arrowUpRight" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <div className="sd-footer__products">
              {footerProductRanges.map((range) => (
                <section className="sd-footer__range" key={range.name}>
                  <h2>
                    <Link href={range.href}>{range.name}</Link>
                  </h2>
                  <ul>
                    {range.categoryLinks.map((category) => (
                      <li key={`${range.name}-${category.name}`}>
                        <Link href={category.href}>{category.name}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {footerSections.map((section) => (
                <section className="sd-footer__detail-links" key={section.title}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.links.map((link) => (
                      <li key={`${section.title}-${link.label}`}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          <div className="sd-footer__bottom">
            <p>
              © {new Date().getFullYear()} skydecor Dubai. All rights reserved.Powered by <a href="https://www.rantechnology.in/" target="_blank" rel="noopener noreferrer">Rantechnology</a>  
            </p>

            <ul className="sd-footer__social" aria-label="Social media">
              {contactDetails.socialLinks.map((link) => (
                <li key={link.className}>
                  <a
                    href={link.href}
                    aria-label={link.label}
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
      </footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
    </>
  );
}
