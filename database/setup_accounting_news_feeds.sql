-- ============================================
-- ACCOUNTING NEWS FEEDS SETUP
-- Tailored for accounting/financial industry sources
-- ============================================

-- Step 1: Create accounting news sources table
CREATE TABLE IF NOT EXISTS accounting_news_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'ifac', 'iasb', 'fasb', 'accounting', 'audit', 'tax', etc.
  description TEXT,
  language TEXT DEFAULT 'en',
  country_code TEXT,
  is_active BOOLEAN DEFAULT true,
  fetch_interval_minutes INTEGER DEFAULT 180, -- 3 hours default
  last_fetched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create accounting news articles cache table
CREATE TABLE IF NOT EXISTS accounting_news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  link TEXT NOT NULL,
  description TEXT,
  content TEXT,
  pub_date TIMESTAMP WITH TIME ZONE NOT NULL,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT DEFAULT 'en',
  author TEXT,
  image_url TEXT,
  tags TEXT[], -- PostgreSQL array for tags like ['IFRS', 'Audit', 'Compliance']
  guid TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes
CREATE INDEX IF NOT EXISTS idx_accounting_news_sources_category ON accounting_news_sources(category);
CREATE INDEX IF NOT EXISTS idx_accounting_news_sources_active ON accounting_news_sources(is_active);
CREATE INDEX IF NOT EXISTS idx_accounting_news_articles_category ON accounting_news_articles(category);
CREATE INDEX IF NOT EXISTS idx_accounting_news_articles_pub_date ON accounting_news_articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_accounting_news_articles_source ON accounting_news_articles(source);
CREATE INDEX IF NOT EXISTS idx_accounting_news_articles_guid ON accounting_news_articles(guid);
CREATE INDEX IF NOT EXISTS idx_accounting_news_articles_tags ON accounting_news_articles USING GIN(tags);

-- Step 4: Enable RLS
ALTER TABLE accounting_news_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounting_news_articles ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policies
DROP POLICY IF EXISTS "Public can read active accounting news sources" ON accounting_news_sources;
CREATE POLICY "Public can read active accounting news sources"
  ON accounting_news_sources FOR SELECT
  TO public
  USING (is_active = true);

DROP POLICY IF EXISTS "Public can read accounting news articles" ON accounting_news_articles;
CREATE POLICY "Public can read accounting news articles"
  ON accounting_news_articles FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Service role has full access to accounting news sources" ON accounting_news_sources;
CREATE POLICY "Service role has full access to accounting news sources"
  ON accounting_news_sources FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role has full access to accounting news articles" ON accounting_news_articles;
CREATE POLICY "Service role has full access to accounting news articles"
  ON accounting_news_articles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 6: Insert major accounting/financial news sources
INSERT INTO accounting_news_sources (name, url, category, description, language, is_active) VALUES
-- IFAC (International Federation of Accountants)
('IFAC News', 'https://www.ifac.org/news/rss.xml', 'ifac', 'Official IFAC news and updates', 'en', true),
('IFAC Blogs', 'https://www.ifac.org/blog/rss.xml', 'ifac', 'IFAC blog posts and insights', 'en', true),

-- IASB (International Accounting Standards Board)
('IASB Updates', 'https://www.ifrs.org/rss/iasb-updates.xml', 'iasb', 'IASB standards updates and projects', 'en', true),
('IFRS Foundation News', 'https://www.ifrs.org/rss/news.xml', 'ifrs', 'IFRS Foundation news and announcements', 'en', true),

-- FASB (Financial Accounting Standards Board)
('FASB News', 'https://www.fasb.org/rss/news.xml', 'fasb', 'FASB news and updates', 'en', true),
('FASB Updates', 'https://www.fasb.org/rss/project-updates.xml', 'fasb', 'FASB project updates', 'en', true),

-- Major Accounting Publications
('Accounting Today', 'https://www.accountingtoday.com/feed/', 'accounting', 'Latest accounting news and analysis', 'en', true),
('Journal of Accountancy', 'https://www.journalofaccountancy.com/feed/', 'accounting', 'AICPA official journal', 'en', true),
('CPA Journal', 'https://www.cpajournal.com/feed/', 'accounting', 'New York State Society of CPAs', 'en', true),

