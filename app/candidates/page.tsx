import Image from "next/image";
import { PageHero } from "@/components/sections/FinalCTA";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { candidateProcess, dignityPractices } from "@/content/impact";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "For Candidates",
  description:
    "Your next opportunity deserves preparation. Explore dignified pathways to meaningful work with guidance, support, and respect.",
  path: "/candidates",
});

export default function CandidatesPage() {
  return (
    <>
      <PageHero
        eyebrow="For candidates"
        title="Your next opportunity deserves preparation."
        description="Utu Crest supports job seekers with respectful guidance, practical preparation, and access to opportunities across Kenya and global markets. We see your potential—not just your CV."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/jobs">Browse jobs</LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Join the talent network
          </LinkButton>
          <LinkButton href="/training" variant="ghost">
            Explore training
          </LinkButton>
        </div>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
              alt="Professional preparing for an interview — prototype placeholder"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="How we support you"
              title="Guidance at every step—not pressure to accept anything"
              description="We help you understand roles clearly, prepare with confidence, and make informed decisions about your next move."
            />
            <ul className="mt-8 space-y-3">
              {[
                "Clear information about roles, locations, and expectations",
                "Interview preparation and CV refinement",
                "Honest feedback—not false promises",
                "Follow-up support after you start a new role",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-charcoal/85"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ProcessSteps
        candidateSteps={candidateProcess}
        employerSteps={candidateProcess}
      />

      <section className="bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Your dignity, protected"
            title="What you can expect from Utu Crest"
            description="Registration and application do not guarantee employment. We match thoughtfully based on fit, readiness, and opportunity quality."
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dignityPractices.map((practice) => (
              <div
                key={practice}
                className="rounded-xl border border-border bg-white p-5 text-sm text-charcoal/85"
              >
                {practice}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/jobs">Browse current opportunities</LinkButton>
            <LinkButton href="/contact" variant="secondary">
              Register your interest
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
