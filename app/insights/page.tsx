import { InsightCard } from "@/components/sections/InsightCard";
import { PageHero } from "@/components/sections/FinalCTA";
import { insights } from "@/content/insights";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Practical career and workforce guidance for candidates and employers.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights & resources"
        title="Clear advice for better career and workforce decisions."
        description="Ideas and practical guidance for candidates preparing for opportunity and employers building stronger teams."
      />
      <section className="py-16 md:py-20">
        <div className="container-site grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </section>
    </>
  );
}
