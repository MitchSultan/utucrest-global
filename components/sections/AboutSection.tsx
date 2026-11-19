import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function AboutSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 md:py-24"
      aria-labelledby="about-us-heading"
    >
      {/* Subtle background decorative element */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 size-96 rounded-full bg-mist/60 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content Column */}
          <div className="flex flex-col ">
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-deep-teal/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-deep-teal">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              <span>About UtuCrest Global</span>
            </div>

            <TextReveal
              as="h2"
              id="about-us-heading"
              text="Talent should never be separated from dignity."
              trigger="scroll"
              className="font-display mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl lg:leading-[1.15]"
            />

            <ScrollReveal
              as="p"
              className="mt-6 text-base leading-relaxed text-charcoal/85 sm:text-lg"
            >
             We exist to bridge the gap between opportunity and talent.


            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:text-base"
            >
              Our purpose is to enable businesses to thrive while empowering individuals to grow, earn, and work with dignity locally and globally.

            </ScrollReveal>
            {/* <ScrollReveal
              as="p"
              className="mt-4 text-sm leading-relaxed text-charcoal/80 sm:text-base"
            >
              We handle end-to-end recruitment, compliance vetting, staff
              outsourcing, and work-readiness training—ensuring employers scale
              with confidence while job seekers access life-changing
              opportunities without exploitation.
            </ScrollReveal> */}

            {/* Key differentiators / trust list */}
            {/* <ul className="mt-6 space-y-3">
              {[
                "Zero candidate placement or recruitment fees—strict employer-pays model",
                "Full NEA regulatory accreditation & statutory labor law compliance",
                "Rigorous pre-deployment training, orientation, and professional vetting",
                "Continuous worker welfare monitoring and 24/7 post-placement support",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal/90">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-deep-teal"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul> */}

            {/* CTA to About Page */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <LinkButton href="/about" size="lg" className="group">
                <span>Learn More About Us</span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </LinkButton>

              {/* <Link
                href="/impact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep-teal hover:text-deep-teal-hover hover:underline"
              >
                <span>Read our ethical charter</span>
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link> */}
            </div>
          </div>

          {/* Adjacent Image Column */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/3]">
              <div
                className="absolute -right-2 -top-9 md:-top-3 z-0 w-48 rotate-2 rounded-2xl border border-border/80 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:-right-4"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-deep-teal/10 text-deep-teal">
                    <ShieldCheck className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">
                      UtuCrest Careers
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-ink">
                      Verified opportunities
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[10px] font-medium text-charcoal/70">
                  <span>Local + global roles</span>
                  <span className="size-2 rounded-full bg-deep-teal" />
                </div>
              </div>

              <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                <Image
                  src="/images/about-sec.png"
                  alt="Diverse professional team collaborating in a modern workplace"
                  fill
                  className="object-contain transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="absolute -bottom-12 md:bottom-3 left-3 right-3 z-20 rounded-2xl border border-border/70 bg-white/95 p-4 text-ink shadow-xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:w-[calc(100%-3rem)] sm:max-w-sm sm:p-5">
                {/* <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-deep-teal text-white">
                      <Briefcase className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-deep-teal">
                        Opportunity board
                      </span>
                      <span className="mt-0.5 block text-xs text-charcoal/70">
                        Ethical career pathways
                      </span>
                    </span>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mist px-2 py-1 text-[10px] font-semibold text-deep-teal">
                    <CheckCircle2 className="size-3" aria-hidden="true" />
                    Verified
                  </span>
                </div> */}

                <div className="mt-3 rounded-xl bg-warm-ivory/80 px-3 py-2.5">
                  <p className="text-sm font-semibold leading-snug text-ink">
                    Find work that moves you forward
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-charcoal/70">
                    <MapPin className="size-3.5 shrink-0 text-deep-teal" aria-hidden="true" />
                    Local and international roles
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-medium text-charcoal/70">
                    Prepared. Protected. Supported.
                  </span>
                  <Link
                    href="/jobs"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-deep-teal hover:text-deep-teal-hover"
                  >
                    Explore
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative Corner Element */}
            <div
              className="pointer-events-none -bottom-4 -right-4 absolute -z-10 size-32 rounded-2xl border-2 border-golden-sand/40"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
