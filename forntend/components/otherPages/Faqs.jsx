import Link from "next/link";

const faqs = [
  {
    question: "Which surface products does skydecor supply?",
    answer:
      "Our range includes PVC HPL, decorative HPL, acrylic HPL, edgeband, MDF boards, acoustic panels, and Matteva surfaces.",
  },
  {
    question: "Can I request samples or a catalogue?",
    answer:
      "Yes. Send your preferred collection, finish, and project details through our contact page. Our team will help with samples and the latest catalogues.",
  },
  {
    question: "How do I choose the right laminate for my project?",
    answer:
      "Share the application, expected traffic, desired finish, and technical requirements. We can help shortlist suitable products for residential or commercial interiors.",
  },
  {
    question: "Do you support projects across the UAE?",
    answer:
      "skydecor Dubai handles product and project enquiries across Dubai and the UAE. Availability and delivery details are confirmed for each enquiry.",
  },
  {
    question: "Where can I find product specifications?",
    answer:
      "Browse the product pages for collection details, then contact us for current technical sheets, certificates, sizes, and finish availability.",
  },
  {
    question: "How should decorative surfaces be cleaned?",
    answer:
      "Use a soft damp cloth and a mild non-abrasive cleaner. Avoid harsh chemicals, abrasive pads, and prolonged standing water. Follow the product-specific care guidance supplied with your selection.",
  },
];

export default function Faqs() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="page-faqs-wrap sd-faqs">
          <div className="heading-section text-center">
            <h2 className="heading">Product &amp; Project FAQs</h2>
            <p className="subheading text-secondary">
              Quick answers about our collections, samples, and project support.
            </p>
          </div>

          <div className="sd-faqs__list">
            {faqs.map((faq, index) => (
              <details className="sd-faqs__item" key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="sd-faqs__contact text-center">
            <p>Need an answer for a specific product or project?</p>
            <Link href="/contact" className="tf-btn btn-fill">
              <span className="text text-button">Contact our team</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
