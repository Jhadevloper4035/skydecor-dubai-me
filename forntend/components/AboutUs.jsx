import Link from "next/link";

const companyStory = [
  "Established in 2016, skydecor creates decorative, acrylic, and PVC HPL with a focus on design, precision, and dependable quality.",
  "Our advanced manufacturing facilities and Dubai warehouse support customers across the Middle East and global markets with versatile surfaces for modern interiors.",
];

export default function AboutUs() {
  return (
    <section className="about-us-elite about-us-simple">
      <div className="container">
        <div className="row g-0">
          <div className="col-lg-6">
            <figure className="about-us-simple__image wow fadeInUp">
              <img
                src="/images/about-us-image-1.jpg"
                alt="Skydecor decorative interior surfaces"
              />
            </figure>
          </div>
          <div className="col-lg-6">
            <div className="about-us-simple__content">
              <p className="about-us-simple__eyebrow">About Skydecor</p>
              <h2 className="about-us-simple__title">
                HPL Made For Better Spaces
              </h2>
              <div className="about-us-simple__story">
                {companyStory.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <Link
                href="/about-us"
                className="btn-default about-us-simple__button"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
