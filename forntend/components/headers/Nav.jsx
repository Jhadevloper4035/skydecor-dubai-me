"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { otherPageLinks, productNavigation } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const allProductsLink = productNavigation.allProducts;
  const mainRange = productNavigation.ranges.find(
    (range) => range.name === "Decorative HPL",
  );
  const productMenuLinks = [
    allProductsLink,
    mainRange,
    ...mainRange.categoryLinks,
  ];

  return (
    <>
      <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
        <Link href="/" className="item-link">
          Home
        </Link>
      </li>

      <li
        className={`menu-item ${
          pathname.split("/")[1] === "about-us" ? "active" : ""
        }`}
      >
        <Link href="/about-us" className="item-link">
          About Us
        </Link>
      </li>

      <li
        className={`menu-item has-submenu ${
          productMenuLinks.some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1],
          )
            ? "active"
            : ""
        } `}
      >
        <Link href={allProductsLink.href} className="item-link">
          Our Range
          <span className="sd-dropdown-indicator" aria-hidden="true">
            <svg viewBox="0 0 12 8" focusable="false">
              <path d="M1 1.5L6 6.5L11 1.5" />
            </svg>
          </span>
        </Link>
        <div className="sub-menu mega-menu sd-range-mega-menu">
          <div className="container">
            <div
              className="sd-range-menu-track"
              role="region"
              aria-label="Product ranges"
            >
              {mainRange.categoryLinks.map((category) => (
                <div
                  className="mega-menu-item sd-range-menu-column"
                  key={category.href}
                >
                  <Link href={category.href} className="menu-heading">
                    {category.name}
                  </Link>
                  <ul className="menu-list">
                    {category.subCategoryLinks.map((subCategory) => (
                      <li
                        className={`menu-item-li ${
                          pathname === subCategory.href ? "active" : ""
                        }`}
                        key={subCategory.href}
                      >
                        <Link
                          href={subCategory.href}
                          className="menu-link-text"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link
                href="/products/product-type/decorative-hpl/category/design-master"
                className="sd-range-menu-promo"
              >
                <Image
                  src="/images/collections/1mm.jpeg"
                  alt="Design Master decorative HPL collection"
                  width={640}
                  height={480}
                />
              </Link>
            </div>
          </div>
        </div>
      </li>

      {/* <li
        className={`menu-item ${
          pathname.split("/")[1] === "career" ? "active" : ""
        }`}
      >
        <Link href="/career" className="item-link">
          Career
        </Link>
      </li> */}

      <li
        className={`menu-item ${
          pathname.split("/")[1] === "certificates" ? "active" : ""
        }`}
      >
        <Link href="/certificates" className="item-link">
          Certificates
        </Link>
      </li>

      <li
        className={`menu-item position-relative has-submenu ${
          otherPageLinks.some(
            (link) => link.href.split("/")[1] === pathname.split("/")[1],
          )
            ? "active"
            : ""
        }`}
      >
        <Link href="/resources" className="item-link" aria-haspopup="true">
          Resources
          <span className="sd-dropdown-indicator" aria-hidden="true">
            <svg viewBox="0 0 12 8" focusable="false">
              <path d="M1 1.5L6 6.5L11 1.5" />
            </svg>
          </span>
        </Link>

        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {otherPageLinks.map((link) => (
              <li
                key={link.href}
                className={`menu-item-li ${
                  pathname.split("/")[1] === link.href.split("/")[1]
                    ? "active"
                    : ""
                }`}
              >
                <Link href={link.href} className="menu-link-text">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>

      <li
        className={`menu-item ${
          pathname.split("/")[1]?.startsWith("blog") ? "active" : ""
        }`}
      >
        <Link href="/blog-default" className="item-link">
          Blog
        </Link>
      </li>

      <li
        className={`menu-item ${
          pathname.split("/")[1] === "contact" ? "active" : ""
        }`}
      >
        <Link href="/contact" className="item-link">
          Contact Us
        </Link>
      </li>
    </>
  );
}
