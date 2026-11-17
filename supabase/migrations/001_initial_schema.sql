-- =============================================================================
-- UTUCREST GLOBAL WORKFORCE — Full Database Schema
-- Professional-grade Supabase schema for workforce solutions platform
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For full-text search on candidates

-- =============================================================================
-- 1. SECTORS / INDUSTRIES  (lookup table)
-- =============================================================================
CREATE TABLE public.sectors (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,
  slug        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.sectors (name, slug) VALUES
  ('Technology', 'technology'),
  ('Healthcare', 'healthcare'),
  ('Logistics', 'logistics'),
  ('Manufacturing', 'manufacturing'),
  ('Retail & FMCG', 'retail-fmcg'),
  ('Professional Services', 'professional-services'),
  ('Hospitality', 'hospitality'),
  ('Construction', 'construction'),
  ('Business Process Services', 'bps'),
  ('Human Resources', 'human-resources');

-- =============================================================================
-- 2. SERVICES  (what UtuCrest offers)
-- =============================================================================
CREATE TABLE public.services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  outcome     TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT NOT NULL DEFAULT 'briefcase',
  sort_order  INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.services (title, slug, outcome, description, icon, sort_order) VALUES
  ('Recruitment', 'recruitment', 'Find the right people for the work that matters.', 'We combine thoughtful sourcing, practical screening, and role-fit matching.', 'users', 1),
  ('Outsourcing', 'outsourcing', 'Scale your workforce with confidence.', 'We support the people, processes, and administration that keep operations moving.', 'building', 2),
  ('Talent Advisory', 'talent-advisory', 'Make better workforce decisions.', 'We help organizations understand talent needs, plan for growth, and build stronger teams.', 'compass', 3),
  ('Training & Preparation', 'training', 'Turn potential into readiness.', 'We help candidates build the confidence, skills, and workplace knowledge needed to take their next step.', 'graduation-cap', 4);

-- =============================================================================
-- 3. JOBS  (live job listings)
-- =============================================================================
CREATE TYPE public.employment_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
CREATE TYPE public.job_status AS ENUM ('draft', 'published', 'closed', 'filled');

CREATE TABLE public.jobs (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  employer          TEXT NOT NULL,
  sector_id         UUID REFERENCES public.sectors(id),
  sector_name       TEXT NOT NULL,         -- denormalized for fast reads
  location          TEXT NOT NULL,
  employment_type   public.employment_type NOT NULL DEFAULT 'Full-time',
  salary_min        INT,                   -- optional salary range
  salary_max        INT,
  salary_currency   TEXT DEFAULT 'KES',
  posted_date       DATE NOT NULL DEFAULT CURRENT_DATE,
  closing_date      DATE,
  summary           TEXT NOT NULL,
  responsibilities  TEXT[] NOT NULL DEFAULT '{}',
  requirements      TEXT[] NOT NULL DEFAULT '{}',
  benefits          TEXT[] NOT NULL DEFAULT '{}',
  candidate_notes   TEXT,
  status            public.job_status NOT NULL DEFAULT 'draft',
  is_featured       BOOLEAN NOT NULL DEFAULT false,
  view_count        INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_sector ON public.jobs(sector_name);
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_employment_type ON public.jobs(employment_type);
CREATE INDEX idx_jobs_posted_date ON public.jobs(posted_date DESC);
CREATE INDEX idx_jobs_slug ON public.jobs(slug);

-- =============================================================================
-- 4. CANDIDATES / TALENT POOL  (core talent data + CV storage)
-- =============================================================================
CREATE TYPE public.candidate_status AS ENUM (
  'registered',       -- just signed up
  'screening',        -- under review
  'prepared',         -- completed training/preparation
  'available',        -- ready for placement
  'placed',           -- currently employed through UtuCrest
  'inactive'          -- opted out or dormant
);

CREATE TYPE public.skill_level AS ENUM ('Semi-skilled', 'Skilled', 'Technical', 'Professional');

CREATE TABLE public.candidates (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Personal info
  first_name          TEXT NOT NULL,
  last_name           TEXT NOT NULL,
  email               TEXT NOT NULL UNIQUE,
  phone               TEXT NOT NULL,
  date_of_birth       DATE,
  nationality         TEXT DEFAULT 'Kenyan',
  location            TEXT,
  -- Professional profile
  skill_level         public.skill_level,
  years_experience    INT,
  current_title       TEXT,
  linkedin_url        TEXT,
  portfolio_url       TEXT,
  professional_summary TEXT,
  -- CV / Resume
  cv_url              TEXT,                -- Supabase Storage URL
  cv_filename         TEXT,
  cv_uploaded_at      TIMESTAMPTZ,
  -- Preferences
  preferred_sectors   TEXT[] DEFAULT '{}', -- e.g. {'Technology', 'Healthcare'}
  preferred_locations TEXT[] DEFAULT '{}',
  preferred_employment_types TEXT[] DEFAULT '{}',
  open_to_relocation  BOOLEAN DEFAULT false,
  open_to_international BOOLEAN DEFAULT false,
  salary_expectation_min INT,
  salary_expectation_max INT,
  salary_currency     TEXT DEFAULT 'KES',
  available_from      DATE,
  -- Status & consent
  status              public.candidate_status NOT NULL DEFAULT 'registered',
  consent_privacy     BOOLEAN NOT NULL DEFAULT false,
  consent_job_alerts  BOOLEAN NOT NULL DEFAULT false,     -- opt-in for job notifications
  consent_data_retention BOOLEAN NOT NULL DEFAULT false,
  -- Internal notes (admin only)
  internal_notes      TEXT,
  rating              INT CHECK (rating >= 1 AND rating <= 5),
  -- Timestamps
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_candidates_email ON public.candidates(email);
CREATE INDEX idx_candidates_status ON public.candidates(status);
CREATE INDEX idx_candidates_skill_level ON public.candidates(skill_level);
CREATE INDEX idx_candidates_name ON public.candidates USING gin (
  (first_name || ' ' || last_name) gin_trgm_ops
);

-- =============================================================================
-- 5. CANDIDATE SKILLS  (many-to-many: skills per candidate)
-- =============================================================================
CREATE TABLE public.candidate_skills (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id  UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  skill_name    TEXT NOT NULL,
  proficiency   TEXT CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (candidate_id, skill_name)
);

-- =============================================================================
-- 6. CANDIDATE EDUCATION
-- =============================================================================
CREATE TABLE public.candidate_education (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id  UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  institution   TEXT NOT NULL,
  degree        TEXT NOT NULL,
  field_of_study TEXT,
  start_year    INT,
  end_year      INT,
  is_current    BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- 7. CANDIDATE WORK EXPERIENCE
-- =============================================================================
CREATE TABLE public.candidate_experience (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id  UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  company       TEXT NOT NULL,
  title         TEXT NOT NULL,
  location      TEXT,
  start_date    DATE,
  end_date      DATE,
  is_current    BOOLEAN DEFAULT false,
  description   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- 8. JOB APPLICATIONS  (candidates applying to jobs)
-- =============================================================================
CREATE TYPE public.application_status AS ENUM (
  'submitted',
  'under_review',
  'shortlisted',
  'interview_scheduled',
  'interviewed',
  'offered',
  'accepted',
  'rejected',
  'withdrawn'
);

CREATE TABLE public.job_applications (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id            UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id      UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
  cover_letter      TEXT,
  cv_url            TEXT,                 -- snapshot of CV at time of application
  status            public.application_status NOT NULL DEFAULT 'submitted',
  internal_notes    TEXT,
  rating            INT CHECK (rating >= 1 AND rating <= 5),
  applied_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at       TIMESTAMPTZ,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (job_id, candidate_id)           -- prevent duplicate applications
);

CREATE INDEX idx_applications_job ON public.job_applications(job_id);
CREATE INDEX idx_applications_candidate ON public.job_applications(candidate_id);
CREATE INDEX idx_applications_status ON public.job_applications(status);

-- =============================================================================
-- 9. EMPLOYER INQUIRIES  (businesses reaching out)
-- =============================================================================
CREATE TYPE public.inquiry_status AS ENUM ('new', 'contacted', 'in_progress', 'converted', 'closed');
CREATE TYPE public.inquiry_type AS ENUM ('employer', 'candidate', 'partner', 'general');

CREATE TABLE public.inquiries (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type              public.inquiry_type NOT NULL,
  status            public.inquiry_status NOT NULL DEFAULT 'new',
  -- Contact info
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  organization      TEXT,
  -- Inquiry details
  hiring_need       TEXT,
  role_count        INT,
  location          TEXT,
  partnership_type  TEXT,
  subject           TEXT,
  message           TEXT,
  interest          TEXT,
  -- Consent
  consent_privacy   BOOLEAN NOT NULL DEFAULT false,
  -- Internal
  internal_notes    TEXT,
  assigned_to       TEXT,
  -- Timestamps
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_inquiries_type ON public.inquiries(type);
CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_created ON public.inquiries(created_at DESC);

-- =============================================================================
-- 10. INSIGHTS / BLOG POSTS
-- =============================================================================
CREATE TYPE public.insight_status AS ENUM ('draft', 'published', 'archived');

CREATE TABLE public.insights (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  published_date  DATE,
  reading_time    INT NOT NULL DEFAULT 5,
  author          TEXT NOT NULL DEFAULT 'Utu Crest Editorial',
  cover_image_url TEXT,
  status          public.insight_status NOT NULL DEFAULT 'draft',
  view_count      INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_insights_slug ON public.insights(slug);
CREATE INDEX idx_insights_status ON public.insights(status);
CREATE INDEX idx_insights_published ON public.insights(published_date DESC);

-- =============================================================================
-- 11. JOB ALERTS / SUBSCRIPTIONS
-- =============================================================================
CREATE TABLE public.job_alert_subscriptions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id      UUID REFERENCES public.candidates(id) ON DELETE SET NULL,
  email             TEXT NOT NULL,
  name              TEXT,
  preferred_sectors TEXT[] DEFAULT '{}',
  preferred_locations TEXT[] DEFAULT '{}',
  preferred_types   TEXT[] DEFAULT '{}',
  is_active         BOOLEAN NOT NULL DEFAULT true,
  verified_at       TIMESTAMPTZ,
  unsubscribed_at   TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_job_alerts_email ON public.job_alert_subscriptions(email) WHERE is_active = true;

-- =============================================================================
-- 12. JOB ALERT HISTORY  (track sent alerts)
-- =============================================================================
CREATE TABLE public.job_alert_history (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id   UUID NOT NULL REFERENCES public.job_alert_subscriptions(id) ON DELETE CASCADE,
  job_id            UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  sent_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  opened_at         TIMESTAMPTZ,
  clicked_at        TIMESTAMPTZ,
  UNIQUE (subscription_id, job_id)
);

-- =============================================================================
-- 13. CONTACT MESSAGES  (general contact form submissions)
-- =============================================================================
CREATE TABLE public.contact_messages (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  subject       TEXT,
  message       TEXT NOT NULL,
  is_read       BOOLEAN NOT NULL DEFAULT false,
  replied_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- 14. SITE SETTINGS  (CMS-like config)
-- =============================================================================
CREATE TABLE public.site_settings (
  key           TEXT PRIMARY KEY,
  value         JSONB NOT NULL,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.site_settings (key, value) VALUES
  ('announcement', '"Connecting talent to opportunity across Kenya and global markets."'),
  ('contact_email', '"info@utucrestglobal.co.ke"'),
  ('contact_phone', '"+254 713 448 062"'),
  ('contact_address', '"Eastern Bypass, Kamakis"'),
  ('social_linkedin', '""'),
  ('social_twitter', '""'),
  ('social_facebook', '""');

-- =============================================================================
-- 15. ACTIVITY LOG  (audit trail)
-- =============================================================================
CREATE TABLE public.activity_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type   TEXT NOT NULL,       -- 'candidate', 'job', 'application', etc.
  entity_id     UUID NOT NULL,
  action        TEXT NOT NULL,       -- 'created', 'updated', 'status_changed', etc.
  details       JSONB,
  performed_by  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_entity ON public.activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_created ON public.activity_log(created_at DESC);

-- =============================================================================
-- FUNCTIONS: Auto-update timestamps
-- =============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.columns
    WHERE column_name = 'updated_at'
      AND table_schema = 'public'
      AND table_name NOT IN ('site_settings')
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at()',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- =============================================================================
-- FUNCTIONS: Generate slug from title
-- =============================================================================
CREATE OR REPLACE FUNCTION public.generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(trim(title), '[^a-zA-Z0-9\s-]', '', 'g'),
      '\s+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- STORAGE: Create buckets for CVs and media
-- =============================================================================
-- Note: Run these via Supabase Dashboard or supabase CLI
-- INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alert_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_alert_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view sectors" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published jobs" ON public.jobs FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published insights" ON public.insights FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Public can create inquiries, applications, candidate registrations
CREATE POLICY "Public can submit inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can register as candidates" ON public.candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit applications" ON public.job_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can subscribe to job alerts" ON public.job_alert_subscriptions FOR INSERT WITH CHECK (true);

-- Candidates can view and update their own data
CREATE POLICY "Candidates can view own profile" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Candidates can add skills" ON public.candidate_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Candidates can view own skills" ON public.candidate_skills FOR SELECT USING (true);
CREATE POLICY "Candidates can add education" ON public.candidate_education FOR INSERT WITH CHECK (true);
CREATE POLICY "Candidates can view own education" ON public.candidate_education FOR SELECT USING (true);
CREATE POLICY "Candidates can add experience" ON public.candidate_experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Candidates can view own experience" ON public.candidate_experience FOR SELECT USING (true);
CREATE POLICY "Candidates can view own applications" ON public.job_applications FOR SELECT USING (true);

-- =============================================================================
-- SEED: Insert initial job data from existing content
-- =============================================================================
INSERT INTO public.jobs (slug, title, employer, sector_name, location, employment_type, posted_date, summary, responsibilities, requirements, benefits, candidate_notes, status) VALUES
(
  'customer-success-coordinator-nairobi',
  'Customer Success Coordinator',
  '[Confidential employer]',
  'Technology',
  'Nairobi, Kenya',
  'Full-time',
  '2026-08-01',
  'Support client relationships and help customers get lasting value from a growing SaaS platform serving East African businesses.',
  ARRAY['Onboard new clients and guide them through product adoption', 'Monitor account health and identify opportunities for support', 'Coordinate with product and sales teams on client feedback', 'Prepare weekly status updates for assigned accounts'],
  ARRAY['1–3 years in customer support, account coordination, or a related role', 'Strong written and spoken English; Swahili is a plus', 'Comfortable working with CRM tools and structured workflows', 'Demonstrated ability to listen, follow through, and solve problems'],
  ARRAY['Competitive local salary with performance review cycle', 'Hybrid working arrangement', 'Structured onboarding and ongoing coaching'],
  'Utu Crest will guide you through preparation before your employer interview. Apply only if you can commit to a full-time schedule in Nairobi.',
  'published'
),
(
  'administrative-assistant-kamakis',
  'Administrative Assistant',
  'Regional logistics firm',
  'Logistics',
  'Kamakis, Kenya',
  'Full-time',
  '2026-07-28',
  'Keep daily operations organized for a logistics team handling regional distribution and client coordination.',
  ARRAY['Manage scheduling, correspondence, and filing for the operations team', 'Track inventory documentation and support dispatch coordination', 'Prepare reports and assist with vendor communication', 'Maintain accurate records for compliance and audit readiness'],
  ARRAY['Diploma or certificate in business administration or equivalent experience', 'Proficiency in Microsoft Office and basic accounting tools', 'Reliable, detail-oriented, and comfortable in a fast-paced environment'],
  ARRAY['Stable employment with clear reporting structure', 'Transport allowance', 'Opportunity to grow into operations support roles'],
  NULL,
  'published'
),
(
  'registered-nurse-healthcare-partner',
  'Registered Nurse',
  '[Healthcare partner — name on application]',
  'Healthcare',
  'Nairobi, Kenya',
  'Contract',
  '2026-07-20',
  'Join a healthcare provider focused on accessible outpatient care with structured shift planning and professional support.',
  ARRAY['Deliver patient care in line with clinical protocols', 'Maintain accurate patient records and handover notes', 'Support health education and follow-up scheduling', 'Collaborate with multidisciplinary care teams'],
  ARRAY['Valid nursing registration in Kenya', 'Minimum 2 years of clinical experience', 'Strong communication and documentation skills', 'Willingness to work rotating shifts as required'],
  ARRAY['Competitive contract rates', 'Professional indemnity support through employer', 'Clear scope of work before contract start'],
  'This role is filled through Utu Crest''s ethical placement process. Licensing verification is required before interview.',
  'published'
),
(
  'software-developer-remote-kenya',
  'Software Developer (Mid-Level)',
  'Global fintech partner',
  'Technology',
  'Remote, Kenya',
  'Full-time',
  '2026-07-15',
  'Build and maintain payment infrastructure features for a product expanding across East Africa and select global markets.',
  ARRAY['Develop and review backend services in a modern TypeScript stack', 'Collaborate with product and QA on feature delivery', 'Participate in code reviews and documentation', 'Support incident response within agreed on-call rotation'],
  ARRAY['3+ years professional software development experience', 'Strong experience with Node.js or similar backend frameworks', 'Familiarity with cloud deployment and CI/CD workflows', 'Clear written communication for distributed teams'],
  ARRAY['USD-indexed compensation band', 'Remote-first with quarterly team meetups', 'Learning budget and mentorship from senior engineers'],
  NULL,
  'published'
),
(
  'sales-representative-consumer-goods',
  'Sales Representative',
  'Consumer goods distributor',
  'Retail & FMCG',
  'Nairobi & Central Kenya',
  'Full-time',
  '2026-07-10',
  'Drive retail relationships and territory growth for a established FMCG brand with structured sales support.',
  ARRAY['Manage assigned retail accounts and meet agreed sales targets', 'Execute in-store activations and merchandising standards', 'Report market feedback and competitor activity weekly', 'Coordinate with logistics on order fulfillment'],
  ARRAY['Proven field sales experience in FMCG or retail', 'Valid driver''s license and willingness to travel within territory', 'Strong negotiation and relationship-building skills'],
  ARRAY['Base salary plus commission structure', 'Fuel and phone allowance', 'Sales training and route planning support'],
  NULL,
  'published'
),
(
  'hr-intern-workforce-program',
  'HR Intern — Workforce Program',
  'Utu Crest Global Workforce',
  'Human Resources',
  'Kamakis, Kenya',
  'Internship',
  '2026-08-05',
  'Gain hands-on experience supporting candidate preparation, employer coordination, and ethical recruitment operations.',
  ARRAY['Assist with candidate communication and interview scheduling', 'Support document verification and onboarding checklists', 'Help maintain accurate records in the talent management system', 'Contribute to training session logistics and feedback collection'],
  ARRAY['Currently pursuing or recently completed a HR, business, or related degree', 'Strong organizational skills and professional communication', 'Interest in ethical workforce development and people-centered HR'],
  ARRAY['Structured mentorship from senior workforce consultants', 'Certificate of completion and reference on successful program', 'Exposure to local and global placement workflows'],
  'This internship prioritizes learning and professional development. It does not guarantee full-time employment.',
  'published'
),
(
  'facility-supervisor-manufacturing',
  'Facility Supervisor',
  'Manufacturing partner',
  'Manufacturing',
  'Thika, Kenya',
  'Full-time',
  '2026-06-30',
  'Oversee daily facility operations, safety compliance, and team coordination for a light manufacturing facility.',
  ARRAY['Supervise shift teams and ensure production schedules are met', 'Enforce safety protocols and maintain incident logs', 'Coordinate maintenance requests and inventory for essential supplies', 'Report operational metrics to plant management'],
  ARRAY['3+ years supervisory experience in manufacturing or industrial settings', 'Understanding of workplace safety standards', 'Ability to lead teams with clarity and respect'],
  ARRAY['Competitive salary with overtime where applicable', 'Safety equipment provided', 'Pathway to operations management roles'],
  NULL,
  'published'
);

-- Seed insights
INSERT INTO public.insights (slug, title, category, excerpt, content, published_date, reading_time, author, status) VALUES
(
  'prepare-for-global-opportunity',
  'How to prepare for a global opportunity',
  'Career readiness',
  'A practical guide for candidates exploring international roles—covering documentation, interview preparation, and realistic expectations.',
  E'Global opportunities can open meaningful career pathways when approached with preparation and clarity. At Utu Crest, we guide candidates through a process that respects both ambition and reality.\n\n**Start with readiness, not urgency.** Before applying abroad, confirm that your qualifications, documentation, and career goals align with the role and destination. Rushing into applications without preparation often leads to disappointment.\n\n**Understand the role in context.** Research the employer, the work environment, and what success looks like in the first 90 days. Ask direct questions during screening—ethical recruiters welcome them.\n\n**Prepare for structured interviews.** Practice clear examples of your work, prepare questions about support and onboarding, and be honest about your availability and constraints.\n\n**Protect your dignity throughout.** You should never pay undisclosed fees, surrender original documents without receipt, or accept vague promises. Ethical placement means transparent communication at every step.\n\nUtu Crest supports candidates with interview coaching, document checklists, and ongoing guidance.',
  '2026-07-12',
  6,
  'Utu Crest Editorial',
  'published'
),
(
  'workforce-that-grows-with-business',
  'Building a workforce that can grow with your business',
  'Employer guide',
  'Why workforce planning matters before you hire—and how to align recruitment, outsourcing, and advisory support.',
  E'Growing businesses often feel hiring pressure before they have clarity on what they actually need. The result: mismatched hires, repeated cycles, and teams that cannot scale.\n\n**Map roles to outcomes.** Before posting a vacancy, define what the person will deliver in the first six months. Outcome-led hiring improves fit and reduces turnover.\n\n**Choose the right workforce model.** Permanent recruitment, outsourced teams, and advisory support serve different needs. A blended approach often works best for scaling organizations.\n\n**Invest in onboarding, not just selection.** The best match fails without structured induction, clear expectations, and manager support.\n\n**Measure what matters.** Track time-to-productivity, retention, and quality of work—not just time-to-fill.\n\nUtu Crest helps employers design workforce strategies that balance speed with sustainability.',
  '2026-06-28',
  5,
  'Utu Crest Editorial',
  'published'
),
(
  'ethical-recruitment-in-practice',
  'What ethical recruitment looks like in practice',
  'Ethics & impact',
  'Transparency, informed consent, and candidate dignity—the operational standards that separate ethical workforce partners from exploitative intermediaries.',
  E'Ethical recruitment is not a tagline. It is a set of daily decisions about how candidates and employers are treated.\n\n**Transparent communication.** Candidates receive clear information about the role, compensation, location, and process before committing time or resources.\n\n**No hidden fees.** Ethical partners do not charge candidates undisclosed placement fees or withhold documents as leverage.\n\n**Realistic job representation.** Employers and recruiters share accurate role descriptions. Overselling opportunities damages trust and increases early attrition.\n\n**Ongoing support.** Placement is a beginning, not an end. Follow-up after start date helps address challenges before they become failures.\n\n**Accountability.** Organizations should be able to explain their process, document their standards, and respond when something goes wrong.\n\nUtu Crest builds its operations around these principles.',
  '2026-06-15',
  4,
  'Utu Crest Editorial',
  'published'
);
