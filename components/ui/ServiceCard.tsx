import Link from "next/link";
import type { ServiceItem } from "@/data/services";
import Badge, { categoryVariant } from "@/components/ui/Badge";

interface ServiceCardProps {
  service: ServiceItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50">
          <Icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
        </div>
        <Badge
          label={
            service.category.charAt(0).toUpperCase() + service.category.slice(1)
          }
          variant={categoryVariant[service.category]}
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{service.description}</p>
      <Link
        href={`/services/${service.slug}`}
        className="mt-4 inline-flex text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
      >
        Learn more
      </Link>
    </article>
  );
}
