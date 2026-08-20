import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/FinalCTA";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Workforce Solutions",
  description:
    "Recruitment, outsourcing, talent advisory, and training—connected workforce solutions built on dignity and dependable outcomes.",
  path: "/services",
});

const comparison = [
  {
    need: "Fill specific roles quickly",
    solution: "Recruitment",
    href: "/services/recruitment",
  },
  {
    need: "Scale operations without adding HR overhead",
    solution: "Outsourcing",
    href: "/services/outsourcing",
  },
  {
    need: "Plan workforce strategy and growth",
    solution: "Talent Advisory",
    href: "/services/talent-advisory",
  },
  {
    need: "Prepare candidates for success",
    solution: "Training & Preparation",
    href: "/training",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Workforce solutions that connect talent and opportunity"
        description="Four connected services—each designed to deliver sustainable outcomes, not just transactions."
      />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Find your fit"
            title="Which solution matches your need?"
            className="mb-10"
          />
          <div className="overflow-hidden rounded-xl border border-border bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-mist/50">
                  <th className="px-6 py-4 font-semibold text-ink">Your need</th>
                  <th className="px-6 py-4 font-semibold text-ink">Recommended solution</th>
                  <th className="hidden px-6 py-4 sm:table-cell" />
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.need} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 text-charcoal/85">{row.need}</td>
                    <td className="px-6 py-4 font-medium text-deep-teal">
                      {row.solution}
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <Link
                        href={row.href}
                        className="inline-flex items-center gap-1 text-sm font-medium text-deep-teal hover:underline"
                      >
                        Explore
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-site text-center">
          <SectionHeading
            title="Not sure where to start?"
            description="Tell us about your workforce challenge and we will recommend the right approach."
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 flex justify-center gap-3">
            <LinkButton href="/employers">Talk to our team</LinkButton>
            <LinkButton href="/contact" variant="secondary">
              Contact us
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
