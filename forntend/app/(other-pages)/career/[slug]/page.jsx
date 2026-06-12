import CareerDetail from "@/components/careers/CareerDetail";
import { getJobBySlug, localJobs } from "@/lib/careersApi";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return localJobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams?.slug);

  if (!job) {
    return {
      title: "Job Not Found | SkyDecor Dubai",
    };
  }

  return {
    title: `${job.title} | SkyDecor Careers`,
    description: job.summary,
  };
}

export default async function CareerDetailPage({ params }) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams?.slug);

  if (!job) notFound();

  return (
    <>
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
                    Homepage
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
