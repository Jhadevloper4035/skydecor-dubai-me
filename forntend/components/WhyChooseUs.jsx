import Link from "next/link";

const whyChooseItems = [
  {
    id: 1,
    icon: "/images/icon-why-choose-us-item.svg",
    title: "High-Quality Craftsmanship",
    description: "We use premium materials and work with trusted artisans to ensure durability, beauty, and flawless",
    delay: "",
  },
  {
    id: 2,
    icon: "/images/icon-why-choose-us-item.svg",
    title: "On-Time & Hassle-Free Execution",
    description: "We follow a structured workflow and maintain transparent communication to deliver projects on schedule.",
    delay: "0.2s",
  },
  {
    id: 3,
    icon: "/images/icon-why-choose-us-item.svg",
    title: "Sustainable & Smart Design Approach",
    description: "We focus on eco-friendly designs, energy-efficient concepts, and future-ready architectural planning.",
    delay: "0.4s",
  },
  {
    id: 4,
    icon: "/images/icon-why-choose-us-item.svg",
    title: "End-to-End Project Handling",
    description: "From concept, planning, and design to execution and final styling — we manage everything seamlessly.",
    delay: "0.6s",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="why-choose-us-elite">
      <div className="container">

        {/* Section Title */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="heading wow fadeInUp">Why Choose Us</h3>
              <h2 className="text-anime-style-3 heading" data-cursor="-opaque">
                Experience Professional Service
              </h2>
              <p className="wow fadeInUp" data-wow-delay="0.2s">
                We are a creative architecture and interior design studio dedicated to transforming spaces with modern aesthetics, smart planning, and timeless elegance.
              </p>
            </div>
          </div>
        </div>

        <div className="row">


          <div className="col-xl-6">
            <div className="why-choose-images-elite wow fadeInUp">


              <div className="why-choose-client-box-elite">
                <div className="why-choose-client-body-elite">
                  <div className="icon-box">
                    <img src="/images/icon-phone-white.svg" alt="" />
                  </div>
                  <div className="why-choose-client-content-elite">
                    <h3 className="heading">24/7 Expert Support Section</h3>
                    <p>Our team is available 24/7 to support you at every stage of your architecture</p>
                  </div>
                </div>
              </div>


              <div className="why-choose-image-1-elite">
                <figure className="image-anime">
                  <img src="/images/why-choose-image-1.jpg" alt="" />
                </figure>
              </div>


              <div className="why-choose-image-2-elite">
                <figure className="image-anime">
                  <img src="/images/why-choose-image-2.jpg" alt="" />
                </figure>
              </div>

            </div>
          </div>

          {/* Right — Why Choose Items */}
          
          <div className="col-xl-6">
            <div className="why-choose-item-list-elite">
              {whyChooseItems.map((item) => (
                <div
                  className="why-choose-item-elite wow fadeInUp"
                  key={item.id}
                  data-wow-delay={item.delay || undefined}
                >
                  <div className="why-choose-item-header-elite">
                    <div className="icon-box">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <div className="why-choose-item-title-elite">
                      <h3 className="">{item.title}</h3>
                    </div>
                  </div>
                  <div className="why-choose-item-body-elite">
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>



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
                Experience design where vision and precision come together beautifully -{" "}
                <Link href="/contact">Contact Us Today</Link>
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
