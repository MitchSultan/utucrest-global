import Link from "next/link";
import {
  Building2,
  Compass,
  GraduationCap,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/types";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  building: Building2,
  compass: Compass,
  "graduation-cap": GraduationCap,
};

export interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Users;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="inline-flex rounded-lg  p-2.5 text-deep-teal">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm font-medium text-deep-teal">
        {service.outcome}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">
        {service.description}
      </p>
      <Link
        href={service.href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-deep-teal transition-colors group-hover:gap-2"
      >
        Learn more
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

export interface ServicesGridProps {
  services: Service[];
  heading?: {
    eyebrow?: string;
    title: string;
    description?: string;
  };
}

export function ServicesGrid({ services, heading }: ServicesGridProps) {
  return (
    <section className="py-16 md:py-20" aria-labelledby="services-heading">
      <div className="container-site">
        {heading && (
          <SectionHeading
            eyebrow={heading.eyebrow}
            title={heading.title}
            description={heading.description}
            className="mb-12"
          />
        )}
        <ScrollReveal
          as="div"
          stagger
        >
          <ResponsiveCarousel
            label="Workforce services"
            className="md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ResponsiveCarousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
