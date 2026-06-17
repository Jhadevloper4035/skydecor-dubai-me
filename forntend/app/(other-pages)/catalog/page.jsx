import CatalogsPage from "@/components/catalogs/CatalogsPage";
import Link from "next/link";

export const metadata = {
  title: "E-Catalogs & Product Brochures | skydecor Dubai",
  description:
    "Browse and download skydecor product catalogs for decorative HPL, acrylic surfaces, liner HPL, and Soffitto panels.",
};

export default function CatalogRoute() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Catalogs</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Catalogs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CatalogsPage />
    </>
  );
}
