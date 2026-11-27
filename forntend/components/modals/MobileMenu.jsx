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
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const allProductsLink = productNavigation.allProducts;
  const mainRange = productNavigation.ranges.find(
    (range) => range.name === "Decorative HPL"
  );
  const productMenuLinks = [
    allProductsLink,
    mainRange,
    ...mainRange.categoryLinks,
  ];
  const resourcesHref = otherPageLinks[0]?.href || "/";

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
                  className={`mb-menu-link mobile-menu-row ${
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
                    {mainRange.categoryLinks.map((category) => (
                      <li key={category.href}>
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
                <div
                  className={`mb-menu-link mobile-menu-row ${
                    otherPageLinks.some((link) => isSameSection(pathname, link.href))
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    href={resourcesHref}
                    className="mobile-range-all-link"
                    {...dismissOffcanvas}
                  >
                    Resources
                  </Link>
                  <button
                    type="button"
                    className={`btn-open-sub mobile-range-toggle ${
                      isResourcesMenuOpen ? "" : "collapsed"
                    }`}
                    aria-label={
                      isResourcesMenuOpen
                        ? "Close resources"
                        : "Open resources"
                    }
                    onClick={() =>
                      setIsResourcesMenuOpen((isOpen) => !isOpen)
                    }
                    aria-expanded={isResourcesMenuOpen}
                    aria-controls="mobile-resources-menu"
                  />
                </div>
                <div
                  id="mobile-resources-menu"
                  className={`collapse ${isResourcesMenuOpen ? "show" : ""}`}
                >
                  <ul className="sub-nav-menu">
                    {otherPageLinks.map((link) => (
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
