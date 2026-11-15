"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/ui/FormStatus";
import type { Job } from "@/lib/types";
import { siteConfig } from "@/content/site";

export function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    ["name", "email", "phone"].forEach((field) => {
      if (!formData.get(field)?.toString().trim()) {
        newErrors[field] = "Required";
      }
    });

    if (!formData.get("consent")) {
      newErrors.consent = "Required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const body = [
      `Position: ${job.title}`,
      `Name: ${formData.get("name")?.toString().trim() ?? ""}`,
      `Email: ${formData.get("email")?.toString().trim() ?? ""}`,
      `Phone: ${formData.get("phone")?.toString().trim() ?? ""}`,
      `Why interested: ${formData.get("message")?.toString().trim() ?? ""}`,
    ].join("\n");
    const subject = `Application interest: ${job.title}`;
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/50"
        aria-label="Close application form"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <h2 id="apply-modal-title" className="text-xl font-semibold text-ink">
          Apply for {job.title}
        </h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Prepare an expression of interest. Review the draft in your email app and
          send it to complete your application.
        </p>

        {submitted ? (
          <div className="mt-6">
            <FormStatus
              variant="info"
              title="Ready to continue"
              message={`Review and send the prepared email. If no draft opened, contact ${siteConfig.contact.email}.`}
            />
            <Button className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label htmlFor={`apply-${field}`} className="block text-sm font-medium capitalize">
                  {field === "name" ? "Full name" : field}
                </label>
                <input
                  id={`apply-${field}`}
                  name={field}
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  className="mt-1 h-11 w-full rounded-md border border-border px-3 text-sm"
                  aria-invalid={!!errors[field]}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-600">{errors[field]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="apply-message" className="block text-sm font-medium">
                Why are you interested?
              </label>
              <textarea
                id="apply-message"
                name="message"
                rows={3}
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-start gap-2">
              <input id="apply-consent" name="consent" type="checkbox" className="mt-1 size-4" />
              <label htmlFor="apply-consent" className="text-sm text-charcoal/80">
                I understand this is an expression of interest and agree to the{" "}
                <a href="/privacy" className="text-deep-teal hover:underline">
                  privacy policy
                </a>
                .
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-600">{errors.consent}</p>
            )}

            <div className="flex gap-3">
              <Button type="submit">
                Continue by email
              </Button>
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
