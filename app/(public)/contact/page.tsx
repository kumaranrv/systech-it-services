// app/contact/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/sections/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Systech IT Services",
  description:
    "Reach out for IT support, system upgrades, and CCTV consultation.",
};

export default function ContactPage() {
  return (
    <div className="section-padding min-h-screen bg-slate-50">
      <div className="container-main">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
            Contact Us
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Let&apos;s Talk About Your Needs
          </h1>
          <p className="mt-3 text-slate-600">
            Fill in the form and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form (client component) */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="h-80 rounded-xl border border-slate-200 bg-white" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Contact Info Sidebar */}
          <aside className="space-y-6">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: "+91 63830 68363",
                href: "tel:+916383068363",
              },
              {
                icon: Mail,
                label: "Email",
                value: "info@systechitservices.com",
                href: "mailto:info@systechitservices.com",
              },
              {
                icon: MapPin,
                label: "Location",
                value: "Puducherry, India",
                href: undefined,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-slate-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-50 shrink-0">
                  <Icon className="w-5 h-5 text-brand-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-slate-800 hover:text-brand-600 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-slate-800">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-5 rounded-xl bg-brand-50 border border-brand-100">
              <h3 className="text-sm font-semibold text-brand-800 mb-3">
                Business Hours
              </h3>
              <ul className="space-y-1.5 text-sm text-brand-700">
                <li className="flex justify-between">
                  <span>Mon – Sat</span>
                  <span className="font-medium">9:00 AM – 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">By Appointment</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
