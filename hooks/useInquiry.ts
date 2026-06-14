// hooks/useInquiry.ts
"use client";

import { useState } from "react";

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<keyof InquiryFormData, string>>;

const INITIAL: InquiryFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export function useInquiry() {
  const [form, setForm] = useState<InquiryFormData>(INITIAL);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      // Same-origin API call — no CORS, no proxy needed
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Handle Zod field validation errors (400)
        if (res.status === 400 && data?.errors) {
          const flat: FieldErrors = {};
          Object.entries(data.errors).forEach(([key, msgs]) => {
            flat[key as keyof InquiryFormData] = Array.isArray(msgs)
              ? (msgs as string[])[0]
              : String(msgs);
          });
          setFieldErrors(flat);
          setStatus("error");
          setErrorMessage("Please fix the errors below and try again.");
          return;
        }
        // Handle rate limit / cooldown (429)
        if (res.status === 429) {
          setStatus("error");
          setErrorMessage(
            data?.message ??
              "Please wait before submitting another inquiry.",
          );
          return;
        }
        throw new Error(data?.message ?? `Error ${res.status}`);
      }

      setStatus("success");
      setForm(INITIAL);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please call us directly.",
      );
    }
  };

  return {
    form,
    status,
    errorMessage,
    fieldErrors,
    handleChange,
    handleSubmit,
  };
}
