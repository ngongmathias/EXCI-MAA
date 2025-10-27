-- SQL query to ensure link_url column exists in background_images table
-- Run this in your Supabase SQL editor

-- Check if the column already exists and add it if needed
DO $$
BEGIN
    -- Check if link_url column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'background_images' 
        AND column_name = 'link_url'
    ) THEN
        -- Add the link_url column if it doesn't exist
        ALTER TABLE public.background_images 
        ADD COLUMN link_url text;
        
        RAISE NOTICE 'Added link_url column to background_images table';
    ELSE
        RAISE NOTICE 'link_url column already exists in background_images table';
    END IF;
END $$;

-- Add helpful comment to document the column purpose
COMMENT ON COLUMN public.background_images.link_url IS 'Optional URL to redirect users when they click on the background image in the slideshow';

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'background_images' 
ORDER BY ordinal_position;

-- Optional: Add some sample data for testing
-- Replace 'your-image-id-here' with an actual image ID from your table
-- UPDATE public.background_images 
-- SET link_url = 'https://example.com/your-link' 
-- WHERE id = 'your-image-id-here';

-- Optional: View current data to see which images have links
-- SELECT id, title, link_url, is_active 
-- FROM public.background_images 
-- ORDER BY display_order;