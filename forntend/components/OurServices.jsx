import Link from "next/link";
import { designIdeas } from "@/data/designIdeas";

const titleLines = (title) => title.replace(" Design", "").split(" ");

export default function OurServices() {
  return (
    <section id="design-ideas" className="our-services-elite service-grid-section">
      <div className="container">
        <div className="service-grid-section__intro">
          <h2 className="wow fadeInUp">Design That Inspires</h2>
          <span
            aria-hidden="true"
            className="service-grid-section__divider wow fadeInUp"
            data-wow-delay="0.1s"
          />
          <p className="wow fadeInUp" data-wow-delay="0.2s">
            Our design services bring together thoughtful planning, refined
            materials, and practical details for spaces that feel considered
            from every angle.
          </p>
          
        </div>
        <div className="service-grid-section__grid">
          {designIdeas.map((idea) => (
            <Link
              className="service-grid-section__card"
              href={`/${idea.slug}`}
              key={idea.slug}
            >
              <img src={idea.image} alt={idea.title} loading="lazy" decoding="async" />
              <h3 aria-label={idea.title}>
                <span aria-hidden="true">{titleLines(idea.title).join(" ")}</span>
                <span aria-hidden="true">Design</span>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
