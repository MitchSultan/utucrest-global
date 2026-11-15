import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DignityFeature() {
  return (
    <section className="py-16 md:py-20" aria-labelledby="dignity-heading">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
            alt="Colleagues collaborating in a modern workplace"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-deep-teal">
            Dignity in work
          </p>
          <h2
            id="dignity-heading"
            className="font-display mt-3 text-balance text-3xl font-semibold text-ink md:text-4xl"
          >
            Work is more than a placement. It is a step in someone&apos;s future.
          </h2>
          <p className="mt-4 leading-relaxed text-charcoal/85">
            At Utu Crest, dignity shows up in how we communicate, prepare, and
            place people—not in slogans. We believe work should open doors, not
            reduce people to numbers.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Transparent communication at every stage",
              "Respectful preparation—not pressure",
              "Realistic expectations about roles and locations",
              "Responsible placement with documented consent",
              "Ongoing support after start date",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-charcoal/85"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/impact"
            className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-deep-teal hover:underline"
          >
            See our impact approach
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
