"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import type { InquiryVariant } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/ui/FormStatus";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";
import { submitInquiryToDb } from "@/lib/supabase-service";

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
    { name: "organization", label: "Company / Organization", type: "text", required: true },
    { name: "email", label: "Work email", type: "email", required: true, placeholder: "you@company.com" },
    { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, placeholder: "+254 7XX XXX XXX" },
    {
      name: "hiringNeed",
      label: "Workforce solution needed",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select a solution" },
        { value: "outsourcing", label: "Workforce Outsourcing (End-to-End)" },
        { value: "recruitment-local", label: "Local Workforce Recruitment" },
        { value: "recruitment-global", label: "International Recruitment (Europe, Middle East, Asia)" },
        { value: "hr-consulting", label: "HR Consulting & Labor Audits" },
        { value: "training", label: "Worker Readiness & Training Academy" },
      ],
    },
    {
      name: "roleCount",
      label: "Approximate headcount needed",
      type: "number",
      required: true,
      placeholder: "e.g. 10",
    },
    {
      name: "location",
      label: "Deployment location / country",
      type: "text",
      required: true,
      placeholder: "e.g. Nairobi, Kenya or Berlin, Germany",
    },
    {
      name: "message",
      label: "Role descriptions or operational requirements",
      type: "textarea",
      required: false,
      placeholder: "Tell us about roles, shift models, skill levels (semi-skilled, skilled, technical, professional)...",
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
        { value: "network", label: "Joining the talent pool" },
        { value: "training", label: "Training & preparation" },
        { value: "international", label: "International placement" },
      ],
    },
    {
      name: "message",
      label: "Tell us about your background & goals",
      type: "textarea",
      required: false,
    },
  ],
  partner: [
    { name: "name", label: "Your name", type: "text", required: true },
    { name: "organization", label: "Organization / Institution", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel" },
    {
      name: "partnershipType",
      label: "Partnership category",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Select type" },
        { value: "international-employer", label: "Overseas Employer / Destination Partner" },
        { value: "training-institution", label: "TVET / Training Institution Partner" },
        { value: "government-institutional", label: "Government / NGO / Bilateral Program" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "message",
      label: "Describe your collaboration interest",
      type: "textarea",
      required: true,
    },
  ],
  general: [
    { name: "name", label: "Your name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "subject", label: "Subject", type: "text", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
};

const submitLabels: Record<InquiryVariant, string> = {
  employer: "Submit Workforce Inquiry",
  candidate: "Register Interest",
  partner: "Start Partnership Discussion",
  general: "Send Message",
};

export interface InquiryFormProps {
  variant: InquiryVariant;
  className?: string;
}

export function InquiryForm({ variant, className }: InquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      const result = await submitInquiryToDb({
        type: variant,
        name: formData.get("name")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        phone: formData.get("phone")?.toString().trim() || undefined,
        organization: formData.get("organization")?.toString().trim() || undefined,
        hiringNeed: formData.get("hiringNeed")?.toString().trim() || undefined,
        roleCount: formData.get("roleCount") ? parseInt(formData.get("roleCount")!.toString(), 10) : undefined,
        location: formData.get("location")?.toString().trim() || undefined,
        partnershipType: formData.get("partnershipType")?.toString().trim() || undefined,
        subject: formData.get("subject")?.toString().trim() || undefined,
        message: formData.get("message")?.toString().trim() || undefined,
        interest: formData.get("interest")?.toString().trim() || undefined,
      });

      if (!result.success) {
        throw new Error(result.error || "Inquiry could not be saved.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Inquiry submit error:", err);
      setErrors({
        submit: `We could not save your inquiry. Please try again or email ${siteConfig.contact.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn("rounded-xl border border-border bg-white p-8 text-center shadow-sm", className)}>
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal">
          <CheckCircle className="size-6" />
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold text-ink">
          Inquiry Successfully Received
        </h3>
        <p className="mt-2 text-sm text-charcoal/80">
          Thank you for reaching out to {siteConfig.name}. A representative from our team will review your inquiry and follow up within 24 hours.
        </p>
        <p className="mt-3 text-xs text-charcoal/60">
          For urgent matters, call or WhatsApp our helpline at{" "}
          <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="font-medium text-deep-teal underline">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another inquiry
        </Button>
      </div>
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
          defaultChecked
          className="mt-1 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
        />
        <label htmlFor={`${variant}-consent`} className="text-xs text-charcoal/80">
          I agree to UtuCrest Global processing my information in accordance with Kenya&apos;s Data Protection Act and our{" "}
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

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px]">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </span>
          ) : (
            submitLabels[variant]
          )}
        </Button>
      </div>
    </form>
  );
}
