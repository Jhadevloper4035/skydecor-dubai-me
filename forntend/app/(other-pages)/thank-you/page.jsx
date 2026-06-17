import Link from "next/link";

export const metadata = {
  title: "Thank You | skydecor Dubai",
  description:
    "Thank you for contacting skydecor Dubai. Our team will review your enquiry and respond shortly.",
};

export default async function ThankYouPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const leadId = resolvedSearchParams?.lead || "";

  return (
    <main className="sd-thank-you flat-spacing">
      <div className="container">
        <div className="sd-thank-you__panel">
          <span className="sd-thank-you__icon" aria-hidden="true">
            <i className="fa-solid fa-check" />
          </span>
          <p className="sd-events-kicker">Enquiry Submitted</p>
          <h1>Thank you for contacting skydecor</h1>
          <p>
            Your enquiry has been received. Our Dubai team will review your
            product interests and contact you shortly with the next steps.
          </p>
          {leadId ? (
            <p className="sd-thank-you__reference">
              Reference: <strong>{leadId}</strong>
            </p>
          ) : null}
          <div className="sd-thank-you__actions">
            <Link href="/products" className="tf-btn btn-fill">
              <span className="text text-button">Explore Products</span>
            </Link>
            <Link href="/catalogue" className="btn-line">
              View Catalogues
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
