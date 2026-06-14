"use client";
// components/admin/AdminShell.tsx
// Renders the admin top bar on all /admin/* pages except /admin/login.

import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AdminShell({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // On the login page render children without the shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.svg"
              alt="Systech IT Services"
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-slate-900">
              Systech<span className="text-brand-600"> IT Services</span>
            </span>
          </Link>

          <nav
            className="flex items-center gap-4"
            aria-label="Admin navigation"
          >
            <a
              href="/admin/inquiries"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/inquiries")
                  ? "text-brand-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inquiries
            </a>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              {loggingOut ? "Signing out…" : "Sign out"}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
