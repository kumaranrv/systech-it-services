import { whyItems } from "@/data/services";

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why Choose Us
          </h2>
          <p className="mt-2 text-slate-600">
            Practical solutions, delivered by people who care about uptime.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                  <Icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
