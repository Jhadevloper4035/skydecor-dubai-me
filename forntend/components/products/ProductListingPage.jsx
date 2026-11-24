import Link from "next/link";
import { Fragment } from "react";
import { createProductFilterHref } from "@/lib/productsApi";
import Products1 from "./Products1";

const titleize = (value) =>
  value
    ? String(value)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "Products";

export default function ProductListingPage({
  productType = "",
  category = "",
  subCategory = "",
  query = "",
}) {
  const title = titleize(subCategory || category || productType || query);
  const isDesignMaster = category === "design-master";
  const bannerImages = isDesignMaster
    ? {
        desktop: "/images/banners/design-master-desktop.jpeg",
        tablet: "/images/banners/design-master-tablet.jpeg",
        mobile: "/images/banners/deisgn-master-mobile.jpeg",
      }
    : {
        desktop: "/images/banners/product-desktop.jpeg",
        tablet: "/images/banners/product-tablet.jpeg",
        mobile: "/images/banners/product-mobile.jpeg",
      };
  const breadcrumbLevels = [
    { name: "Products", href: "/products" },
    productType && {
      name: titleize(productType),
      href: createProductFilterHref({ productType }),
    },
    category && {
      name: titleize(category),
      href: createProductFilterHref({ productType, category }),
    },
    subCategory && { name: titleize(subCategory) },
    query &&
      !productType &&
      !category &&
      !subCategory && { name: titleize(query) },
  ].filter(Boolean);
  const breadcrumbs = breadcrumbLevels.map((breadcrumb, index) => ({
    ...breadcrumb,
    href: index === breadcrumbLevels.length - 1 ? undefined : breadcrumb.href,
  }));

  return (
    <>
      <div className="page-title product-listing-banner">
        <picture className="product-listing-banner__artwork">
          <source
            media="(min-width: 1200px)"
            srcSet={bannerImages.desktop}
          />
          <source
            media="(min-width: 768px)"
            srcSet={bannerImages.tablet}
          />
          <img src={bannerImages.mobile} alt="" />
        </picture>
        <div className="product-listing-banner__content">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-start">{title}</h3>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  {breadcrumbs.map((breadcrumb) => (
                    <Fragment
                      key={`${breadcrumb.name}-${breadcrumb.href || "current"}`}
                    >
                      <li>
                        <i className="icon-arrRight" />
                      </li>
                      <li>
                        {breadcrumb.href ? (
                          <Link className="link" href={breadcrumb.href}>
                            {breadcrumb.name}
                          </Link>
                        ) : (
                          breadcrumb.name
                        )}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
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
