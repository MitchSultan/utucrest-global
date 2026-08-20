"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { EmploymentType, Job } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface JobFilters {
  keyword: string;
  location: string;
  employmentType: string;
  sector: string;
  sort: "newest" | "oldest" | "title";
}

export interface FilterBarProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  locations: string[];
  sectors: string[];
  resultCount: number;
}

const employmentTypes: EmploymentType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export function filterJobs(jobs: Job[], filters: JobFilters): Job[] {
  let results = [...jobs];

  if (filters.keyword.trim()) {
    const q = filters.keyword.toLowerCase();
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q) ||
        j.sector.toLowerCase().includes(q) ||
        j.employer.toLowerCase().includes(q),
    );
  }

  if (filters.location) {
    results = results.filter((j) => j.location === filters.location);
  }

  if (filters.employmentType) {
    results = results.filter(
      (j) => j.employmentType === filters.employmentType,
    );
  }

  if (filters.sector) {
    results = results.filter((j) => j.sector === filters.sector);
  }

  switch (filters.sort) {
    case "newest":
      results.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
      );
      break;
    case "oldest":
      results.sort(
        (a, b) =>
          new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime(),
      );
      break;
    case "title":
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return results;
}

export function FilterBar({
  filters,
  onFiltersChange,
  locations,
  sectors,
  resultCount,
}: FilterBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (partial: Partial<JobFilters>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const reset = () => {
    onFiltersChange({
      keyword: "",
      location: "",
      employmentType: "",
      sector: "",
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.keyword ||
    filters.location ||
    filters.employmentType ||
    filters.sector;

  const filterControls = (
    <>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-charcoal/50"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search roles, keywords..."
          value={filters.keyword}
          onChange={(e) => update({ keyword: e.target.value })}
          className="h-11 w-full rounded-md border border-border bg-white pl-10 pr-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
          aria-label="Search jobs"
        />
      </div>

      <select
        value={filters.location}
        onChange={(e) => update({ location: e.target.value })}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm"
        aria-label="Filter by location"
      >
        <option value="">All locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        value={filters.employmentType}
        onChange={(e) => update({ employmentType: e.target.value })}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm"
        aria-label="Filter by employment type"
      >
        <option value="">All types</option>
        {employmentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={filters.sector}
        onChange={(e) => update({ sector: e.target.value })}
        className="h-11 rounded-md border border-border bg-white px-3 text-sm"
        aria-label="Filter by sector"
      >
        <option value="">All sectors</option>
        {sectors.map((sector) => (
          <option key={sector} value={sector}>
            {sector}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) =>
          update({ sort: e.target.value as JobFilters["sort"] })
        }
        className="h-11 rounded-md border border-border bg-white px-3 text-sm"
        aria-label="Sort results"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="title">Title A–Z</option>
      </select>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="hidden flex-wrap items-center gap-3 lg:flex">
        {filterControls}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset filters
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between lg:hidden">
        <p className="text-sm text-charcoal/70">
          {resultCount} {resultCount === 1 ? "role" : "roles"} found
        </p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          Filters
        </Button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Job filters"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close filters"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Filter jobs</h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 hover:bg-mist"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-3">{filterControls}</div>
            <div className="mt-6 flex gap-3">
              <Button
                className="flex-1"
                onClick={() => setMobileOpen(false)}
              >
                Show {resultCount} results
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={reset}>
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="hidden text-sm text-charcoal/70 lg:block">
        {resultCount} {resultCount === 1 ? "role" : "roles"} found
        {hasActiveFilters && (
          <button
            type="button"
            onClick={reset}
            className={cn("ml-2 text-deep-teal hover:underline")}
          >
            Clear all
          </button>
        )}
      </p>
    </div>
  );
}
