"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { socialLinks } from "@/data/footerLinks";
import { contactDetails } from "@/data/contactDetails";
import { productNavigation } from "@/data/menu";
import ScrollTop from "../common/ScrollTop";

const importantLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "All Products", href: "/products" },
  { label: "E-Catalogues", href: "/e-catalogues" },
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
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "All Products", href: "/products" },
      { label: "E-Catalogues", href: "/e-catalogues" },
      { label: "Certificates", href: "/certificates" },
      { label: "Blog", href: "/blog-default" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/term-of-use" },
      { label: "Privacy Policy", href: "/term-of-use" },
      { label: "FAQs", href: "/FAQs" },
    ],
  },
];

export default function Footer1({ hasPaddingBottom = false }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setNewsletterStatus("loading");

    try {
      const response = await fetch("/api/newsletter-subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(data.message || "Newsletter signup failed.");

      setNewsletterEmail("");
      setNewsletterStatus("success");
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <>
      <footer
        id="footer"
        className={`sd-footer ${hasPaddingBottom ? "has-pb" : ""}`}
      >
        <div className="container-full">
          <div className="sd-footer__brand">
            <Link href="/" aria-label="Skydecor home">
              <Image
                src="/images/logo/white-logo.png"
                alt="Skydecor"
                width={230}
                height={87}
              />
            </Link>
          </div>

          <div className="sd-footer__directory">
            <section className="sd-footer__contact" aria-labelledby="footer-contact">
              <h2 id="footer-contact">Headquarters &amp; Contact</h2>
              <address>
                <strong>{contactDetails.companyName}</strong>
                <span>{contactDetails.address}</span>
                <a href="mailto:sales.mgr@skydecor.me">sales.mgr@skydecor.me</a>
                <a
                  href="https://alvo.chat/3Ijc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us on WhatsApp
                </a>
              </address>
              <p>
                Decorative HPL and interior surface solutions for projects
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
              <section className="sd-footer__newsletter" aria-labelledby="footer-newsletter">
                <h2 id="footer-newsletter">Newsletter</h2>
                <p>Get product updates, catalogue launches, and project ideas by email.</p>
                <form onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    name="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={newsletterStatus === "loading"}
                  >
                    {newsletterStatus === "loading" ? "Sending" : "Submit"}
                  </button>
                </form>
                {newsletterStatus === "success" && <span>Thank you for subscribing.</span>}
                {newsletterStatus === "error" && <span>Please try again.</span>}
              </section>
            </div>
          </div>

          <div className="sd-footer__bottom">
            <p>
              © {new Date().getFullYear()} Skydecor Dubai. All rights reserved.
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
