"use client";

import React, { useState } from "react";
import Link from "next/link";
import { contactDetails } from "@/data/contactDetails";
import { otherPageLinks, productNavigation } from "@/data/menu";
import { usePathname } from "next/navigation";

const dismissOffcanvas = { "data-bs-dismiss": "offcanvas" };

const isSameSection = (pathname, href) =>
  pathname.split("/")[1] === href.split("/")[1];

export default function MobileMenu() {
  const pathname = usePathname();
  const [isRangeMenuOpen, setIsRangeMenuOpen] = useState(false);
  const [isDecorativeRangeOpen, setIsDecorativeRangeOpen] = useState(false);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const allProductsLink = productNavigation.allProducts;
  const mainRangeLinks = productNavigation.ranges.filter(
    (range) => range.name === "Decorative HPL"
  );
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
                    className={`btn-open-sub mobile-range-toggle ${
                      isRangeMenuOpen ? "" : "collapsed"
                    }`}
                    aria-label={
                      isRangeMenuOpen
                        ? "Close product ranges"
                        : "Open product ranges"
                    }
                    onClick={() => setIsRangeMenuOpen((isOpen) => !isOpen)}
                    aria-expanded={isRangeMenuOpen}
                    aria-controls="mobile-range-menu"
                  />
                </div>
                <div
                  id="mobile-range-menu"
                  className={`collapse ${isRangeMenuOpen ? "show" : ""}`}
                >
                  <ul className="sub-nav-menu">
                    {mainRangeLinks.map((group, index) => {
                      const groupId = `mobile-product-range-${index}`;

                      return (
                        <li key={group.name}>
                          <button
                            type="button"
                            className={`sub-nav-link ${
                              isDecorativeRangeOpen ? "" : "collapsed"
                            } ${
                              [group, ...group.categoryLinks].some((link) =>
                                isSameSection(pathname, link.href)
                              )
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              setIsDecorativeRangeOpen((isOpen) => !isOpen)
                            }
                            aria-expanded={isDecorativeRangeOpen}
                            aria-controls={groupId}
                          >
                            <span>{group.name}</span>
                            <span className="btn-open-sub" />
                          </button>
                          <div
                            id={groupId}
                            className={`collapse ${
                              isDecorativeRangeOpen ? "show" : ""
                            }`}
                          >
                            <ul className="sub-nav-menu sub-menu-level-2">
                              <li>
                                <Link
                                  href={group.href}
                                  className={`sub-nav-link ${
                                    pathname === group.href ? "active" : ""
                                  }`}
                                  {...dismissOffcanvas}
                                >
                                  All {group.name}
                                </Link>
                              </li>
                              {group.categoryLinks.map((category) => (
                                <li key={`${group.name}-${category.name}`}>
                                  <Link
                                    href={category.href}
                                    className={`sub-nav-link ${
                                      pathname === category.href ? "active" : ""
                                    }`}
                                    {...dismissOffcanvas}
                                  >
                                    {category.name}
                                  </Link>
                                  <ul className="sub-nav-menu sub-menu-level-2">
                                    {category.subCategoryLinks.map((subCategory) => (
                                      <li key={subCategory.href}>
                                        <Link
                                          href={subCategory.href}
                                          className={`sub-nav-link ${
                                            pathname === subCategory.href ? "active" : ""
                                          }`}
                                          {...dismissOffcanvas}
                                        >
                                          {subCategory.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
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
                  className={`${isResourcesMenuOpen ? "" : "collapsed"} mb-menu-link ${
                    resourceLinks.some((link) => isSameSection(pathname, link.href))
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setIsResourcesMenuOpen((isOpen) => !isOpen)
                  }
                  aria-expanded={isResourcesMenuOpen}
                  aria-controls="mobile-resources-menu"
                >
                  <span>Resources</span>
                  <span className="btn-open-sub" />
                </button>
                <div
                  id="mobile-resources-menu"
                  className={`collapse ${isResourcesMenuOpen ? "show" : ""}`}
                >
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
                {contactDetails.locationLabel}
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
              {contactDetails.phones.map((phone) => (
                <li key={phone.href}>
                  <i className="icon icon-phone" />
                  <a href={phone.href}>{phone.label}</a>
                </li>
              ))}
              {contactDetails.emails.map((email) => (
                <li key={email.href}>
                  <i className="icon icon-mail" />
                  <a href={email.href}>{email.label}</a>
                </li>
              ))}
              <li>
                <i className="icon icon-phone" />
                <a
                  href={contactDetails.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactDetails.whatsapp.label}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
