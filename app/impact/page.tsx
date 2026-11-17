import { PageHero } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { workerProtectionChecks, fairRecruitmentStandard, siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Safeguards & Worker Protection · UtuCrest",
  description:
    "Our ethical recruitment safeguards: 5-step placement checks, zero candidate fees, and 24/7 worker welfare tracking.",
  path: "/impact",
});

const redLines = [
  "Recruit for an unverified employer, fictitious vacancy, or unlicensed agency",
  "Rush a placement without complete bilateral approvals and verified work permits",
  "Send workers abroad on visit, tourist, or irregular visas",
  "Accept an amended or downgraded employment contract upon candidate arrival",
  "Withhold, confiscate, or hold a worker's passport, identity card, or certificates",
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Safeguards & Accountability"
        title="Ethical standards in action."
        description="At UtuCrest Global Workforce, ethical recruitment is not a marketing tagline. It is a set of rigorous operational safeguards that protect workers and employers at every stage of engagement."
      />

      {/* 5 Checks */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Worker Protection"
            title="Every placement follows five mandatory checks"
            description="Our verification protocol protects workers from exploitation and employers from legal liability."
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workerProtectionChecks.map((check) => (
              <div
                key={check.step}
                className="rounded-2xl border border-border bg-warm-ivory/40 p-6 transition hover:border-deep-teal/40"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-deep-teal text-white font-bold text-xs">
                  {check.step}
                </div>
                <h3 className="font-display mt-4 text-xl font-semibold text-ink">
                  {check.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                  {check.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fair Recruitment Standard */}
      <section className="bg-mist/50 py-16 md:py-24 border-y border-border">
        <div className="container-site">
          <SectionHeading
            eyebrow="Fair Recruitment"
            title="Workers never pay to get a job"
            description="We strictly adhere to the employer-pays principle aligned with global ILO standards and Kenyan labor law."
            className="mb-12"
          />

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-deep-teal bg-white p-6 md:p-8 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                Employer Pays
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-ink">
                All Direct Deployment Costs
              </h3>
              <ul className="mt-6 space-y-3">
                {fairRecruitmentStandard.employerCovers.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-charcoal">
                    <span className="size-2 rounded-full bg-deep-teal shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Candidate Pays
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-ink">
                Zero Recruitment or Placement Fees
              </h3>
              <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
                Candidates only acquire personal identity documents that they own and retain independently regardless of the job (National ID, Passport).
              </p>
              <div className="mt-6 rounded-xl bg-warm-ivory p-4 text-xs text-charcoal/80 border border-border">
                <strong>Our Binding Promise:</strong> No job is ever offered in exchange for payment. Saying no to optional support services never affects a candidate&apos;s selection.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Lines & Welfare Helpline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          {/* Red Lines */}
          <div className="rounded-2xl border border-border bg-ink p-8 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-golden-sand">
              Non-Negotiable
            </span>
            <h3 className="font-display mt-2 text-2xl font-bold text-white">
              Our Operational Red Lines
            </h3>
            <p className="mt-2 text-xs text-white/70">
              We will categorically never:
            </p>
            <ul className="mt-6 space-y-3">
              {redLines.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/90">
                  <span className="mt-1 text-terracotta font-bold">✕</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Welfare Helpline */}
          <div className="rounded-2xl border border-border bg-warm-ivory p-8">
            <span className="text-xs font-bold uppercase tracking-widest text-deep-teal">
              Worker Welfare & Accountability
            </span>
            <h3 className="font-display mt-2 text-2xl font-bold text-ink">
              Dedicated Worker Line
            </h3>
            <p className="mt-3 text-sm text-charcoal/80 leading-relaxed">
              Every worker placed by UtuCrest has continuous direct access to our welfare grievance line. Every complaint is formally logged and acknowledged within 24 hours.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <div className="rounded-lg bg-white p-4 border border-border">
                <span className="text-xs font-semibold text-charcoal/60 uppercase">Helpline & WhatsApp</span>
                <p className="text-lg font-bold text-deep-teal">{siteConfig.contact.phone}</p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-border">
                <span className="text-xs font-semibold text-charcoal/60 uppercase">Regulatory Filing</span>
                <p className="text-xs text-charcoal/80 mt-1">
                  Full returns submitted to National Employment Authority (NEA) and compliance under Kenya Data Protection Act.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
