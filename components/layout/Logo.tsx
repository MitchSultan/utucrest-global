import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2.5 bg-[var(--deep-teal)] ${className ?? ""}`}
      aria-label={`${siteConfig.shortName} home`}
    >
      {/* <span
        className="flex size-9 items-center justify-center rounded-md bg-deep-teal text-sm font-bold text-white"
        aria-hidden="true"
      >
        UC
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight text-ink">
          {siteConfig.shortName}
        </span>
        <span className="hidden text-[0.65rem] font-medium uppercase tracking-wider text-charcoal/60 sm:block">
          Global Workforce
        </span>
      </span> */}
      <img src="/logo.png" alt={siteConfig.shortName} className="h-8 w-auto" />
    </Link>
  );
}
