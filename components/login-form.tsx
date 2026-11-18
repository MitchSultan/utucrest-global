"use client";

import { useActionState } from "react";
import { login } from "@/app/login/actions";
import type { LoginState } from "@/app/login/types";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction} className={className} {...props}>
      <div className="flex flex-col gap-5">
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="mt-1 text-sm text-charcoal/70">
            Sign in to manage UtuCrest website content and submissions.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-medium" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            className="h-11 rounded-md border border-border px-3 font-normal"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium" htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-11 rounded-md border border-border px-3 font-normal"
          />
        </label>
        {state.error && (
          <p className="text-sm text-red-700" role="alert">
            {state.error}
          </p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="h-11 rounded-md bg-deep-teal px-4 font-semibold text-white transition hover:bg-deep-teal-hover disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
