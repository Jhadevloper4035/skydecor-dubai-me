"use client";

import React from "react";
import Link from "next/link";
import { contactDetails } from "@/data/contactDetails";
import { otherPageLinks, productNavigation } from "@/data/menu";
import { usePathname } from "next/navigation";

const dismissOffcanvas = { "data-bs-dismiss": "offcanvas" };

const isSameSection = (pathname, href) =>
  pathname.split("/")[1] === href.split("/")[1];

export default function MobileMenu() {
  const pathname = usePathname();
  const allProductsLink = productNavigation.allProducts;
  const mainRangeLinks = productNavigation.ranges;
  const productMenuLinks = [
    allProductsLink,
    ...mainRangeLinks,
  ];
  const resourceLinks = otherPageLinks.filter(
    (link) =>
      !["/about-us", "/contact", "/contact-02", "/404", "/coming-soon"].includes(
        link.href
      )
  );
  const isResourceActive =
    resourceLinks.some((link) => isSameSection(pathname, link.href)) ||
    pathname.split("/")[1]?.startsWith("blog");

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item">
                <Link
                  href="/"
                  className={`mb-menu-link ${pathname === "/" ? "active" : ""}`}
                  {...dismissOffcanvas}
                >
                  <span>Home</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <Link
                  href="/about-us"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/about-us") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>About Us</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <div
                  className={`mb-menu-link mobile-range-menu-row ${
                    productMenuLinks.some((link) => isSameSection(pathname, link.href))
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    href={allProductsLink.href}
                    className="mobile-range-all-link"
                    {...dismissOffcanvas}
                  >
                    Our Range
                  </Link>
                  <button
                    type="button"
                    className="btn-open-sub mobile-range-toggle collapsed"
                    aria-label="Open product ranges"
                    data-bs-target="#mobile-range-menu"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    aria-controls="mobile-range-menu"
                  />
                </div>
                <div id="mobile-range-menu" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <Link
                        href={allProductsLink.href}
                        className={`sub-nav-link ${
                          pathname === allProductsLink.href ? "active" : ""
                        }`}
                        {...dismissOffcanvas}
                      >
                        {allProductsLink.name}
                      </Link>
                    </li>

                    {mainRangeLinks.map((group, index) => {
                      const groupId = `mobile-product-range-${index}`;
                      const groupLinks = [
                        { href: group.href, name: `All ${group.name}` },
                        ...group.categoryLinks,
                      ];

                      return (
                        <li key={group.name}>
                          <button
                            type="button"
                            className={`sub-nav-link collapsed ${
                              groupLinks.some((link) =>
                                isSameSection(pathname, link.href)
                              )
                                ? "active"
                                : ""
                            }`}
                            data-bs-toggle="collapse"
                            aria-expanded="false"
                            aria-controls={groupId}
                          >
                            <span>{group.name}</span>
                            <span className="btn-open-sub" />
                          </button>
                          <div id={groupId} className="collapse">
                            <ul className="sub-nav-menu sub-menu-level-2">
                              {groupLinks.map((link) => (
                                <li key={`${group.name}-${link.name}`}>
                                  <Link
                                    href={link.href}
                                    className={`sub-nav-link ${
                                      pathname === link.href ? "active" : ""
                                    }`}
                                    {...dismissOffcanvas}
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>

              <li className="nav-mb-item">
                <Link
                  href="/career"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/career") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>Career</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <Link
                  href="/certificates"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/certificates") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>Certificates</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <button
                  type="button"
                  className={`collapsed mb-menu-link ${
                    isResourceActive ? "active" : ""
                  }`}
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="mobile-resources-menu"
                >
                  <span>Resources</span>
                  <span className="btn-open-sub" />
                </button>
                <div id="mobile-resources-menu" className="collapse">
                  <ul className="sub-nav-menu">
                    {resourceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            isSameSection(pathname, link.href) ? "active" : ""
                          }`}
                          {...dismissOffcanvas}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="nav-mb-item">
                <Link
                  href="/contact"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/contact") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-other-content">
            <div className="mb-notice">
              <Link href="/contact" className="text-need" {...dismissOffcanvas}>
                Need Help?
              </Link>
            </div>
            <div className="mb-contact">
              <p className="text-caption-1">
                Dubai, United Arab Emirates
              </p>
              <Link
                href="/contact"
                className="tf-btn-default text-btn-uppercase"
                {...dismissOffcanvas}
              >
                CONTACT OUR TEAM
                <i className="icon-arrowUpRight" />
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
              </li>
              <li>
                <i className="icon icon-phone" />
                <a
                  href={contactDetails.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Skydecor
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
