// components/sections/ContactForm.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useInquiry } from "@/hooks/useInquiry";
import { services } from "@/data/services";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mt-1 text-xs text-red-600 flex items-center gap-1"
      role="alert"
    >
      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const {
    form,
    status,
    errorMessage,
    fieldErrors,
    handleChange,
    handleSubmit,
  } = useInquiry();

  useEffect(() => {
    const serviceSlug = searchParams.get("service");
    if (serviceSlug) {
      handleChange({
        target: { name: "service", value: serviceSlug },
      } as React.ChangeEvent<HTMLSelectElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputClass = (field: keyof typeof fieldErrors) =>
    [
      "w-full px-3 py-2.5 rounded-lg border text-sm text-slate-900",
      "placeholder-slate-400 focus:outline-none focus:ring-2",
      "focus:ring-brand-500 focus:border-transparent transition-colors",
      fieldErrors[field] ? "border-red-400 bg-red-50" : "border-slate-300",
    ].join(" ");

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center text-center py-16"
      >
        <CheckCircle2
          className="w-14 h-14 text-emerald-500 mb-4"
          aria-hidden="true"
        />
        <h2 className="text-xl font-semibold text-slate-900">Inquiry Sent!</h2>
        <p className="mt-2 text-slate-600 max-w-sm">
          Thank you for reaching out. We'll contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact inquiry form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Full Name{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClass("name")}
            />
            <FieldError message={fieldErrors.name} />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Email Address{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass("email")}
            />
            <FieldError message={fieldErrors.email} />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 63830 68363"
              className={inputClass("phone")}
            />
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Service Required
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className={`${inputClass("service")} bg-white`}
            >
              <option value="">Select a service...</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
              <option value="other">Other / Not Sure</option>
            </select>
          </div>

          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Message{" "}
              <span aria-hidden="true" className="text-red-500">
                *
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Describe your issue or requirement..."
              className={`${inputClass("message")} resize-none`}
            />
            <FieldError message={fieldErrors.message} />
          </div>
        </div>

        {/* Global error */}
        {status === "error" && errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" && (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            )}
            {status === "submitting" ? "Sending..." : "Send Inquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
