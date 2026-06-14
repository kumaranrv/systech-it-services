"use client";
// components/admin/InquiryTable.tsx
// Client component so we can add search/filter interactions in-browser.

import { useMemo, useState } from "react";
import type { InquiryRecord } from "@/lib/db";
import { Clock, Mail, MessageSquare, Phone, Search, Tag } from "lucide-react";

interface Props {
  inquiries: InquiryRecord[];
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

function ServiceBadge({ service }: { service: string }) {
  if (!service) {
    return <span className="text-slate-400 text-xs italic">—</span>;
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 border border-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
      <Tag className="w-3 h-3" aria-hidden="true" />
      {service}
    </span>
  );
}

export default function InquiryTable({ inquiries }: Props) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return inquiries;
    return inquiries.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.service.toLowerCase().includes(q) ||
        i.message.toLowerCase().includes(q),
    );
  }, [inquiries, query]);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search name, email or service…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-slate-400 text-sm">
            No inquiries match your search.
          </p>
        </div>
      )}

      {/* Cards — responsive on mobile, table-like on desktop */}
      <div className="space-y-3">
        {filtered.map((inquiry) => {
          const isOpen = expanded === inquiry.id;
          return (
            <article
              key={inquiry.id}
              className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Summary row */}
              <button
                className="w-full text-left px-5 py-4 flex flex-wrap items-start gap-x-6 gap-y-1 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : inquiry.id)}
              >
                {/* Name */}
                <span className="text-sm font-semibold text-slate-900 min-w-[140px]">
                  {inquiry.name}
                </span>

                {/* Email */}
                <span className="flex items-center gap-1.5 text-sm text-slate-600 min-w-[180px]">
                  <Mail
                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                    aria-hidden="true"
                  />
                  {inquiry.email}
                </span>

                {/* Phone (optional) */}
                {inquiry.phone ? (
                  <span className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Phone
                      className="w-3.5 h-3.5 text-slate-400 shrink-0"
                      aria-hidden="true"
                    />
                    {inquiry.phone}
                  </span>
                ) : null}

                {/* Service */}
                <ServiceBadge service={inquiry.service} />

                {/* Date — pushed to the far right on wide screens */}
                <span className="ml-auto flex items-center gap-1 text-xs text-slate-400 whitespace-nowrap">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {formatDate(inquiry.createdAt)}
                </span>
              </button>

              {/* Message body (expanded) */}
              {isOpen && (
                <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                    Message
                  </p>
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                  <p className="mt-3 text-xs text-slate-400 font-mono select-all">
                    ID: {inquiry.id}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Result count */}
      {query && (
        <p className="text-xs text-slate-400 text-right">
          Showing {filtered.length} of {inquiries.length} inquiries
        </p>
      )}
    </div>
  );
}
