-- =====================================================
-- COMPLETE DATABASE SETUP FOR EXCI-MAA
-- Copy and paste this entire file into Supabase SQL Editor
-- =====================================================

-- =====================================================
-- TABLES
-- =====================================================

-- Careers table
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT,
  salary_range TEXT,
  application_url TEXT,
  apply_email TEXT,
  posting_date DATE DEFAULT now(),
  closing_date DATE,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Posts table (for blog/insights)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT,
  content TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Likes table
CREATE TABLE IF NOT EXISTS public.likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_identifier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_at TIMESTAMP WITH TIME ZONE NOT NULL,
  end_at TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event attendees table
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event images table
CREATE TABLE IF NOT EXISTS public.event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  uploaded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Post images table
CREATE TABLE IF NOT EXISTS public.post_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  uploaded_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Consultation requests table
CREATE TABLE IF NOT EXISTS public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  country_slug TEXT NOT NULL,
  service_id TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Background images table
CREATE TABLE IF NOT EXISTS public.background_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_by VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_careers_status ON public.careers(status);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON public.careers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_start_at ON public.events(start_at);
CREATE INDEX IF NOT EXISTS idx_background_images_active ON public.background_images(is_active);
CREATE INDEX IF NOT EXISTS idx_background_images_order ON public.background_images(display_order);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.background_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - PUBLIC ACCESS FOR ALL TABLES
-- =====================================================

-- Careers policies
DROP POLICY IF EXISTS "Public read careers" ON public.careers;
DROP POLICY IF EXISTS "Public insert careers" ON public.careers;
DROP POLICY IF EXISTS "Public update careers" ON public.careers;
DROP POLICY IF EXISTS "Public delete careers" ON public.careers;

CREATE POLICY "Public read careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Public insert careers" ON public.careers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update careers" ON public.careers FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete careers" ON public.careers FOR DELETE USING (true);

-- Posts policies
DROP POLICY IF EXISTS "Public read posts" ON public.posts;
DROP POLICY IF EXISTS "Public insert posts" ON public.posts;
DROP POLICY IF EXISTS "Public update posts" ON public.posts;
DROP POLICY IF EXISTS "Public delete posts" ON public.posts;

CREATE POLICY "Public read posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Public insert posts" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update posts" ON public.posts FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete posts" ON public.posts FOR DELETE USING (true);

-- Comments policies
DROP POLICY IF EXISTS "Public read comments" ON public.comments;
DROP POLICY IF EXISTS "Public insert comments" ON public.comments;
DROP POLICY IF EXISTS "Public update comments" ON public.comments;
DROP POLICY IF EXISTS "Public delete comments" ON public.comments;

CREATE POLICY "Public read comments" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Public insert comments" ON public.comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update comments" ON public.comments FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete comments" ON public.comments FOR DELETE USING (true);

-- Likes policies
DROP POLICY IF EXISTS "Public read likes" ON public.likes;
DROP POLICY IF EXISTS "Public insert likes" ON public.likes;
DROP POLICY IF EXISTS "Public delete likes" ON public.likes;

CREATE POLICY "Public read likes" ON public.likes FOR SELECT USING (true);
CREATE POLICY "Public insert likes" ON public.likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete likes" ON public.likes FOR DELETE USING (true);

-- Events policies
DROP POLICY IF EXISTS "Public read events" ON public.events;
DROP POLICY IF EXISTS "Public insert events" ON public.events;
DROP POLICY IF EXISTS "Public update events" ON public.events;
DROP POLICY IF EXISTS "Public delete events" ON public.events;

CREATE POLICY "Public read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public insert events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update events" ON public.events FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete events" ON public.events FOR DELETE USING (true);

-- Event attendees policies
DROP POLICY IF EXISTS "Public read event_attendees" ON public.event_attendees;
DROP POLICY IF EXISTS "Public insert event_attendees" ON public.event_attendees;

CREATE POLICY "Public read event_attendees" ON public.event_attendees FOR SELECT USING (true);
CREATE POLICY "Public insert event_attendees" ON public.event_attendees FOR INSERT WITH CHECK (true);

