"use client";

import { useActionState } from "react";
import { createJobAction } from "@/app/dashboard/actions";
import { ContentFormStatus } from "@/components/dashboard/ContentFormStatus";
import type { ContentActionState } from "@/components/dashboard/types";

const initialState: ContentActionState = {};
const inputClass = "mt-1 h-10 w-full rounded-md border border-border bg-white px-3 text-sm";
const textAreaClass = "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm";

export function JobEditor() {
  const [state, formAction, isPending] = useActionState(createJobAction, initialState);

  return (
    <form action={formAction} className="admin-card space-y-5 p-5 md:p-7">
      <ContentFormStatus state={state} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Job title *
          <input name="title" required maxLength={150} className={inputClass} />
        </label>
        <label className="text-sm font-medium">URL slug (optional)
          <input name="slug" maxLength={150} placeholder="Generated from title if blank" className={inputClass} />
        </label>
        <label className="text-sm font-medium">Employer *
          <input name="employer" required maxLength={150} className={inputClass} />
        </label>
        <label className="text-sm font-medium">Sector *
          <input name="sector" required maxLength={100} className={inputClass} />
        </label>
        <label className="text-sm font-medium">Location *
          <input name="location" required maxLength={150} className={inputClass} />
        </label>
        <label className="text-sm font-medium">Employment type *
          <select name="employment_type" defaultValue="Full-time" className={inputClass}>
            {["Full-time", "Part-time", "Contract", "Internship"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">Status
          <select name="status" defaultValue="draft" className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="text-sm font-medium">Posted date
          <input name="posted_date" type="date" className={inputClass} />
        </label>
        <label className="text-sm font-medium">Closing date
          <input name="closing_date" type="date" className={inputClass} />
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm font-medium">Min salary
            <input name="salary_min" type="number" min="0" step="1" className={inputClass} />
          </label>
          <label className="text-sm font-medium">Max salary
            <input name="salary_max" type="number" min="0" step="1" className={inputClass} />
          </label>
          <label className="text-sm font-medium">Currency
            <input name="salary_currency" defaultValue="KES" maxLength={8} className={inputClass} />
          </label>
        </div>
      </div>
      <label className="block text-sm font-medium">Summary *
        <textarea name="summary" required rows={3} maxLength={1500} className={textAreaClass} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Responsibilities (one per line)
          <textarea name="responsibilities" rows={5} className={textAreaClass} />
        </label>
        <label className="text-sm font-medium">Requirements (one per line)
          <textarea name="requirements" rows={5} className={textAreaClass} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Benefits (one per line)
          <textarea name="benefits" rows={4} className={textAreaClass} />
        </label>
        <label className="text-sm font-medium">Candidate notes
          <textarea name="candidate_notes" rows={4} className={textAreaClass} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input name="is_featured" type="checkbox" className="size-4" />
        Feature this job
      </label>
      <button disabled={isPending} className="rounded-md bg-deep-teal px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
        {isPending ? "Saving..." : "Save job"}
      </button>
    </form>
  );
}
