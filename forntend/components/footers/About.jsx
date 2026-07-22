import Image from "next/image";

const companyStory = [
  "Established in 2016, Skydecor creates decorative, acrylic, and PVC HPL with a focus on design, precision, and dependable quality.",
  "Our advanced manufacturing facilities and Dubai warehouse support customers across the Middle East and global markets with versatile surfaces for modern interiors.",
];

const commitments = [
  {
    title: "Vision",
    text: "At Skydecor HPL, our vision is to be recognized as a premier brand that elevates the beauty of homes. We strive to infuse global expertise and distinctive design aesthetics into every space we transform.",
  },
  {
    title: "Mission",
    text: "We aim to achieve global excellence in our industry by seamlessly blending Western work practices with Indian ethical values. Our mission is to bring world-class expertise and unique design sensibilities to every environment we enhance.",
  },
  {
    title: "Core Values",
    text: "Skydecor is committed to integrating eco-friendly materials and sustainable practices, fostering a greener and more sustainable future. Our objective is to deliver products that are both aesthetically captivating and environmentally conscious, ensuring safety and responsibility in every creation.",
  },
];

const manufacturingGallery = [
  {
    src: "/images/about/manufacturing/unit-1.webp",
    alt: "Aerial view of the Skydecor manufacturing facility",
  },
  {
    src: "/images/about/manufacturing/unit-2.webp",
    alt: "Aerial front view of the Skydecor manufacturing facility",
  },
  {
    src: "/images/about/manufacturing/unit-3.webp",
    alt: "Wide aerial view of the Skydecor production plant",
  },
  {
    src: "/images/about/manufacturing/unit-4.webp",
    alt: "Skydecor production plant and surrounding facilities",
  },
  {
    src: "/images/about/manufacturing/unit-5.webp",
    alt: "Skydecor manufacturing team gathered at the facility",
  },
  {
    src: "/images/about/manufacturing/unit-6.webp",
    alt: "Skydecor production team",
  },
];

const uspItems = [
  {
    icon: "fa-solid fa-link",
    title: "Phenolic Bonding",
    text: "Strong, dependable adhesion engineered for lasting HPL performance.",
  },
  {
    icon: "fa-solid fa-hammer",
    title: "Carpenter Friendly",
    text: "Easy to handle, cut, and install across everyday interior applications.",
  },
  {
    icon: "fa-solid fa-broom",
    title: "Easy to Clean",
    text: "Low-maintenance surfaces designed for simple, routine care.",
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "Long Life",
    text: "Durable finishes that retain their character through regular use.",
  },
  {
    icon: "fa-solid fa-ruler-combined",
    title: "Full Thickness",
    text: "Consistent construction supports reliable fabrication and finishing.",
  },
  {
    icon: "fa-solid fa-house",
    title: "Made for Interiors",
    text: "Versatile surfaces for furniture, wall panels, kitchens, and more.",
  },
];

export default function About() {
  return (
    <>
      <section className="flat-spacing sd-about-story">
        <div className="container">
          <div className="tf-grid-layout md-col-2 radius-20 gap-0 overflow-hidden sd-about-story__card">
            <div className="banner-text style-2 bg-brown-2 mb-0 sd-about-story__content">
              <div className="box-title">
                <p className="text-btn-uppercase">Skydecor HPL</p>
                <h2 className="banner-heading">
                  HPL made for better spaces
                </h2>
              </div>

              <div className="sd-about-story__copy">
                {companyStory.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="image-100 sd-about-story__image">
              <Image
                src="/images/about-us-image-1.jpg"
                alt="Skydecor HPL in a contemporary interior"
                width={906}
                height={1000}
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sd-about-commitments">
        <div className="container">
          <div className="sd-about-section-head sd-about-section-head--light">
            <p className="sd-about-eyebrow">Our core commitments</p>
            <h2>What guides us</h2>
          </div>

          <div className="sd-about-commitments__grid">
            {commitments.map((item) => (
              <article className="sd-about-commitment" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flat-spacing sd-about-manufacturing">
        <div className="container">
          <div className="sd-about-manufacturing__intro">
            <div>
              <p className="sd-about-eyebrow">Manufacturing</p>
              <h2>Precision at every stage</h2>
              <p className="sd-about-manufacturing__description">
                Modern machinery, skilled teams, and consistent quality control
                support an annual capacity of more than five million sheets.
              </p>
            </div>
          </div>

          <figure className="sd-about-manufacturing__hero">
            <Image
              src="/images/about/manufacturing/unit-1.webp"
              alt="Aerial view of the Skydecor manufacturing facility"
              fill
              priority={false}
              sizes="(max-width: 767px) 100vw, 1320px"
            />
          </figure>

          <div className="sd-about-gallery-head">
            <h3>Home</h3>
          </div>

          <div className="sd-about-manufacturing__gallery">
            {manufacturingGallery.map((image) => (
              <figure
                className="sd-about-manufacturing__gallery-item"
                key={image.src}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="flat-spacing sd-about-usps">
        <div className="container">
          <div className="sd-about-section-head">
            <p className="sd-about-eyebrow">Our USPs</p>
            <h2>Designed for everyday performance</h2>
          </div>

          <div className="sd-about-usps__grid">
            {uspItems.map((item) => (
              <article className="sd-about-usp" key={item.title}>
                <span className="sd-about-usp__icon" aria-hidden="true">
                  <i className={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
