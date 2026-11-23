import { contactDetails } from "@/data/contactDetails";

const sections = [
  {
    title: "About these terms",
    content:
      "These terms apply to your access to and use of the skydecor Dubai website. By using the website, you agree to follow these terms and applicable laws in force in the United Arab Emirates and Dubai. If you do not agree, please do not use the website.",
  },
  {
    title: "Using the website",
    content:
      "You may use the website for lawful personal or business purposes. You must not misuse the website, attempt unauthorized access, interfere with its operation or security, or use it in a way that violates another person's rights or applicable law.",
  },
  {
    title: "Product information",
    content:
      "We take reasonable care when presenting product descriptions, colours, finishes, dimensions, and availability. Colours and appearance may vary by screen, lighting, samples, or production. Review current samples and technical documents before making a specification or purchase decision. Website information is general and may be updated.",
  },
  {
    title: "Inquiries, quotations, and orders",
    content:
      "Submitting an inquiry does not create an accepted order or guarantee stock, pricing, or delivery. Any sale is subject to a separate quotation or order confirmation and the terms agreed for that transaction. Confirmed prices, payment, availability, delivery, and project requirements will be provided separately.",
  },
  {
    title: "Intellectual property",
    content:
      "Unless applicable law allows otherwise, skydecor names, logos, product images, text, and other website materials may not be copied, republished, modified, or used commercially without prior permission from the relevant rights holder.",
  },
  {
    title: "Information you provide",
    content:
      "You are responsible for ensuring that information you submit is accurate and that you are entitled to provide it. Do not submit unlawful, harmful, or confidential information that is not needed for your inquiry. We use submitted information as described in our Privacy Policy.",
  },
  {
    title: "Third-party links and services",
    content:
      "The website may link to or include services provided by third parties, such as maps or social platforms. Those services are operated independently and are subject to their own terms and privacy notices. We are not responsible for third-party content or services.",
  },
  {
    title: "Website availability and liability",
    content:
      "We may update, suspend, or change website features and content. To the extent permitted by applicable law, the website and its general information are provided without a guarantee that access will always be uninterrupted or error-free. Nothing in these terms excludes or limits liability, consumer protections, or other rights that cannot lawfully be excluded or limited under applicable UAE law.",
  },
  {
    title: "Privacy",
    content:
      "Our Privacy Policy explains how we handle personal data submitted through the website. By using the website, you acknowledge that policy; where consent is required for a particular use of personal data, we will seek it separately.",
  },
  {
    title: "Changes, governing law, and contact",
    content:
      `We may update these terms as the website or applicable requirements change. The latest version will appear on this page. These terms are governed by the laws applicable in the United Arab Emirates and Dubai, subject to any mandatory laws that apply to you. Disputes are subject to the jurisdiction of the competent courts in Dubai, unless applicable law requires otherwise. For questions about these terms, contact ${contactDetails.emails[0].label}.`,
  },
];

export default function Terms() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sd-legal-content">
          <p className="sd-legal-content__updated">
            Last updated: November 23, 2026
          </p>
          {sections.map((section, index) => (
            <section className="sd-legal-content__item" key={section.title}>
              <h5 className="sd-legal-content__title">
                {index + 1}. {section.title}
              </h5>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
