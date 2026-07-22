const sections = [
  {
    title: "Website use",
    content:
      "This website provides information about Skydecor products and services. You may use it for lawful personal or business inquiries and must not interfere with its operation or security.",
  },
  {
    title: "Product information",
    content:
      "We aim to keep product descriptions, colours, finishes, dimensions, and availability accurate. Screen settings and production variations can affect appearance, so samples and current technical documents should be reviewed before specification or purchase.",
  },
  {
    title: "Inquiries and orders",
    content:
      "A website inquiry is not an accepted order or a guarantee of stock. Pricing, lead times, delivery, payment, and project requirements are confirmed separately by the Skydecor team.",
  },
  {
    title: "Intellectual property",
    content:
      "Skydecor names, logos, product imagery, text, and design materials may not be copied, republished, or used commercially without permission, except where use is allowed by applicable law.",
  },
  {
    title: "Third-party services",
    content:
      "The website may link to external services such as maps, social networks, or messaging platforms. Those services operate under their own terms and privacy practices.",
  },
  {
    title: "Liability",
    content:
      "To the extent permitted by applicable law, Skydecor is not responsible for losses caused by reliance on incomplete website information, temporary unavailability, or third-party services. Nothing here excludes rights or liabilities that cannot legally be excluded.",
  },
  {
    title: "Updates and contact",
    content:
      "We may update these terms as the website and services change. For questions about these terms or website content, contact info@skydecor.me.",
  },
];

export default function Terms() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
          <div className="right sd-terms">
            <h2 className="heading">Terms of Use</h2>
            <p className="text-secondary">Last updated: June 15, 2026</p>
            {sections.map((section, index) => (
              <div className="terms-of-use-item" key={section.title}>
                <h3 className="terms-of-use-title">
                  {index + 1}. {section.title}
                </h3>
                <div className="terms-of-use-content">
                  <p>{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
