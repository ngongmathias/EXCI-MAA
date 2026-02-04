/**
 * Accounting News Service
 * 
 * Fetches and caches accounting/financial news from industry sources
 * Supports RSS feeds from IFAC, IASB, FASB, and major accounting publications
 */

import { supabase } from './supabaseClient';

export interface AccountingNewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  author?: string;
  imageUrl?: string;
  tags?: string[];
  content?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
  isActive: boolean;
}

// ============================================
// RSS FEED PARSER
// ============================================
export const parseRSSFeed = async (xmlString: string): Promise<AccountingNewsArticle[]> => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  
  const items = xmlDoc.querySelectorAll('item');
  const articles: AccountingNewsArticle[] = [];

  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent?.trim();
    const link = item.querySelector('link')?.textContent?.trim();
    const description = item.querySelector('description')?.textContent?.trim();
    const pubDate = item.querySelector('pubDate')?.textContent?.trim();
    const author = item.querySelector('author')?.textContent?.trim();
    const guid = item.querySelector('guid')?.textContent?.trim();

    if (title && link) {
      // Extract image from description if present
      let imageUrl: string | undefined;
      if (description) {
        const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        }
      }

      // Clean description (remove HTML tags)
      let cleanDescription = description;
      if (description) {
        cleanDescription = description.replace(/<[^>]*>/g, '').trim();
      }

      // Extract tags from title/description
      const tags = extractAccountingTags(title + ' ' + (cleanDescription || ''));

      articles.push({
        id: guid || link,
        title,
        description: cleanDescription || '',
        link,
        pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
        author,
        imageUrl,
        tags,
        source: '', // Will be set by fetcher
        category: '', // Will be set by fetcher
        content: cleanDescription
      });
    }
  });

  return articles;
};

// ============================================
// ACCOUNTING TAGS EXTRACTOR
// ============================================
export const extractAccountingTags = (text: string): string[] => {
  const accountingKeywords = [
    // Standards & Frameworks
    'IFRS', 'GAAP', 'IFRS 17', 'IFRS 9', 'IFRS 16', 'IFRS 15', 'SAS', 'SOX', 'Sarbanes-Oxley',
    'IASB', 'FASB', 'IFAC', 'PCAOB', 'SEC', 'ESMA', 'FRC', 'ASBJ', 'MCA',
    
    // Accounting Topics
    'Financial Reporting', 'Audit', 'Assurance', 'Tax', 'Compliance', 'Risk Management',
    'Internal Audit', 'External Audit', 'Forensic Accounting', 'Management Accounting',
    'Cost Accounting', 'Government Accounting', 'Nonprofit Accounting',
    
    // Specific Areas
    'Revenue Recognition', 'Lease Accounting', 'Financial Instruments',
    'Consolidation', 'M&A', 'Due Diligence', 'Internal Controls', 'COSO',
    'XBRL', 'Digital Reporting', 'ESG', 'Sustainability Reporting',
    
    // Regulations
    'Dodd-Frank', 'MiFID II', 'GDPR', 'Anti-Money Laundering', 'AML', 'KYC',
    'Basel III', 'Solvent', 'Regulatory Reporting',
    
    // Professional Qualifications
    'CPA', 'CA', 'ACCA', 'CIMA', 'CMA', 'CIA', 'CFE', 'CISA',
    
    // Industries
    'Banking', 'Insurance', 'Investment Management', 'Real Estate',
    'Healthcare', 'Technology', 'Manufacturing', 'Energy', 'Mining'
  ];

  const tags: string[] = [];
  const upperText = text.toUpperCase();

  accountingKeywords.forEach(keyword => {
    if (upperText.includes(keyword.toUpperCase())) {
      tags.push(keyword);
    }
  });

  return [...new Set(tags)]; // Remove duplicates
};

// ============================================
// NEWS FETCHER
// ============================================
export const fetchAccountingNewsFromSource = async (source: NewsSource): Promise<AccountingNewsArticle[]> => {
  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'EXCI-MAA Accounting News Aggregator (+https://excimaa.ca)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const articles = await parseRSSFeed(xmlText);

    // Add source and category to each article
    return articles.map(article => ({
      ...article,
      source: source.name,
      category: source.category
    }));
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return [];
  }
};

