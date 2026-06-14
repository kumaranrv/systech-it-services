// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";
import Badge, { categoryVariant } from "@/components/ui/Badge";
import { Check, ArrowLeft, Phone } from "lucide-react";

interface Props {
  params: { slug: string };
}

// Generate static pages for each service at build time
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Systech IT Services",
    };
  }

  return {
    title: `${service.title} | Systech IT Services`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const IconComponent = service.icon;

  return (
    <div className="section-padding min-h-screen bg-white">
      <div className="container-main max-w-4xl">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-brand-50 shrink-0">
                {IconComponent && (
                  <IconComponent
                    className="w-7 h-7 text-brand-600"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div>
                <Badge
                  label={
                    service.category.charAt(0).toUpperCase() +
                    service.category.slice(1)
                  }
                  variant={categoryVariant[service.category]}
                />
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1">
                  {service.title}
                </h1>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8">
              {service.fullDescription}
            </p>

            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              What's Included
            </h2>
            <ul className="space-y-3">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 shrink-0 mt-0.5">
                    <Check
                      className="w-3 h-3 text-brand-600"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">Ideal For</p>
              <p className="mt-1 text-sm text-slate-600">{service.idealFor}</p>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-20 rounded-xl border border-slate-200 p-6 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Interested in this service?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Send us an inquiry or call directly.
              </p>
              <Link
                href={`/contact?service=${service.slug}`}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              >
                Request This Service
              </Link>
              <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <Phone
                  className="w-4 h-4 text-brand-600 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs text-slate-500">Call us directly</p>
                  <p className="text-sm font-semibold text-slate-800">
                    +91 63830 68363
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
