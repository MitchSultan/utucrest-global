import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustBand } from "@/components/sections/TrustBand";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { CommitmentSection } from "@/components/sections/CommitmentSection";
import { LeadershipCarousel } from "@/components/sections/LeadershipCarousel";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DignityFeature } from "@/components/sections/DignityFeature";
import { InsightCard } from "@/components/sections/InsightCard";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/content/services";
import { trustItems, candidateProcess, employerProcess } from "@/content/impact";
import { getFeaturedInsights } from "@/content/insights";
import { siteConfig, brandPrinciples } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "UtuCrest Global Workforce · Beyond Recruitment",
  description: siteConfig.description,
});

export default function HomePage() {
  const insights = getFeaturedInsights();

  return (
    <>
      <HeroSection
        eyebrow="Workforce Solutions · Local & Global"
        title="Elevating Talent"
        titleLine2="with Dignity."
        description={siteConfig.description}
        primaryCta={{ label: "Join the Talent Pool", href: "/candidates#talent-pool" }}
        secondaryCta={{ label: "Outsource Workforce", href: "/employers" }}
        imageSrc="/images/12.jpg"
        imageAlt="UtuCrest Global Workforce - Elevating Talent with Dignity"
        trustStatement={brandPrinciples.trustStatement}
      />

      <AboutSection />
      <LeadershipCarousel />

      <TrustBand items={trustItems} />

      <ServicesGrid
        services={services}
        heading={{
          eyebrow: "Our Services",
          title: "Comprehensive Workforce Solutions",
          description:
            "From ethical talent sourcing and worker readiness training to full employer-of-record workforce outsourcing.",
        }}
      />

      <CommitmentSection />

      <ProcessSteps
        candidateSteps={candidateProcess}
        employerSteps={employerProcess}
      />

      <DignityFeature />

      <section className="py-16 md:py-20 bg-white" aria-labelledby="insights-heading">
        <div className="container-site">
          <SectionHeading
            eyebrow="Insights & Resources"
            title="Practical guidance for candidates and employers"
            className="mb-10"
          />
          <ScrollReveal as="div" stagger>
            <ResponsiveCarousel
              label="Featured insights"
              className="md:grid-cols-3"
            >
              {insights.map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </ResponsiveCarousel>
          </ScrollReveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
