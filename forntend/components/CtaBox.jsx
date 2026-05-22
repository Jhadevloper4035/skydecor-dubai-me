import Link from "next/link";

const ctaItems = [
  {
    id: 1,
    icon: "/images/icon-service-item-1.svg",
    line1: "Fast Delivery",
    line2: "Across Dubai & UAE",
    delay: "",
  },
  {
    id: 2,
    icon: "/images/icon-service-item-2.svg",
    line1: "Expert Consultation",
    line2: "for Every Project",
    delay: "0.2s",
  },
  {
    id: 3,
    icon: "/images/icon-service-item-3.svg",
    line1: "Premium Laminates",
    line2: "at Competitive Prices",
    delay: "0.4s",
  },
];

export default function CtaBox() {
  return (
    <div
      className="cta-box dark-section"
      style={{
        backgroundImage: "url('/images/thar.jpeg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--primary-color)",
          opacity: 0.6,
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* Top Row */}
        <div className="row align-items-center">

          {/* Left — CTA Content */}
          <div className="col-xl-6">
            <div className="cta-box-content">
              <div className="section-title">
                <h3 className="heading wow fadeInUp">Get In Touch</h3>
                <h2 className="heading text-anime-style-3" data-cursor="-opaque">
                  Transform Your Space with SkyDecor
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Whether you're fitting out a home, office, or commercial space in Dubai or across the UAE, our laminate experts are ready to help you choose the perfect finish.
                </p>
              </div>
              <div className="cta-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href="/contact" className="btn-default">Contact Us</Link>
              </div>
            </div>
          </div>

          {/* Right — Client Box */}
          <div className="col-xl-6">
            <div className="cta-client-box wow fadeInUp" data-wow-delay="0.6s">
              <h3 className="heading">Trusted by Designers & Contractors Across the UAE</h3>
              <p>From interior designers to large-scale contractors — SkyDecor is the preferred laminate supplier in Dubai for quality, variety, and reliability.</p>
            </div>
          </div>
        </div>

        {/* Bottom Row — CTA Items */}
        <div className="row">
          <div className="col-lg-12">
            <div className="cta-item-list">
              {ctaItems.map((item) => (
                <div
                  className="cta-item wow fadeInUp"
                  key={item.id}
                  data-wow-delay={item.delay || undefined}
                >
                  <div className="icon-box">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div className="cta-item-content">
                    <h3>{item.line1}<br />{item.line2}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
