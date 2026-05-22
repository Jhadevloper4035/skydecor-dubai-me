// components/AboutUs.js
import Link from "next/link";

const aboutItems = [
  {
    id: 1,
    icon: "/images/icon-about-item-1.svg",
    title: "Our Mission",
    description:
      "To become a leading architecture & interior design studio know for transform ordinary",
  },
  {
    id: 2,
    icon: "/images/icon-about-item-2.svg",
    title: "Our Vision",
    description:
      "To become a leading architecture & interior design studio know for transform ordinary",
  },
];

export default function AboutUs() {
  return (
    <div className="about-us-elite" style={{ backgroundColor: "#f6ede6" }}>
      <div className="container">
        <div className="row">
          {/* Left — Images */}
          <div className="col-xl-6">
            <div className="about-us-images-elite wow fadeInUp">
              {/* Image Box 1 */}
              <div className="about-us-image-box-1-elite">
                <div className="about-us-image-elite">
                  <figure className="image-anime">
                    <img
                      src="/images/about-us-image-1.jpg"
                      alt=""
                    />
                  </figure>
                </div>
              </div>

              {/* Image Box 2 */}
              <div className="about-us-image-box-2-elite">
                {/* Get In Touch Circle */}
                <div className="get-in-touch-circle-elite">
                  <Link href="/contact">
                    <img
                      src="/images/contact-us-circle.svg"
                      alt=""
                    />
                  </Link>
                </div>

                {/* Achievement Box */}
                <div className="achievement-box-elite">
                  <div className="achievement-item-elite">
                    {/* Achievement Header */}
                    <div className="achievement-item-header-elite">
                      <div className="achievement-item-title-elite">
                        <div className="icon-box">
                          <i
                            className="fas fa-award"
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                        </div>
                        <div className="achievement-item-no">
                          <h2 className="heading">
                            <span className="counter">200</span>+
                          </h2>
                        </div>
                      </div>
                      <div className="achievement-item-content-elite">
                        <h3 className="">Happy Residential Clients</h3>
                        <p>
                          Homes designed with comfort, style, and functionality.
                        </p>
                      </div>
                    </div>

                    {/* Achievement Body */}
                    <div className="achievement-item-body-elite">
                      <div className="achievement-item-image-elite">
                        <figure>
                          <img
                            src="/images/our-award-item-image-1.png"
                            alt=""
                          />
                        </figure>
                      </div>
                      <div className="achievement-item-body-content-elite">
                        <p>Won our 5000+ award before opening officially.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="col-xl-6">
            <div className="about-us-content-elite">
              {/* Section Title */}
              <div className="section-title">
                <h3 className="heading wow fadeInUp">About Us</h3>
                <h2
                  className="heading text-anime-style-3"
                  data-cursor="-opaque"
                >
                  Designing Spaces That Feel Like LUXURY Home
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  We create elegant, high end interiors that reflect comfort,
                  sophistication, and timeless beauty turning everyday living
                  into a luxurious experience.
                </p>
              </div>

              {/* About Body */}
              <div
                className="about-us-body-elite wow fadeInUp"
                data-wow-delay="0.4s"
              >
                {/* About Items */}
                <div className="about-item-list-elite">
                  {aboutItems.map((item) => (
                    <div className="about-us-item-elite" key={item.id}>
                      <div className="icon-box">
                        <img src={item.icon} alt={item.title} />
                      </div>
                      <div className="about-us-item-content-elite">
                        <h3 className="">{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="about-us-btn-elite wow fadeInUp"
                data-wow-delay="0.6s"
              >
                <Link href="/about-us" className="btn-default">
                  More About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
