"use client";

import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/data/footerLinks";
import { productNavigation } from "@/data/menu";
import ScrollTop from "../common/ScrollTop";

const importantLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "All Products", href: "/products" },
  { label: "Catalogues", href: "/catalogue" },
  { label: "Certificates", href: "/certificates" },
  { label: "Blog", href: "/blog-default" },
  { label: "Careers", href: "/career" },
  { label: "Contact", href: "/contact" },
  { label: "Terms of Use", href: "/term-of-use" },
];

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "All Products", href: "/products" },
      { label: "About SkyDecor", href: "/about-us" },
      { label: "Contact Our Team", href: "/contact" },
      { label: "Careers", href: "/career" },
    ],
  },
  {
    title: "Design Ideas",
    links: [
      { label: "Design Journal", href: "/blog-default" },
      { label: "Product Catalogues", href: "/catalogue" },
      { label: "Surface Collections", href: "/products" },
      { label: "Certificates", href: "/certificates" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/term-of-use" },
      { label: "Website Terms", href: "/term-of-use" },
      { label: "FAQs", href: "/FAQs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer1({ hasPaddingBottom = false }) {
  return (
    <>
      <footer
        id="footer"
        className={`sd-footer ${hasPaddingBottom ? "has-pb" : ""}`}
      >
        <div className="container-full">
          <div className="sd-footer__brand">
            <Link href="/" aria-label="SkyDecor home">
              <Image
                src="/images/logo/logo.png"
                alt="SkyDecor"
                width={230}
                height={87}
              />
            </Link>
          </div>

          <div className="sd-footer__directory">
            <section className="sd-footer__contact" aria-labelledby="footer-contact">
              <h2 id="footer-contact">Headquarters &amp; Contact</h2>
              <address>
                <strong>SkyDecor Dubai</strong>
                <span>Dubai, United Arab Emirates</span>
                <a href="mailto:info@skydecor.eu">info@skydecor.eu</a>
                <a
                  href="https://alvo.chat/3Ijc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us on WhatsApp
                </a>
              </address>
              <p>
                Decorative laminates and interior surface solutions for projects
                across Dubai and the UAE.
              </p>
              <div className="sd-footer__contact-actions">
                <Link href="/contact" className="sd-footer__request-link">
                  Request info
                  <i className="icon-arrowUpRight" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <div className="sd-footer__products">
              {productNavigation.ranges.map((range) => (
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
              © {new Date().getFullYear()} SkyDecor Dubai. All rights reserved.
            </p>

            <nav className="sd-footer__important-links" aria-label="Footer links">
              {importantLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <ul className="sd-footer__social" aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.className}>
                  <a
                    href={link.href}
                    aria-label={link.className.replace("social-", "")}
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
