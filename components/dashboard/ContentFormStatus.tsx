import type { ContentActionState } from "@/components/dashboard/types";

export function ContentFormStatus({ state }: { state: ContentActionState }) {
  if (state.error) {
    return (
      <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
        {state.error}
      </p>
    );
  }

  if (state.success) {
    return (
      <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
        {state.success}
      </p>
    );
  }

  return null;
}
