import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";

export function FinalCTA() {
  return (
    <section className="bg-ink py-16 md:py-20" aria-labelledby="final-cta-heading">
      <div className="container-site text-center">
        <SectionHeading
          eyebrow="Take the next step"
          title="The next opportunity should move you forward."
          description="Whether you are ready to explore roles or need dependable talent for your team, Utu Crest is here to help you take a confident next step."
          align="center"
          dark
          className="mx-auto"
        />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/jobs" variant="inverse" size="lg">
            Start your job search
          </LinkButton>
          <LinkButton href="/contact" variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10">
            Talk to our workforce team
          </LinkButton>
        </div>
      </div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-mist py-14 md:py-18">
      <div className="container-site max-w-3xl">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-deep-teal">
            {eyebrow}
          </p>
        )}
        <TextReveal
          as="h1"
          text={title}
          trigger="load"
          className="font-display mt-3 text-balance text-4xl font-semibold tracking-tight text-ink md:text-5xl"
        />
        {description && (
          <ScrollReveal
            as="p"
            trigger="load"
            delay={0.2}
            className="mt-4 text-lg max-w-96leading-relaxed text-charcoal/85"
          >
            {description}
          </ScrollReveal>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
