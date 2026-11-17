/* =========================================================================
   Supabase Database Type Definitions
   Auto-aligned with supabase/migrations/001_initial_schema.sql
   ========================================================================= */

export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";
export type JobStatus = "draft" | "published" | "closed" | "filled";
export type CandidateStatus = "registered" | "screening" | "prepared" | "available" | "placed" | "inactive";
export type SkillLevel = "Semi-skilled" | "Skilled" | "Technical" | "Professional";
export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "interview_scheduled"
  | "interviewed"
  | "offered"
  | "accepted"
  | "rejected"
  | "withdrawn";
export type InquiryStatus = "new" | "contacted" | "in_progress" | "converted" | "closed";
export type InquiryType = "employer" | "candidate" | "partner" | "general";
export type InsightStatus = "draft" | "published" | "archived";

/* ── Row types (what Supabase returns) ──────────────────────────────── */

export interface DbSector {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface DbService {
  id: string;
  title: string;
  slug: string;
  outcome: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbJob {
  id: string;
  slug: string;
  title: string;
  employer: string;
  sector_id: string | null;
  sector_name: string;
  location: string;
  employment_type: EmploymentType;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string;
  posted_date: string;
  closing_date: string | null;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  candidate_notes: string | null;
  status: JobStatus;
  is_featured: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DbCandidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string | null;
  nationality: string;
  location: string | null;
  skill_level: SkillLevel | null;
  years_experience: number | null;
  current_title: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  professional_summary: string | null;
  cv_url: string | null;
  cv_filename: string | null;
  cv_uploaded_at: string | null;
  preferred_sectors: string[];
  preferred_locations: string[];
  preferred_employment_types: string[];
  open_to_relocation: boolean;
  open_to_international: boolean;
  salary_expectation_min: number | null;
  salary_expectation_max: number | null;
  salary_currency: string;
  available_from: string | null;
  status: CandidateStatus;
  consent_privacy: boolean;
  consent_job_alerts: boolean;
  consent_data_retention: boolean;
  internal_notes: string | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface DbCandidateSkill {
  id: string;
  candidate_id: string;
  skill_name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "expert" | null;
  created_at: string;
}

export interface DbCandidateEducation {
  id: string;
  candidate_id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_year: number | null;
  end_year: number | null;
  is_current: boolean;
  created_at: string;
}

export interface DbCandidateExperience {
  id: string;
  candidate_id: string;
  company: string;
  title: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  created_at: string;
}

export interface DbJobApplication {
  id: string;
  job_id: string;
  candidate_id: string;
  cover_letter: string | null;
  cv_url: string | null;
  status: ApplicationStatus;
  internal_notes: string | null;
  rating: number | null;
  applied_at: string;
  reviewed_at: string | null;
  updated_at: string;
}

export interface DbInquiry {
  id: string;
  type: InquiryType;
  status: InquiryStatus;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  hiring_need: string | null;
  role_count: number | null;
  location: string | null;
  partnership_type: string | null;
  subject: string | null;
  message: string | null;
  interest: string | null;
  consent_privacy: boolean;
  internal_notes: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbInsight {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published_date: string | null;
  reading_time: number;
  author: string;
  cover_image_url: string | null;
  status: InsightStatus;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface DbJobAlertSubscription {
  id: string;
  candidate_id: string | null;
  email: string;
  name: string | null;
  preferred_sectors: string[];
  preferred_locations: string[];
  preferred_types: string[];
  is_active: boolean;
  verified_at: string | null;
  unsubscribed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  replied_at: string | null;
  created_at: string;
}

export interface DbActivityLog {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  details: Record<string, unknown> | null;
  performed_by: string | null;
  created_at: string;
}

/* ── Insert types (what you send to Supabase) ──────────────────────── */

export type CandidateInsert = Omit<DbCandidate, "id" | "created_at" | "updated_at" | "status" | "internal_notes" | "rating"> & {
  status?: CandidateStatus;
};

export type JobApplicationInsert = Pick<DbJobApplication, "job_id" | "candidate_id"> & {
  cover_letter?: string;
  cv_url?: string;
};

export type InquiryInsert = Pick<DbInquiry, "type" | "name" | "email" | "consent_privacy"> & Partial<
  Pick<DbInquiry, "phone" | "organization" | "hiring_need" | "role_count" | "location" | "partnership_type" | "subject" | "message" | "interest">
>;

export type ContactMessageInsert = Pick<DbContactMessage, "name" | "email" | "message"> & {
  phone?: string;
  subject?: string;
};

export type JobAlertInsert = Pick<DbJobAlertSubscription, "email"> & {
  name?: string;
  candidate_id?: string;
  preferred_sectors?: string[];
  preferred_locations?: string[];
  preferred_types?: string[];
};
