"use client";

import { useState, useRef, type FormEvent } from "react";
import { UploadCloud, CheckCircle, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Job } from "@/lib/types";
import { uploadCVFile, submitJobApplication } from "@/lib/supabase-service";
import { siteConfig } from "@/content/site";

export function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setFileError("CV file size must be less than 10MB");
      setSelectedFile(null);
      return;
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    ["name", "email", "phone"].forEach((field) => {
      const val = formData.get(field)?.toString().trim();
      if (!val) {
        newErrors[field] = "Required";
      }
    });

    if (!formData.get("consent")) {
      newErrors.consent = "You must agree to the privacy and ethical guidelines";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    try {
      let cvUrl: string | null = null;
      let cvFilename: string | null = null;

      if (selectedFile) {
        const uploadRes = await uploadCVFile(selectedFile, email);
        cvUrl = uploadRes.url;
        cvFilename = uploadRes.filename;
      }

      // Save to Supabase backend
      const result = await submitJobApplication({
        jobSlug: job.slug,
        jobTitle: job.title,
        name,
        email,
        phone,
        message,
        cvUrl,
        cvFilename,
      });

      if (!result.success) {
        throw new Error(result.error || "Application could not be saved.");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Application error:", err);
      setErrors({
        form: `Your application could not be saved. Please try again or email ${siteConfig.contact.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
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
        className="absolute inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
        aria-label="Close application modal"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between border-b border-border/80 pb-4">
          <div>
            <p className="eyebrow text-deep-teal">Application</p>
            <h2 id="apply-modal-title" className="font-display mt-1 text-xl font-semibold text-ink sm:text-2xl">
              {job.title}
            </h2>
            <p className="text-xs text-charcoal/70 mt-0.5">
              {job.location} · {job.employmentType} · Zero recruitment fees
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-charcoal/60 hover:bg-mist hover:text-ink transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 text-center py-4">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal">
              <CheckCircle className="size-8" />
            </div>
            <h3 className="font-display mt-4 text-xl font-semibold text-ink">
              Application Received
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-charcoal/80">
              Your application for <strong>{job.title}</strong> and CV have been safely recorded in the UtuCrest recruitment system.
            </p>
            <p className="mt-2 text-xs text-charcoal/60">
              Our placement specialists will review your credentials and contact you directly via phone or email for the next interview step.
            </p>
            <div className="mt-6">
              <Button onClick={onClose} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {errors.form && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
                {errors.form}
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="apply-name" className="block text-xs font-semibold text-ink uppercase tracking-wider">
                  Full name <span className="text-terracotta">*</span>
                </label>
                <input
                  id="apply-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. David Otieno"
                  className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="apply-phone" className="block text-xs font-semibold text-ink uppercase tracking-wider">
                  Phone / WhatsApp <span className="text-terracotta">*</span>
                </label>
                <input
                  id="apply-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="apply-email" className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Email address <span className="text-terracotta">*</span>
              </label>
              <input
                id="apply-email"
                name="email"
                type="email"
                required
                placeholder="david@example.com"
                className="mt-1 h-10 w-full rounded-md border border-border px-3 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* CV Upload */}
            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Attach your CV / Resume <span className="font-normal text-charcoal/60">(Optional but recommended)</span>
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`mt-1 flex cursor-pointer items-center justify-between rounded-lg border border-dashed p-3 transition ${
                  selectedFile
                    ? "border-deep-teal bg-deep-teal/5"
                    : "border-border hover:border-deep-teal/60 hover:bg-mist/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex items-center gap-2.5">
                  {selectedFile ? (
                    <FileText className="size-5 text-deep-teal shrink-0" />
                  ) : (
                    <UploadCloud className="size-5 text-charcoal/60 shrink-0" />
                  )}
                  <span className="text-xs text-charcoal truncate max-w-[280px]">
                    {selectedFile ? selectedFile.name : "Click to select PDF or DOCX file"}
                  </span>
                </div>
                <span className="text-xs font-medium text-deep-teal shrink-0">
                  {selectedFile ? "Change" : "Browse"}
                </span>
              </div>
              {fileError && <p className="mt-1 text-xs text-red-600">{fileError}</p>}
            </div>

            <div>
              <label htmlFor="apply-message" className="block text-xs font-semibold text-ink uppercase tracking-wider">
                Why are you a good fit? (Brief note)
              </label>
              <textarea
                id="apply-message"
                name="message"
                rows={2}
                placeholder="Highlight relevant experience, qualifications, or licenses..."
                className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
              />
            </div>

            <div className="rounded-lg bg-warm-ivory p-3 text-xs text-charcoal/80 space-y-1.5">
              <div className="flex items-start gap-2">
                <input
                  id="apply-consent"
                  name="consent"
                  type="checkbox"
                  defaultChecked
                  required
                  className="mt-0.5 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
                />
                <label htmlFor="apply-consent">
                  I consent to UtuCrest holding my profile & CV in its talent pool for this and future job opportunities. I agree to the{" "}
                  <a href="/privacy" className="text-deep-teal underline">
                    privacy policy
                  </a>
                  .
                </label>
              </div>
              {errors.consent && <p className="text-red-600">{errors.consent}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                {isSubmitting ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="size-3.5 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
