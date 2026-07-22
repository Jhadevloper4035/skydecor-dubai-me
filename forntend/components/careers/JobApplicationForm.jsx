"use client";

import { useState } from "react";
import { submitJobApplication } from "@/lib/careersApi";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  currentCompany: "",
  portfolioUrl: "",
  resumeUrl: "",
  message: "",
  consent: false,
};

const buildPayload = (job, values) =>
  Object.entries({ jobSlug: job.slug, ...values }).reduce((payload, [key, value]) => {
    if (key === "consent") return payload;
    if (typeof value === "string" && value.trim() === "") return payload;
    payload[key] = typeof value === "string" ? value.trim() : value;
    return payload;
  }, {});

export default function JobApplicationForm({ job }) {
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await submitJobApplication(buildPayload(job, values));
      setStatus("success");
      setMessage("Application submitted successfully. Our team will review it soon.");
      setValues(emptyForm);
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Unable to submit application.");
    }
  };

  const isLoading = status === "loading";

  return (
    <form className="sd-career-form" onSubmit={handleSubmit}>
      <div className="sd-career-form__job">
        <span>Applying for</span>
        <input type="text" value={job.title} readOnly aria-label="Applying for" />
      </div>

      <div className="sd-career-form__grid">
        <fieldset>
          <label htmlFor="career-full-name">Full name</label>
          <input
            id="career-full-name"
            type="text"
            name="fullName"
            placeholder="Full Name*"
            value={values.fullName}
            onChange={handleChange}
            autoComplete="name"
            maxLength={120}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="career-email">Email address</label>
          <input
            id="career-email"
            type="email"
            name="email"
            placeholder="Email Address*"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={180}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="career-phone">Phone number</label>
          <input
            id="career-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number*"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            maxLength={40}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="career-company">Current company</label>
          <input
            id="career-company"
            type="text"
            name="currentCompany"
            placeholder="Current Company"
            value={values.currentCompany}
            onChange={handleChange}
            autoComplete="organization"
            maxLength={160}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="career-portfolio">Portfolio or LinkedIn URL</label>
          <input
            id="career-portfolio"
            type="url"
            name="portfolioUrl"
            placeholder="Portfolio / LinkedIn URL"
            value={values.portfolioUrl}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="career-resume">Resume URL</label>
          <input
            id="career-resume"
            type="url"
            name="resumeUrl"
            placeholder="Resume URL"
            value={values.resumeUrl}
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <fieldset>
        <label htmlFor="career-message">Message</label>
        <textarea
          id="career-message"
          name="message"
          rows={5}
          placeholder="Tell us why this role fits you"
          value={values.message}
          onChange={handleChange}
          maxLength={2000}
        />
      </fieldset>

      <label className="sd-career-form__consent">
        <input
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          required
        />
        <span>
          I agree that Skydecor may use these details to review and respond to my
          application.
        </span>
      </label>

      {message ? (
        <p className={`sd-career-form__message sd-career-form__message--${status}`} role="alert">
          {message}
        </p>
      ) : null}

      <button
        className="tf-btn btn-fill"
        type="submit"
        disabled={isLoading || !values.consent}
      >
        <span className="text text-button">
          {isLoading ? "Submitting..." : "Submit Application"}
        </span>
        <i className="icon icon-arrowUpRight" />
      </button>
    </form>
  );
}
