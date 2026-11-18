import Link from "next/link";
import {
  ShieldCheck,
  Ban,
  FileCheck2,
  Headphones,
  Scale,
  GraduationCap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { fairRecruitmentStandard } from "@/content/site";

export function CommitmentSection() {
  const commitments = [
    {
      icon: Ban,
      title: "Zero Worker Placement Fees",
      tagline: "Employer-pays model",
      description:
        "We never charge job seekers placement fees, registration costs, or commissions. All recruitment expenses are funded directly by verified partner employers.",
    },
    {
      icon: ShieldCheck,
      title: "Document Protection & Human Dignity",
      tagline: "Total worker autonomy",
      description:
        "Passports, national identification cards, and certificates remain exclusively in workers' possession. We uphold zero-tolerance for document withholding.",
    },
    {
      icon: FileCheck2,
      title: "Transparent & Verifiable Contracts",
      tagline: "Clear terms before travel",
      description:
        "Every candidate receives and signs an offer detailing exact wages, working hours, benefits, and dispute resolution mechanisms in a language they understand.",
    },
    {
      icon: GraduationCap,
      title: "Comprehensive Work Readiness",
      tagline: "Equipping for success",
      description:
        "Structured pre-departure training, safety induction, cultural orientation, and financial literacy coaching ensure every worker arrives confident and prepared.",
    },
    {
      icon: Headphones,
      title: "24/7 Welfare Helpline & Post-Deployment Support",
      tagline: "Never left alone",
      description:
        "We maintain ongoing check-ins and an always-available welfare helpline (+254 713 448 062) to resolve workplace grievances and support health needs promptly.",
    },
    {
      icon: Scale,
      title: "NEA Accreditation & Bilateral Compliance",
      tagline: "Fully lawful corridors",
      description:
        "Strict adherence to National Employment Authority (NEA) guidelines, international labor conventions, and destination state immigration protocols.",
    },
  ];

  return (
    <section
      className="bg-white py-16 md:py-24"
      aria-labelledby="commitment-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Our Commitment"
          title="Upholding Dignity, Fairness & Trust"
          description="At UtuCrest Global Workforce, dignity is not an abstract ideal—it is an uncompromising operational commitment embedded in every engagement."
          align="center"
          className="mb-14"
        />

        {/* 6 Commitments Grid */}
        <ScrollReveal
          as="div"
          stagger
        >
          <ResponsiveCarousel
            label="Our commitments"
            className="md:-ml-4"
            loop
            autoplay
          >
            {commitments.map((commitment) => (
              <div
                key={commitment.title}
                className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-warm-ivory/40 p-7 transition-all duration-200 hover:border-deep-teal/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-deep-teal/10 text-deep-teal transition-colors group-hover:bg-deep-teal group-hover:text-white">
                    <commitment.icon className="size-6" aria-hidden="true" />
                  </div>
                  <div className="mt-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                      {commitment.tagline}
                    </span>
                    <h3 className="font-display mt-1 text-xl font-semibold text-ink">
                      {commitment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                      {commitment.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ResponsiveCarousel>
        </ScrollReveal>

        {/* Commitment Highlight Callout Banner */}
        <div className="mt-20 rounded-2xl bg-deep-teal p-8 text-white md:p-10 shadow-md">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-golden-sand/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-golden-sand">
                <CheckCircle className="size-3.5" aria-hidden="true" />
                The Fair Recruitment Standard
              </span>
              <h3 className="font-display mt-4 text-2xl font-semibold text-white md:text-3xl">
                {fairRecruitmentStandard.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                {fairRecruitmentStandard.clarification} Employers cover
                recruitment fees, visa processing, mandatory travel tickets, and
                statutory onboarding clearances.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-4">
              <LinkButton
                href="/impact"
                variant="inverse"
                size="lg"
                className="w-full sm:w-auto text-center"
              >
                <span>Explore Our Impact & Standards</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-white/90 hover:text-white underline-offset-4 hover:underline"
              >
                <span>Contact our compliance officers</span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
