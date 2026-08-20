import { ArrowRight, Briefcase, UserSearch } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import Link from "next/link";

const pathways = [
  {
    id: "candidate",
    icon: UserSearch,
    title: "I am looking for work",
    description:
      "Explore opportunities, prepare with purpose, and join a network that sees your potential.",
    primaryCta: { label: "Browse opportunities", href: "/jobs" },
    secondaryLink: { label: "Learn about our candidate support", href: "/candidates" },
    accent: "border-terracotta/30 hover:border-terracotta/60",
    iconBg: "bg-terracotta/10 text-terracotta",
  },
  {
    id: "employer",
    icon: Briefcase,
    title: "I need talent",
    description:
      "Find people who are prepared, matched thoughtfully, and supported for long-term success.",
    primaryCta: { label: "Build your team", href: "/employers" },
    secondaryLink: { label: "Explore workforce solutions", href: "/services" },
    accent: "border-deep-teal/30 hover:border-deep-teal/60",
    iconBg: "bg-deep-teal/10 text-deep-teal",
  },
] as const;

export function AudiencePathway() {
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="pathway-heading">
      <div className="container-site">
        <h2 id="pathway-heading" className="sr-only">
          Choose your path
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((path) => (
            <article
              key={path.id}
              className={`group rounded-xl border-2 bg-surface p-6 transition-all duration-200 md:p-8 ${path.accent}`}
            >
              <div
                className={`inline-flex rounded-lg p-3 ${path.iconBg}`}
                aria-hidden="true"
              >
                <path.icon className="size-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
                {path.title}
              </h3>
              <p className="mt-3 leading-relaxed text-charcoal/80">
                {path.description}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <LinkButton href={path.primaryCta.href}>
                  {path.primaryCta.label}
                </LinkButton>
                <Link
                  href={path.secondaryLink.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-deep-teal hover:underline"
                >
                  {path.secondaryLink.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
