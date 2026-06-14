import Link from "next/link";
import { Cpu, Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "OS Installation", href: "/services/os-installation" },
  { label: "General Service", href: "/services/general-service" },
  { label: "System Upgrades", href: "/services/system-upgrades" },
  { label: "Buying Consultation", href: "/services/buying-consultation" },
  { label: "CCTV Installation", href: "/services/cctv-installation" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-50">
                {/*<Cpu className="w-4 h-4 text-white" />*/}
                <img
                  src={"/logo.svg"}
                  alt="Systech IT Services"
                  className="h-9 w-auto"
                />
              </div>
              <span className="text-lg font-bold text-white">
                Systech <span className="text-brand-400">IT</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Reliable IT support, system maintenance, and security solutions
              for individuals and businesses.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Admin", href: "/admin/login" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              {[
                { Icon: Phone, text: "+91 63830 68363" },
                { Icon: Mail, text: "info@systechitservices.com" },
                { Icon: MapPin, text: "Puducherry, India" },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon
                    className="w-4 h-4 text-brand-400 mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-slate-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Systech IT Services. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-500">
            Reliable IT Solutions & Security Services
          </p>
        </div>
      </div>
    </footer>
  );
}
