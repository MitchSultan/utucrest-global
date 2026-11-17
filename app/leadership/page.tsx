import { PageHero } from "@/components/sections/FinalCTA";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createMetadata } from "@/lib/metadata";
import { ShieldCheck, HeartHandshake, Award } from "lucide-react";

export const metadata = createMetadata({
  title: "Executive Leadership Team · UtuCrest Global Workforce",
  description:
    "Meet the executive directors of UtuCrest Global Workforce—leaders with decades of operational HR, enterprise business development, and media communication expertise.",
  path: "/leadership",
});

export default function LeadershipPage() {
  const leadershipPrinciples = [
    {
      icon: ShieldCheck,
      title: "Ethical Stewardship",
      description:
        "Every deployment pipeline is personally governed under our zero-fee worker mandate and verified legal protocols.",
    },
    {
      icon: HeartHandshake,
      title: "Human-Centered Focus",
      description:
        "We champion the dignity of candidates as fundamental to long-term client retention, morale, and performance.",
    },
    {
      icon: Award,
      title: "Proven Operational Scale",
      description:
        "Decades of collective experience managing 3,000+ employee workforces in manufacturing, banking, and multinational operations.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Executive Leadership · Beyond Recruitment"
        title="Experienced Leadership Grounded in Dignity & Excellence"
        description="Our founding directors combine deep domain expertise in operational human resources, large-scale enterprise development, and strategic communications to reshape workforce solutions across Kenya and global corridors."
      />

      {/* Interactive Leadership Grid with GSAP Transition Dialog */}
      <LeadershipSection
        eyebrow="The Executive Board"
        title="Meet Our Directors"
        description="Click 'Learn More' on any director to explore their career journey, strategic focus areas, and leadership philosophy."
      />

      {/* Leadership Governance & Principles */}
      <section className="bg-white py-16 md:py-20" aria-labelledby="principles-heading">
        <div className="container-site">
          <SectionHeading
            eyebrow="Governance & Standards"
            title="How Our Directors Lead"
            description="Our leadership team actively participates in candidate welfare oversight, bilateral regulatory compliance, and partner client success."
            align="center"
            className="mb-14"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {leadershipPrinciples.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-warm-ivory/40 p-8 transition hover:border-deep-teal/40 hover:bg-white hover:shadow-sm"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-deep-teal/10 text-deep-teal">
                  <item.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
