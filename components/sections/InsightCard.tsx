import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Insight } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export interface InsightCardProps {
  insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
      <Badge >{insight.category}</Badge>
      <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-deep-teal">
        <Link href={`/insights/${insight.slug}`}>{insight.title}</Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/80">
        {insight.excerpt}
      </p>
      <div className="mt-4 flex items-center gap-3 text-xs text-charcoal/60">
        <time dateTime={insight.publishedDate}>
          {formatDate(insight.publishedDate)}
        </time>
        <span className="flex items-center gap-1">
          <Clock className="size-3" aria-hidden="true" />
          {insight.readingTime} min read
        </span>
      </div>
      <Link
        href={`/insights/${insight.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-deep-teal"
      >
        Read article
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
