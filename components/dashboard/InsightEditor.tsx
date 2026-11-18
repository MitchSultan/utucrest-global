"use client";

import { useActionState } from "react";
import { createInsightAction } from "@/app/dashboard/actions";
import { ContentFormStatus } from "@/components/dashboard/ContentFormStatus";
import type { ContentActionState } from "@/components/dashboard/types";

const initialState: ContentActionState = {};
const inputClass = "mt-1 h-10 w-full rounded-md border border-border bg-white px-3 text-sm";
const textAreaClass = "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm";

export function InsightEditor() {
  const [state, formAction, isPending] = useActionState(createInsightAction, initialState);

  return (
    <form action={formAction} className="admin-card space-y-5 p-5 md:p-7">
      <ContentFormStatus state={state} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Article title *
          <input name="title" required maxLength={180} className={inputClass} />
        </label>
        <label className="text-sm font-medium">URL slug (optional)
          <input name="slug" maxLength={180} placeholder="Generated from title if blank" className={inputClass} />
        </label>
        <label className="text-sm font-medium">Category *
          <input name="category" required maxLength={100} className={inputClass} />
        </label>
        <label className="text-sm font-medium">Author
          <input name="author" defaultValue="Utu Crest Editorial" maxLength={120} className={inputClass} />
        </label>
        <label className="text-sm font-medium">Status
          <select name="status" defaultValue="draft" className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="text-sm font-medium">Published date
          <input name="published_date" type="date" className={inputClass} />
        </label>
        <label className="text-sm font-medium">Reading time (minutes)
          <input name="reading_time" type="number" min="1" max="120" defaultValue="5" className={inputClass} />
        </label>
        <label className="text-sm font-medium">Cover image URL
          <input name="cover_image_url" type="url" maxLength={1000} className={inputClass} />
        </label>
      </div>
      <label className="block text-sm font-medium">Excerpt *
        <textarea name="excerpt" required rows={3} maxLength={800} className={textAreaClass} />
      </label>
      <label className="block text-sm font-medium">Article content *
        <textarea name="content" required rows={16} className={textAreaClass} placeholder="Separate paragraphs with a blank line. Use **text** for bold text." />
      </label>
      <button disabled={isPending} className="rounded-md bg-deep-teal px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
        {isPending ? "Saving..." : "Save article"}
      </button>
    </form>
  );
}
