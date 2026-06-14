// app/services/page.tsx
import type { Metadata } from "next";
import { services } from "@/data/services";
import ServiceCard from "@/components/ui/ServiceCard";

export const metadata: Metadata = {
  title: "Services | Systech IT Services",
  description: "Browse our IT, hardware, and CCTV service offerings.",
};

export default function ServicesPage() {
  return (
    <div className="section-padding bg-slate-50 min-h-screen">
      <div className="container-main">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
            Our Services
          </p>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Everything Your Tech Needs
          </h1>
          <p className="mt-3 text-slate-600">
            Professional IT support from OS setup to CCTV installation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