-- Event images policies
DROP POLICY IF EXISTS "Public read event_images" ON public.event_images;
DROP POLICY IF EXISTS "Public insert event_images" ON public.event_images;
DROP POLICY IF EXISTS "Public update event_images" ON public.event_images;
DROP POLICY IF EXISTS "Public delete event_images" ON public.event_images;

CREATE POLICY "Public read event_images" ON public.event_images FOR SELECT USING (true);
CREATE POLICY "Public insert event_images" ON public.event_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update event_images" ON public.event_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete event_images" ON public.event_images FOR DELETE USING (true);

-- Post images policies
DROP POLICY IF EXISTS "Public read post_images" ON public.post_images;
DROP POLICY IF EXISTS "Public insert post_images" ON public.post_images;
DROP POLICY IF EXISTS "Public update post_images" ON public.post_images;
DROP POLICY IF EXISTS "Public delete post_images" ON public.post_images;

CREATE POLICY "Public read post_images" ON public.post_images FOR SELECT USING (true);
CREATE POLICY "Public insert post_images" ON public.post_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update post_images" ON public.post_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete post_images" ON public.post_images FOR DELETE USING (true);

-- Contact submissions policies
DROP POLICY IF EXISTS "Public read contact_submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Public insert contact_submissions" ON public.contact_submissions;

CREATE POLICY "Public read contact_submissions" ON public.contact_submissions FOR SELECT USING (true);
CREATE POLICY "Public insert contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- Consultation requests policies
DROP POLICY IF EXISTS "Public read consultation_requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Public insert consultation_requests" ON public.consultation_requests;

CREATE POLICY "Public read consultation_requests" ON public.consultation_requests FOR SELECT USING (true);
CREATE POLICY "Public insert consultation_requests" ON public.consultation_requests FOR INSERT WITH CHECK (true);

-- Background images policies
DROP POLICY IF EXISTS "Public read background_images" ON public.background_images;
DROP POLICY IF EXISTS "Public insert background_images" ON public.background_images;
DROP POLICY IF EXISTS "Public update background_images" ON public.background_images;
DROP POLICY IF EXISTS "Public delete background_images" ON public.background_images;

CREATE POLICY "Public read background_images" ON public.background_images FOR SELECT USING (true);
CREATE POLICY "Public insert background_images" ON public.background_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update background_images" ON public.background_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete background_images" ON public.background_images FOR DELETE USING (true);

-- Services policies
DROP POLICY IF EXISTS "Public read services" ON public.services;
DROP POLICY IF EXISTS "Public insert services" ON public.services;
DROP POLICY IF EXISTS "Public update services" ON public.services;
DROP POLICY IF EXISTS "Public delete services" ON public.services;

CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public insert services" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update services" ON public.services FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete services" ON public.services FOR DELETE USING (true);

-- =====================================================
-- STORAGE BUCKET FOR BACKGROUND IMAGES
-- =====================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'background-images',
  'background-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for background images
DROP POLICY IF EXISTS "Public read background images storage" ON storage.objects;
DROP POLICY IF EXISTS "Public insert background images storage" ON storage.objects;
DROP POLICY IF EXISTS "Public update background images storage" ON storage.objects;
DROP POLICY IF EXISTS "Public delete background images storage" ON storage.objects;

CREATE POLICY "Public read background images storage" ON storage.objects FOR SELECT USING (bucket_id = 'background-images');
CREATE POLICY "Public insert background images storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'background-images');
CREATE POLICY "Public update background images storage" ON storage.objects FOR UPDATE USING (bucket_id = 'background-images') WITH CHECK (bucket_id = 'background-images');
CREATE POLICY "Public delete background images storage" ON storage.objects FOR DELETE USING (bucket_id = 'background-images');

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_background_images_updated_at ON public.background_images;
CREATE TRIGGER update_background_images_updated_at
  BEFORE UPDATE ON public.background_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_event_images_updated_at ON public.event_images;
CREATE TRIGGER update_event_images_updated_at
  BEFORE UPDATE ON public.event_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_post_images_updated_at ON public.post_images;
CREATE TRIGGER update_post_images_updated_at
  BEFORE UPDATE ON public.post_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the setup:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM public.careers;
-- SELECT * FROM storage.buckets WHERE id = 'background-images';
