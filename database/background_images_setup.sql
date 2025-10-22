-- =====================================================
-- Background Images Storage & Table Setup
-- =====================================================
-- This script creates storage buckets and tables for managing
-- background slideshow images with full CRUD access
-- =====================================================

-- 1. Create storage bucket for background images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'background-images',
  'background-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Create background_images table
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

-- 3. Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_background_images_active ON public.background_images(is_active);
CREATE INDEX IF NOT EXISTS idx_background_images_order ON public.background_images(display_order);
CREATE INDEX IF NOT EXISTS idx_background_images_created_at ON public.background_images(created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.background_images ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies for PUBLIC CRUD access
-- Allow public SELECT (read) access to active images
CREATE POLICY "Public read access to active background images"
  ON public.background_images
  FOR SELECT
  USING (is_active = true);

-- Allow public SELECT (read) access to all images (for admin)
CREATE POLICY "Public read all background images"
  ON public.background_images
  FOR SELECT
  USING (true);

-- Allow public INSERT access
CREATE POLICY "Public insert access to background images"
  ON public.background_images
  FOR INSERT
  WITH CHECK (true);

-- Allow public UPDATE access
CREATE POLICY "Public update access to background images"
  ON public.background_images
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow public DELETE access
CREATE POLICY "Public delete access to background images"
  ON public.background_images
  FOR DELETE
  USING (true);

-- 6. Storage Policies for background-images bucket
-- Allow public to read files
CREATE POLICY "Public read access to background images storage"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'background-images');

-- Allow public to upload files
CREATE POLICY "Public insert access to background images storage"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'background-images');

-- Allow public to update files
CREATE POLICY "Public update access to background images storage"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'background-images')
  WITH CHECK (bucket_id = 'background-images');

-- Allow public to delete files
CREATE POLICY "Public delete access to background images storage"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'background-images');

-- 7. Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_background_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_background_images_updated_at ON public.background_images;
CREATE TRIGGER trigger_update_background_images_updated_at
  BEFORE UPDATE ON public.background_images
  FOR EACH ROW
  EXECUTE FUNCTION update_background_images_updated_at();

-- 9. Insert some sample background images (optional - remove in production)
-- INSERT INTO public.background_images (title, description, image_url, display_order, is_active)
-- VALUES 
--   ('Welcome Background', 'Main hero background image', 'https://images.unsplash.com/photo-1497366216548-37526070297c', 1, true),
--   ('Services Background', 'Professional office setting', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2', 2, true),
--   ('Team Background', 'Collaborative workspace', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c', 3, true);

-- 10. Create view for active backgrounds ordered by display_order
CREATE OR REPLACE VIEW active_background_images AS
SELECT 
  id,
  image_url,
  title,
  description,
  display_order,
  created_at
FROM public.background_images
WHERE is_active = true
ORDER BY display_order ASC, created_at DESC;

-- Grant access to the view
GRANT SELECT ON active_background_images TO anon;
GRANT SELECT ON active_background_images TO authenticated;

-- =====================================================
-- Verification Queries (Run these to check setup)
-- =====================================================

-- Check if bucket exists
-- SELECT * FROM storage.buckets WHERE id = 'background-images';

-- Check if table exists
-- SELECT * FROM information_schema.tables WHERE table_name = 'background_images';

-- Check policies
-- SELECT * FROM pg_policies WHERE tablename = 'background_images';

-- View all background images
-- SELECT * FROM public.background_images ORDER BY display_order;

-- View only active backgrounds
-- SELECT * FROM active_background_images;

-- =====================================================
-- Cleanup Queries (Use only if you need to remove everything)
-- =====================================================

-- DROP VIEW IF EXISTS active_background_images;
-- DROP TRIGGER IF EXISTS trigger_update_background_images_updated_at ON public.background_images;
-- DROP FUNCTION IF EXISTS update_background_images_updated_at();
-- DROP TABLE IF EXISTS public.background_images CASCADE;
-- DELETE FROM storage.buckets WHERE id = 'background-images';
