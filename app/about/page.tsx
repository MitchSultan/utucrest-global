import { PageHero } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { companyValues } from "@/content/impact";
import { brandPrinciples, globalFootprint, siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About UtuCrest Global Workforce · Beyond Recruitment",
  description:
    "UtuCrest Global Workforce is connecting businesses with prepared, reliable, and ethically sourced talent while upholding dignity, excellence, and integrity.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are · Beyond Recruitment"
        title="Talent should never be separated from dignity."
        description={brandPrinciples.purpose}
      />

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-deep-teal p-8 text-white md:p-12 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-golden-sand">
              Our Vision
            </span>
            <h2 className="font-display mt-4 text-2xl font-semibold leading-snug md:text-3xl">
              {brandPrinciples.vision}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/80">
              Where workers pursue opportunity with preparation, protection, and pride—across East Africa and leading international destinations.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-border bg-warm-ivory/80 p-8 text-ink md:p-12 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-terracotta">
              Our Mission
            </span>
            <h2 className="font-display mt-4 text-2xl font-semibold leading-snug text-ink md:text-3xl">
              {brandPrinciples.mission}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-charcoal/80">
              We partner with organizations to handle recruitment, administration, compliance, and staff management so they can focus on their core operations.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership / Our Directors */}
      <LeadershipSection />

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Core Values"
            description="Guiding every placement, client partnership, and worker preparation engagement."
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {companyValues.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-border bg-warm-ivory/30 p-6 transition hover:border-deep-teal/40"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Operate */}
      <section className="bg-deep-teal py-16 md:py-20 text-white">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-golden-sand">
              Areas of Operation
            </span>
            <h2 className="font-display mt-2 text-3xl font-semibold text-white md:text-4xl">
              Where We Operate
            </h2>
            <p className="mt-3 text-sm text-white/80">
              Headquartered in Nairobi, Kenya, serving domestic workforce outsourcing needs and structured international placement pathways.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {globalFootprint.map((hub) => (
              <div
                key={hub.region}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-golden-sand">
                  {hub.focus}
                </span>
                <h3 className="font-display mt-2 text-2xl font-bold text-white">
                  {hub.region}
                </h3>
                <p className="mt-1 text-xs font-semibold text-white/70">
                  {hub.role}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-white/80">
                  {hub.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-white/20 bg-white/5 p-6 text-center text-sm text-white/90">
            <strong>Headquarters:</strong> {siteConfig.contact.headquarters} · Helpline: {siteConfig.contact.phone}
          </div>
        </div>
      </section>
    </>
  );
}
