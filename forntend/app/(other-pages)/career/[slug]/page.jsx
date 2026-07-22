import CareerDetail from "@/components/careers/CareerDetail";
import SeoJsonLd from "@/components/common/SeoJsonLd";
import { getJobBySlug } from "@/lib/careersApi";
import { jobPostingSchema, pageMetadata, pageSeoMetadata } from "@/lib/seoMetadata";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams?.slug);

  if (!job) {
    return pageSeoMetadata("jobNotFound", {
      path: `/career/${resolvedParams?.slug}`,
    });
  }

  return pageMetadata({
    title: `${job.title} | Skydecor Careers`,
    description: job.summary,
    path: `/career/${job.slug || resolvedParams?.slug}`,
  });
}

export default async function CareerDetailPage({ params }) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams?.slug);

  if (!job) notFound();

  return (
    <>
      <SeoJsonLd data={jobPostingSchema(job, `/career/${job.slug || resolvedParams?.slug}`)} />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">{job.title}</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  <Link className="link" href="/career">
                    Careers
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>{job.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CareerDetail job={job} />
    </>
  );
}
