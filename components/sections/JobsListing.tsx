"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/sections/FinalCTA";
import { FilterBar, filterJobs, type JobFilters } from "@/components/sections/FilterBar";
import { JobCard } from "@/components/sections/JobCard";
import { LinkButton } from "@/components/ui/LinkButton";
import type { Job } from "@/lib/types";

export function JobsListing({ jobs }: { jobs: Job[] }) {
  const [filters, setFilters] = useState<JobFilters>({
    keyword: "",
    location: "",
    employmentType: "",
    sector: "",
    sort: "newest",
  });

  const filteredJobs = useMemo(
    () => filterJobs(jobs, filters),
    [jobs, filters],
  );
  const jobLocations = [...new Set(jobs.map((job) => job.location))].sort();
  const jobSectors = [...new Set(jobs.map((job) => job.sector))].sort();

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Find work that moves you forward"
        description="Browse current openings across sectors and locations. Every role listed follows our standards for transparent communication and ethical placement."
      >
        <LinkButton href="/candidates" variant="secondary">
          New here? Learn about our process
        </LinkButton>
      </PageHero>

      <section className="py-10 md:py-14">
        <div className="container-site">
          <FilterBar
            filters={filters}
            onFiltersChange={setFilters}
            locations={jobLocations}
            sectors={jobSectors}
            resultCount={filteredJobs.length}
          />

          <div className="mt-8 space-y-4" aria-live="polite" aria-atomic="true">
            {filteredJobs.length === 0 ? (
              <div className="rounded-xl border border-border bg-mist p-10 text-center">
                <p className="text-lg font-semibold text-ink">
                  No roles match your filters
                </p>
                <p className="mt-2 text-sm text-charcoal/70">
                  Try adjusting your search or{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        keyword: "",
                        location: "",
                        employmentType: "",
                        sector: "",
                        sort: "newest",
                      })
                    }
                    className="text-deep-teal hover:underline"
                  >
                    reset all filters
                  </button>
                  .
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => <JobCard key={job.slug} job={job} />)
            )}
          </div>
        </div>
      </section>
    </>
  );
}
