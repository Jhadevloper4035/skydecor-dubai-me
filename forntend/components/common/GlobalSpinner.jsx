"use client";

import { useEffect, useState } from "react";

import { useAppSelector } from "@/store/hooks";
import styles from "./GlobalSpinner.module.css";

const PRODUCT_LOADING_STATUSES = [
  "itemsStatus",
  "filterOptionsStatus",
  "selectedProductStatus",
];

export default function GlobalSpinner() {
  const isInitialLoading = useAppSelector((state) => state.ui.isInitialLoading);
  const loadingCount = useAppSelector((state) => state.ui.loadingCount);
  const isProductLoading = useAppSelector((state) =>
    PRODUCT_LOADING_STATUSES.some((key) => state.products?.[key] === "loading")
  );
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isInitialLoading || loadingCount > 0 || isProductLoading) {
      setShow(true);
      return undefined;
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isInitialLoading, isProductLoading, loadingCount]);

  if (!show) return null;

  return (
    <div className={styles.spinnerOverlay} aria-busy="true" aria-live="polite">
      <div className={styles.spinner} />
    </div>
  );
}
