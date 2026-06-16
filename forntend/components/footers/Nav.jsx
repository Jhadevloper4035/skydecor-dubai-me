"use client";
import Link from "next/link";
import React from "react";
import { otherPageLinks, productNavigation } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const allProductsLink = productNavigation.allProducts;
  const mainRangeLinks = productNavigation.ranges;
  const productMenuLinks = [allProductsLink, ...mainRangeLinks];

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
              tabIndex={0}
            >
              {mainRangeLinks.map((range) => (
                <div
                  className="mega-menu-item sd-range-menu-column"
                  key={range.name}
                >
                  <Link href={range.href} className="menu-heading">
                    {range.name}
                  </Link>
                  <ul className="menu-list">
                    {range.categoryLinks.map((link) => (
                      <li
                        className={`menu-item-li ${
                          pathname === link.href ? "active" : ""
                        }`}
                        key={`${range.name}-${link.name}`}
                      >
                        <Link href={link.href} className="menu-link-text">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>

      <li
        className={`menu-item ${
          pathname.split("/")[1] === "career" ? "active" : ""
        }`}
      >
        <Link href="/career" className="item-link">
          Career
        </Link>
      </li>

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
          [...otherPageLinks].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1],
          )
            ? "active"
            : ""
        } `}
      >
        <button type="button" className="item-link">
          Home
          <span className="sd-dropdown-indicator" aria-hidden="true">
            <svg viewBox="0 0 12 8" focusable="false">
              <path d="M1 1.5L6 6.5L11 1.5" />
            </svg>
          </span>
        </button>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {otherPageLinks.map((link, index) => (
              <li
                key={index}
                className={`menu-item-li ${
                  pathname.split("/")[1] == link.href.split("/")[1]
                    ? "active"
                    : ""
                } `}
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
