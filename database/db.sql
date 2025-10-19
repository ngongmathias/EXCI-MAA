-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.comments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);
CREATE TABLE public.consultation_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text NOT NULL,
  country_slug text NOT NULL,
  service_id text NOT NULL,
  message text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT consultation_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contact_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT contact_submissions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.event_attendees (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT event_attendees_pkey PRIMARY KEY (id),
  CONSTRAINT event_attendees_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  location text,
  start_at timestamp with time zone NOT NULL,
  end_at timestamp with time zone NOT NULL,
  image_url text,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.likes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid,
  user_identifier text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT likes_pkey PRIMARY KEY (id),
  CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id)
);
CREATE TABLE public.posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text,
  content text,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT posts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

-- Careers table for job postings
CREATE TABLE IF NOT EXISTS public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  employment_type text,
  salary_range text,
  application_url text,
  apply_email text,
  posting_date date DEFAULT now(),
  closing_date date,
  description text NOT NULL,
  requirements text,
  responsibilities text,
  status text DEFAULT 'open', -- open | closed | draft
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common filters
CREATE INDEX IF NOT EXISTS careers_status_idx ON public.careers (status);
CREATE INDEX IF NOT EXISTS careers_department_idx ON public.careers (department);
CREATE INDEX IF NOT EXISTS careers_location_idx ON public.careers (location);
CREATE INDEX IF NOT EXISTS careers_posting_date_idx ON public.careers (posting_date);

-- Row Level Security and policies (adjust roles as needed)
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read for public site listings
DROP POLICY IF EXISTS careers_anonymous_read ON public.careers;
CREATE POLICY careers_anonymous_read ON public.careers
  FOR SELECT
  TO anon
  USING (status = 'open');

-- Allow authenticated insert/update/delete for admin role via JWT claim (e.g., role = 'admin')
DROP POLICY IF EXISTS careers_admin_write ON public.careers;
CREATE POLICY careers_admin_write ON public.careers
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'admin');