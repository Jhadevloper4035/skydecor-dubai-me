import CareersPage from "@/components/careers/CareersPage";
import { getJobs } from "@/lib/careersApi";
import { pageSeoMetadata } from "@/lib/seoMetadata";
import Link from "next/link";

export const metadata = pageSeoMetadata("career");

export default async function CareerPage() {
  const jobs = await getJobs();

  return (
    <>
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Careers</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Careers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CareersPage jobs={jobs} />
    </>
  );
}
