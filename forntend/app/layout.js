"use client";

import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import GlobalSpinner from "@/components/common/GlobalSpinner";
import LegacyScripts from "@/components/common/LegacyScripts";
import RouteLoadingController from "@/components/common/RouteLoadingController";

import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import { usePathname } from "next/navigation";
import "./styles/global.scss";


import { Suspense, useEffect, useState } from "react";
import Context from "@/context/Context";
import StoreProvider from "@/store/StoreProvider";

import QuickView from "@/components/modals/QuickView";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100..900;1,100..900&display=swap"
        />
        <link rel="stylesheet" href="/fonts/font-icons.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link
          rel="icon"
          type="image/png"
          href="https://rantechnology.in/skydecor/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://rantechnology.in/skydecor/favicon/favicon.svg"
        />
        <link
          rel="shortcut icon"
          href="https://rantechnology.in/skydecor/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://rantechnology.in/skydecor/favicon/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="https://rantechnology.in/skydecor/favicon/site.webmanifest"
        />
      </head>
      <body className="popup-loader" suppressHydrationWarning>
        <StoreProvider>
          <Context>
            <GlobalSpinner />
            <Suspense fallback={null}>
              <RouteLoadingController />
            </Suspense>
            <Header1 />
            <div id="wrapper">{children}</div>
            <Footer1 />
            <QuickView />
            <Compare />
            <MobileMenu />
            <SearchModal />
            <LegacyScripts />
          </Context>
        </StoreProvider>
      </body>
    </html>
  );
}
