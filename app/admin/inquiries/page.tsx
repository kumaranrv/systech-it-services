// app/admin/inquiries/page.tsx
// Server component — reads the inquiry store at request time.
// Protected by middleware: only reachable with a valid admin session cookie.

import type { Metadata } from "next";
import { getAllInquiries } from "@/lib/inquiryService";
import type { InquiryRecord } from "@/lib/db";
import InquiryTable from "@/components/admin/InquiryTable";

export const metadata: Metadata = {
  title: "Inquiries",
};

// Disable caching so we always see the latest submissions
export const dynamic = "force-dynamic";

export default function AdminInquiriesPage() {
  const inquiries: InquiryRecord[] = getAllInquiries();

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Inquiries</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            {inquiries.length === 0
              ? "No inquiries yet."
              : `${inquiries.length} total submission${inquiries.length === 1 ? "" : "s"} — newest first.`}
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
          <p className="text-slate-400 text-sm">
            No inquiries have been submitted yet.
          </p>
        </div>
      ) : (
        <InquiryTable inquiries={inquiries} />
      )}
    </div>
  );
}
