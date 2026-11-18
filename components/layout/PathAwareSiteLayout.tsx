"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PathAwareSiteLayout({
  children,
  header,
  footer,
  mobileActions,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
  mobileActions: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/login" || pathname.startsWith("/dashboard");

  if (isAdminRoute) return children;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-deep-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      {header}
      <main
        id="main-content"
        className={`flex-1 ${pathname === "/" ? "" : "pt-[var(--header-height)]"}`}
      >
        {children}
      </main>
      {footer}
      {mobileActions}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
