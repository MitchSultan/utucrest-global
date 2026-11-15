import { PageHero } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dignityPractices, impactPillars } from "@/content/impact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Our Approach",
  description:
    "The standards behind Utu Crest's people-first approach to ethical recruitment.",
  path: "/impact",
});

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our approach"
        title="A better process should lead to better work."
        description="We focus on the quality of the journey—not unverified placement counts. Our approach is built around transparency, candidate readiness, and responsible employer partnerships."
      />
      <section className="py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we prioritize"
            title="Principles that shape every placement"
            className="mb-10"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {impactPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="rounded-xl border border-border bg-white p-6"
              >
                <span className="font-display text-3xl font-semibold text-deep-teal/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our commitment"
            title="What candidates should expect from us"
            className="mb-8"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dignityPractices.map((practice) => (
              <li
                key={practice}
                className="rounded-lg border border-border bg-white p-4 text-sm text-charcoal/85"
              >
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
