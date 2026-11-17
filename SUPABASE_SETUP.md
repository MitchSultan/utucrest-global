# UtuCrest Global Workforce — Supabase Setup & Operations Guide

This guide details how your Supabase backend is configured and used to power UtuCrest Global Workforce as a professional-grade recruitment and workforce solutions platform.

---

## 1. Database Schema Overview

The complete SQL schema is located in [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql).

### Key Tables & Entities:
| Table Name | Description | Purpose |
|------------|-------------|---------|
| `candidates` | Central talent pool | Stores candidate contact info, skill tier, years of experience, CV storage URL, preferred sectors, and alert preferences |
| `candidate_skills` | Normalized skills | Granular skill names and proficiencies per candidate |
| `candidate_education` | Academic background | Institutions, degrees, years of study |
| `candidate_experience` | Work history | Employers, role titles, tenure, descriptions |
| `job_applications` | Job submissions | Direct applications linked to specific vacancies with CV snapshots and status tracking |
| `job_alert_subscriptions`| Talent notifications | Candidates opted in to receive matching job alerts based on sectors and location |
| `jobs` | Dynamic vacancies | Real-time job listings with sector tagging, requirements, benefits, and view counts |
| `inquiries` | Inbound pipeline | Employer outsourcing briefs, candidate queries, and institutional partnership requests |
| `services` | Solution catalog | Recruitment, Outsourcing, Training Academy, HR Consulting |
| `sectors` | Industry taxonomy | FMCG, Healthcare, Logistics, BPS, Construction, Hospitality, Technical, etc. |
| `insights` | Thought leadership | Published articles and worker guides |
| `activity_log` | Audit trail | System modifications and status changes |

---

## 2. Step-by-Step Setup in Supabase Dashboard

### Step A: Run the SQL Schema
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your project: **`gqeefprnukfpydknvfeh`**.
3. In the left sidebar, click **SQL Editor** -> **New query**.
4. Open the file `supabase/migrations/001_initial_schema.sql` in your project folder, copy its contents, paste them into the SQL editor, and click **Run**.
5. All 14 tables, lookup sectors, seed jobs, functions, triggers, and Row Level Security (RLS) policies will be deployed instantly.

### Step B: Create the Storage Bucket for CVs
1. In the Supabase Dashboard left sidebar, click **Storage**.
2. Click **New bucket**.
3. Set the **Bucket name** to: `cvs`
4. Set **Public bucket** to `ON` (or `OFF` if you prefer signed URLs; the code supports both).
5. Click **Save bucket**.
6. Under **Policies** for `cvs`:
   - Click **New Policy**.
   - Select **Enable read access for all users** (or authenticated staff).
   - Select **Enable upload access for public/anon users** with condition: `bucket_id = 'cvs'`.

---

## 3. How the Talent Pool & CV Collection Operates

### 1. Candidate Registration (`/candidates#talent-pool`)
- A candidate completes the profile form on the website (name, email, phone, location, target role, years of experience, workforce tier, and preferred sectors).
- When they select their CV (`.pdf`, `.doc`, `.docx` up to 10MB), it is uploaded directly to `cvs/candidates/{email}/{timestamp}-{filename}` in Supabase Storage.
- A candidate record is upserted in the `candidates` table with `cv_url`, `cv_filename`, and `status = 'registered'`.
- If the candidate checked **"Keep my CV & send me job alerts"**, an active record is added to `job_alert_subscriptions`.

### 2. Direct Job Application (`/jobs/[slug]`)
- Clicking **Apply Now** opens the `ApplyModal`.
- Applicants can attach their CV directly.
- The system checks or creates the candidate profile, uploads the CV file, and creates a record in `job_applications` with `status = 'submitted'`.
- An inquiry audit record is also logged in `inquiries`.

### 3. Employer Hiring Briefs (`/employers#inquiry-form`)
- Organizations submit their headcount requirements, workforce tiers (semi-skilled, skilled, technical, professional), and deployment locations.
- Stored directly in `inquiries` with `type = 'employer'` and `status = 'new'`.

---

## 4. How to Search Candidates & Send Jobs

In the Supabase Table Editor under `candidates`:

### Example Useful Queries:

```sql
-- 1. Find candidates interested in Healthcare open to international placement
SELECT first_name, last_name, email, phone, current_title, cv_url
FROM public.candidates
WHERE 'Healthcare' = ANY(preferred_sectors)
  AND open_to_international = true
  AND consent_job_alerts = true;

-- 2. Find technical talent with 3+ years experience
SELECT first_name, last_name, email, phone, current_title, years_experience, cv_url
FROM public.candidates
WHERE skill_level IN ('Technical', 'Professional')
  AND years_experience >= 3;

-- 3. View candidates who registered this month
SELECT first_name, last_name, email, current_title, cv_url, created_at
FROM public.candidates
ORDER BY created_at DESC;
```

---

## 5. Security & Ethical Compliance

- **Row Level Security (RLS)** is enabled across all tables.
- Public users can submit CVs, applications, and inquiries (`INSERT` allowed).
- Sensitive internal recruitment notes (`internal_notes`, `rating`) are restricted to administrative dashboards.
- Compliance aligned with Kenya's **Data Protection Act (2019)** and **National Employment Authority (NEA)** reporting standards.
