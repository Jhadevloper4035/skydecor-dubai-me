import PrivacyPolicy from "@/components/otherPages/PrivacyPolicy";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | skydecor Dubai",
  description:
    "Learn how skydecor Dubai collects and uses personal information through its website.",
};

export default function PrivacyPolicyPage() {
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
                <h1 className="heading text-start">Privacy Policy</h1>
                <ul className="breadcrumbs d-flex align-items-center justify-content-start">
                  <li>
                    <Link className="link" href="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicy />
    </>
  );
}
