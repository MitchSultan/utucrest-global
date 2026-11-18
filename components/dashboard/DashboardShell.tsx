"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
  BookOpenText,
  BriefcaseBusiness,
  ChevronDown,
  Command,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { logout } from "@/app/login/actions";

const navigationGroups: {
  label: string;
  items: { href: string; label: string; icon: LucideIcon }[];
}[] = [
  {
    label: "Workspace",
    items: [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/jobs", label: "Jobs", icon: BriefcaseBusiness },
      { href: "/dashboard/insights", label: "Blog & insights", icon: BookOpenText },
    ],
  },
  {
    label: "People",
    items: [{ href: "/dashboard/submissions", label: "Form submissions", icon: Inbox }],
  },
];

export function DashboardShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const commandInput = useRef<HTMLInputElement>(null);

  const currentPage =
    navigationGroups.flatMap((group) => group.items).find((item) =>
      item.href === "/dashboard"
        ? pathname === item.href
        : pathname.startsWith(item.href),
    )?.label ?? "Dashboard";

  const commandItems = useMemo(
    () =>
      navigationGroups
        .flatMap((group) => group.items)
        .filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === "Escape") setCommandOpen(false);
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (commandOpen) commandInput.current?.focus();
  }, [commandOpen]);

  return (
    <div className="admin-shell min-h-screen" data-theme={darkMode ? "dark" : "light"}>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`admin-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-200 ${
          collapsed ? "w-[76px]" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b px-4">
          <Link
            href="/dashboard"
            className="flex min-w-0 items-center gap-3"
            aria-label="UtuCrest dashboard home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-deep-teal text-white shadow-sm">
              <BriefcaseBusiness className="size-5" aria-hidden="true" />
            </span>
            {!collapsed && (
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-bold text-ink">UtuCrest</span>
                <span className="mt-0.5 block text-[11px] font-medium tracking-wide text-charcoal/60">WORKFORCE ADMIN</span>
              </span>
            )}
          </Link>
          <button
            type="button"
            className="hidden rounded-lg p-2 text-charcoal/70 transition hover:bg-mist hover:text-ink lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-charcoal/70 hover:bg-mist lg:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6" aria-label="Dashboard navigation">
          {navigationGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-charcoal/50">
                  {group.label}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    item.href === "/dashboard"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        title={collapsed ? item.label : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                          active
                            ? "admin-nav-active"
                            : "text-charcoal/75 hover:bg-mist hover:text-ink"
                        } ${collapsed ? "justify-center" : ""}`}
                      >
                        <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                        {active && !collapsed && <span className="ml-auto size-1.5 rounded-full bg-deep-teal" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t p-3">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-charcoal/70 hover:bg-mist hover:text-ink ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            {!collapsed && <span>View website</span>}
          </Link>
        </div>
      </aside>

      <div className={`min-h-screen transition-[padding] duration-200 ${collapsed ? "lg:pl-[76px]" : "lg:pl-64"}`}>
        <header className="admin-topbar sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b px-4 sm:px-6 xl:px-9">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-charcoal/75 hover:bg-mist lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal/55">
                UtuCrest / Admin / <span className="text-charcoal/80">{currentPage}</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="admin-search-button hidden h-10 items-center gap-3 rounded-lg border px-3 text-sm text-charcoal/65 transition hover:text-ink sm:flex"
              aria-label="Search dashboard pages"
            >
              <Search className="size-4" aria-hidden="true" />
              <span>Search pages</span>
              <kbd className="ml-2 rounded border px-1.5 py-0.5 text-[10px] font-medium">⌘ K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="rounded-lg p-2.5 text-charcoal/70 hover:bg-mist sm:hidden"
              aria-label="Search dashboard pages"
            >
              <Search className="size-[18px]" />
            </button>
            <Link
              href="/dashboard/submissions"
              className="relative rounded-lg p-2.5 text-charcoal/70 transition hover:bg-mist hover:text-ink"
              aria-label="Open form submissions"
              title="Form submissions"
            >
              <Bell className="size-[18px]" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setDarkMode((value) => !value)}
              className="rounded-lg p-2.5 text-charcoal/70 transition hover:bg-mist hover:text-ink"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </button>
            <div className="mx-1 hidden h-8 w-px bg-border sm:block" />
            <div className="hidden max-w-48 text-right md:block">
              <p className="truncate text-xs font-semibold text-ink">{email}</p>
              <p className="mt-0.5 text-[11px] text-charcoal/55">Administrator</p>
            </div>
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-1 rounded-lg p-1.5 hover:bg-mist">
                <span className="flex size-9 items-center justify-center rounded-full bg-deep-teal/10 text-xs font-bold uppercase text-deep-teal">
                  {email.slice(0, 1) || "A"}
                </span>
                <ChevronDown className="hidden size-3.5 text-charcoal/60 sm:block" />
                <span className="sr-only">Open account menu</span>
              </summary>
              <div className="admin-popover absolute right-0 top-12 z-50 w-64 rounded-xl border p-3 shadow-xl">
                <p className="truncate px-2 py-1 text-xs text-charcoal/65">{email}</p>
                <form action={logout}>
                  <button className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-ink hover:bg-mist">
                    <LogOut className="size-4" aria-hidden="true" />
                    Sign out
                  </button>
                </form>
              </div>
            </details>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10 xl:py-8">
          {children}
        </main>
      </div>

      {commandOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/45 px-4 pt-[15vh] backdrop-blur-[2px]"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCommandOpen(false);
          }}
        >
          <section
            className="admin-popover w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Dashboard page search"
          >
            <div className="flex items-center gap-3 border-b px-4">
              <Search className="size-4 text-charcoal/50" aria-hidden="true" />
              <input
                ref={commandInput}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Jump to a dashboard page..."
                className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-charcoal/45"
              />
              <kbd className="rounded border px-1.5 py-0.5 text-[10px] text-charcoal/60">ESC</kbd>
            </div>
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-charcoal/50">Pages</p>
              {commandItems.length ? commandItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setCommandOpen(false);
                      setSearch("");
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-ink hover:bg-mist"
                  >
                    <Icon className="size-4 text-charcoal/65" aria-hidden="true" />
                    {item.label}
                    <Command className="ml-auto size-3.5 text-charcoal/40" aria-hidden="true" />
                  </Link>
                );
              }) : (
                <p className="px-3 py-5 text-sm text-charcoal/65">No dashboard pages match.</p>
              )}
            </div>
          </section>
          <button
            type="button"
            className="sr-only"
            onClick={() => setCommandOpen(false)}
            aria-label="Close search"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
