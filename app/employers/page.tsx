import Image from "next/image";
import { PageHero } from "@/components/sections/FinalCTA";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustBand } from "@/components/sections/TrustBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { services } from "@/content/services";
import { employerProcess, trustItems, industriesServed } from "@/content/impact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "For Employers",
  description:
    "Build a workforce ready for what's next. Dependable talent, ethical sourcing, and scalable workforce solutions across Kenya and global markets.",
  path: "/employers",
});

export default function EmployersPage() {
  return (
    <>
      <PageHero
        eyebrow="For employers"
        title="Build a workforce ready for what's next."
        description="You need more than CVs—you need prepared, dependable, well-matched talent. Utu Crest helps you hire with confidence, scale responsibly, and measure outcomes that last."
      >
        <LinkButton href="#inquiry-form">Submit a hiring brief</LinkButton>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The challenge"
              title="Hiring pressure without workforce clarity leads to costly cycles"
              description="Rushed recruitment, unclear role definitions, and weak onboarding create turnover—not growth. We help you define what you need, source thoughtfully, and support people after they start."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Structured briefs aligned to business outcomes",
                "Screening that assesses readiness, not just credentials",
                "Shortlists built for fit and long-term potential",
                "Onboarding coordination and post-placement check-ins",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-charcoal/85"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-deep-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80"
              alt="HR leader reviewing workforce plans — prototype placeholder"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <ServicesGrid
        services={services}
        heading={{
          eyebrow: "Solutions",
          title: "Workforce services that scale with your business",
          description:
            "Choose the model that fits—or combine services for a complete workforce strategy.",
        }}
      />

      <ProcessSteps
        candidateSteps={employerProcess}
        employerSteps={employerProcess}
      />

      <TrustBand items={trustItems} />

      <section className="py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Industries"
            title="Sectors we support"
            description="[Replace with confirmed industry list and sector-specific proof when approved.]"
            className="mb-8"
          />
          <div className="flex flex-wrap gap-3">
            {industriesServed.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm text-charcoal"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry-form" className="bg-mist py-16 md:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Get started"
              title="Tell us about your hiring needs"
              description="Share your brief and our workforce team will respond within two business days with a recommended approach."
            />
            <p className="mt-6 text-sm text-charcoal/70">
              [Insert approved client logos and verified placement metrics here
              when available.]
            </p>
          </div>
          <InquiryForm variant="employer" />
        </div>
      </section>
    </>
  );
}
