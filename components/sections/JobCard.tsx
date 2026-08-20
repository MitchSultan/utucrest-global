import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Job } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink group-hover:text-deep-teal">
            <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
          </h3>
          <p className="mt-1 text-sm text-charcoal/70">{job.employer}</p>
        </div>
        <Badge variant="outline">{job.employmentType}</Badge>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-charcoal/70">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" aria-hidden="true" />
          {job.location}
        </span>
        <Badge variant="default">{job.sector}</Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-charcoal/80">
        {job.summary}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <time className="text-xs text-charcoal/60" dateTime={job.postedDate}>
          Posted {formatDate(job.postedDate)}
        </time>
        <Link
          href={`/jobs/${job.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-deep-teal"
        >
          View details
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