-- Audit & Compliance
('Internal Auditor', 'https://global.theiia.org/rss.xml', 'audit', 'IIA internal audit news', 'en', true),
('Compliance Week', 'https://www.complianceweek.com/feed/', 'compliance', 'Compliance and risk management', 'en', true),

-- Tax News
('Tax Foundation', 'https://taxfoundation.org/feed/', 'tax', 'Tax policy and research', 'en', true),
('Tax Notes', 'https://www.taxnotes.com/feed', 'tax', 'Federal and state tax news', 'en', true),

-- Financial News (Accounting Focus)
('SEC Enforcement', 'https://www.sec.gov/news/pressrelease/rss.xml', 'regulatory', 'SEC enforcement and accounting actions', 'en', true),
('PCAOB News', 'https://pcaobus.org/news-events/rss.xml', 'regulatory', 'PCAOB audit standards updates', 'en', true),

-- International Accounting
('Accounting & Business', 'https://www.accaglobal.com/en/rss.xml', 'accounting', 'ACCA global accounting news', 'en', true),
('CIMA News', 'https://www.cimaglobal.com/News/RSS', 'accounting', 'CIMA management accounting news', 'en', true),

-- African Accounting News
('SAICA News', 'https://www.saica.co.za/feed/', 'accounting', 'South African Institute news', 'en', true),

-- General Business (Accounting Relevant)
('Harvard Business Review', 'https://hbr.org/feed', 'business', 'Business and finance insights', 'en', true),
('Financial Times', 'https://www.ft.com/rss/home', 'business', 'Global financial news', 'en', true)

ON CONFLICT (url) DO NOTHING;

-- Step 7: Create function to clean old accounting news articles
CREATE OR REPLACE FUNCTION clean_old_accounting_news()
RETURNS void AS $$
BEGIN
  DELETE FROM accounting_news_articles
  WHERE pub_date < NOW() - INTERVAL '60 days';
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create function to get news by category
CREATE OR REPLACE FUNCTION get_accounting_news_by_category(
  p_category TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 20,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  link TEXT,
  description TEXT,
  pub_date TIMESTAMP WITH TIME ZONE,
  source TEXT,
  category TEXT,
  author TEXT,
  image_url TEXT,
  tags TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ana.id,
    ana.title,
    ana.link,
    ana.description,
    ana.pub_date,
    ana.source,
    ana.category,
    ana.author,
    ana.image_url,
    ana.tags
  FROM accounting_news_articles ana
  WHERE 
    (p_category IS NULL OR ana.category = p_category)
    AND ana.pub_date >= NOW() - INTERVAL '30 days'
  ORDER BY ana.pub_date DESC
  LIMIT p_limit OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create function to get featured accounting news
CREATE OR REPLACE FUNCTION get_featured_accounting_news(
  p_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  link TEXT,
  description TEXT,
  pub_date TIMESTAMP WITH TIME ZONE,
  source TEXT,
  category TEXT,
  author TEXT,
  image_url TEXT,
  tags TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ana.id,
    ana.title,
    ana.link,
    ana.description,
    ana.pub_date,
    ana.source,
    ana.category,
    ana.author,
    ana.image_url,
    ana.tags
  FROM accounting_news_articles ana
  WHERE 
    ana.category IN ('ifac', 'iasb', 'fasb', 'regulatory')
    AND ana.pub_date >= NOW() - INTERVAL '7 days'
  ORDER BY ana.pub_date DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Step 10: Verify setup
SELECT 'Accounting News Sources Created:' as status, COUNT(*) as count FROM accounting_news_sources;
SELECT 'Categories Available:' as status, array_agg(DISTINCT category) as categories FROM accounting_news_sources;

-- ============================================
-- SETUP COMPLETE! 🎉
-- 
-- ✅ ACCOUNTING-SPECIFIC SOURCES:
-- - IFAC, IASB, FASB feeds
-- - Major accounting publications
-- - Audit and compliance sources
-- - Tax and regulatory news
-- - African accounting sources
-- 
-- Next Steps:
-- 1. Create news fetcher service
-- 2. Create admin panel to refresh feeds
-- 3. Create news display components
-- 4. Add "Insights" page to navbar
-- 
-- Categories available:
-- - ifac, iasb, fasb, accounting, audit, tax, regulatory, compliance, business
-- ============================================
