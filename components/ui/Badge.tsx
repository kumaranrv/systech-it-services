import { type ServiceCategory } from "@/data/services";

export const categoryVariant: Record<ServiceCategory, string> = {
  software: "bg-blue-50 text-blue-700 border-blue-200",
  hardware: "bg-slate-100 text-slate-700 border-slate-200",
  security: "bg-emerald-50 text-emerald-700 border-emerald-200",
  consulting: "bg-violet-50 text-violet-700 border-violet-200",
};

interface BadgeProps {
  label: string;
  variant?: string;
}

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        variant ?? "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {label}
    </span>
  );
}
