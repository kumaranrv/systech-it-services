import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/services";

export default function ServicesSection() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-main">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Our Core Services
          </h2>
          <p className="mt-2 text-slate-600">
            Flexible support across software, hardware, and security needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
