import Products1 from "@/components/products/Products1";
import Link from "next/link";
import React from "react";

const titleize = (value) =>
  value
    ? value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Products";

export default async function ShopCategoryPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const productType = resolvedSearchParams?.productType || "";
  const category = resolvedParams?.category || "";
  const subCategory = resolvedSearchParams?.subCategory || "";
  const query = resolvedSearchParams?.query || "";
  const title = titleize(subCategory || category || productType || query);

  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">{title}</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  <Link className="link" href={`/shop-default-grid`}>
                    Products
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products1
        initialProductType={productType}
        initialCategory={category}
        initialSubCategory={subCategory}
        initialQuery={query}
      />
    </>
  );
}