// ============================================
// BATCH FETCHER (All Sources)
// ============================================
export const fetchAllAccountingNews = async (): Promise<{
  success: boolean;
  articlesAdded: number;
  errors: string[];
  sourcesProcessed: number;
}> => {
  try {
    // Get all active sources
    const { data: sources, error: sourcesError } = await supabase
      .from('accounting_news_sources')
      .select('*')
      .eq('is_active', true);

    if (sourcesError) throw sourcesError;

    let totalArticles = 0;
    const errors: string[] = [];
    let sourcesProcessed = 0;

    // Fetch from each source
    for (const source of sources || []) {
      try {
        console.log(`Fetching from ${source.name}...`);
        const articles = await fetchAccountingNewsFromSource(source);

        // Cache articles in database
        for (const article of articles) {
          const { error } = await supabase
            .from('accounting_news_articles')
            .upsert({
              title: article.title,
              link: article.link,
              description: article.description,
              content: article.content,
              pub_date: article.pubDate,
              source: article.source,
              category: article.category,
              author: article.author,
              image_url: article.imageUrl,
              tags: article.tags,
              guid: article.id,
              language: 'en'
            }, {
              onConflict: 'guid',
              ignoreDuplicates: true,
            });

          if (!error) {
            totalArticles++;
          }
        }

        // Update source last fetched time
        await supabase
          .from('accounting_news_sources')
          .update({ last_fetched_at: new Date().toISOString() })
          .eq('id', source.id);

        sourcesProcessed++;
        console.log(`✅ ${source.name}: ${articles.length} articles`);
      } catch (error) {
        console.error(`Error processing ${source.name}:`, error);
        errors.push(`${source.name}: ${error}`);
      }
    }

    // Clean old articles
    await supabase.rpc('clean_old_accounting_news');

    return {
      success: true,
      articlesAdded: totalArticles,
      errors,
      sourcesProcessed
    };
  } catch (error) {
    console.error('Error in fetchAllAccountingNews:', error);
    return {
      success: false,
      articlesAdded: 0,
      errors: [String(error)],
      sourcesProcessed: 0
    };
  }
};

// ============================================
// GETTERS FOR DISPLAY
// ============================================
export const getAccountingNewsByCategory = async (
  category?: string,
  limit: number = 20,
  offset: number = 0
): Promise<AccountingNewsArticle[]> => {
  try {
    const { data, error } = await supabase
      .rpc('get_accounting_news_by_category', {
        p_category: category,
        p_limit: limit,
        p_offset: offset
      });

    if (error) throw error;

    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      pubDate: article.pub_date,
      source: article.source,
      category: article.category,
      author: article.author,
      imageUrl: article.image_url,
      tags: article.tags
    }));
  } catch (error) {
    console.error('Error getting accounting news by category:', error);
    return [];
  }
};

export const getFeaturedAccountingNews = async (limit: number = 5): Promise<AccountingNewsArticle[]> => {
  try {
    const { data, error } = await supabase
      .rpc('get_featured_accounting_news', {
        p_limit: limit
      });

    if (error) throw error;

    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      pubDate: article.pub_date,
      source: article.source,
      category: article.category,
      author: article.author,
      imageUrl: article.image_url,
      tags: article.tags
    }));
  } catch (error) {
    console.error('Error getting featured accounting news:', error);
    return [];
  }
};

export const getAccountingNewsSources = async (): Promise<NewsSource[]> => {
  try {
    const { data, error } = await supabase
      .from('accounting_news_sources')
      .select('id, name, url, category, description, is_active')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;

    return (data || []).map(source => ({
      id: source.id,
      name: source.name,
      url: source.url,
      category: source.category,
      description: source.description || '',
      isActive: source.is_active
    }));
  } catch (error) {
    console.error('Error getting accounting news sources:', error);
    return [];
  }
};

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
export const searchAccountingNews = async (
  query: string,
  limit: number = 20
): Promise<AccountingNewsArticle[]> => {
  try {
    const { data, error } = await supabase
      .from('accounting_news_articles')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('pub_date', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      pubDate: article.pub_date,
      source: article.source,
      category: article.category,
      author: article.author,
      imageUrl: article.image_url,
      tags: article.tags
    }));
  } catch (error) {
    console.error('Error searching accounting news:', error);
    return [];
  }
};

// ============================================
// CATEGORIES
// ============================================
export const ACCOUNTING_NEWS_CATEGORIES = [
  { value: 'ifac', label: 'IFAC', description: 'International Federation of Accountants' },
  { value: 'iasb', label: 'IASB/IFRS', description: 'International Accounting Standards Board' },
  { value: 'fasb', label: 'FASB/GAAP', description: 'Financial Accounting Standards Board' },
  { value: 'accounting', label: 'Accounting', description: 'General accounting news' },
  { value: 'audit', label: 'Audit', description: 'Internal and external audit' },
  { value: 'tax', label: 'Tax', description: 'Taxation and tax policy' },
  { value: 'regulatory', label: 'Regulatory', description: 'SEC, PCAOB, and regulatory bodies' },
  { value: 'compliance', label: 'Compliance', description: 'Compliance and risk management' },
  { value: 'business', label: 'Business', description: 'General business and finance' }
];
