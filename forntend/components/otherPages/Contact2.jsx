"use client";
import { submitGeneralEnquiry } from "@/lib/productsApi";
import React, { useRef, useState } from "react";

export default function Contact2() {
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    setIsSubmitting(true);

    try {
      await submitGeneralEnquiry({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: "Website enquiry",
        service: "general",
        message: formData.get("message"),
      });
      setSuccess(true);
      formRef.current.reset();
    } catch {
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
      handleShowMessage();
    }
  };
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="contact-us-content">
          <div className="left">
            <h4>Get In Touch</h4>
            <p className="text-secondary-2">
              Tell us about your project, product needs, or sample request.
            </p>
            <div
              className={`tfSubscribeMsg  footer-sub-element ${
                showMessage ? "active" : ""
              }`}
            >
              {success ? (
                <p style={{ color: "rgb(52, 168, 83)" }}>
                  Your message has been sent. Our team will contact you soon.
                </p>
              ) : (
                <p style={{ color: "red" }}>
                  We could not send your message. Please email us directly.
                </p>
              )}
            </div>
            <form
              onSubmit={sendMail}
              ref={formRef}
              id="contactform"
              className="form-leave-comment"
            >
              <div className="wrap">
                <div className="cols">
                  <fieldset className="">
                    <input
                      className=""
                      type="text"
                      placeholder="Your Name*"
                      name="name"
                      id="name"
                      tabIndex={2}
                      defaultValue=""
                      aria-required="true"
                      required
                    />
                  </fieldset>
                  <fieldset className="">
                    <input
                      className=""
                      type="email"
                      placeholder="Your Email*"
                      name="email"
                      id="email"
                      tabIndex={2}
                      defaultValue=""
                      aria-required="true"
                      required
                    />
                  </fieldset>
                </div>
                <fieldset>
                  <input
                    type="tel"
                    placeholder="Your Phone*"
                    name="phone"
                    id="phone"
                    tabIndex={3}
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Your Message*"
                    tabIndex={4}
                    aria-required="true"
                    required
                    defaultValue={""}
                  />
                </fieldset>
              </div>
              <div className="button-submit send-wrap">
                <button
                  className="tf-btn btn-fill"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="text text-button">
                    {isSubmitting ? "Sending..." : "Send message"}
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="right">
            <h4>Information</h4>
            <div className="mb_20">
              <div className="text-title mb_8">WhatsApp:</div>
              <p className="text-secondary">
                <a
                  href="https://alvo.chat/3Ijc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start a conversation
                </a>
              </p>
            </div>
            <div className="mb_20">
              <div className="text-title mb_8">Email:</div>
              <p className="text-secondary">
                <a href="mailto:info@skydecor.eu">info@skydecor.eu</a>
              </p>
            </div>
            <div className="mb_20">
              <div className="text-title mb_8">Address:</div>
              <p className="text-secondary">
                Dubai, United Arab Emirates
              </p>
            </div>
            <div>
              <div className="text-title mb_8">Enquiries:</div>
              <p className="text-secondary">
                Product selection, samples, catalogues, and project support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
