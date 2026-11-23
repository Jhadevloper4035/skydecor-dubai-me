import { contactDetails } from "@/data/contactDetails";

const sections = [
  {
    title: "Who we are and this policy",
    content: `${contactDetails.companyName} ("skydecor", "we", "us" or "our") operates this website. This policy explains how we handle personal data collected through the website, in accordance with applicable UAE data-protection laws, including Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data where applicable. Different rules may apply where another data-protection regime governs a particular relationship.`,
  },
  {
    title: "Information we collect",
    content:
      "Depending on how you use the website, we may collect your name, email address, telephone number, company, city or emirate, inquiry type, product interests, requested quantity, and the message you send us. If you apply for a role, we may also collect your current company, portfolio or LinkedIn URL, resume URL, and application details. When you submit a form, technical information such as your IP address, browser user-agent, referrer, and submission time may also be recorded.",
  },
  {
    title: "How we use your information",
    content:
      "We use personal data to respond to questions and product inquiries, prepare quotations or provide requested information, review and respond to job applications, operate and protect the website, prevent misuse, and meet applicable legal obligations. We do not use inquiry details for unrelated marketing unless permitted by law and, where required, you have agreed.",
  },
  {
    title: "Legal grounds for processing",
    content:
      "We process personal data when you have given consent or when processing is otherwise permitted or required by applicable UAE law, such as to respond to a request you make, take steps at your request before entering a contract, perform a contract, meet a legal obligation, or on another ground recognized by law. Where processing is based on consent, you may withdraw it; withdrawal does not affect processing that took place before withdrawal or processing allowed on another legal ground.",
  },
  {
    title: "Sharing and international transfers",
    content:
      "We may share relevant information with our authorized personnel, service providers supporting website hosting, storage, communications or operations, and professional advisers. We may also disclose information when required by law or to protect legal rights and safety. If personal data is transferred outside the UAE, we will do so only as permitted by applicable UAE law and any required safeguards.",
  },
  {
    title: "Retention and security",
    content:
      "We keep personal data only for as long as reasonably needed for the purposes described in this policy, to manage our relationship with you, and to meet legal, accounting, or dispute-resolution requirements. Retention time depends on the type of information and purpose; we securely delete or anonymize it when it is no longer needed, where practicable. We use reasonable security measures, but no online service or storage method can be guaranteed completely secure.",
  },
  {
    title: "Browser storage and third-party services",
    content:
      "Some website features may use browser storage, for example to remember recently viewed products. The website may also link to or embed third-party services such as maps or social platforms. Those providers may collect information under their own privacy notices, which we do not control. You can manage browser storage and cookie settings through your browser.",
  },
  {
    title: "Your privacy rights",
    content:
      "Subject to applicable law, you may have the right to request access to or correction or deletion of your personal data, object to or request restriction of certain processing, and withdraw consent where consent is the basis for processing. You may also raise a concern with the competent UAE authority. To make a request, contact us using the details below. We may need to verify your identity before responding.",
  },
  {
    title: "Children",
    content:
      "This website is intended for business and general audiences and is not designed to collect personal data from children. If you believe a child has provided personal data to us, please contact us so we can review the request.",
  },
  {
    title: "Changes and contact",
    content: `We may update this policy when our practices or legal requirements change. The latest version and its update date will be shown on this page. For privacy questions or requests, email ${contactDetails.emails[0].label}.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="sd-legal-content">
          <p className="sd-legal-content__updated">
            Last updated: November 23, 2026
          </p>
          {sections.map((section) => (
            <section className="sd-legal-content__item" key={section.title}>
              <h5 className="sd-legal-content__title">{section.title}</h5>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
