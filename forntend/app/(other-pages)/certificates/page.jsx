import CertificatesPage from "@/components/certificates/CertificatesPage";
import Link from "next/link";

export const metadata = {
  title: "Certificates & Test Reports | SkyDecor Dubai",
  description:
    "Explore SkyDecor quality certificates, ISO certifications, GREENGUARD documents, and independent product test reports.",
};

export default function CertificatesRoute() {
  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Certificates</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
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
      <CertificatesPage />
    </>
  );
}
