-- ============================================
-- CLEANUP RSS SOURCES - Keep only the most relevant feeds
-- ============================================

-- Disable ALL existing feeds first
UPDATE accounting_news_sources 
SET is_active = false;

-- Keep only the top 5-6 most relevant and working feeds
UPDATE accounting_news_sources 
SET is_active = true 
WHERE name IN (
    'CPA Journal',           -- Professional accounting (30 articles, working)
    'Tax Foundation',        -- Tax policy and news (20 articles, working)
    'Harvard Business Review', -- Business insights
    'Forbes',                -- Business and finance news
    'CNBC'                   -- Financial news
);

-- Show active sources
SELECT name, url, category, is_active 
FROM accounting_news_sources 
WHERE is_active = true
ORDER BY category, name;

SELECT 'RSS sources cleaned up - only working feeds are active' as status;
