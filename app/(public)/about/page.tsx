// app/about/page.tsx
import type { Metadata } from "next";
import { whyItems } from "@/data/services";
import { Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Systech IT Services",
  description:
    "Learn about our mission, values, and practical IT service approach.",
};

export default function AboutPage() {
  return (
    <div className="section-padding min-h-screen bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
              About Us
            </p>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Your Trusted Technology Partner
            </h1>
            <p className="text-slate-600 leading-relaxed mb-4">
              Welcome to <strong>Systech IT Services</strong> — a team of
              experienced IT professionals dedicated to reliable, affordable
              technology services.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We specialize in laptop and desktop services, OS management,
              hardware upgrades, and professional CCTV surveillance for homes,
              offices, startups, and small businesses.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64 rounded-2xl bg-brand-50 border border-brand-100 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-brand-100 flex items-center justify-center">
                <Cpu className="w-10 h-10 text-brand-700" aria-hidden="true" />
              </div>
              <p className="text-lg font-bold text-brand-800">
                Systech IT Services
              </p>
              <p className="text-sm text-brand-500">Reliable IT Solutions</p>
            </div>
          </div>
        </div>

        <div className="mb-20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Our Mission
          </h2>
          <p className="text-slate-600 leading-relaxed">
            To keep our clients&apos; systems secure, updated, and running
            efficiently - with a focus on quality service, quick response, and
            lasting satisfaction.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Why Our Clients Trust Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyItems.map(({ icon: Icon, title, description }) => {
              return (
                <div
                  key={title}
                  className="p-6 rounded-xl border border-slate-100 bg-slate-50"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-100 mb-3">
                    <Icon
                      className="w-5 h-5 text-brand-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
