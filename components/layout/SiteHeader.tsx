"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { mainNavigation } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/35 bg-white/45 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/30">
        <div className="container-site flex h-[var(--header-height)] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNavigation.map((item) =>
              item.children ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-mist hover:text-ink"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
                  </Link>
                  {openDropdown === item.label && (
                    <div className="absolute left-0 top-full z-50 w-64 rounded-lg border border-border bg-white p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2.5 transition-colors hover:bg-mist"
                        >
                          <span className="block text-sm font-medium text-ink">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 block text-xs text-charcoal/70">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-mist hover:text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="hidden rounded-md p-2 text-charcoal hover:bg-mist xl:block"
              aria-label={`Call ${siteConfig.contact.phone}`}
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              className={cn(
                "rounded-md p-2 text-ink hover:bg-mist lg:hidden",
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
