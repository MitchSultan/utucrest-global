import { PageHero } from "@/components/sections/FinalCTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { CandidateRegistrationForm } from "@/components/sections/CandidateRegistrationForm";
import { candidateProcess, dignityPractices, utuCrestExperience } from "@/content/impact";
import { workerProtectionChecks, fairRecruitmentStandard } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "For Candidates · Join the Talent Pool",
  description:
    "Elevate your career with dignity. Register your CV with UtuCrest Global Workforce for verified local and international job opportunities. Zero placement fees.",
  path: "/candidates",
});

export default function CandidatesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Candidates · Ethical Pathways"
        title="Elevating talent with dignity."
        description="At UtuCrest Global Workforce, we believe that every individual deserves the opportunity to rise. Connect with verified employers across Kenya, Europe, the Middle East, and Asia with complete transparency and zero recruitment fees."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="#talent-pool">Submit your CV</LinkButton>
          <LinkButton href="/jobs" variant="secondary">
            Browse active jobs
          </LinkButton>
          <LinkButton href="/training" variant="ghost">
            Worker readiness training
          </LinkButton>
        </div>
      </PageHero>

      {/* The UtuCrest Experience: Assurance, Hope, Trust, Freedom */}
      <section className="border-b border-border bg-white py-12 md:py-16">
        <div className="container-site">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow text-deep-teal">What Workers Feel</p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              The UtuCrest Experience
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {utuCrestExperience.map((item) => (
              <div
                key={item.title}
                className="relative rounded-2xl border border-border bg-warm-ivory/60 p-6 shadow-xs"
              >
                <span className="text-xs font-bold text-terracotta tracking-widest uppercase">
                  {item.number}
                </span>
                <h3 className="font-display mt-2 text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Talent Pool Registration Form Section */}
      <section id="talent-pool" className="bg-mist/50 py-16 md:py-24 scroll-mt-20">
        <div className="container-site max-w-4xl">
          <CandidateRegistrationForm />
        </div>
      </section>

      {/* 5 Worker Protection Checks */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Worker Protection"
            title="Every placement follows five mandatory checks"
            description="We ensure you are protected before, during, and after your placement with verified contracts, lawful visas, and ongoing welfare tracking."
            className="mb-12"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workerProtectionChecks.map((check) => (
              <div
                key={check.step}
                className="rounded-xl border border-border bg-warm-ivory/30 p-6 transition hover:border-deep-teal/40"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-deep-teal text-white text-xs font-bold">
                  {check.step}
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                  {check.title}
                </h3>
                <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                  {check.description}
                </p>
              </div>
            ))}

            {/* Fair Recruitment Card */}
            <div className="rounded-xl border-2 border-terracotta/40 bg-white p-6 shadow-xs sm:col-span-2 lg:col-span-1">
              <span className="rounded-full bg-terracotta/10 px-2.5 py-0.5 text-xs font-bold text-terracotta uppercase tracking-wide">
                Fair Recruitment Rule
              </span>
              <h3 className="font-display mt-3 text-lg font-bold text-ink">
                {fairRecruitmentStandard.headline}
              </h3>
              <p className="mt-2 text-xs text-charcoal/80 leading-relaxed">
                Employers pay all recruitment costs, visas, flights, and medical checkups. Saying no to optional extras never affects your candidacy.
              </p>
              <div className="mt-4 pt-3 border-t border-border text-xs font-medium text-deep-teal">
                ✓ Helpline: +254 713 448 062
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate Pathway Process */}
      <ProcessSteps
        candidateSteps={candidateProcess}
        employerSteps={candidateProcess}
      />

      {/* Safeguards & Accountability */}
      <section className="bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Safeguards & Dignity"
            title="Our commitments to every worker"
            description="UtuCrest differentiates itself from traditional recruitment agencies by placing dignity and worker readiness at the center of every decision."
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dignityPractices.map((practice) => (
              <div
                key={practice}
                className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 text-sm text-charcoal/85 shadow-xs"
              >
                <span className="mt-1 size-2 shrink-0 rounded-full bg-deep-teal" />
                <span>{practice}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#talent-pool">Submit your CV now</LinkButton>
            <LinkButton href="/jobs" variant="secondary">
              Browse current vacancies
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
