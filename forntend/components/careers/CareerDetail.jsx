import Link from "next/link";
import JobApplicationForm from "./JobApplicationForm";

const formatEmploymentType = (type = "") =>
  type
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const DetailList = ({ title, items = [] }) => {
  if (!items.length) return null;

  return (
    <section className="sd-career-detail__section">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default function CareerDetail({ job }) {
  return (
    <main className="sd-career-detail flat-spacing">
      <div className="container">
        <Link href="/career" className="btn-line sd-career-detail__back">
          Back to careers
        </Link>

        <div className="sd-career-detail__layout">
          <article className="sd-career-detail__content">
            <div className="sd-career-detail__intro">
              <span className="sd-events-kicker">{job.department}</span>
              <h2>{job.title}</h2>
              <p>{job.description || job.summary}</p>
              <a href="#apply" className="tf-btn btn-fill sd-career-detail__apply-link">
                <span className="text text-button">Apply for this role</span>
                <i className="icon icon-arrow-down" />
              </a>
            </div>

            <DetailList title="What you will do" items={job.responsibilities} />
            <DetailList title="What we are looking for" items={job.requirements} />
            <DetailList title="What you can expect" items={job.benefits} />
          </article>

          <aside className="sd-career-detail__aside">
            <div className="sd-career-summary">
              <h3>Role Details</h3>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{job.location}</dd>
                </div>
                <div>
                  <dt>Employment</dt>
                  <dd>{formatEmploymentType(job.employmentType)}</dd>
                </div>
                {job.experienceLevel ? (
                  <div>
                    <dt>Experience</dt>
                    <dd>{job.experienceLevel}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            <div className="sd-career-apply" id="apply">
              <h3>Apply for this role</h3>
              <p>
                Share your details below. This enquiry will be stored with this
                job role prefilled.
              </p>
              <JobApplicationForm job={job} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
