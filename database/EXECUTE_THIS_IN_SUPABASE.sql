-- =====================================================
-- QUICK SETUP: Background Images System
-- Copy and paste this entire file into Supabase SQL Editor
-- =====================================================

-- Step 1: Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'background-images',
  'background-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Create table
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

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_background_images_active ON public.background_images(is_active);
CREATE INDEX IF NOT EXISTS idx_background_images_order ON public.background_images(display_order);
CREATE INDEX IF NOT EXISTS idx_background_images_created_at ON public.background_images(created_at DESC);

-- Step 4: Enable RLS
ALTER TABLE public.background_images ENABLE ROW LEVEL SECURITY;

-- Step 5: Database policies
CREATE POLICY "Public read all background images" ON public.background_images FOR SELECT USING (true);
CREATE POLICY "Public insert access to background images" ON public.background_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access to background images" ON public.background_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public delete access to background images" ON public.background_images FOR DELETE USING (true);

-- Step 6: Storage policies
CREATE POLICY "Public read access to background images storage" ON storage.objects FOR SELECT USING (bucket_id = 'background-images');
CREATE POLICY "Public insert access to background images storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'background-images');
CREATE POLICY "Public update access to background images storage" ON storage.objects FOR UPDATE USING (bucket_id = 'background-images') WITH CHECK (bucket_id = 'background-images');
CREATE POLICY "Public delete access to background images storage" ON storage.objects FOR DELETE USING (bucket_id = 'background-images');

-- Step 7: Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_background_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create trigger
DROP TRIGGER IF EXISTS trigger_update_background_images_updated_at ON public.background_images;
CREATE TRIGGER trigger_update_background_images_updated_at
  BEFORE UPDATE ON public.background_images
  FOR EACH ROW
  EXECUTE FUNCTION update_background_images_updated_at();

-- Step 9: Create view for active images
CREATE OR REPLACE VIEW active_background_images AS
SELECT id, image_url, title, description, display_order, created_at
FROM public.background_images
WHERE is_active = true
ORDER BY display_order ASC, created_at DESC;

-- Step 10: Grant view access
GRANT SELECT ON active_background_images TO anon;
GRANT SELECT ON active_background_images TO authenticated;

-- =====================================================
-- VERIFICATION: Run these queries to confirm setup
-- =====================================================
-- SELECT * FROM storage.buckets WHERE id = 'background-images';
-- SELECT * FROM public.background_images;
-- SELECT * FROM active_background_images;
