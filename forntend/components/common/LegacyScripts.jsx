"use client";

import { useEffect } from "react";

const legacyScripts = [
  "/js/jquery-3.7.1.min.js",
  "/js/bootstrap.min.js",
  "/js/gsap.min.js",
  "/js/ScrollTrigger.min.js",
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

export default function LegacyScripts() {
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

  return null;
}
