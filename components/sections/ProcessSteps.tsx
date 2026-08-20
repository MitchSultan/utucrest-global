"use client";

import { useState } from "react";
import type { ProcessStep } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export interface ProcessStepsProps {
  candidateSteps: ProcessStep[];
  employerSteps: ProcessStep[];
}

type Track = "candidate" | "employer";

export function ProcessSteps({
  candidateSteps,
  employerSteps,
}: ProcessStepsProps) {
  const [track, setTrack] = useState<Track>("candidate");
  const steps = track === "candidate" ? candidateSteps : employerSteps;

  return (
    <section className="bg-mist py-16 md:py-20" aria-labelledby="process-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title="A clear path from first conversation to lasting success"
          description="Whether you are seeking opportunity or building a team, our process reduces uncertainty at every step."
          className="mb-10"
        />

        <div
          className="mb-10 inline-flex rounded-lg border border-border bg-white p-1"
          role="tablist"
          aria-label="Process track"
        >
          {(
            [
              { id: "candidate" as const, label: "For candidates" },
              { id: "employer" as const, label: "For employers" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={track === tab.id}
              aria-controls="process-panel"
              id={`tab-${tab.id}`}
              onClick={() => setTrack(tab.id)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                track === tab.id
                  ? "bg-deep-teal text-white"
                  : "text-charcoal hover:bg-mist",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ol
          id="process-panel"
          role="tabpanel"
          aria-labelledby={`tab-${track}`}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-xl bg-white p-6 shadow-sm"
            >
              <span
                className="inline-flex size-8 items-center justify-center rounded-full bg-deep-teal/10 text-sm font-bold text-deep-teal"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
