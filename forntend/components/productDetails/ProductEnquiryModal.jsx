"use client";

import { useEffect, useMemo, useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  quantity: 1,
  message: "",
};

const normalizeProductCode = (product = {}) =>
  String(product.productCode || product.productCodeSlug || product._id || product.id || "")
    .trim()
    .toUpperCase();

const getProductName = (product = {}) =>
  String(product.productName || product.title || product.designName || "Product").trim();

export default function ProductEnquiryModal({ product = {} }) {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const productCode = normalizeProductCode(product);
  const productName = getProductName(product);
  const productLabel = useMemo(
    () => [productCode, productName].filter(Boolean).join(" - "),
    [productCode, productName]
  );

  useEffect(() => {
    setFormData(initialFormState);
    setStatus("idle");
    setMessage("");
  }, [productCode]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: name === "quantity" ? Math.max(1, Number(value) || 1) : value,
    }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const payload = {
      productCode,
      productName,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      quantity: Number(formData.quantity) || 1,
      source: "website",
    };

    if (formData.companyName.trim()) payload.companyName = formData.companyName.trim();
    if (formData.message.trim()) payload.message = formData.message.trim();

    try {
      const response = await fetch("/api/v1/product-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to submit product enquiry.");
      }

      setStatus("succeeded");
      setMessage("Product enquiry sent. Our team will contact you shortly.");
      setFormData(initialFormState);
    } catch {
      setStatus("failed");
      setMessage("We could not send the enquiry. Please try again.");
    }
  };

  return (
    <div className="modal fade modalCentered" id="ask_question">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Product Enquiry</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p className="text-caption-1 text-secondary mb_20">{productLabel}</p>
            <form onSubmit={submitEnquiry}>
              <fieldset>
                <label htmlFor="product-enquiry-name">Name *</label>
                <input
                  id="product-enquiry-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="product-enquiry-email">Email *</label>
                <input
                  id="product-enquiry-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="product-enquiry-phone">Phone *</label>
                <input
                  id="product-enquiry-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField}
                  required
                />
              </fieldset>
              <fieldset>
                <label htmlFor="product-enquiry-company">Company</label>
                <input
                  id="product-enquiry-company"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={updateField}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="product-enquiry-quantity">Quantity</label>
                <input
                  id="product-enquiry-quantity"
                  type="number"
                  min="1"
                  name="quantity"
                  value={formData.quantity}
                  onChange={updateField}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="product-enquiry-message">Message</label>
                <textarea
                  id="product-enquiry-message"
                  name="message"
                  value={formData.message}
                  onChange={updateField}
                />
              </fieldset>
              {message && (
                <p
                  className={`text-caption-1 mb_12 ${
                    status === "failed" ? "text-danger" : "text-success"
                  }`}
                >
                  {message}
                </p>
              )}
              <button
                type="submit"
                className="tf-btn btn-fill w-100 justify-content-center"
                disabled={status === "submitting"}
              >
                <span className="text">
                  {status === "submitting" ? "Sending..." : "Send Enquiry"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
