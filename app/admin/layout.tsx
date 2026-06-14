// app/admin/layout.tsx
// Shared layout for all admin pages.
// The login page deliberately skips this layout because it is located at
// /admin/login — Next.js still applies this layout, so we strip the nav
// for that route using a client wrapper.

import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin | Systech IT Services", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
