-- ============================================
-- FIX RLS POLICIES FOR ACCOUNTING NEWS ARTICLES
-- Allow authenticated users to insert/update articles
-- ============================================

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can read accounting news articles" ON accounting_news_articles;
DROP POLICY IF EXISTS "Admins can insert accounting news articles" ON accounting_news_articles;
DROP POLICY IF EXISTS "Admins can update accounting news articles" ON accounting_news_articles;
DROP POLICY IF EXISTS "Admins can delete accounting news articles" ON accounting_news_articles;

-- Create new permissive policies
-- Policy: Anyone can read articles (public access)
CREATE POLICY "Public read access to accounting news articles"
  ON accounting_news_articles
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert articles (for RSS feed ingestion)
CREATE POLICY "Authenticated users can insert accounting news articles"
  ON accounting_news_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update articles (for RSS feed updates)
CREATE POLICY "Authenticated users can update accounting news articles"
  ON accounting_news_articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only admins can delete articles
CREATE POLICY "Admins can delete accounting news articles"
  ON accounting_news_articles
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND is_active = true
    )
  );

-- Also fix the news sources table policies
DROP POLICY IF EXISTS "Users can read accounting news sources" ON accounting_news_sources;
DROP POLICY IF EXISTS "Admins can manage accounting news sources" ON accounting_news_sources;

-- Policy: Anyone can read sources
CREATE POLICY "Public read access to accounting news sources"
  ON accounting_news_sources
  FOR SELECT
  USING (true);

-- Policy: Admins can manage sources
CREATE POLICY "Admins can manage accounting news sources"
  ON accounting_news_sources
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()::text
      AND is_active = true
    )
  );

-- Verify the policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('accounting_news_articles', 'accounting_news_sources')
ORDER BY tablename, policyname;

SELECT 'RLS policies updated successfully - articles can now be inserted' as status;
