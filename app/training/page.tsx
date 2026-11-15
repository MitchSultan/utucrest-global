import { PageHero } from "@/components/sections/FinalCTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LinkButton } from "@/components/ui/LinkButton";
import { candidateProcess } from "@/content/impact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Training & Preparation",
  description:
    "Practical preparation to help candidates take their next career step with confidence.",
  path: "/training",
});

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training & preparation"
        title="Turn your potential into readiness."
        description="Practical career preparation helps candidates understand opportunities, present their experience clearly, and make informed decisions about their next move."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/jobs">Explore opportunities</LinkButton>
          <LinkButton href="/candidates" variant="secondary">
            Candidate support
          </LinkButton>
        </div>
      </PageHero>
      <ProcessSteps
        candidateSteps={candidateProcess}
        employerSteps={candidateProcess}
      />
    </>
  );
}
