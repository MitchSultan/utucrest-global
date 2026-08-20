import { HeroSection } from "@/components/sections/HeroSection";
import { AudiencePathway } from "@/components/sections/AudiencePathway";
import { TrustBand } from "@/components/sections/TrustBand";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DignityFeature, StoryCard } from "@/components/sections/StoryCard";
import { InsightCard } from "@/components/sections/InsightCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { trustItems, candidateProcess, employerProcess } from "@/content/impact";
import { getFeaturedStory } from "@/content/stories";
import { getFeaturedInsights } from "@/content/insights";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({});

export default function HomePage() {
  const featuredStory = getFeaturedStory();
  const insights = getFeaturedInsights();

  return (
    <>
      <HeroSection
        eyebrow="Dignity in work. Opportunity with direction."
        title="Building better futures"
        titleLine2="through better work."
        description={siteConfig.description}
        primaryCta={{ label: "Find your next opportunity", href: "/jobs" }}
        secondaryCta={{ label: "Build your team", href: "/employers" }}
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
        imageAlt="Professional team collaborating in a modern workplace — prototype placeholder"
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

      <section className="bg-mist py-16 md:py-20" aria-labelledby="story-heading">
        <div className="container-site">
          <SectionHeading
            eyebrow="Real outcomes"
            title="Stories of preparation, placement, and growth"
            description="Every placement is a person with a future. Here is how dignity in work shows up in practice."
            className="mb-10"
          />
          <StoryCard story={featuredStory} featured />
        </div>
      </section>

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
