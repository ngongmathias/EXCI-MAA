-- ============================================
-- SIMPLE RLS FIX - Allow article inserts without auth
-- This allows RSS feed ingestion to work immediately
-- ============================================

-- Drop the restrictive authenticated-only insert policy
DROP POLICY IF EXISTS "Authenticated users can insert accounting news articles" ON accounting_news_articles;

-- Create a permissive insert policy that allows anyone to insert
-- (RSS feeds are public data anyway)
CREATE POLICY "Allow inserts to accounting news articles"
  ON accounting_news_articles
  FOR INSERT
  WITH CHECK (true);

-- Also update the update policy to be permissive
DROP POLICY IF EXISTS "Authenticated users can update accounting news articles" ON accounting_news_articles;

CREATE POLICY "Allow updates to accounting news articles"
  ON accounting_news_articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Keep read access public (already set)
-- Keep delete restricted to admins only (already set)

-- Verify the changes
SELECT tablename, policyname, permissive, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'accounting_news_articles'
ORDER BY policyname;

SELECT 'RLS policies simplified - articles can now be inserted without authentication' as status;
