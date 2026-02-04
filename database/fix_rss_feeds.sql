-- ============================================
-- FIX RSS FEEDS - Replace problematic sources with working ones
-- ============================================

-- Update problematic RSS sources with working URLs or CORS proxy
UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.cimaglobal.com/News/RSS'
WHERE name = 'CIMA News';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.saica.co.za/feed/'
WHERE name = 'SAICA News';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.complianceweek.com/feed/'
WHERE name = 'Compliance Week';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.taxnotes.com/feed'
WHERE name = 'Tax Notes';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://pcaobus.org/news-events/rss.xml'
WHERE name = 'PCAOB News';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.accaglobal.com/en/rss.xml'
WHERE name = 'Accounting & Business';

UPDATE accounting_news_sources 
SET url = 'https://api.allorigins.win/raw?url=https://www.ft.com/rss/home'
WHERE name = 'Financial Times';

-- Add some additional working RSS sources
INSERT INTO accounting_news_sources (name, url, category, description, language, is_active) VALUES
('Forbes', 'https://www.forbes.com/feed/', 'business', 'Business and financial news', 'en', true),
('Wall Street Journal', 'https://api.allorigins.win/raw?url=https://feeds.wsjonline.com/wsj/xml/rss/3_7011.xml', 'business', 'WSJ business news', 'en', true),
('Reuters Business', 'https://www.reuters.com/business/', 'business', 'Reuters business news', 'en', true),
('Bloomberg', 'https://www.bloomberg.com/feed', 'business', 'Bloomberg business news', 'en', true),
('CNBC', 'https://www.cnbc.com/id/100003114/device/rss/rss.html', 'business', 'CNBC business news', 'en', true)
ON CONFLICT (url) DO NOTHING;

-- Disable sources that consistently fail
UPDATE accounting_news_sources 
SET is_active = false 
WHERE name IN ('FASB News', 'FASB Updates') AND url LIKE 'https://www.fasb.org%';

-- Verify the changes
SELECT name, url, category, is_active FROM accounting_news_sources 
ORDER BY category, name;

SELECT 'RSS feeds updated successfully' as status;
