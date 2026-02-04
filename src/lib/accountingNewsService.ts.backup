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
  
  // Check for XML parsing errors
  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    console.error('❌ DEBUG: XML parsing error:', parseError.textContent);
    return [];
  }

  // Try different RSS formats
  let items = xmlDoc.querySelectorAll('item');
  if (items.length === 0) {
    items = xmlDoc.querySelectorAll('entry'); // Atom feed format
  }
  if (items.length === 0) {
    console.warn('⚠️ DEBUG: No items found in RSS feed');
    console.log('🔍 DEBUG: XML structure:', xmlDoc.documentElement.tagName);
    console.log('🔍 DEBUG: All child elements:', Array.from(xmlDoc.documentElement.children).map(el => el.tagName));
    return [];
  }

  console.log(`📰 DEBUG: Found ${items.length} items in RSS feed`);

  const articles: AccountingNewsArticle[] = [];

  items.forEach((item, index) => {
    try {
      const title = item.querySelector('title')?.textContent?.trim();
      const link = item.querySelector('link')?.textContent?.trim() || 
                   item.querySelector('link')?.getAttribute('href')?.trim(); // Atom format
      const description = item.querySelector('description')?.textContent?.trim() ||
                        item.querySelector('summary')?.textContent?.trim(); // Atom format
      const pubDate = item.querySelector('pubDate')?.textContent?.trim() ||
                    item.querySelector('published')?.textContent?.trim() || // Atom format
                    item.querySelector('updated')?.textContent?.trim(); // Atom format
      const author = item.querySelector('author')?.textContent?.trim() ||
                   item.querySelector('name')?.textContent?.trim(); // Atom format
      const guid = item.querySelector('guid')?.textContent?.trim() ||
                 item.querySelector('id')?.textContent?.trim() || // Atom format
                 link; // Fallback to link

      if (title && link) {
        // Extract image from description if present
        let imageUrl: string | undefined;
        if (description) {
          // Try multiple image extraction patterns
          const imgPatterns = [
            /<img[^>]+src="([^">]+)"/i,
            /<img[^>]+src='([^'>]+)'/i,
            /<enclosure[^>]+url="([^">]+)"/i, // Media RSS
          ];
          
          for (const pattern of imgPatterns) {
            const match = description.match(pattern);
            if (match) {
              imageUrl = match[1];
              break;
            }
          }
        }

        // Clean description (remove HTML tags)
        let cleanDescription = description;
        if (description) {
          cleanDescription = description
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
            .replace(/&amp;/g, '&') // Replace HTML entities
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();
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
      } else {
        console.warn(`⚠️ DEBUG: Skipping item ${index} - missing title or link`, { title, link });
      }
    } catch (error) {
      console.error(`❌ DEBUG: Error parsing item ${index}:`, error);
    }
  });

  console.log(`✅ DEBUG: Successfully parsed ${articles.length} articles from ${items.length} items`);
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
    console.log(`🌐 DEBUG: Fetching RSS from ${source.url}...`);
    console.log(`📋 DEBUG: Source info: ${source.name} (${source.category})`);
    
    let response: Response | null = null;
    let directFetchFailed = false;
    
    // Try direct fetch first
    try {
      response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml',
        },
      });
      
      console.log(`📡 DEBUG: First attempt - HTTP Status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        directFetchFailed = true;
      }
    } catch (directError) {
      console.log(`⚠️ DEBUG: Direct fetch failed (likely CORS): ${directError.message}`);
      directFetchFailed = true;
    }
    
    // If direct fetch failed, try CORS proxies
    if (directFetchFailed || !response) {
      console.log(`🔄 DEBUG: Trying CORS proxies...`);
      
      // Try multiple CORS proxies in order
      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(source.url)}`,
        `https://corsproxy.io/?${encodeURIComponent(source.url)}`,
        `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(source.url)}`
      ];
      
      for (const proxyUrl of proxyUrls) {
        try {
          console.log(`🔄 DEBUG: Trying proxy: ${proxyUrl.substring(0, 60)}...`);
          response = await fetch(proxyUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
              'Accept': 'application/rss+xml, application/xml, text/xml, */*',
            },
          });
          
          console.log(`📡 DEBUG: Proxy attempt - HTTP Status: ${response.status} ${response.statusText}`);
          
          if (response.ok) {
            console.log(`✅ DEBUG: Proxy worked!`);
            break;
          }
        } catch (proxyError) {
          console.log(`❌ DEBUG: Proxy failed: ${proxyError.message}`);
          continue;
        }
      }
    }
    
    if (!response || !response.ok) {
      console.error(`❌ DEBUG: All attempts failed for ${source.url}`);
      return [];
    }

    const xmlText = await response.text();
    console.log(`📄 DEBUG: Got ${xmlText.length} characters of XML from ${source.name}`);
    console.log(`🔍 DEBUG: First 200 chars:`, xmlText.substring(0, 200));

    // Check if we got valid XML
    if (!xmlText || xmlText.trim().length === 0) {
      console.error(`❌ DEBUG: Empty response from ${source.url}`);
      return [];
    }

    // Check if it's HTML instead of XML (common issue)
    if (xmlText.toLowerCase().includes('<html') || xmlText.toLowerCase().includes('<!doctype html')) {
      console.error(`❌ DEBUG: Got HTML instead of XML from ${source.url}`);
      console.log(`📄 DEBUG: Full response:`, xmlText);
      return [];
    }

    // Parse RSS feed
    const articles = await parseRSSFeed(xmlText);
    console.log(`📰 DEBUG: Parsed ${articles.length} articles from ${source.name}`);

    // Add source and category to each article
    const result = articles.map(article => ({
      ...article,
      source: source.name,
      category: source.category
    }));
    
    console.log(`✅ DEBUG: Processed ${result.length} articles for ${source.name}`);
    if (result.length > 0) {
      console.log(`📰 DEBUG: First article:`, result[0]);
    }
    return result;
  } catch (error) {
    console.error(`❌ DEBUG: Error fetching from ${source.name}:`, error);
    console.error(`❌ DEBUG: Full error:`, error.stack);
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
    console.log('🔄 DEBUG: Starting fetchAllAccountingNews...');
    
    // Get all active sources
    const { data: sources, error: sourcesError } = await supabase
      .from('accounting_news_sources')
      .select('*')
      .eq('is_active', true);

    if (sourcesError) {
      console.error('❌ DEBUG: Error fetching sources:', sourcesError);
      throw sourcesError;
    }

    console.log(`📊 DEBUG: Found ${sources?.length || 0} active sources:`, sources?.map(s => s.name));

    let totalArticles = 0;
    const errors: string[] = [];
    let sourcesProcessed = 0;

    // Fetch from each source
    for (const source of sources || []) {
      try {
        console.log(`🔍 DEBUG: Fetching from ${source.name} (${source.url})...`);
        const articles = await fetchAccountingNewsFromSource(source);
        
        console.log(`📰 DEBUG: Got ${articles.length} articles from ${source.name}`);

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
          } else {
            console.error(`❌ DEBUG: Error upserting article:`, error);
          }
        }

        // Update source last fetched time
        await supabase
          .from('accounting_news_sources')
          .update({ last_fetched_at: new Date().toISOString() })
          .eq('id', source.id);

        sourcesProcessed++;
        console.log(`✅ DEBUG: ${source.name}: ${articles.length} articles processed`);
      } catch (error) {
        console.error(`❌ DEBUG: Error processing ${source.name}:`, error);
        errors.push(`${source.name}: ${error}`);
      }
    }

    // Clean old articles
    console.log('🧹 DEBUG: Cleaning old articles...');
    await supabase.rpc('clean_old_accounting_news');

    console.log(`🎉 DEBUG: Fetch complete. ${totalArticles} articles added, ${sourcesProcessed} sources processed`);
    
    return {
      success: true,
      articlesAdded: totalArticles,
      errors,
      sourcesProcessed
    };
  } catch (error) {
    console.error('❌ DEBUG: Error in fetchAllAccountingNews:', error);
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
    console.log('🔍 DEBUG: Fetching accounting news with params:', { category, limit, offset });
    
    let query = supabase
      .from('accounting_news_articles')
      .select('*')
      .order('pub_date', { ascending: false });

    if (category && category !== '') {
      query = query.eq('category', category);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .limit(limit);

    console.log('🔍 DEBUG: Query result:', { data, error, dataLength: data?.length });

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    const result = (data || []).map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      pubDate: article.pub_date,
      source: article.source,
      category: article.category,
      author: article.author,
      imageUrl: article.image_url,
      tags: article.tags || []
    }));

    console.log('🔍 DEBUG: Mapped result:', { resultLength: result.length, firstArticle: result[0] });
    return result;
  } catch (error) {
    console.error('Error getting accounting news by category:', error);
    return [];
  }
};

export const getFeaturedAccountingNews = async (limit: number = 5): Promise<AccountingNewsArticle[]> => {
  try {
    console.log('🔍 DEBUG: Fetching featured accounting news with limit:', limit);
    
    const { data, error } = await supabase
      .from('accounting_news_articles')
      .select('*')
      .in('category', ['ifac', 'iasb', 'fasb', 'regulatory'])
      .gte('pub_date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
      .order('pub_date', { ascending: false })
      .limit(limit);

    console.log('🔍 DEBUG: Featured news query result:', { data, error, dataLength: data?.length });

    if (error) {
      console.error('Supabase query error for featured news:', error);
      throw error;
    }

    const result = (data || []).map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      link: article.link,
      pubDate: article.pub_date,
      source: article.source,
      category: article.category,
      author: article.author,
      imageUrl: article.image_url,
      tags: article.tags || []
    }));

    console.log('🔍 DEBUG: Featured news mapped result:', { resultLength: result.length, firstArticle: result[0] });
    return result;
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
