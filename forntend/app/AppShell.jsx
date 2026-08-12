"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";
import GlobalSpinner from "@/components/common/GlobalSpinner";
import LegacyScripts from "@/components/common/LegacyScripts";
import RouteLoadingController from "@/components/common/RouteLoadingController";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import Context from "@/context/Context";
import StoreProvider from "@/store/StoreProvider";
import QuickView from "@/components/modals/QuickView";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import SearchModal from "@/components/modals/SearchModal";

const hasVisibleBootstrapLayer = () =>
  Boolean(
    document.querySelector(
      ".modal.show, .modal.showing, .offcanvas.show, .offcanvas.showing"
    )
  );

const cleanupStaleBootstrapLayers = () => {
  window.setTimeout(() => {
    if (hasVisibleBootstrapLayer()) return;

    document
      .querySelectorAll(".modal-backdrop, .offcanvas-backdrop")
      .forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
  }, 350);
};

export default function AppShell({ children }) {
  const pathname = usePathname();
<<<<<<< HEAD
=======
  const isAdminRoute = pathname?.startsWith("/admin");
>>>>>>> 3775944 (skydecor dubai final changes)
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.esm");
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;

      header.classList.toggle("header-bg", window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setScrollDirection("up");
    const lastScrollY = { current: window.scrollY };
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrollDirection(
        currentScrollY > 250 && currentScrollY <= lastScrollY.current
          ? "up"
          : "down"
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    import("bootstrap").then((bs) => {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        bs.Modal.getInstance(modal)?.hide();
      });
      document.querySelectorAll(".offcanvas.show").forEach((offcanvas) => {
        bs.Offcanvas.getInstance(offcanvas)?.hide();
      });
      cleanupStaleBootstrapLayers();
    });
  }, [pathname]);

  useEffect(() => {
    const handleBootstrapHidden = () => cleanupStaleBootstrapLayers();
    const handleDismissClick = (event) => {
      if (
        event.target.closest(
          '[data-bs-dismiss="modal"], [data-bs-dismiss="offcanvas"]'
        )
      ) {
        cleanupStaleBootstrapLayers();
      }
    };

    document.addEventListener("hidden.bs.modal", handleBootstrapHidden);
    document.addEventListener("hidden.bs.offcanvas", handleBootstrapHidden);
    document.addEventListener("click", handleDismissClick, true);

    return () => {
      document.removeEventListener("hidden.bs.modal", handleBootstrapHidden);
      document.removeEventListener("hidden.bs.offcanvas", handleBootstrapHidden);
      document.removeEventListener("click", handleDismissClick, true);
    };
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    const header = document.querySelector("header");
    if (header) header.style.top = scrollDirection === "up" ? "0px" : "-185px";
  }, [scrollDirection]);
=======
    if (isAdminRoute) return;

    const header = document.querySelector("header");
    if (header) header.style.top = scrollDirection === "up" ? "0px" : "-185px";
  }, [scrollDirection, isAdminRoute]);
>>>>>>> 3775944 (skydecor dubai final changes)

  useEffect(() => {
    import("@/utlis/wow").then(({ default: WOW }) => {
      const wow = new WOW({ mobile: false, live: false });
      wow.init();
    });
  }, [pathname]);

  return (
    <StoreProvider>
      <Context>
        <GlobalSpinner />
        <Suspense fallback={null}>
          <RouteLoadingController />
        </Suspense>
<<<<<<< HEAD
        <Header1 />
        <div id="wrapper">{children}</div>
        <Footer1 />
        <QuickView />
        <Compare />
        <MobileMenu />
        <SearchModal />
        <LegacyScripts />
        <FloatingWhatsApp />
=======
        {!isAdminRoute ? <Header1 /> : null}
        <div id="wrapper">{children}</div>
        {!isAdminRoute ? (
          <>
            <Footer1 />
            <QuickView />
            <Compare />
            <MobileMenu />
            <SearchModal />
            <LegacyScripts />
            <FloatingWhatsApp />
          </>
        ) : null}
>>>>>>> 3775944 (skydecor dubai final changes)
      </Context>
    </StoreProvider>
  );
}
