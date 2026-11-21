"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const legacyScripts = [
  "/js/jquery-3.7.1.min.js",
  "/js/bootstrap.min.js",
  "/js/gsap.min.js",
  "/js/ScrollTrigger.min.js",
  "/js/SmoothScroll.js",
  "/js/SplitText.min.js",
  "/js/jquery.counterup.min.js",
  "/js/jquery.magnific-popup.min.js",
  "/js/jquery.mb.YTPlayer.min.js",
  "/js/jquery.slicknav.js",
  "/js/jquery.waypoints.min.js",
  "/js/swiper-bundle.min.js",
  "/js/magiccursor.js",
  "/js/parallaxie.js",
  "/js/wow.min.js",
  "/js/validator.min.js",
  "/js/function.js",
];

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      `script[data-legacy-src="${src}"]`
    );

    if (existingScript?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.legacySrc = src;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true }
    );
    script.addEventListener("error", reject, { once: true });
    document.body.appendChild(script);
  });

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

export default function LegacyScripts() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const loadLegacyScripts = async () => {
      for (const src of legacyScripts) {
        if (cancelled) return;
        await loadScript(src);
      }
    };

    loadLegacyScripts().catch((error) => {
      console.error("Error loading legacy script:", error);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.esm");
  }, []);

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
    import("@/utlis/wow").then(({ default: WOW }) => {
      const wow = new WOW({ mobile: false, live: false });
      wow.init();
    });
  }, [pathname]);

  return null;
}
