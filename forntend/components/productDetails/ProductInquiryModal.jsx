"use client";

import { useEffect, useRef, useState } from "react";

import useInquiryStore from "@/store/inquiryStore";

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

export default function ProductInquiryModal({ product = {} }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const status = useInquiryStore((state) => state.productInquiryStatus);
  const errorMessage = useInquiryStore((state) => state.productInquiryError);
  const submitProductInquiry = useInquiryStore((state) => state.submitProductInquiry);
  const resetProductInquiry = useInquiryStore((state) => state.resetProductInquiry);
  const productCode = normalizeProductCode(product);
  const productName = getProductName(product);
  const isSubmitting = status === "submitting";
  const isSucceeded = status === "succeeded";

  useEffect(() => {
    setFormData(initialFormState);
    resetProductInquiry();
  }, [productCode, resetProductInquiry]);

  useEffect(() => {
    const modal = modalRef.current;
    const resetModal = () => {
      setFormData(initialFormState);
      resetProductInquiry();
    };

    modal?.addEventListener("hidden.bs.modal", resetModal);
    return () => modal?.removeEventListener("hidden.bs.modal", resetModal);
  }, [resetProductInquiry]);

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

  const submitInquiry = async (event) => {
    event.preventDefault();

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
      await submitProductInquiry(payload);
      setFormData(initialFormState);
    } catch {}
  };

  return (
    <div
      ref={modalRef}
      className="modal fade modalCentered sd-product-inquiry-modal"
      id="product_inquiry"
      tabIndex="-1"
      aria-labelledby="product-inquiry-title"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="sd-product-inquiry-modal__header">
            <div>
              <span>Skydecor Product Support</span>
              <h5 id="product-inquiry-title">
                {isSucceeded ? "Thank you for your inquiry" : "Ask about this product"}
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
            <div className="sd-product-inquiry-success" role="status">
              <span className="sd-product-inquiry-success__icon" aria-hidden="true">
                <i className="fa-solid fa-check" />
              </span>
              <h4>Your request has been received</h4>
              <p>
                Thank you for asking about <strong>{productCode}</strong>. Our
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
            <div className="modal-body sd-product-inquiry-modal__body">
              <p className="sd-product-inquiry-modal__intro">
                Share your requirements and our team will assist with product
                availability, samples, and project quantities.
              </p>

              <form className="sd-product-inquiry-form" onSubmit={submitInquiry}>
                <div className="sd-product-inquiry-form__product">
                  <fieldset>
                    <label htmlFor="product-inquiry-code">Product code</label>
                    <input
                      id="product-inquiry-code"
                      type="text"
                      value={productCode}
                      readOnly
                      aria-readonly="true"
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-inquiry-product">Product name</label>
                    <input
                      id="product-inquiry-product"
                      type="text"
                      value={productName}
                      readOnly
                      aria-readonly="true"
                    />
                  </fieldset>
                </div>

                <div className="sd-product-inquiry-form__grid">
                  <fieldset>
                    <label htmlFor="product-inquiry-name">Full name *</label>
                    <input
                      id="product-inquiry-name"
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
                    <label htmlFor="product-inquiry-phone">Phone number *</label>
                    <input
                      id="product-inquiry-phone"
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
                    <label htmlFor="product-inquiry-email">Email address *</label>
                    <input
                      id="product-inquiry-email"
                      type="email"
                      name="email"
                      placeholder="you@example.me"
                      value={formData.email}
                      onChange={updateField}
                      autoComplete="email"
                      maxLength={180}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="product-inquiry-company">Company</label>
                    <input
                      id="product-inquiry-company"
                      type="text"
                      name="companyName"
                      placeholder="Company name"
                      value={formData.companyName}
                      onChange={updateField}
                      autoComplete="organization"
                      maxLength={160}
                    />
                  </fieldset>
                  <fieldset className="sd-product-inquiry-form__quantity">
                    <label htmlFor="product-inquiry-quantity">Required quantity</label>
                    <input
                      id="product-inquiry-quantity"
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
                  <label htmlFor="product-inquiry-message">Project requirements</label>
                  <textarea
                    id="product-inquiry-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about samples, quantity, location, or timeline"
                    value={formData.message}
                    onChange={updateField}
                    maxLength={2000}
                  />
                </fieldset>

                <label className="sd-product-inquiry-form__consent">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={updateField}
                    required
                  />
                  <span>
                    I agree that Skydecor may use these details to respond to my
                    product inquiry.
                  </span>
                </label>

                {errorMessage ? (
                  <p className="sd-product-inquiry-form__error" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="tf-btn btn-fill w-100 justify-content-center"
                  disabled={isSubmitting || !formData.consent || !productCode}
                >
                  <span className="text">
                    {isSubmitting ? "Sending inquiry..." : "Submit Product Inquiry"}
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
