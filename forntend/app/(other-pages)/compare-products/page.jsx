import ProductCompare from "@/components/otherPages/ProductCompare";
import Link from "next/link";
import React from "react";
import { pageSeoMetadata } from "@/lib/seoMetadata";

export const metadata = pageSeoMetadata("compareProducts");

export default function CompareProductsPage() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container">
          <h3 className="heading text-center">Compare Products</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" href={`/`}>
                Home
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>
              <Link className="link" href={`/products`}>
                Shop
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>Compare</li>
          </ul>
        </div>
      </div>
      <ProductCompare />

    </>
  );
}
