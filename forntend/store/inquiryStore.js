"use client";

import { create } from "zustand";

import { submitJobApplication as submitJobApplicationApi } from "@/lib/careersApi";
import { submitProductInquiry as submitProductInquiryApi } from "@/lib/productsApi";

const parseJson = (response) => response.json().catch(() => ({}));

const useInquiryStore = create((set) => ({
  contactStatus: "idle",
  contactError: "",
  productInquiryStatus: "idle",
  productInquiryError: "",
  jobApplicationStatus: "idle",
  jobApplicationError: "",

  resetContactLead: () => set({ contactStatus: "idle", contactError: "" }),
  resetProductInquiry: () =>
    set({ productInquiryStatus: "idle", productInquiryError: "" }),
  resetJobApplication: () =>
    set({ jobApplicationStatus: "idle", jobApplicationError: "" }),

  submitContactLead: async (payload) => {
    set({ contactStatus: "submitting", contactError: "" });

    try {
      const response = await fetch("/api/contact-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await parseJson(response);

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit your inquiry.");
      }

      set({ contactStatus: "succeeded" });
      return data.data;
    } catch (error) {
      const message =
        error.message || "We could not submit your inquiry. Please try again.";
      set({ contactStatus: "failed", contactError: message });
      throw new Error(message);
    }
  },

  submitProductInquiry: async (payload) => {
    set({ productInquiryStatus: "submitting", productInquiryError: "" });

    try {
      const inquiry = await submitProductInquiryApi(payload);
      set({ productInquiryStatus: "succeeded" });
      return inquiry;
    } catch (error) {
      const message =
        error.message || "We could not send your inquiry. Please try again.";
      set({ productInquiryStatus: "failed", productInquiryError: message });
      throw new Error(message);
    }
  },

  submitJobApplication: async (payload) => {
    set({ jobApplicationStatus: "loading", jobApplicationError: "" });

    try {
      const application = await submitJobApplicationApi(payload);
      set({ jobApplicationStatus: "success" });
      return application;
    } catch (error) {
      const message = error.message || "Unable to submit application.";
      set({ jobApplicationStatus: "error", jobApplicationError: message });
      throw new Error(message);
    }
  },
}));

export default useInquiryStore;
