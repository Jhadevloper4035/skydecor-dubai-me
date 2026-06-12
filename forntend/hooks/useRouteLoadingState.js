"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";
import { resetLoading, setInitialLoading, setIsLoading } from "@/store/uiSlice";

const COMPLETE_DELAY_MS = 250;
const INITIAL_LOADER_MS = 700;
const MAX_NAVIGATION_MS = 7000;

const getRouteKey = (pathname, searchParams) => {
  const query = searchParams?.toString();
  return query ? `${pathname}?${query}` : pathname;
};

const shouldSkipLoader = (element) =>
  Boolean(
    element?.closest?.(
      [
        "[data-no-loader]",
        "[data-bs-toggle]",
        "[data-bs-dismiss]",
        "[data-bs-target]",
        ".swiper-button-next",
        ".swiper-button-prev",
      ].join(",")
    )
  );

export const useRouteLoadingState = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const previousRoute = useRef(getRouteKey(pathname, searchParams));
  const isNavigating = useRef(false);
  const fallbackTimer = useRef(null);
  const interactionTimer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setInitialLoading(false));
    }, INITIAL_LOADER_MS);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const currentRoute = getRouteKey(pathname, searchParams);

    if (currentRoute === previousRoute.current) return undefined;

    previousRoute.current = currentRoute;

    const timer = setTimeout(() => {
      dispatch(resetLoading());
      isNavigating.current = false;

      if (fallbackTimer.current) {
        clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
    }, COMPLETE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [dispatch, pathname, searchParams]);

  useEffect(() => {
    const startNavigationLoader = () => {
      if (isNavigating.current) return;

      dispatch(setIsLoading(true));
      isNavigating.current = true;

      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      fallbackTimer.current = setTimeout(() => {
        dispatch(resetLoading());
        isNavigating.current = false;
        fallbackTimer.current = null;
      }, MAX_NAVIGATION_MS);
    };

    const showBriefInteractionLoader = () => {
      dispatch(setIsLoading(true));

      if (interactionTimer.current) clearTimeout(interactionTimer.current);
      interactionTimer.current = setTimeout(() => {
        dispatch(setIsLoading(false));
        interactionTimer.current = null;
      }, 350);
    };

    const handleClick = (event) => {
      if (shouldSkipLoader(event.target)) return;

      const anchor = event.target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");

        if (!href || href === "#") {
          showBriefInteractionLoader();
          return;
        }

        if (
          anchor.target === "_blank" ||
          anchor.hasAttribute("download") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          return;
        }

        try {
          const url = new URL(anchor.href);
          const isInternal = url.origin === window.location.origin;
          const isSameRoute =
            url.pathname === window.location.pathname &&
            url.search === window.location.search;

          if (isInternal && !isSameRoute) {
            startNavigationLoader();
          }
        } catch {
          // Ignore invalid URLs.
        }
      }
    };

    const handlePopState = () => {
      startNavigationLoader();
    };

    window.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", handlePopState);

      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
    };
  }, [dispatch]);
};
