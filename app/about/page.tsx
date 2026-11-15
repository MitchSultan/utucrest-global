import { PageHero } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyValues } from "@/content/impact";
import { brandPrinciples } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About Utu Crest",
  description:
    "Learn about Utu Crest's people-first approach to recruitment and workforce solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Utu Crest"
        title="Work should open doors."
        description={brandPrinciples.purpose}
      />
      <section className="py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-deep-teal">Our mission</p>
            <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
              {brandPrinciples.mission}
            </h2>
          </div>
          <div>
            <SectionHeading
              eyebrow="What guides us"
              title="People, purpose, and practical outcomes"
              description="We bring candidates and employers together through clear communication, thoughtful preparation, and a focus on work that can last."
              className="mb-8"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {companyValues.map((value) => (
                <article
                  key={value.title}
                  className="rounded-xl border border-border bg-white p-5"
                >
                  <h3 className="font-semibold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
