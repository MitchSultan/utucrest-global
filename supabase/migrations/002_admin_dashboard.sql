CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

DROP POLICY IF EXISTS "Candidates can view own profile" ON public.candidates;
DROP POLICY IF EXISTS "Candidates can view own skills" ON public.candidate_skills;
DROP POLICY IF EXISTS "Candidates can view own education" ON public.candidate_education;
DROP POLICY IF EXISTS "Candidates can view own experience" ON public.candidate_experience;
DROP POLICY IF EXISTS "Candidates can view own applications" ON public.job_applications;
DROP POLICY IF EXISTS "Public can register as candidates" ON public.candidates;
DROP POLICY IF EXISTS "Public can submit applications" ON public.job_applications;
DROP POLICY IF EXISTS "Public can subscribe to job alerts" ON public.job_alert_subscriptions;

CREATE POLICY "Admins can read candidates"
  ON public.candidates FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read candidate skills"
  ON public.candidate_skills FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read candidate education"
  ON public.candidate_education FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read candidate experience"
  ON public.candidate_experience FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read applications"
  ON public.job_applications FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read inquiries"
  ON public.inquiries FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read contact messages"
  ON public.contact_messages FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admins can read job alert subscriptions"
  ON public.job_alert_subscriptions FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can manage jobs"
  ON public.jobs FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can manage insights"
  ON public.insights FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.register_candidate_submission(
  p_first_name TEXT,
  p_last_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_location TEXT DEFAULT NULL,
  p_current_title TEXT DEFAULT NULL,
  p_years_experience INT DEFAULT NULL,
  p_skill_level public.skill_level DEFAULT NULL,
  p_preferred_sectors TEXT[] DEFAULT '{}',
  p_open_to_international BOOLEAN DEFAULT false,
  p_cv_url TEXT DEFAULT NULL,
  p_cv_filename TEXT DEFAULT NULL,
  p_subscribe_job_alerts BOOLEAN DEFAULT false,
  p_professional_summary TEXT DEFAULT NULL,
  p_consent_privacy BOOLEAN DEFAULT false
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  candidate_id UUID;
  clean_email TEXT := lower(trim(p_email));
BEGIN
  IF trim(COALESCE(p_first_name, '')) = ''
    OR trim(COALESCE(p_last_name, '')) = ''
    OR clean_email = ''
    OR trim(COALESCE(p_phone, '')) = ''
    OR NOT COALESCE(p_consent_privacy, false) THEN
    RAISE EXCEPTION 'Candidate details and privacy consent are required';
  END IF;

  INSERT INTO public.candidates (
    first_name, last_name, email, phone, location, current_title,
    years_experience, skill_level, preferred_sectors, open_to_international,
    cv_url, cv_filename, cv_uploaded_at, consent_privacy, consent_job_alerts,
    professional_summary, status
  ) VALUES (
    trim(p_first_name), trim(p_last_name), clean_email, trim(p_phone),
    NULLIF(trim(COALESCE(p_location, '')), ''),
    NULLIF(trim(COALESCE(p_current_title, '')), ''),
    p_years_experience, p_skill_level, COALESCE(p_preferred_sectors, '{}'),
    COALESCE(p_open_to_international, false), p_cv_url, p_cv_filename,
    CASE WHEN p_cv_url IS NOT NULL THEN now() ELSE NULL END,
    true, COALESCE(p_subscribe_job_alerts, false),
    NULLIF(trim(COALESCE(p_professional_summary, '')), ''), 'registered'
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO candidate_id;

  IF candidate_id IS NULL THEN
    SELECT id INTO candidate_id FROM public.candidates WHERE email = clean_email;
  END IF;

  IF COALESCE(p_subscribe_job_alerts, false) THEN
    INSERT INTO public.job_alert_subscriptions (
      candidate_id, email, name, preferred_sectors, is_active
    ) VALUES (
      candidate_id, clean_email, trim(p_first_name) || ' ' || trim(p_last_name),
      COALESCE(p_preferred_sectors, '{}'), true
    )
    ON CONFLICT (email) WHERE is_active DO UPDATE SET
      candidate_id = EXCLUDED.candidate_id,
      name = EXCLUDED.name,
      preferred_sectors = EXCLUDED.preferred_sectors,
      is_active = true,
      unsubscribed_at = NULL,
      updated_at = now();
  END IF;

  RETURN;
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_job_application(
  p_job_slug TEXT,
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_message TEXT DEFAULT NULL,
  p_cv_url TEXT DEFAULT NULL,
  p_cv_filename TEXT DEFAULT NULL,
  p_consent_privacy BOOLEAN DEFAULT false
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  candidate_id UUID;
  job_record public.jobs%ROWTYPE;
  name_parts TEXT[];
  clean_email TEXT := lower(trim(p_email));
BEGIN
  IF trim(COALESCE(p_name, '')) = ''
    OR clean_email = ''
    OR trim(COALESCE(p_phone, '')) = ''
    OR NOT COALESCE(p_consent_privacy, false) THEN
    RAISE EXCEPTION 'Application details and privacy consent are required';
  END IF;

  SELECT * INTO job_record
  FROM public.jobs
  WHERE slug = p_job_slug AND status = 'published';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'This job is no longer accepting applications';
  END IF;

  name_parts := regexp_split_to_array(trim(p_name), '\s+');

  INSERT INTO public.candidates (
    first_name, last_name, email, phone, cv_url, cv_filename,
    cv_uploaded_at, consent_privacy, consent_job_alerts, status
  ) VALUES (
    name_parts[1],
    COALESCE(NULLIF(array_to_string(name_parts[2:array_length(name_parts, 1)], ' '), ''), 'Candidate'),
    clean_email, trim(p_phone), p_cv_url, p_cv_filename,
    CASE WHEN p_cv_url IS NOT NULL THEN now() ELSE NULL END,
    true, false, 'registered'
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO candidate_id;

  IF candidate_id IS NULL THEN
    SELECT id INTO candidate_id FROM public.candidates WHERE email = clean_email;
  END IF;

  INSERT INTO public.job_applications (
    job_id, candidate_id, cover_letter, cv_url, status
  ) VALUES (
    job_record.id, candidate_id, NULLIF(trim(COALESCE(p_message, '')), ''),
    p_cv_url, 'submitted'
  )
  ON CONFLICT (job_id, candidate_id) DO NOTHING;

  INSERT INTO public.inquiries (
    type, name, email, phone, subject, message, interest, consent_privacy
  ) VALUES (
    'candidate', trim(p_name), clean_email, trim(p_phone),
    'Application for ' || job_record.title,
    COALESCE(NULLIF(trim(COALESCE(p_message, '')), ''),
      'Interest expressed for ' || job_record.title || '. CV: ' || COALESCE(p_cv_filename, 'None')),
    'jobs', true
  );
END;
$$;

REVOKE ALL ON FUNCTION public.register_candidate_submission(
  TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, public.skill_level, TEXT[],
  BOOLEAN, TEXT, TEXT, BOOLEAN, TEXT, BOOLEAN
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_candidate_submission(
  TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, public.skill_level, TEXT[],
  BOOLEAN, TEXT, TEXT, BOOLEAN, TEXT, BOOLEAN
) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.submit_job_application(
  TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN
) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_job_application(
  TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BOOLEAN
) TO anon, authenticated;
