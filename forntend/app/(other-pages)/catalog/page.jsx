import CatalogsPage from "@/components/catalogs/CatalogsPage";
import Link from "next/link";

export const metadata = {
  title: "E-Catalogues & Product Brochures | skydecor Dubai",
  description:
    "Browse and download skydecor product catalogues for decorative HPL, acrylic surfaces, liner HPL, and Soffitto panels.",
};

export default function CatalogRoute() {
  return (
    <>
      <div className="page-title product-listing-banner">
        <picture className="product-listing-banner__artwork">
          <source
            media="(min-width: 1200px)"
            srcSet="/images/banners/product-desktop.jpeg"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/images/banners/product-tablet.jpeg"
          />
          <img src="/images/banners/product-mobile.jpeg" alt="" />
        </picture>
        <div className="product-listing-banner__content">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h1 className="heading text-start">Catalogues</h1>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>Catalogues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CatalogsPage />
    </>
  );
}
