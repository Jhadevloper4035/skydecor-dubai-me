"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { otherPageLinks } from "@/data/menu";
import {
  buildProductNavigationLinks,
} from "@/lib/productsApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNavigationFilters,
  selectNavigationFilterOptions,
} from "@/store/productsSlice";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const navigationOptions = useAppSelector(selectNavigationFilterOptions);
  const productMenus = buildProductNavigationLinks(navigationOptions);
  const allProductsLink = productMenus.allProductsLink;
  const laminatesLink = productMenus.laminatesLink;
  const productMenuLinks = [
    allProductsLink,
    ...productMenus.productTypeLinks,
    ...productMenus.categoryLinks,
  ];
  const productTypeGroups = productMenus.productTypeGroups || [];

  useEffect(() => {
    dispatch(fetchNavigationFilters());
  }, [dispatch]);

  return (
    <>


      <li className="menu-item">
        <Link href="/" className="item-link">
          Home
        </Link>
      </li>


      <li className="menu-item">
        <Link href="/about-us" className="item-link">
          About Us
        </Link>
      </li>

      <li className="menu-item">
        <Link href={allProductsLink.href} className="item-link">
          {allProductsLink.name}
        </Link>
      </li>


      <li
        className={`menu-item ${productMenuLinks.some(
          (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
        )
          ? "active"
          : ""
          } `}
      >
        <a href="#" className="item-link">
          Our Range
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="mega-menu-item">
                  <Link href={allProductsLink.href} className="menu-heading">
                    {allProductsLink.name}
                  </Link>
                  <ul className="menu-list">
                    <li
                      className={`menu-item-li ${
                        pathname === laminatesLink.href ? "active" : ""
                      } `}
                    >
                      <Link href={laminatesLink.href} className="menu-link-text">
                        {laminatesLink.name}
                      </Link>
                    </li>
                    {productMenus.productTypeLinks.map((link) => (
                      <li
                        key={link.name}
                        className={`menu-item-li ${
                          pathname === link.href ? "active" : ""
                        } `}
                      >
                        <Link href={link.href} className="menu-link-text">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {productTypeGroups.map((group) => (
                <div className="col-lg-3" key={group.name}>
                  <div className="mega-menu-item">
                    <Link href={group.href} className="menu-heading">
                      {group.name}
                    </Link>
                    <ul className="menu-list">
                      {group.categoryLinks.map((link, index) => (
                        <li
                          key={`${group.name}-${link.name}-${index}`}
                          className={`menu-item-li ${pathname.split("/")[1] == link.href.split("/")[1]
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
                </div>
              ))}
              <div className="col-lg-3">
                <div className="menu-heading">Best seller</div>
                <div className="sec-cls-header">
                  <div className="collection-position hover-img">
                    <Link href={`/shop-collection`} className="img-style">
                      <Image
                        className="lazyload"
                        data-src="/images/collections/cls-header.jpg"
                        alt="banner-cls"
                        src="/images/collections/cls-header.jpg"
                        width={300}
                        height={400}
                      />
                    </Link>
                    <div className="content">
                      <div className="title-top">
                        <h4 className="title">
                          <Link
                            href={`/shop-collection`}
                            className="link text-white wow fadeInUp"
                          >
                            Shop our top picks
                          </Link>
                        </h4>
                        <p className="desc text-white wow fadeInUp">
                          Reserved for special occasions
                        </p>
                      </div>
                      <div>
                        <Link
                          href={`/shop-collection`}
                          className="tf-btn btn-md btn-white"
                        >
                          <span className="text">Shop Now</span>
                          <i className="icon icon-arrowUpRight" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>



      <li className="menu-item">
        <Link href="/coming-soon" className="item-link">
          Career
        </Link>
      </li>



      <li
        className={`menu-item position-relative ${[...otherPageLinks].some(
          (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
        )
          ? "active"
          : ""
          } `}
      >
        <a href="#" className="item-link">
          Resources
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {otherPageLinks.map((link, index) => (
              <li
                key={index}
                className={`menu-item-li ${pathname.split("/")[1] == link.href.split("/")[1]
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



      <li className="menu-item">
        <Link href="/blog-default" className="item-link">
          Blog
        </Link>
      </li>



      <li className="menu-item">
        <Link href="/contact" className="item-link">
          Contact Us
        </Link>
      </li>

    </>
  );
}
