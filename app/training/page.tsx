import { PageHero } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Worker Readiness & Training Academy · UtuCrest",
  description:
    "Equipping talent with the skills, mindset, cultural orientation, and resilience to succeed in local and global labour markets.",
  path: "/training",
});

const modules = [
  {
    title: "Cultural & Workplace Orientation",
    description: "Understanding destination workplace culture, social etiquette, expectations, and communication styles in Kenya, Europe, the Gulf, and Asia.",
  },
  {
    title: "Professional Conduct & Ethics",
    description: "Workplace discipline, attendance standards, team collaboration, safety protocols, and accountability in formal business environments.",
  },
  {
    title: "Financial Literacy & Remittance Planning",
    description: "Budgeting, savings discipline, secure cross-border remittance mechanisms, and avoiding common financial pitfalls during overseas employment.",
  },
  {
    title: "Emotional Resilience & Migration Wellness",
    description: "Mental preparation for transition, managing homesickness, building support networks, and navigating unfamiliar settings with confidence.",
  },
  {
    title: "Worker Rights & Legal Responsibilities",
    description: "Thorough education on statutory employment contracts, working hours, grievance procedures, helpline access, and dispute resolution channels.",
  },
  {
    title: "Vocational & Technical Upskilling",
    description: "Hands-on refreshers tailored to specific employer equipment, software tools, clinical documentation, and safety standards.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Worker Readiness & Preparation"
        title="Turn potential into work readiness."
        description="By focusing deeply on worker readiness, UtuCrest differentiates itself from traditional recruitment agencies and becomes a trusted workforce development partner for employers and talent alike."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/candidates#talent-pool">Register your profile</LinkButton>
          <LinkButton href="/jobs" variant="secondary">
            Browse open roles
          </LinkButton>
        </div>
      </PageHero>

      {/* Curriculum Modules */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="Readiness Curriculum"
            title="Essential Preparation Programmes"
            description="Our training programmes equip workers with the competencies and mindset necessary to thrive locally and internationally."
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m, idx) => (
              <div
                key={m.title}
                className="rounded-2xl border border-border bg-warm-ivory/40 p-6 transition hover:border-deep-teal/40 hover:shadow-xs"
              >
                <div className="flex size-8 items-center justify-center rounded-full bg-deep-teal text-xs font-bold text-white">
                  0{idx + 1}
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-ink">
                  {m.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/80">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Academy Banner */}
      <section className="bg-deep-teal py-16 md:py-20 text-white">
        <div className="container-site max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-golden-sand">
            Strategic Roadmap
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold md:text-4xl text-white">
            The UtuCrest Workforce Development Academy
          </h2>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-white/85">
            Expanding institutional partnerships with TVETs, international employers, and civil society to close workforce skill gaps and empower women and youth through dignified economic mobility.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <LinkButton href="/contact" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink">
              Explore Training Partnerships
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
