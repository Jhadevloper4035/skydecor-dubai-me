import Image from "next/image";
import Link from "next/link";

const values = [
  {
    icon: "fas fa-layer-group",
    title: "We build with material knowledge",
    text: "Every role stays close to surfaces, applications, and the design decisions customers make.",
  },
  {
    icon: "fas fa-handshake",
    title: "Relationships come first",
    text: "We work with dealers, architects, designers, and project teams with clarity and care.",
  },
  {
    icon: "fas fa-ruler-combined",
    title: "Details shape trust",
    text: "Sampling, dispatch, documentation, and follow-up all matter in a finish-led business.",
  },
  {
    icon: "fas fa-lightbulb",
    title: "Taste meets practicality",
    text: "Good recommendations balance color, texture, budget, durability, and project timelines.",
  },
  {
    icon: "fas fa-people-group",
    title: "Teams move together",
    text: "Sales, showroom, warehouse, and support teams coordinate so customers get reliable answers.",
  },
  {
    icon: "fas fa-arrow-trend-up",
    title: "Growth stays active",
    text: "We keep improving the way we present, sell, deliver, and support premium HPL.",
  },
];

const stats = [
  { value: "400+", label: "HPL finishes" },
  { value: "25+", label: "Design-led product families" },
  { value: "UAE", label: "Market focused team" },
  { value: "B2B", label: "Dealer and project network" },
];

const hiringSteps = [
  {
    number: "01",
    title: "Apply",
    text: "Choose the role that fits and share a concise introduction with your experience.",
  },
  {
    number: "02",
    title: "Meet the team",
    text: "Selected applicants speak with the hiring team about the role, the work, and mutual fit.",
  },
  {
    number: "03",
    title: "Role conversation",
    text: "Depending on the position, we may discuss a practical scenario or relevant past work.",
  },
  {
    number: "04",
    title: "Decision",
    text: "We close the loop clearly and share the next steps with the successful candidate.",
  },
];

const formatEmploymentType = (type = "") =>
  type
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function CareersPage({ jobs = [] }) {
  return (
    <main className="sd-careers-page">
      <section className="sd-careers-hero">
        <div className="container">
          <div className="sd-careers-hero__grid">
            <div className="sd-careers-hero__content">
              <span className="sd-events-kicker">Skydecor Careers</span>
              <h1>Build beautiful surface journeys with us</h1>
              <p>
                Join the team bringing premium HPL collections, practical
                design advice, and dependable service to interiors across Dubai.
              </p>
              <div className="sd-careers-hero__actions">
                <Link href="#open-positions" className="tf-btn btn-fill">
                  <span className="text text-button">View Open Positions</span>
                  <i className="icon icon-arrowUpRight" />
                </Link>
                <Link href="/about-us" className="btn-line">
                  About Skydecor
                </Link>
              </div>
            </div>
            <div className="sd-careers-hero__image">
              <Image
                src="/images/intro-video-image.jpg"
                alt="Skydecor team discussing interior material selections"
                width={820}
                height={560}
                priority
              />
            </div>
          </div>

          <div className="sd-careers-stats">
            {stats.map((item) => (
              <div className="sd-careers-stat" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-careers-values flat-spacing">
        <div className="container">
          <div className="sd-careers-section-head">
            <span className="sd-events-kicker">Our Core Values</span>
            <h3 className="heading">How we work</h3>
          </div>
          <div className="sd-careers-values__grid">
            {values.map((value) => (
              <article className="sd-careers-value" key={value.title}>
                <span className="sd-careers-value__icon">
                  <i className={value.icon} />
                </span>
                <h4>{value.title}</h4>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sd-careers-openings flat-spacing" id="open-positions">
        <div className="container">
          <div className="sd-careers-openings__head">
            <div>
              <span className="sd-events-kicker">Open Positions</span>
              <h3 className="heading">Find your role</h3>
            </div>
            <p>
              Select a position to view details and submit an application with the
              role already attached.
            </p>
          </div>

          {jobs.length ? (
            <div className="sd-careers-job-list">
              {jobs.map((job) => (
                <Link className="sd-careers-job-row" href={job.href} key={job.slug}>
                  <span className="sd-careers-job-row__title">
                    <strong>{job.title}</strong>
                    <small>{job.department}</small>
                  </span>
                  <span>{job.location}</span>
                  <span>{formatEmploymentType(job.employmentType)}</span>
                  <span className="sd-careers-job-row__action">
                    View role <i className="icon icon-arrowUpRight" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="sd-careers-empty">
              <span className="sd-careers-empty__icon" aria-hidden="true">
                <i className="fas fa-briefcase" />
              </span>
              <div>
                <h4>No open positions right now</h4>
                <p>
                  We do not have an active vacancy at the moment. Check back soon,
                  or introduce yourself through our contact page.
                </p>
              </div>
              <Link href="/contact" className="tf-btn btn-fill">
                <span className="text text-button">Contact Skydecor</span>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="sd-careers-process flat-spacing">
        <div className="container">
          <div className="sd-careers-process__intro">
            <div>
              <span className="sd-events-kicker">Hiring Process</span>
              <h3 className="heading">What happens after you apply</h3>
            </div>
            <p>
              A straightforward process designed to help both sides understand the
              role, expectations, and working style.
            </p>
          </div>
          <div className="sd-careers-process__grid">
            {hiringSteps.map((step) => (
              <article className="sd-careers-process__step" key={step.number}>
                <span>{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
