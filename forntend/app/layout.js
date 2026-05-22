"use client";

import Script from 'next/script';
import Topbar from "@/components/headers/Topbar";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";

import '@fortawesome/fontawesome-free/css/all.min.css'

import './styles/animate.css'
import './styles/bootstrap.min.css'
import './styles/custom.css'
import './styles/magnific-popup.css'
import './styles/mousecursor.css'
import './styles/slicknav.min.css'
import './styles/swiper-bundle.min.css'


import { usePathname } from "next/navigation";
import "../public/scss/main.scss";
import "photoswipe/style.css";
import "react-range-slider-input/dist/style.css";
import "../public/css/image-compare-viewer.min.css";


import { useEffect, useState } from "react";
import Context from "@/context/Context";
import StoreProvider from "@/store/StoreProvider";

import QuickView from "@/components/modals/QuickView";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";

import DemoModal from "@/components/modals/DemoModal";
import Categories from "@/components/modals/Categories";


// import SizeGuide from "@/components/modals/SizeGuide";
// import Wishlist from "@/components/modals/Wishlist";
// import CartModal from "@/components/modals/CartModal";
// import NewsLetterModal from "@/components/modals/NewsLetterModal";
// import ScrollTop from "@/components/common/ScrollTop";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
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
    // Close any open modal
    import("bootstrap").then((bs) => {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        bs.Modal.getInstance(modal)?.hide();
      });
      document.querySelectorAll(".offcanvas.show").forEach((offcanvas) => {
        bs.Offcanvas.getInstance(offcanvas)?.hide();
      });
    });
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
  useEffect(() => {
    import("@/utlis/wow").then(({ default: WOW }) => {
      const wow = new WOW({ mobile: false, live: false });
      wow.init();
    });
  }, [pathname]);
  return (
    <html lang="en">
      <body className="popup-loader">
        <StoreProvider>
          <Context>
            <Topbar />
            <Header1 />
            <div id="wrapper">{children}</div>
            <Footer1 />
            <QuickView />
            <Compare />
            <MobileMenu />
            <SearchModal />
            <DemoModal />
            <Categories />
          </Context>
        </StoreProvider>




        {/*

          <NewsLetterModal />
          <SizeGuide /> 
          <Wishlist />
          <CartModal />

          */}


        <Script src="/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/js/SmoothScroll.js" strategy="afterInteractive" />
        <Script src="/js/SplitText.min.js" strategy="afterInteractive" />

        {/* 3. jQuery plugins — after jQuery */}
        <Script src="/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.mb.YTPlayer.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.slicknav.js" strategy="afterInteractive" />
        <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />

        {/* 4. Other plugins */}
        <Script src="/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/js/magiccursor.js" strategy="afterInteractive" />
        <Script src="/js/parallaxie.js" strategy="afterInteractive" />
        <Script src="/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/js/validator.min.js" strategy="afterInteractive" />


        <Script src="/js/function.js" strategy="afterInteractive" />

      </body>
    </html>
  );
}
