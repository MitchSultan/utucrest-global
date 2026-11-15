import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/FinalCTA";
import { LinkButton } from "@/components/ui/LinkButton";
import { services, getServiceBySlug } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services
    .filter((service) => service.slug !== "training")
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service || service.slug === "training") notFound();

  return (
    <>
      <PageHero
        eyebrow="Workforce solutions"
        title={service.outcome}
        description={service.description}
      >
        <LinkButton href="/employers#inquiry-form">
          Discuss your hiring needs
        </LinkButton>
      </PageHero>
      <section className="py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-deep-teal">A thoughtful approach</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-ink md:text-4xl">
              The right solution starts with understanding the work.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-charcoal/85">
            <p>
              We begin by listening to your goals, context, and expectations. From there, we
              recommend a practical approach that fits the role and the people involved.
            </p>
            <p>
              Clear communication, careful matching, and support through the process help
              candidates and employers make informed decisions.
            </p>
            <LinkButton href="/employers#inquiry-form" variant="secondary">
              Start a conversation
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
