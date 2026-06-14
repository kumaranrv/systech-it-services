import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Systech IT Services
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Reliable IT Support for Home and Business
          </h1>
          <p className="mt-4 text-slate-600">
            Professional laptop, desktop, and CCTV services with fast response
            and transparent pricing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
