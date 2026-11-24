const defaultBenefits = [
  {
    icon: "fa-sliders",
    title: "Tailored Design Solutions",
    description:
      "Thoughtful surface and interior solutions shaped around your space, style, and requirements.",
  },
  {
    icon: "fa-table-cells-large",
    title: "Complete Product Range",
    description:
      "Decorative, acrylic, and PVC HPL surfaces for residential and commercial interiors.",
  },
  {
    icon: "fa-shield-halved",
    title: "Quality Materials",
    description:
      "Premium materials selected for dependable performance, finish quality, and lasting appeal.",
  },
  {
    icon: "fa-user-shield",
    title: "Expert Guidance",
    description:
      "Practical support from product selection through to specifications for your project.",
  },
  {
    icon: "fa-wand-magic-sparkles",
    title: "Smart Design Approach",
    description:
      "Modern, considered design that balances visual impact with everyday functionality.",
  },
  {
    icon: "fa-palette",
    title: "End-To-End Support",
    description:
      "A reliable team to help deliver cohesive, beautifully finished spaces from concept to completion.",
  },
];

const defaultIntro =
  "We create thoughtful interior solutions that combine modern aesthetics, dependable materials, and practical project support.";

export default function WhyChooseUs({
  heading = "Why Choose Skydecor",
  intro = defaultIntro,
  benefits = defaultBenefits,
}) {
  return (
    <section className="why-choose-us-elite why-choose-grid-section">
      <div className="container">
        <div className="why-choose-grid-section__intro">
          <h2 className="wow fadeInUp">{heading}</h2>
          <span
            aria-hidden="true"
            className="why-choose-grid-section__divider wow fadeInUp"
            data-wow-delay="0.1s"
          />
          <p className="wow fadeInUp" data-wow-delay="0.2s">
            {intro}
          </p>
        </div>
        <div className="why-choose-grid-section__grid">
          {benefits.map((benefit, index) => (
            <article
              className="why-choose-grid-section__card wow fadeInUp"
              data-wow-delay={`${index * 0.1}s`}
              key={benefit.title}
            >
              <div className="why-choose-grid-section__icon" aria-hidden="true">
                <i className={`fa-solid ${benefit.icon}`} />
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
