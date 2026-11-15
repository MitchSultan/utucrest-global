import { HeroSection } from "@/components/sections/HeroSection";
import { AudiencePathway } from "@/components/sections/AudiencePathway";
import { TrustBand } from "@/components/sections/TrustBand";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DignityFeature } from "@/components/sections/DignityFeature";
import { InsightCard } from "@/components/sections/InsightCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { trustItems, candidateProcess, employerProcess } from "@/content/impact";
import { getFeaturedInsights } from "@/content/insights";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({});

export default function HomePage() {
  const insights = getFeaturedInsights();

  return (
    <>
      <HeroSection
        eyebrow="Recruitment · Workforce solutions · Kenya & beyond"
        title="Good people."
        titleLine2="Better work. Lasting growth."
        description={siteConfig.description}
        primaryCta={{ label: "Find your next opportunity", href: "/jobs" }}
        secondaryCta={{ label: "Build your team", href: "/employers" }}
        imageSrc="/images/12.jpg"
        imageAlt="Utu Crest Global recruitment campaign featuring two smiling professionals"
      />

      <AudiencePathway />

      <TrustBand items={trustItems} />

      <ServicesGrid
        services={services}
        heading={{
          eyebrow: "Workforce solutions",
          title: "A connected system for talent and teams",
          description:
            "Recruitment, outsourcing, advisory, and preparation—designed to work together for sustainable outcomes.",
        }}
      />

      <ProcessSteps
        candidateSteps={candidateProcess}
        employerSteps={employerProcess}
      />

      <DignityFeature />

      <section className="py-16 md:py-20" aria-labelledby="insights-heading">
        <div className="container-site">
          <SectionHeading
            eyebrow="Insights & resources"
            title="Practical guidance for candidates and employers"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
