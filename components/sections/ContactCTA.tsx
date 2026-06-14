import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="section-padding bg-slate-900 text-white">
      <div className="container-main">
        <div className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-600 p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Need help with your system today?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-50 sm:text-base">
            Share your issue and our team will respond quickly with the right
            fix or recommendation.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-slate-100"
          >
            Request Support
          </Link>
        </div>
      </div>
    </section>
  );
}
