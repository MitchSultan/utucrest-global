"use client";

import { useState, type FormEvent } from "react";
import type { InquiryVariant } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/ui/FormStatus";
import { cn } from "@/lib/utils";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "number";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const fieldsByVariant: Record<InquiryVariant, FormField[]> = {
  employer: [
    { name: "name", label: "Your name", type: "text", required: true },
    {
      name: "organization",
      label: "Organization",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Work email",
      type: "email",
      required: true,
      placeholder: "you@company.com",
    },
    { name: "phone", label: "Phone", type: "tel", required: true },
    {
      name: "hiringNeed",
      label: "Hiring need",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select a need" },
        { value: "recruitment", label: "Recruitment" },
        { value: "outsourcing", label: "Outsourcing" },
        { value: "advisory", label: "Talent advisory" },
        { value: "multiple", label: "Multiple services" },
      ],
    },
    {
      name: "roleCount",
      label: "Approximate number of roles",
      type: "number",
      required: true,
      placeholder: "e.g. 3",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      required: true,
      placeholder: "City, country",
    },
    {
      name: "message",
      label: "Tell us about your needs",
      type: "textarea",
      required: false,
    },
  ],
  candidate: [
    { name: "name", label: "Full name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    {
      name: "interest",
      label: "I am interested in",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select an option" },
        { value: "jobs", label: "Finding a job" },
        { value: "network", label: "Joining the talent network" },
        { value: "training", label: "Training & preparation" },
      ],
    },
    {
      name: "message",
      label: "Tell us about your goals",
      type: "textarea",
      required: false,
    },
  ],
  partner: [
    { name: "name", label: "Your name", type: "text", required: true },
    {
      name: "organization",
      label: "Organization",
      type: "text",
      required: true,
    },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel" },
    {
      name: "partnershipType",
      label: "Partnership interest",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select type" },
        { value: "institutional", label: "Institutional partnership" },
        { value: "global", label: "Global talent pathway" },
        { value: "training", label: "Training collaboration" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "message",
      label: "Describe your partnership interest",
      type: "textarea",
      required: true,
    },
  ],
  general: [
    { name: "name", label: "Your name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel" },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
    },
  ],
};

const submitLabels: Record<InquiryVariant, string> = {
  employer: "Submit hiring inquiry",
  candidate: "Join or register interest",
  partner: "Start partnership conversation",
  general: "Send message",
};

const successMessages: Record<InquiryVariant, { title: string; message: string }> = {
  employer: {
    title: "Inquiry received",
    message:
      "Our workforce team will review your brief and respond within two business days. In production, this connects to your CRM.",
  },
  candidate: {
    title: "Registration interest received",
    message:
      "We will be in touch with next steps. Applying does not guarantee placement—we match thoughtfully.",
  },
  partner: {
    title: "Partnership inquiry received",
    message:
      "Thank you for your interest. Our team will follow up to explore alignment.",
  },
  general: {
    title: "Message sent",
    message:
      "We have received your message and will respond shortly.",
  },
};

export interface InquiryFormProps {
  variant: InquiryVariant;
  className?: string;
}

export function InquiryForm({ variant, className }: InquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fields = fieldsByVariant[variant];

  const validate = (formData: FormData): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = formData.get(field.name)?.toString().trim() ?? "";
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field.name] = "Please enter a valid email address";
      }
    }

    const consent = formData.get("consent");
    if (!consent) {
      newErrors.consent = "Please confirm you agree to our privacy policy";
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Prototype: simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);
    setSubmitted(true);
    form.reset();
  };

  if (submitted) {
    const success = successMessages[variant];
    return (
      <FormStatus
        variant="success"
        title={success.title}
        message={success.message}
        className={className}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("space-y-5 rounded-xl border border-border bg-white p-6 md:p-8", className)}
      aria-label={`${variant} inquiry form`}
    >
      {Object.keys(errors).length > 0 && (
        <FormStatus
          variant="error"
          title="Please correct the following"
          message={Object.values(errors).join(". ")}
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={`${variant}-${field.name}`}
              className="block text-sm font-medium text-ink"
            >
              {field.label}
              {field.required && (
                <span className="text-terracotta" aria-hidden="true">
                  {" "}
                  *
                </span>
              )}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`${variant}-${field.name}`}
                name={field.name}
                rows={4}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                aria-describedby={
                  errors[field.name] ? `${variant}-${field.name}-error` : undefined
                }
                className="mt-1.5 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
              />
            ) : field.type === "select" ? (
              <select
                id={`${variant}-${field.name}`}
                name={field.name}
                defaultValue=""
                aria-invalid={!!errors[field.name]}
                className="mt-1.5 h-11 w-full rounded-md border border-border px-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${variant}-${field.name}`}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                className="mt-1.5 h-11 w-full rounded-md border border-border px-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
              />
            )}

            {errors[field.name] && (
              <p
                id={`${variant}-${field.name}-error`}
                className="mt-1 text-xs text-red-600"
                role="alert"
              >
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2">
        <input
          id={`${variant}-consent`}
          name="consent"
          type="checkbox"
          className="mt-1 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
        />
        <label htmlFor={`${variant}-consent`} className="text-sm text-charcoal/80">
          I agree to Utu Crest processing my information in line with the{" "}
          <a href="/privacy" className="text-deep-teal hover:underline">
            privacy policy
          </a>
          .
        </label>
      </div>
      {errors.consent && (
        <p className="text-xs text-red-600" role="alert">
          {errors.consent}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Submitting…" : submitLabels[variant]}
      </Button>

      <p className="text-xs text-charcoal/60">
        Prototype form — connect to CRM/API at{" "}
        <code className="rounded bg-mist px-1">/api/inquiries</code>
      </p>
    </form>
  );
}
