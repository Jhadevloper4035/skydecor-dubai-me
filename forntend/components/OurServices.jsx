// components/OurServices.js
import Link from "next/link";

const services = [
  {
    id: 1,
    image: "/images/service-1.jpg",
    icon: "/images/icon-service-item-1.svg",
    title: "Bedroom Design",
    description: "We design beautiful, functional homes that reflect your.",
    delay: "",
  },
  {
    id: 2,
    image: "/images/our-project-image-1.jpg",
    icon: "/images/icon-service-item-2.svg",
    title: "Living Room Design",
    description: "Smart, efficient, and visually impactful designs for offices,",
    delay: "0.2s",
  },
  {
    id: 3,
    image: "/images/our-project-image-2.jpg",
    icon: "/images/icon-service-item-3.svg",
    title: "Kitchen Design",
    description: "Customized interior solutions that combine comfort,",
    delay: "0.4s",
  },
  {
    id: 4,
    image: "/images/our-project-image-3.jpg",
    icon: "/images/icon-service-item-4.svg",
    title: "Workspace Design",
    description: "Custom furniture concepts, décor selection, color ",
    delay: "0.6s",
  },
];

export default function OurServices() {
  return (
    <div className="our-services-elite">
      <div className="container">

        {/* Section Title */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="heading wow fadeInUp">Our Services</h3>
              <h2 className="text-anime-style-3 heading" data-cursor="-opaque">
              Design That Inspires
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Service Items */}
          {services.map((service) => (
            <div className="col-xl-3 col-md-6" key={service.id}>
              <div
                className="service-item-elite wow fadeInUp"
                data-wow-delay={service.delay || undefined}
              >
                {/* Service Image */}
                <div className="service-item-image-elite">
                  <Link href="/contact" data-cursor-text="view">
                    <figure className="image-anime">
                      <img src={service.image} alt={service.title} />
                    </figure>
                  </Link>
                </div>

                {/* Service Body */}
                <div className="service-item-body-elite">

                  <div className="service-item-content-elite">
                    <h2 className="">
                      <Link href="/contact">{service.title}</Link>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Section Footer */}
          <div className="col-lg-12">
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.4s"
            >
              <div className="satisfy-client-images">
                <div className="satisfy-client-image">
                  <figure className="image-anime">
                    <img src="/images/avatar/user-1.jpg" alt="" />
                  </figure>
                </div>
                <div className="satisfy-client-image add-more">
                  <i>
                    <img src="/images/icon-phone-white.svg" alt="" />
                  </i>
                </div>
              </div>
              <p>
                Discover more stunning designs crafted with precision — 
                <Link href="/contact"> Contact Us Today</Link>.
              </p>
              <ul>
                <li><span className="counter">4.9</span>/5</li>
                <li>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </li>
                <li>Over 4200 Reviews</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
