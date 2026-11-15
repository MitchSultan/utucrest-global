import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-center rounded-md bg-deep-teal px-2.5 py-1.5 transition-opacity hover:opacity-90 ${className ?? ""}`}
      aria-label={`${siteConfig.shortName} home`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={357}
        height={87}
        className="h-7 w-auto"
        priority
      />
    </Link>
  );
}
