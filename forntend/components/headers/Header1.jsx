"use client";

import React from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import { contactDetails } from "@/data/contactDetails";

export default function Header1() {
  return (
    <header id="header" className="header-default header-style-4">
      <div className="main-header">
        <div className="container">
          <div className="row wrapper-header align-items-center">
            <div className="col-xl-5 d-none d-xl-block">
              <ul className="sd-header-contact">
                <li>
                  <a href={contactDetails.phones[0].href}>
                    <i className="icon icon-phone" aria-hidden="true" />
                    {contactDetails.phones[0].label}
                  </a>
                </li>
                <li>
                  <a href={contactDetails.emails[1].href}>
                    <i className="icon icon-mail" aria-hidden="true" />
                    {contactDetails.emails[1].label}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4 col-3 d-xl-none">
              <a
                href="#mobileMenu"
                className="mobile-menu"
                data-bs-toggle="offcanvas"
                aria-controls="mobileMenu"
              >
                <i className="icon icon-categories" />
              </a>
            </div>

            <div className="col-xl-2 col-md-4 col-6 text-center">
              <Link href="/" className="logo-header">
                <Image
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo.png"
                  width={144}
                  height={25}
                />
              </Link>
            </div>

            <div className="col-xl-5 col-md-4 col-3">
              <div className="wrapper-header-right">
                <ul className="nav-icon d-flex justify-content-end align-items-center">
                  <li className="nav-search">
                    <a
                      href="#search"
                      data-bs-toggle="modal"
                      className="nav-icon-item"
                      aria-label="Search"
                    >
                      <svg
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                          stroke="#181818"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.35 21.0004L17 16.6504"
                          stroke="#181818"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                  {contactDetails.socialLinks.map((link) => (
                    <li
                      className="sd-header-social d-none d-xl-block"
                      key={link.className}
                    >
                      <a
                        href={link.href}
                        className="nav-icon-item"
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
          </div>
        </div>
      </div>

      <div className="header-bottom header-dark d-none d-xl-block">
        <div className="container">
          <div className="wrapper-header d-flex justify-content-center align-items-center">
            <nav className="box-navigation text-center">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center d-none d-xl-flex">
                <Nav />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
