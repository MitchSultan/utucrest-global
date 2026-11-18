import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/FinalCTA";
import { createMetadata } from "@/lib/metadata";
import { getPublicInsights } from "@/lib/public-content";
import { formatDate } from "@/lib/utils";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = (await getPublicInsights()).find((item) => item.slug === slug);
  if (!insight) return {};

  return createMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
  });
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = (await getPublicInsights()).find((item) => item.slug === slug);

  if (!insight) notFound();

  const paragraphs = insight.content.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow={insight.category}
        title={insight.title}
        description={insight.excerpt}
      />
      <article className="container-site max-w-3xl py-12 md:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border pb-5 text-sm text-charcoal/65">
          <span>{insight.author}</span>
          <time dateTime={insight.publishedDate}>
            {formatDate(insight.publishedDate)}
          </time>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-4" aria-hidden="true" />
            {insight.readingTime} min read
          </span>
        </div>
        <div className="space-y-5 text-base leading-8 text-charcoal/90">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 20)}`}>
              {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={partIndex} className="font-semibold text-ink">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  part
                ),
              )}
            </p>
          ))}
        </div>
        <Link
          href="/insights"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-deep-teal hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All insights
        </Link>
      </article>
    </>
  );
}
