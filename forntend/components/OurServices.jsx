import Link from "next/link";

const services = [
  { image: "/images/service-1.jpg", title: "Bedroom Design", firstLine: "Bedroom", secondLine: "Design" },
  { image: "/images/our-project-image-1.jpg", title: "Living Room Design", firstLine: "Living Room", secondLine: "Design" },
  { image: "/images/our-project-image-2.jpg", title: "Kitchen Design", firstLine: "Kitchen", secondLine: "Design" },
  { image: "/images/our-project-image-3.jpg", title: "Workspace Design", firstLine: "Workspace", secondLine: "Design" },
];

export default function OurServices() {
  return (
    <section className="our-services-elite service-grid-section">
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
          <p className="wow fadeInUp" data-wow-delay="0.3s">
            From bedrooms and living rooms to kitchens and workspaces, we help
            shape interiors that are elegant, functional, and made for everyday
            living.
          </p>
        </div>
        <div className="service-grid-section__grid">
          {services.map((service) => (
            <Link
              className="service-grid-section__card"
              href="/contact"
              key={service.title}
            >
              <img src={service.image} alt={service.title} />
              <h3 aria-label={service.title}>
                <span aria-hidden="true">{service.firstLine}</span>
                <span aria-hidden="true">{service.secondLine}</span>
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
