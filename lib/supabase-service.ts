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
    const { error } = await supabase.rpc(
      "register_candidate_submission",
      {
        p_first_name: payload.firstName,
        p_last_name: payload.lastName,
        p_email: payload.email,
        p_phone: payload.phone,
        p_location: payload.location || null,
        p_current_title: payload.currentTitle || null,
        p_years_experience: payload.yearsExperience ?? null,
        p_skill_level: payload.skillLevel || null,
        p_preferred_sectors: payload.preferredSectors || [],
        p_open_to_international: !!payload.openToInternational,
        p_cv_url: payload.cvUrl || null,
        p_cv_filename: payload.cvFilename || null,
        p_subscribe_job_alerts: !!payload.subscribeJobAlerts,
        p_professional_summary: payload.notes || null,
        p_consent_privacy: true,
      },
    );

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
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
    const { error } = await supabase.rpc("submit_job_application", {
      p_job_slug: payload.jobSlug,
      p_name: payload.name,
      p_email: payload.email,
      p_phone: payload.phone,
      p_message: payload.message || null,
      p_cv_url: payload.cvUrl || null,
      p_cv_filename: payload.cvFilename || null,
      p_consent_privacy: true,
    });

    if (error) return { success: false, error: error.message };
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
