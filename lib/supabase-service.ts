import { createClient } from "@/utils/supabase/client";

/**
 * Uploads a candidate's CV file to Supabase Storage.
 * Stores under 'cvs' bucket or falls back gracefully.
 */
export async function uploadCVFile(file: File, email: string): Promise<{ url: string | null; filename: string; error?: string }> {
  try {
    const supabase = createClient();
    const cleanEmail = email.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const timestamp = Date.now();
    const filePath = `candidates/${cleanEmail}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Try uploading to 'cvs' bucket first, fallback to 'resumes'
    let uploadResult = await supabase.storage.from("cvs").upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (uploadResult.error && uploadResult.error.message.includes("Bucket not found")) {
      // Attempt with 'resumes' bucket
      uploadResult = await supabase.storage.from("resumes").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
    }

    if (uploadResult.error) {
      console.warn("Supabase Storage upload note:", uploadResult.error.message);
      return { url: null, filename: file.name, error: uploadResult.error.message };
    }

    // Try to get public URL or signed path
    const { data: publicUrlData } = supabase.storage.from("cvs").getPublicUrl(filePath);
    return {
      url: publicUrlData?.publicUrl || filePath,
      filename: file.name,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed";
    console.error("Error uploading CV:", err);
    return { url: null, filename: file.name, error: message };
  }
}

/**
 * Registers a candidate into the UtuCrest talent pool.
 * Also subscribes them to job alerts if opted in.
 */
export async function registerCandidateInPool(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  currentTitle?: string;
  yearsExperience?: number;
  skillLevel?: "Semi-skilled" | "Skilled" | "Technical" | "Professional";
  preferredSectors?: string[];
  openToInternational?: boolean;
  cvUrl?: string | null;
  cvFilename?: string | null;
  subscribeJobAlerts?: boolean;
  notes?: string;
}): Promise<{ success: boolean; candidateId?: string; error?: string }> {
  try {
    const supabase = createClient();

    const candidateData: Record<string, unknown> = {
      first_name: payload.firstName.trim(),
      last_name: payload.lastName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      location: payload.location?.trim() || null,
      current_title: payload.currentTitle?.trim() || null,
      years_experience: payload.yearsExperience ? Number(payload.yearsExperience) : null,
      skill_level: payload.skillLevel || null,
      preferred_sectors: payload.preferredSectors || [],
      open_to_international: !!payload.openToInternational,
      cv_url: payload.cvUrl || null,
      cv_filename: payload.cvFilename || null,
      cv_uploaded_at: payload.cvUrl ? new Date().toISOString() : null,
      consent_privacy: true,
      consent_job_alerts: !!payload.subscribeJobAlerts,
      professional_summary: payload.notes?.trim() || null,
      status: "registered",
    };

    // Upsert candidate by email
    const { data: candidate, error: candidateError } = await supabase
      .from("candidates")
      .upsert(candidateData, { onConflict: "email" })
      .select("id")
      .single();

    if (candidateError) {
      console.warn("Database candidate registration note:", candidateError.message);
      return { success: false, error: candidateError.message };
    }

    const candidateId = (candidate as { id?: string } | null)?.id;

    // If opted into job alerts, save subscription
    if (payload.subscribeJobAlerts && payload.email) {
      await supabase.from("job_alert_subscriptions").upsert(
        {
          candidate_id: candidateId || null,
          email: payload.email.trim().toLowerCase(),
          name: `${payload.firstName} ${payload.lastName}`.trim(),
          preferred_sectors: payload.preferredSectors || [],
          is_active: true,
        },
        { onConflict: "email" }
      );
    }

    return { success: true, candidateId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit profile";
    console.error("Candidate registration error:", err);
    return { success: false, error: message };
  }
}

/**
 * Submits a direct job application linked to a job.
 */
export async function submitJobApplication(payload: {
  jobId?: string;
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  cvUrl?: string | null;
  cvFilename?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const parts = payload.name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "Candidate";

    // 1. Ensure candidate is in the talent pool
    const { data: candidate } = await supabase
      .from("candidates")
      .upsert(
        {
          first_name: firstName,
          last_name: lastName,
          email: payload.email.trim().toLowerCase(),
          phone: payload.phone.trim(),
          cv_url: payload.cvUrl || null,
          cv_filename: payload.cvFilename || null,
          consent_privacy: true,
          consent_job_alerts: true,
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    const candidateId = (candidate as { id?: string } | null)?.id;

    // 2. Fetch job ID by slug if not provided
    let jobId = payload.jobId;
    if (!jobId) {
      const { data: jobRecord } = await supabase
        .from("jobs")
        .select("id")
        .eq("slug", payload.jobSlug)
        .single();
      jobId = (jobRecord as { id?: string } | null)?.id;
    }

    // 3. Insert application if job found, otherwise record inquiry
    if (jobId && candidateId) {
      const { error: appError } = await supabase.from("job_applications").insert({
        job_id: jobId,
        candidate_id: candidateId,
        cover_letter: payload.message || null,
        cv_url: payload.cvUrl || null,
        status: "submitted",
      });

      if (appError) {
        console.warn("Application insert note:", appError.message);
      }
    }

    // 4. Also store in inquiries as an audit record
    await supabase.from("inquiries").insert({
      type: "candidate",
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      subject: `Application for ${payload.jobTitle}`,
      message: payload.message || `Interest expressed for ${payload.jobTitle}. CV: ${payload.cvFilename || "None"}`,
      interest: "jobs",
      consent_privacy: true,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit application";
    console.error("Job application error:", err);
    return { success: false, error: message };
  }
}

/**
 * Submits an inquiry to the Supabase inquiries table.
 */
export async function submitInquiryToDb(inquiry: {
  type: "employer" | "candidate" | "partner" | "general";
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  hiringNeed?: string;
  roleCount?: number;
  location?: string;
  partnershipType?: string;
  subject?: string;
  message?: string;
  interest?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("inquiries").insert({
      type: inquiry.type,
      name: inquiry.name.trim(),
      email: inquiry.email.trim().toLowerCase(),
      phone: inquiry.phone?.trim() || null,
      organization: inquiry.organization?.trim() || null,
      hiring_need: inquiry.hiringNeed || null,
      role_count: inquiry.roleCount ? Number(inquiry.roleCount) : null,
      location: inquiry.location?.trim() || null,
      partnership_type: inquiry.partnershipType || null,
      subject: inquiry.subject?.trim() || `${inquiry.type.toUpperCase()} inquiry`,
      message: inquiry.message?.trim() || null,
      interest: inquiry.interest || null,
      consent_privacy: true,
      status: "new",
    });

    if (error) {
      console.warn("Inquiry insert note:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Submission failed";
    console.error("Inquiry error:", err);
    return { success: false, error: message };
  }
}
