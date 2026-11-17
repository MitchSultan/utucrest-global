import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { brandPrinciples } from "@/content/site";

export interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  titleLine2?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
  trustStatement?: string;
}

export function HeroSection({
  eyebrow = brandPrinciples.core,
  title,
  titleLine2,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  trustStatement = brandPrinciples.trustStatement,
}: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-deep-teal">
      <div
        className="pointer-events-none absolute -right-32 -top-40 -z-10 size-[34rem] rounded-full border border-deep-teal/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 -top-24 -z-10 size-[26rem] rounded-full border border-deep-teal/10"
        aria-hidden="true"
      />
      <div className="container-site grid items-center gap-12 py-16 md:py-20 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          {/* <p className="eyebrow text-warm-ivory">
            {eyebrow}
          </p> */}
          <TextReveal
            as="h1"
            className="font-display text-warm-ivory mt-6 text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.25rem]"
            segments={[
              { text: title },
              ...(titleLine2
                ? [{ text: ` ${titleLine2}`, className: "text-warm-ivory" }]
                : []),
            ]}
            trigger="load"
            delay={0.12}
          />
          <ScrollReveal
            as="p"
            className="mt-6 max-w-xl text-lg leading-relaxed text-warm-ivory md:text-xl"
            trigger="load"
            delay={0.3}
          >
            {description}
          </ScrollReveal>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href={primaryCta.href} size="lg" className="group  text-ink ">
              {primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </LinkButton>
            <LinkButton
              href={secondaryCta.href}
              variant="secondary"
              size="lg"
              className="border-ink/15 bg-white/70"
            >
              {secondaryCta.label}
            </LinkButton>
          </div>
          {/* <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5 text-sm text-charcoal/70">
            <span className="font-medium text-ink">Built on dignity</span>
            <span className="hidden h-4 w-px bg-ink/15 sm:block" aria-hidden="true" />
            <span>{trustStatement}</span>
          </div> */}
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:mr-0">
          <div className="absolute -inset-4 -z-10 rotate-3 rounded-[2rem] bg-mist" aria-hidden="true" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist shadow-lg md:aspect-[5/4]">
            <Image
              src='/images/hero.png'
              alt={imageAlt}
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* <div className="absolute -bottom-5 -left-3 max-w-[17rem] rounded-xl border border-border/70 bg-white p-4 shadow-md md:-left-7 md:p-5">
            <p className="eyebrow text-deep-teal">
              Beyond Recruitment
            </p>
            <p className="mt-2 text-sm leading-relaxed text-charcoal">
              Where opportunity meets dignity. Local and global workforce solutions.
            </p>
          </div> */}
          {/* <div
            className="absolute -right-4 -top-4 flex size-16 items-center justify-center rounded-full bg-golden-sand text-ink shadow-md"
            aria-hidden="true"
          >
            <ArrowDown className="size-5 -rotate-45" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
