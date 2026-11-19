import { PageHero } from "@/components/sections/FinalCTA";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { TrustBand } from "@/components/sections/TrustBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import OnboardingMountain from "@/components/sections/OnboardingMountain";
import { services } from "@/content/services";
import {
  trustItems,
  industriesServed,
  talentBands,
  employerOnboardingSteps,
  commercialModel,
} from "@/content/impact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "For Employers · Workforce Outsourcing & Talent Solutions",
  description:
    "UtuCrest Global Workforce manages your full employee lifecycle—recruitment, payroll, compliance, and supervision—at a predictable 30% management fee.",
  path: "/employers",
});

export default function EmployersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Employers · Workforce Outsourcing"
        title="Focus on your business. We manage the people."
        description="UtuCrest Global Workforce is a workforce solutions company committed to providing businesses with reliable, prepared, and ethically sourced talent. We partner with organizations to manage their workforce needs end-to-end, enabling them to focus on their core business operations while we handle recruitment, administration, compliance, and workforce management.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#inquiry-form">Submit a workforce brief</LinkButton>
          <LinkButton href="#commercial-model" variant="secondary">
            View commercial model
          </LinkButton>
        </div>
      </PageHero>

      {/* Talent Tiers */}
      <section className="border-b border-border bg-white py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Talent Spectrum"
            title="Workforce deployed across four specialized bands"
            description="Whether you need operational mass-deployment or licensed specialists, we supply pre-screened, prepared personnel aligned to your exact requirements."
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {talentBands.map((band) => (
              <div
                key={band.name}
                className="rounded-2xl border border-border bg-warm-ivory/50 p-6 transition hover:border-deep-teal hover:shadow-xs"
              >
                <span className="rounded-full bg-deep-teal/10 px-3 py-1 text-xs font-bold text-deep-teal uppercase tracking-wide">
                  {band.name}
                </span>
                <p className="mt-4 text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                  Example Roles
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {band.roles}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-charcoal/80">
                  {band.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid
        services={services}
        heading={{
          eyebrow: "Our Solutions",
          title: "End-to-End Workforce Management",
          description:
            "From single specialist searches to full workforce outsourcing and statutory employer-of-record responsibility.",
        }}
      />

      {/* 7-Step Onboarding Process */}
      {/* <section className="bg-mist/40 py-16 md:py-24 border-y border-border">
        <div className="container-site">
          <SectionHeading
            eyebrow="Structured Execution"
            title="7-Step Client Onboarding & Implementation"
            description="UtuCrest follows a disciplined methodology to ensure rapid, compliant, and seamless workforce deployment."
            className="mb-12"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {employerOnboardingSteps.map((step) => (
              <div
                key={step.step}
                className="relative rounded-xl border border-border bg-white p-6 shadow-2xs"
              >
                <span className="text-xs font-bold text-terracotta tracking-wider uppercase">
                  {step.step}
                </span>
                <h3 className="font-display mt-2 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/80">
                  {step.description}
                </p>
              </div>
            ))}

            // 
            <div className="rounded-xl border-2 border-deep-teal bg-deep-teal p-6 text-white sm:col-span-2 lg:col-span-1">
              <span className="text-xs font-bold text-golden-sand tracking-wider uppercase">
                The UtuCrest Edge
              </span>
              <h3 className="font-display mt-2 text-base font-semibold text-white">
                Full Operational Accountability
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                We do not merely supply labour; we take full responsibility for attendance, supervision, continuous compliance, and backup continuity.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <div className="container-site">
        <SectionHeading
            eyebrow="Structured Execution"
            title="7-Step Client Onboarding & Implementation"
            description="UtuCrest follows a disciplined methodology to ensure rapid, compliant, and seamless workforce deployment."
            className="mb-12"
          />
      <OnboardingMountain steps={employerOnboardingSteps} />
        </div>
      {/* Commercial Model Section */}
      <section id="commercial-model" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Transparent Pricing"
            title="Predictable, Audit-Proof Commercial Model"
            description="Simple, compliant, and structured so you always have total clarity on operational costs."
            className="mb-12"
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Direct Costs */}
            <div className="rounded-2xl border border-border bg-warm-ivory/50 p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/70">
                Section A · Client Responsibility
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-ink">
                Direct Employee Costs
              </h3>
              <p className="mt-2 text-sm text-charcoal/80">
                Actual baseline costs of personnel deployed on your operations, billed with 100% statutory transparency:
              </p>

              <ul className="mt-6 space-y-2.5">
                {commercialModel.directCosts.map((cost) => (
                  <li key={cost} className="flex items-center gap-2 text-sm text-charcoal">
                    <span className="size-1.5 rounded-full bg-deep-teal shrink-0" />
                    <span>{cost}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Management Fee */}
            <div className="rounded-2xl border-2 border-deep-teal bg-deep-teal/5 p-6 md:p-8">
              <span className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                Section B · UtuCrest Management Fee
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-deep-teal">
                30% of Direct Employee Cost
              </h3>
              <p className="mt-2 text-sm text-charcoal/80">
                A single all-inclusive management fee that covers your complete workforce operations:
              </p>

              <ul className="mt-6 space-y-2.5">
                {commercialModel.managementFeeCovers.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-charcoal">
                    <span className="mt-1.5 size-1.5 rounded-full bg-terracotta shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg bg-white p-4 text-xs text-charcoal/80 border border-border">
                <strong>Peace of Mind Guarantee:</strong> UtuCrest remains the legal employer of record, shielding your enterprise from labor litigation, compliance penalties, and administrative drain.
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBand items={trustItems} />

      {/* Industries */}
      <section className="py-16 md:py-20 bg-mist/30 border-t border-border">
        <div className="container-site">
          <SectionHeading
            eyebrow="Sector Expertise"
            title="Key industries we partner with"
            description="Proven recruitment pipelines and workforce outsourcing across established and high-growth sectors."
            className="mb-8"
          />
          <div className="flex flex-wrap gap-2.5">
            {industriesServed.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-ink shadow-2xs"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="bg-white py-16 md:py-24 border-t border-border scroll-mt-20">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Initiate Engagement"
              title="Request a customized workforce proposal"
              description="Tell us your headcount needs, role types, and operational timeline. Our business development team will prepare a structured scoping review within 24 hours."
            />
            <div className="mt-8 rounded-xl bg-warm-ivory p-6 border border-border text-xs text-charcoal/80 space-y-2">
              <p className="font-semibold text-ink text-sm">Need direct consultation?</p>
              <p>Email: info@utucrestglobal.co.ke</p>
              <p>Call / WhatsApp: +254 713 448 062</p>
              <p>Offices: Elysee Plaza, 1st Floor, Kilimani, Nairobi</p>
            </div>
          </div>
          <InquiryForm variant="employer" />
        </div>
      </section>
    </>
  );
}
