import Image from "next/image";
import { LinkButton } from "@/components/ui/LinkButton";
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
    <section className="relative overflow-hidden bg-warm-ivory pathway-curve">
      <div className="container-site grid items-center gap-10 py-16 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-deep-teal">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl lg:text-[3.25rem]">
            {title}
            {titleLine2 && (
              <>
                <br />
                <span className="text-deep-teal">{titleLine2}</span>
              </>
            )}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/85">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LinkButton href={primaryCta.href} size="lg">
              {primaryCta.label}
            </LinkButton>
            <LinkButton href={secondaryCta.href} variant="secondary" size="lg">
              {secondaryCta.label}
            </LinkButton>
          </div>
          <p className="mt-8 text-sm font-medium text-charcoal/70">
            {trustStatement}
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-lg md:aspect-[5/4]">
            <Image
              src="/images/12.jpg"
              alt={imageAlt}
              fill
              priority
              className="object-cover "
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-lg bg-white p-4 shadow-md md:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-deep-teal">
              Serving
            </p>
            <p className="mt-1 text-sm font-medium text-ink">
              Candidates & employers
            </p>
          </div>
          <div
            className="absolute -right-3 -top-3 size-24 rounded-full border-2 border-golden-sand/40"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
