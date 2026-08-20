"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import { ApplyModal } from "@/components/sections/ApplyModal";
import { JobCard } from "@/components/sections/JobCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import type { Job } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface JobDetailClientProps {
  job: Job;
  relatedJobs: Job[];
}

export function JobDetailClient({ job, relatedJobs }: JobDetailClientProps) {
  const [showApply, setShowApply] = useState(false);

  return (
    <>
      <div className="border-b border-border bg-mist py-10 md:py-14">
        <div className="container-site">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 text-sm font-medium text-deep-teal hover:underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to all jobs
          </Link>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                {job.title}
              </h1>
              <p className="mt-2 text-lg text-charcoal/70">{job.employer}</p>
            </div>
            <Button size="lg" onClick={() => setShowApply(true)}>
              Apply for this role
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 text-sm text-charcoal/70">
              <MapPin className="size-4" aria-hidden="true" />
              {job.location}
            </span>
            <Badge variant="teal">{job.employmentType}</Badge>
            <Badge variant="outline">{job.sector}</Badge>
            <span className="inline-flex items-center gap-1 text-sm text-charcoal/60">
              <Clock className="size-3.5" aria-hidden="true" />
              Posted {formatDate(job.postedDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="container-site grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-ink">About the role</h2>
            <p className="mt-3 leading-relaxed text-charcoal/85">{job.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">Responsibilities</h2>
            <ul className="mt-3 space-y-2">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal/85">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-deep-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink">Requirements</h2>
            <ul className="mt-3 space-y-2">
              {job.requirements.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-charcoal/85">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {job.benefits.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-ink">What we offer</h2>
              <ul className="mt-3 space-y-2">
                {job.benefits.map((item) => (
                  <li key={item} className="text-sm text-charcoal/85">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-mist p-6">
            <h2 className="text-base font-semibold text-ink">Ready to apply?</h2>
            <p className="mt-2 text-sm text-charcoal/75">
              Submit your interest and our team will guide you through the next steps.
            </p>
            <Button className="mt-4 w-full" onClick={() => setShowApply(true)}>
              Apply now
            </Button>
          </div>

          {job.candidateNotes && (
            <div className="rounded-xl border border-terracotta/30 bg-terracotta/5 p-6">
              <h2 className="text-base font-semibold text-ink">
                Responsible application
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                {job.candidateNotes}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-border bg-white p-6 text-sm text-charcoal/75">
            <p>
              Utu Crest does not charge undisclosed placement fees. You should
              receive clear information about the role before any commitment.
            </p>
            <LinkButton href="/candidates" variant="link" className="mt-3">
              Learn about our candidate process
            </LinkButton>
          </div>
        </aside>
      </div>

      {relatedJobs.length > 0 && (
        <section className="border-t border-border bg-mist py-12">
          <div className="container-site">
            <h2 className="text-xl font-semibold text-ink">Related opportunities</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedJobs.map((related) => (
                <JobCard key={related.slug} job={related} />
              ))}
            </div>
          </div>
        </section>
      )}

      {showApply && (
        <ApplyModal job={job} onClose={() => setShowApply(false)} />
      )}
    </>
  );
}
