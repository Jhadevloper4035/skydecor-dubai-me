"use client";

import { useEffect, useRef, useState } from "react";

import { submitProductEnquiry } from "@/lib/productsApi";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  quantity: 1,
  message: "",
  consent: false,
};

const normalizeProductCode = (product = {}) =>
  String(product.productCode || product.productCodeSlug || product._id || product.id || "")
    .trim()
    .toUpperCase();

const getProductName = (product = {}) =>
  String(product.productName || product.title || product.designName || "Product").trim();

export default function ProductEnquiryModal({ product = {} }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const productCode = normalizeProductCode(product);
  const productName = getProductName(product);
  const isSubmitting = status === "submitting";
  const isSucceeded = status === "succeeded";

  useEffect(() => {
    setFormData(initialFormState);
    setStatus("idle");
    setErrorMessage("");
  }, [productCode]);

  useEffect(() => {
    const modal = modalRef.current;
    const resetModal = () => {
      setFormData(initialFormState);
      setStatus("idle");
      setErrorMessage("");
    };

    modal?.addEventListener("hidden.bs.modal", resetModal);
    return () => modal?.removeEventListener("hidden.bs.modal", resetModal);
  }, []);

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "quantity"
            ? Math.max(1, Number(value) || 1)
            : value,
    }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      productCode,
      productName,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      quantity: Number(formData.quantity) || 1,
    };

    if (formData.companyName.trim()) payload.companyName = formData.companyName.trim();
    if (formData.message.trim()) payload.message = formData.message.trim();

    try {
      await submitProductEnquiry(payload);
      setStatus("succeeded");
      setFormData(initialFormState);
    } catch (error) {
      setStatus("failed");
      setErrorMessage(
        error.message || "We could not send your enquiry. Please try again."
      );
    }
  };

  return (
    <div
      ref={modalRef}
      className="modal fade modalCentered sd-product-enquiry-modal"
      id="product_enquiry"
      tabIndex="-1"
      aria-labelledby="product-enquiry-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="sd-product-enquiry-modal__header">
            <div>
              <span>skydecor Product Support</span>
              <h5 id="product-enquiry-title">
                {isSucceeded ? "Thank you for your enquiry" : "Enquire about this product"}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          {isSucceeded ? (
            <div className="sd-product-enquiry-success" role="status">
              <span className="sd-product-enquiry-success__icon" aria-hidden="true">
                <i className="fa-solid fa-check" />
              </span>
              <h4>Your request has been received</h4>
              <p>
                Thank you for enquiring about <strong>{productCode}</strong>. Our
                product team will contact you shortly with availability and details.
              </p>
              <button
                type="button"
                className="tf-btn btn-fill justify-content-center"
                data-bs-dismiss="modal"
              >
                <span className="text">Done</span>
              </button>
            </div>
          ) : (
            <div className="modal-body sd-product-enquiry-modal__body">
              <p className="sd-product-enquiry-modal__intro">
                Share your requirements and our team will assist with product
                availability, samples, and project quantities.
              </p>

              <form className="sd-product-enquiry-form" onSubmit={submitEnquiry}>
                <div className="sd-product-enquiry-form__product">
                  <fieldset>
                    <label htmlFor="product-enquiry-code">Product code</label>
                    <input
                      id="product-enquiry-code"
                      type="text"
                      value={productCode}
                      readOnly
                      aria-readonly="true"
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-enquiry-product">Product name</label>
                    <input
                      id="product-enquiry-product"
                      type="text"
                      value={productName}
                      readOnly
                      aria-readonly="true"
                    />
                  </fieldset>
                </div>

                <div className="sd-product-enquiry-form__grid">
                  <fieldset>
                    <label htmlFor="product-enquiry-name">Full name *</label>
                    <input
                      id="product-enquiry-name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={updateField}
                      autoComplete="name"
                      maxLength={120}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-enquiry-phone">Phone number *</label>
                    <input
                      id="product-enquiry-phone"
                      type="tel"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={updateField}
                      autoComplete="tel"
                      maxLength={40}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-enquiry-email">Email address *</label>
                    <input
                      id="product-enquiry-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={updateField}
                      autoComplete="email"
                      maxLength={180}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-enquiry-company">Company</label>
                    <input
                      id="product-enquiry-company"
                      type="text"
                      name="companyName"
                      placeholder="Company name"
                      value={formData.companyName}
                      onChange={updateField}
                      autoComplete="organization"
                      maxLength={160}
                    />
                  </fieldset>
                  <fieldset className="sd-product-enquiry-form__quantity">
                    <label htmlFor="product-enquiry-quantity">Required quantity</label>
                    <input
                      id="product-enquiry-quantity"
                      type="number"
                      min="1"
                      max="100000"
                      name="quantity"
                      value={formData.quantity}
                      onChange={updateField}
                    />
                  </fieldset>
                </div>

                <fieldset>
                  <label htmlFor="product-enquiry-message">Project requirements</label>
                  <textarea
                    id="product-enquiry-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about samples, quantity, location, or timeline"
                    value={formData.message}
                    onChange={updateField}
                    maxLength={2000}
                  />
                </fieldset>

                <label className="sd-product-enquiry-form__consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={updateField}
                    required
                  />
                  <span>
                    I agree that skydecor may use these details to respond to my
                    product enquiry.
                  </span>
                </label>

                {errorMessage ? (
                  <p className="sd-product-enquiry-form__error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="tf-btn btn-fill w-100 justify-content-center"
                  disabled={isSubmitting || !formData.consent || !productCode}
                >
                  <span className="text">
                    {isSubmitting ? "Sending enquiry..." : "Submit Product Enquiry"}
                  </span>
                  <i className="icon icon-arrowUpRight" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
