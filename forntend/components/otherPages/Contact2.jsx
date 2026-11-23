"use client";

import { contactDetails } from "@/data/contactDetails";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inquiryTypes = [
  "Product information",
  "Catalog request",
  "Sample request",
  "Dealer / distributor inquiry",
  "Project quotation",
  "Technical support ",
];

const productLineupOptions = ["Design Master", "Ambience"];

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  city: "",
  inquiryType: inquiryTypes[0],
  productLineup: [],
  message: "",
  consent: false,
  website: "",
};

export default function Contact2() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = status === "submitting";

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;

    if (name === "productLineup") {
      setFormData((current) => ({
        ...current,
        productLineup: checked
          ? [...current.productLineup, value]
          : current.productLineup.filter((item) => item !== value),
      }));
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your inquiry.");
      }

      setFormData(initialFormState);
      router.push(`/thank-you?lead=${encodeURIComponent(data.data?.leadId || "")}`);
    } catch (error) {
      setStatus("failed");
      setErrorMessage(
        error.message || "We could not submit your inquiry. Please try again."
      );
    }
  };

  return (
    <section className="flat-spacing sd-contact-lead">
      <div className="container">
        <div className="sd-contact-lead__layout">
          <div className="sd-contact-lead__intro">
            <address className="sd-contact-lead__address">
              {contactDetails.addresses.map((address) => (
                <div key={address.label}>
                  <span>{address.label}</span>
                  <p>{address.value}</p>
                </div>
              ))}
            </address>
            <a
              className="sd-contact-lead__directions"
              href={contactDetails.addresses[0].directionsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <i className="icon icon-arrowUpRight" aria-hidden="true" />
            </a>

            <div className="sd-contact-lead__info">
              <div>
                <span>Phone</span>
                {contactDetails.phones.map((phone) => (
                  <a
                    className="sd-contact-lead__contact-link"
                    href={phone.href}
                    key={phone.href}
                  >
                    <i className="icon icon-phone" aria-hidden="true" />
                    {phone.label}
                  </a>
                ))}
              </div>
              <div>
                <span>Email</span>
                {contactDetails.emails.map((email) => (
                  <a
                    className="sd-contact-lead__contact-link"
                    href={email.href}
                    key={email.href}
                  >
                    <i className="icon icon-mail" aria-hidden="true" />
                    {email.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              className="sd-contact-lead__whatsapp"
              href={contactDetails.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon icon-whatsapp" aria-hidden="true" />
              {contactDetails.whatsapp.label}
            </a>

            <nav className="sd-contact-lead__social" aria-label="Skydecor social links">
              {contactDetails.socialLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.className}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={link.iconClass} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <form className="sd-contact-lead__form" onSubmit={submitLead}>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={updateField}
              className="sd-contact-lead__honeypot"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="sd-contact-lead__grid">
              <fieldset>
                <label htmlFor="contact-lead-name">Full name *</label>
                <input
                  id="contact-lead-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={updateField}
                  autoComplete="name"
                  maxLength={120}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="contact-lead-phone">Phone number *</label>
                <input
                  id="contact-lead-phone"
                  name="phone"
                  type="tel"
                  placeholder="+971 ..."
                  value={formData.phone}
                  onChange={updateField}
                  autoComplete="tel"
                  maxLength={40}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="contact-lead-email">Email address *</label>
                <input
                  id="contact-lead-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={updateField}
                  autoComplete="email"
                  maxLength={180}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="contact-lead-company">Company</label>
                <input
                  id="contact-lead-company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={updateField}
                  autoComplete="organization"
                  maxLength={160}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="contact-lead-city">City / Emirate</label>
                <input
                  id="contact-lead-city"
                  name="city"
                  type="text"
                  placeholder="Dubai"
                  value={formData.city}
                  onChange={updateField}
                  autoComplete="address-level2"
                  maxLength={120}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="contact-lead-type">Inquiry type *</label>
                <select
                  id="contact-lead-type"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={updateField}
                  required
                >
                  {inquiryTypes.map((type) => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <fieldset className="sd-contact-lead__lineup">
              <legend>Product interest</legend>
              <div>
                {productLineupOptions.map((productLine) => (
                  <label key={productLine}>
                    <input
                      type="checkbox"
                      name="productLineup"
                      value={productLine}
                      checked={formData.productLineup.includes(productLine)}
                      onChange={updateField}
                    />
                    <span>{productLine}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="contact-lead-message">Message *</label>
              <textarea
                id="contact-lead-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={updateField}
                placeholder="Product, quantity, project location, timeline..."
                maxLength={2500}
                required
              />
            </fieldset>

            <label className="sd-contact-lead__consent">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={updateField}
                required
              />
              <span>
                I agree to be contacted by skydecor about this inquiry.
              </span>
            </label>

            {errorMessage ? (
              <p className="sd-contact-lead__error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              className="tf-btn btn-fill justify-content-center sd-contact-lead__submit"
              type="submit"
              disabled={isSubmitting || !formData.consent}
            >
              <span className="text text-button">
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </span>
              <i className="icon icon-arrowUpRight" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
