import Link from "next/link";

export default function CtaBox() {
  return (
    <section className="cta-consultation">
      <div className="container cta-consultation__inner">
        <div className="cta-consultation__card">
          <h2>Ready To Transform Your Space With Skydecor?</h2>
          <p>
            From concept to completion, our HPL specialists help you select
            finishes that bring quality, functionality, and style to every
            project.
          </p>
          <Link className="btn-default" href="/contact">
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
