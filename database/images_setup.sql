-- ============================================================================
-- EXCI-MAA Image Management System
-- This script sets up storage buckets and tables for managing multiple images
-- for events and blog posts with proper RLS policies
-- ============================================================================

-- ============================================================================
-- STEP 1: Create Storage Buckets
-- ============================================================================

-- Create bucket for event images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-images',
  'event-images',
  true,
  5242880, -- 5MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create bucket for blog post images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-images',
  'post-images',
  true,
  5242880, -- 5MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- STEP 2: Create Tables for Image Management
-- ============================================================================

-- Table to store multiple images for events
CREATE TABLE IF NOT EXISTS public.event_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  caption text,
  is_primary boolean DEFAULT false,
  uploaded_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT event_images_pkey PRIMARY KEY (id),
  CONSTRAINT event_images_event_id_fkey FOREIGN KEY (event_id) 
    REFERENCES public.events(id) ON DELETE CASCADE
);

-- Table to store multiple images for blog posts
CREATE TABLE IF NOT EXISTS public.post_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL,
  image_url text NOT NULL,
  display_order integer DEFAULT 0,
  caption text,
  is_primary boolean DEFAULT false,
  uploaded_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT post_images_pkey PRIMARY KEY (id),
  CONSTRAINT post_images_post_id_fkey FOREIGN KEY (post_id) 
    REFERENCES public.posts(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON public.event_images(event_id);
CREATE INDEX IF NOT EXISTS idx_event_images_display_order ON public.event_images(display_order);
CREATE INDEX IF NOT EXISTS idx_event_images_is_primary ON public.event_images(is_primary);

CREATE INDEX IF NOT EXISTS idx_post_images_post_id ON public.post_images(post_id);
CREATE INDEX IF NOT EXISTS idx_post_images_display_order ON public.post_images(display_order);
CREATE INDEX IF NOT EXISTS idx_post_images_is_primary ON public.post_images(is_primary);

-- ============================================================================
-- STEP 3: Enable Row Level Security (RLS)
-- ============================================================================

ALTER TABLE public.event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_images ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: Create RLS Policies for event_images (Full CRUD for everyone)
-- ============================================================================

-- Policy: Allow everyone to SELECT event images
CREATE POLICY "Allow public read access to event images"
ON public.event_images
FOR SELECT
TO public
USING (true);

-- Policy: Allow everyone to INSERT event images
CREATE POLICY "Allow public insert access to event images"
ON public.event_images
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow everyone to UPDATE event images
CREATE POLICY "Allow public update access to event images"
ON public.event_images
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy: Allow everyone to DELETE event images
CREATE POLICY "Allow public delete access to event images"
ON public.event_images
FOR DELETE
TO public
USING (true);

-- ============================================================================
-- STEP 5: Create RLS Policies for post_images (Full CRUD for everyone)
-- ============================================================================

-- Policy: Allow everyone to SELECT post images
CREATE POLICY "Allow public read access to post images"
ON public.post_images
FOR SELECT
TO public
USING (true);

-- Policy: Allow everyone to INSERT post images
CREATE POLICY "Allow public insert access to post images"
ON public.post_images
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Allow everyone to UPDATE post images
CREATE POLICY "Allow public update access to post images"
ON public.post_images
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Policy: Allow everyone to DELETE post images
CREATE POLICY "Allow public delete access to post images"
ON public.post_images
FOR DELETE
TO public
USING (true);

-- ============================================================================
-- STEP 6: Storage Bucket Policies (Allow public CRUD operations)
-- ============================================================================

-- Event Images Storage Policies
CREATE POLICY "Allow public to view event images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'event-images');

CREATE POLICY "Allow public to upload event images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Allow public to update event images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'event-images')
WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "Allow public to delete event images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'event-images');

-- Post Images Storage Policies
CREATE POLICY "Allow public to view post images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'post-images');

CREATE POLICY "Allow public to upload post images"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "Allow public to update post images"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'post-images')
WITH CHECK (bucket_id = 'post-images');

CREATE POLICY "Allow public to delete post images"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'post-images');

-- ============================================================================
-- STEP 7: Create Helper Functions
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
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

-- Function to ensure only one primary image per event
CREATE OR REPLACE FUNCTION ensure_single_primary_event_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE public.event_images
    SET is_primary = false
    WHERE event_id = NEW.event_id
      AND id != NEW.id
      AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to ensure only one primary image per post
