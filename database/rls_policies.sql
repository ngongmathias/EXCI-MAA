-- Row Level Security Policies for EXCI-MAA
-- Run this in your Supabase SQL Editor

-- First, check current RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Option 1: Disable RLS completely (for development/testing)
-- Uncomment the following lines if you want to disable RLS:

-- ALTER TABLE public.careers DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.services DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.posts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.contact_submissions DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.consultation_requests DISABLE ROW LEVEL SECURITY;

-- Option 2: Enable RLS with public read access
-- Uncomment the following lines if you want public read access:

-- Enable RLS on all tables
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON public.careers
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.services
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.events
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.contact_submissions
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.consultation_requests
    FOR SELECT USING (true);

-- Allow public insert/update/delete for admin operations
-- (You may want to restrict these based on your needs)
CREATE POLICY "Allow public write access" ON public.careers
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.services
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.events
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.posts
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.comments
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.contact_submissions
    FOR ALL USING (true);

CREATE POLICY "Allow public write access" ON public.consultation_requests
    FOR ALL USING (true);
