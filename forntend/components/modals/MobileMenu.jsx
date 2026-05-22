"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { otherPageLinks } from "@/data/menu";
import { buildProductNavigationLinks } from "@/lib/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNavigationFilters,
  selectNavigationFilterOptions,
} from "@/store/productsSlice";
import { usePathname } from "next/navigation";

const dismissOffcanvas = { "data-bs-dismiss": "offcanvas" };

const isSameSection = (pathname, href) =>
  pathname.split("/")[1] === href.split("/")[1];

export default function MobileMenu() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const navigationOptions = useAppSelector(selectNavigationFilterOptions);
  const productMenus = buildProductNavigationLinks(navigationOptions);
  const allProductsLink = productMenus.allProductsLink;
  const laminatesLink = productMenus.laminatesLink;
  const productTypeGroups = productMenus.productTypeGroups || [];
  const productMenuLinks = [
    allProductsLink,
    laminatesLink,
    ...productMenus.productTypeLinks,
    ...productMenus.categoryLinks,
  ];
  const resourceLinks = otherPageLinks.filter(
    (link) =>
      !["/about-us", "/contact", "/contact-02", "/404", "/coming-soon"].includes(
        link.href
      )
  );

  useEffect(() => {
    dispatch(fetchNavigationFilters());
  }, [dispatch]);

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
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button type="submit" aria-label="Search">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.9984 20.9999L16.6484 16.6499"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

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
                <Link
                  href={allProductsLink.href}
                  className={`mb-menu-link ${
                    isSameSection(pathname, allProductsLink.href) ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>{allProductsLink.name}</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <a
                  href="#mobile-range-menu"
                  className={`collapsed mb-menu-link ${
                    productMenuLinks.some((link) => isSameSection(pathname, link.href))
                      ? "active"
                      : ""
                  }`}
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="mobile-range-menu"
                >
                  <span>Our Range</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="mobile-range-menu" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <Link
                        href={laminatesLink.href}
                        className={`sub-nav-link ${
                          pathname === laminatesLink.href ? "active" : ""
                        }`}
                        {...dismissOffcanvas}
                      >
                        {laminatesLink.name}
                      </Link>
                    </li>

                    {productTypeGroups.map((group, index) => {
                      const groupId = `mobile-product-type-${index}`;
                      const groupLinks = [
                        { href: group.href, name: `All ${group.name}` },
                        ...group.categoryLinks,
                      ];

                      return (
                        <li key={group.name}>
                          <a
                            href={`#${groupId}`}
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
                          </a>
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
                  href="/coming-soon"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/coming-soon") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>Career</span>
                </Link>
              </li>

              <li className="nav-mb-item">
                <a
                  href="#mobile-resources-menu"
                  className={`collapsed mb-menu-link ${
                    resourceLinks.some((link) => isSameSection(pathname, link.href))
                      ? "active"
                      : ""
                  }`}
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="mobile-resources-menu"
                >
                  <span>Resources</span>
                  <span className="btn-open-sub" />
                </a>
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
                  href="/blog-default"
                  className={`mb-menu-link ${
                    isSameSection(pathname, "/blog-default") ? "active" : ""
                  }`}
                  {...dismissOffcanvas}
                >
                  <span>Blog</span>
                </Link>
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
                549 Oak St.Crystal Lake, IL 60014
              </p>
              <Link
                href="/contact"
                className="tf-btn-default text-btn-uppercase"
                {...dismissOffcanvas}
              >
                GET DIRECTION
                <i className="icon-arrowUpRight" />
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>info@skydecor.eu</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>315-666-6688</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