CREATE OR REPLACE FUNCTION ensure_single_primary_post_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE public.post_images
    SET is_primary = false
    WHERE post_id = NEW.post_id
      AND id != NEW.id
      AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for primary image enforcement
DROP TRIGGER IF EXISTS enforce_single_primary_event_image ON public.event_images;
CREATE TRIGGER enforce_single_primary_event_image
  BEFORE INSERT OR UPDATE ON public.event_images
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_event_image();

DROP TRIGGER IF EXISTS enforce_single_primary_post_image ON public.post_images;
CREATE TRIGGER enforce_single_primary_post_image
  BEFORE INSERT OR UPDATE ON public.post_images
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_post_image();

-- ============================================================================
-- STEP 8: Create Views for Easy Querying
-- ============================================================================

-- View to get events with their images
CREATE OR REPLACE VIEW events_with_images AS
SELECT 
  e.*,
  COALESCE(
    json_agg(
      json_build_object(
        'id', ei.id,
        'image_url', ei.image_url,
        'caption', ei.caption,
        'is_primary', ei.is_primary,
        'display_order', ei.display_order
      ) ORDER BY ei.display_order, ei.created_at
    ) FILTER (WHERE ei.id IS NOT NULL),
    '[]'::json
  ) as images,
  (SELECT ei2.image_url FROM public.event_images ei2 
   WHERE ei2.event_id = e.id AND ei2.is_primary = true LIMIT 1) as primary_image
FROM public.events e
LEFT JOIN public.event_images ei ON e.id = ei.event_id
GROUP BY e.id;

-- View to get posts with their images
CREATE OR REPLACE VIEW posts_with_images AS
SELECT 
  p.*,
  COALESCE(
    json_agg(
      json_build_object(
        'id', pi.id,
        'image_url', pi.image_url,
        'caption', pi.caption,
        'is_primary', pi.is_primary,
        'display_order', pi.display_order
      ) ORDER BY pi.display_order, pi.created_at
    ) FILTER (WHERE pi.id IS NOT NULL),
    '[]'::json
  ) as images,
  (SELECT pi2.image_url FROM public.post_images pi2 
   WHERE pi2.post_id = p.id AND pi2.is_primary = true LIMIT 1) as primary_image
FROM public.posts p
LEFT JOIN public.post_images pi ON p.id = pi.post_id
GROUP BY p.id;

-- ============================================================================
-- STEP 9: Sample Data Insertion (Optional - for testing)
-- ============================================================================

-- Insert sample event images (uncomment if needed)
-- INSERT INTO public.event_images (event_id, image_url, display_order, caption, is_primary)
-- VALUES 
--   ('your-event-uuid', 'https://your-supabase-url.supabase.co/storage/v1/object/public/event-images/sample1.jpg', 1, 'Main event photo', true),
--   ('your-event-uuid', 'https://your-supabase-url.supabase.co/storage/v1/object/public/event-images/sample2.jpg', 2, 'Event venue', false);

-- Insert sample post images (uncomment if needed)
-- INSERT INTO public.post_images (post_id, image_url, display_order, caption, is_primary)
-- VALUES 
--   ('your-post-uuid', 'https://your-supabase-url.supabase.co/storage/v1/object/public/post-images/sample1.jpg', 1, 'Featured image', true),
--   ('your-post-uuid', 'https://your-supabase-url.supabase.co/storage/v1/object/public/post-images/sample2.jpg', 2, 'Additional photo', false);

-- ============================================================================
-- VERIFICATION QUERIES (Run these after setup to verify everything works)
-- ============================================================================

-- Check if buckets exist
-- SELECT * FROM storage.buckets WHERE id IN ('event-images', 'post-images');

-- Check if tables exist
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' AND table_name IN ('event_images', 'post_images');

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables 
-- WHERE schemaname = 'public' AND tablename IN ('event_images', 'post_images');

-- Check policies
-- SELECT tablename, policyname, cmd FROM pg_policies 
-- WHERE schemaname = 'public' AND tablename IN ('event_images', 'post_images');

-- ============================================================================
-- NOTES:
-- ============================================================================
-- 1. This setup allows EVERYONE to perform CRUD operations (as requested)
-- 2. RLS is enabled but policies allow public access
-- 3. Storage buckets are public and allow all operations
-- 4. Primary image constraint ensures only one primary image per event/post
-- 5. Images are ordered by display_order for consistent presentation
-- 6. Cascade delete ensures images are removed when parent is deleted
-- 7. Views make it easy to query events/posts with their images
-- ============================================================================
