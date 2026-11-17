"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { UploadCloud, CheckCircle, FileText, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormStatus } from "@/components/ui/FormStatus";
import { uploadCVFile, registerCandidateInPool } from "@/lib/supabase-service";
import { industriesServed } from "@/content/impact";
import { siteConfig } from "@/content/site";

export function CandidateRegistrationForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [skillLevel, setSkillLevel] = useState<"Semi-skilled" | "Skilled" | "Technical" | "Professional">("Skilled");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setFileError("CV file size must be less than 10MB");
      setSelectedFile(null);
      return;
    }

    // Validate extension
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

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const location = formData.get("location")?.toString().trim();
    const currentTitle = formData.get("currentTitle")?.toString().trim();
    const yearsExperience = formData.get("yearsExperience")?.toString().trim();
    const openToInternational = formData.get("openToInternational") === "on";
    const subscribeJobAlerts = formData.get("subscribeJobAlerts") === "on";
    const notes = formData.get("notes")?.toString().trim();

    if (!firstName || !lastName || !email || !phone) {
      setSubmitError("Please fill in your name, email, and phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      let cvUrl: string | null = null;
      let cvFilename: string | null = null;

      // 1. Upload CV file to Supabase Storage if provided
      if (selectedFile) {
        const uploadRes = await uploadCVFile(selectedFile, email);
        cvUrl = uploadRes.url;
        cvFilename = uploadRes.filename;
      }

      // 2. Register candidate record in Supabase Database
      const regRes = await registerCandidateInPool({
        firstName,
        lastName,
        email,
        phone,
        location,
        currentTitle,
        yearsExperience: yearsExperience ? parseInt(yearsExperience, 10) : undefined,
        skillLevel,
        preferredSectors: selectedSectors,
        openToInternational,
        cvUrl,
        cvFilename,
        subscribeJobAlerts,
        notes,
      });

      if (!regRes.success && regRes.error) {
        console.warn("Notice during registration:", regRes.error);
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setSubmitError("We encountered an issue submitting your profile. Please try again or email info@utucrestglobal.co.ke.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-md md:p-12">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal">
          <CheckCircle className="size-8" />
        </div>
        <h3 className="font-display mt-6 text-2xl font-semibold text-ink md:text-3xl">
          Welcome to the UtuCrest Talent Pool
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-charcoal/80">
          Your profile and CV have been securely recorded. Our recruitment team reviews candidate profiles for both local and international opportunities.
        </p>
        <div className="mx-auto mt-6 max-w-md rounded-xl bg-warm-ivory p-4 text-left text-sm text-charcoal/80">
          <p className="font-semibold text-ink">What happens next?</p>
          <ul className="mt-2 space-y-1.5 list-disc list-inside text-xs">
            <li>Your CV is indexed by sector and experience band.</li>
            <li>When a verified vacancy matches your skills, you will receive direct notification.</li>
            <li>Remember: <strong>UtuCrest never charges candidates any placement fee.</strong></li>
          </ul>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setSubmitSuccess(false);
              setSelectedFile(null);
            }}
          >
            Submit another profile
          </Button>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-md bg-deep-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-deep-teal-hover"
          >
            Browse current jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-6 shadow-md md:p-10"
      aria-label="Talent Pool Registration Form"
    >
      <div className="border-b border-border/70 pb-6">
        <p className="eyebrow text-deep-teal">Join Our Talent Network</p>
        <h2 className="font-display mt-2 text-2xl font-semibold text-ink md:text-3xl">
          Submit your CV & career profile
        </h2>
        <p className="mt-2 text-sm text-charcoal/70">
          Connect with dignified opportunities across Kenya, Europe, the Middle East, and Asia. We keep your data safe and contact you when matching roles open.
        </p>
      </div>

      {submitError && (
        <div className="mt-6">
          <FormStatus variant="error" title="Submission issue" message={submitError} />
        </div>
      )}

      <div className="mt-8 space-y-6">
        {/* Name Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="talent-firstName" className="block text-sm font-medium text-ink">
              First name <span className="text-terracotta">*</span>
            </label>
            <input
              id="talent-firstName"
              name="firstName"
              type="text"
              required
              placeholder="e.g. Grace"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <div>
            <label htmlFor="talent-lastName" className="block text-sm font-medium text-ink">
              Last name <span className="text-terracotta">*</span>
            </label>
            <input
              id="talent-lastName"
              name="lastName"
              type="text"
              required
              placeholder="e.g. Wanjiku"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="talent-email" className="block text-sm font-medium text-ink">
              Email address <span className="text-terracotta">*</span>
            </label>
            <input
              id="talent-email"
              name="email"
              type="email"
              required
              placeholder="grace@example.com"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <div>
            <label htmlFor="talent-phone" className="block text-sm font-medium text-ink">
              Phone number / WhatsApp <span className="text-terracotta">*</span>
            </label>
            <input
              id="talent-phone"
              name="phone"
              type="tel"
              required
              placeholder="+254 7XX XXX XXX"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
        </div>

        {/* Location & Experience */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="talent-location" className="block text-sm font-medium text-ink">
              Current location
            </label>
            <input
              id="talent-location"
              name="location"
              type="text"
              placeholder="e.g. Nairobi, Kenya"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <div>
            <label htmlFor="talent-currentTitle" className="block text-sm font-medium text-ink">
              Current or target role
            </label>
            <input
              id="talent-currentTitle"
              name="currentTitle"
              type="text"
              placeholder="e.g. Staff Nurse, Electrician"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
          <div>
            <label htmlFor="talent-yearsExperience" className="block text-sm font-medium text-ink">
              Years of experience
            </label>
            <input
              id="talent-yearsExperience"
              name="yearsExperience"
              type="number"
              min="0"
              max="50"
              placeholder="e.g. 3"
              className="mt-1.5 h-11 w-full rounded-md border border-border px-3.5 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
            />
          </div>
        </div>

        {/* Skill Category Level */}
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Workforce category
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(
              [
                { level: "Semi-skilled", label: "Semi-skilled", hint: "Operations, support, retail" },
                { level: "Skilled", label: "Skilled", hint: "Coordinators, admin, sales" },
                { level: "Technical", label: "Technical", hint: "Trades, technicians, engineering" },
                { level: "Professional", label: "Professional", hint: "Healthcare, finance, software" },
              ] as const
            ).map((tier) => (
              <button
                type="button"
                key={tier.level}
                onClick={() => setSkillLevel(tier.level)}
                className={`flex flex-col text-left rounded-lg border p-3 transition ${
                  skillLevel === tier.level
                    ? "border-deep-teal bg-deep-teal/5 ring-1 ring-deep-teal"
                    : "border-border hover:border-deep-teal/40"
                }`}
              >
                <span className="text-sm font-semibold text-ink">{tier.label}</span>
                <span className="text-xs text-charcoal/60 mt-0.5">{tier.hint}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Sectors */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Sectors of interest (select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {industriesServed.map((sector) => {
              const active = selectedSectors.includes(sector);
              return (
                <button
                  type="button"
                  key={sector}
                  onClick={() => toggleSector(sector)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "bg-deep-teal text-white"
                      : "bg-mist text-charcoal hover:bg-mist/80"
                  }`}
                >
                  {active ? `✓ ${sector}` : `+ ${sector}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* CV File Upload Box */}
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Upload your CV / Resume <span className="text-xs text-charcoal/60">(PDF, DOC, DOCX up to 10MB)</span>
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition ${
              selectedFile
                ? "border-deep-teal bg-deep-teal/5"
                : fileError
                ? "border-red-400 bg-red-50/50"
                : "border-border hover:border-deep-teal/50 hover:bg-mist/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
            {selectedFile ? (
              <div className="flex items-center gap-3 text-deep-teal">
                <FileText className="size-8" />
                <div className="text-left">
                  <p className="text-sm font-semibold">{selectedFile.name}</p>
                  <p className="text-xs text-charcoal/70">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Click to choose different file
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <UploadCloud className="mx-auto size-9 text-charcoal/50" />
                <p className="mt-2 text-sm font-medium text-ink">
                  Click to select your CV or drag and drop here
                </p>
                <p className="mt-1 text-xs text-charcoal/60">
                  Securely stored in UtuCrest&apos;s talent database
                </p>
              </div>
            )}
          </div>
          {fileError && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="size-3.5" />
              {fileError}
            </p>
          )}
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="talent-notes" className="block text-sm font-medium text-ink">
            Brief professional summary or skills overview (optional)
          </label>
          <textarea
            id="talent-notes"
            name="notes"
            rows={3}
            placeholder="Highlight your key licenses, language proficiencies, or specific career goals..."
            className="mt-1.5 w-full rounded-md border border-border px-3.5 py-2 text-sm focus:border-deep-teal focus:outline-none focus:ring-1 focus:ring-deep-teal"
          />
        </div>

        {/* Checkbox Options */}
        <div className="space-y-3 rounded-xl bg-warm-ivory p-4 text-sm">
          <div className="flex items-start gap-2.5">
            <input
              id="talent-openToInternational"
              name="openToInternational"
              type="checkbox"
              defaultChecked
              className="mt-1 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
            />
            <label htmlFor="talent-openToInternational" className="text-charcoal/90">
              <strong>Open to international placement:</strong> I am interested in verified opportunities in Europe, the Middle East, or Asia.
            </label>
          </div>

          <div className="flex items-start gap-2.5">
            <input
              id="talent-subscribeJobAlerts"
              name="subscribeJobAlerts"
              type="checkbox"
              defaultChecked
              className="mt-1 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
            />
            <label htmlFor="talent-subscribeJobAlerts" className="text-charcoal/90">
              <strong>Keep my CV & send me job alerts:</strong> Store my CV in the talent pool and email or message me when relevant vacancies open.
            </label>
          </div>

          <div className="flex items-start gap-2.5">
            <input
              id="talent-consent"
              name="consent"
              type="checkbox"
              required
              defaultChecked
              className="mt-1 size-4 rounded border-border text-deep-teal focus:ring-deep-teal"
            />
            <label htmlFor="talent-consent" className="text-xs text-charcoal/80">
              I agree to UtuCrest Global processing my professional information under Kenya&apos;s Data Protection Act and in line with the{" "}
              <a href="/privacy" className="text-deep-teal underline">
                Privacy Policy
              </a>
              . I understand UtuCrest does not charge candidates any placement fees.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Uploading CV & Saving...
              </span>
            ) : (
              "Join Talent Pool"
            )}
          </Button>
          <p className="mt-2 text-xs text-charcoal/60">
            Assistance line: {siteConfig.contact.phone} · Mon–Fri 8:00 AM – 5:00 PM EAT
          </p>
        </div>
      </div>
    </form>
  );
}
