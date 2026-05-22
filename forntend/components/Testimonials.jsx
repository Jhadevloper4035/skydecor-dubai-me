// components/Testimonials.jsx
import Link from "next/link";

const testimonials = [
  {
    id: 1,
    logo: "/images/testimonial-company-logo-1.svg",
    quote: "Working with this team was one of the best decisions we made during home renovation. They took time to truly understand our lifestyle & the challenges we faced with space",
    author: "Brooklyn Simmons",
    role: "Homeowner",
  },
  {
    id: 2,
    logo: "/images/testimonial-company-logo-2.svg",
    quote: "Their team redesigned our office space with creativity and precision. The result is a functional, modern environment that has improved both productivity and aesthetics.",
    author: "Leslie Alexander",
    role: "Business Owner",
  },
  {
    id: 3,
    logo: "/images/testimonial-company-logo-3.svg",
    quote: "Our stay was magical! Waking up to the sounds nature while enjoying comfort of bed was the best of worlds. The team made everything seamless, from check-in to organizing.",
    author: "Kristin Watson",
    role: "Homeowner",
  },
];

const authorImages = [
  "/images/avatar/user-1.jpg",
  "/images/avatar/user-2.jpg",
  "/images/avatar/user-3.jpg",
  "/images/avatar/user-4.jpg",
];

export default function Testimonials() {
  return (
    <div className="our-testimonials">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            {/* Section Title */}
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our Testimonials</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Voices of Appreciation from Our Happy Clients
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Left Image Box */}
          <div className="col-xl-4 col-md-6">
            <div className="testimonial-image-box wow fadeInUp">
              <div className="testimonial-image">
                <figure className="image-anime">
                  <img src="/images/our-testimonial-image.jpg" alt="Testimonial" />
                </figure>
              </div>

              <div className="testimonial-client-box">
                <div className="satisfy-client-images">
                  {authorImages.map((src, index) => (
                    <div className="satisfy-client-image" key={index}>
                      <figure className="image-anime">
                        <img src={src} alt={`Author ${index + 1}`} />
                      </figure>
                    </div>
                  ))}
                  <div className="satisfy-client-image add-more">
                    <h3><span className="counter">15</span>+</h3>
                  </div>
                </div>
                <div className="testimonial-client-box-content">
                  <h3>Satisfied Customers Across Regions</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Slider */}
          <div className="col-xl-8 col-md-6">
            <div className="testimonial-slider wow fadeInUp" data-wow-delay="0.2s">
              <div className="swiper">
                <div className="swiper-wrapper" data-cursor-text="Drag">
                  {testimonials.map((item) => (
                    <div className="swiper-slide" key={item.id}>
                      <div className="testimonial-item">
                        <div className="testimonial-item-header">
                          <div className="testimonial-item-logo">
                            <img src={item.logo} alt={item.author} />
                          </div>
                          <div className="testimonial-item-quote">
                            <img src="/images/testimonial-item-quote.svg" alt="Quote" />
                          </div>
                        </div>
                        <div className="testimonial-item-body">
                          <div className="testimonial-item-content">
                            <p>"{item.quote}"</p>
                          </div>
                          <div className="testimonial-author-content">
                            <h3>{item.author}</h3>
                            <p>{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <div className="col-lg-12">
            <div className="section-footer-text section-satisfy-img wow fadeInUp" data-wow-delay="0.4s">
              <div className="satisfy-client-images">
                <div className="satisfy-client-image">
                  <figure className="image-anime">
                    <img src="/images/avatar/user-1.jpg" alt="Author" />
                  </figure>
                </div>
                <div className="satisfy-client-image add-more">
                  <i><img src="/images/icon-phone-white.svg" alt="Phone" /></i>
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
