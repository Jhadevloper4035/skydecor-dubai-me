import CertificatesPage from "@/components/certificates/CertificatesPage";
import Link from "next/link";

export const metadata = {
  title: "Certificates & Test Reports | skydecor Dubai",
  description:
    "Explore skydecor quality certificates, ISO certifications, GREENGUARD documents, and independent product test reports.",
};

export default function CertificatesRoute() {
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
                <h1 className="heading text-start">Certificates</h1>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>Certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CertificatesPage />
    </>
  );
}
