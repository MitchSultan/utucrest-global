import Link from "next/link";
import { footerNavigation } from "@/content/navigation";
import { siteConfig, brandPrinciples } from "@/content/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink text-mist">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo className="[&_span]:text-white [&_span:last-child]:text-mist/70" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist/80">
              {brandPrinciples.purpose}
            </p>
            <p className="mt-4 text-sm font-medium text-golden-sand">
              {brandPrinciples.core}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Solutions
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.solutions.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For you
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.audiences.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-mist/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <address className="mt-3 space-y-1.5 text-sm not-italic text-mist/80">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="hover:text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Start a conversation</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist/70">
              Have a hiring need or a question about your next move? Our team is ready to help.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-3 inline-flex text-sm font-medium text-golden-sand hover:text-white"
            >
              Email our team
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mist/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved <span className="hidden sm:inline"> | </span>
            <span className="sm:hidden"><br /></span>
            <Link
              href='https://madebymitch.com'
              target="_blank"
              className="text-xs text-mist/60 hover:text-white"
            >
              Made by Mitch
            </Link>
          </p>
          <div className="flex gap-4">
            {footerNavigation.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-mist/60 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* <p className="mt-6 text-xs leading-relaxed text-mist/50">
          We believe work should open doors—not reduce people to numbers. Every
          placement follows standards of dignity, transparency, and respect.
        </p> */}
      </div>
    </footer>
  );
}
