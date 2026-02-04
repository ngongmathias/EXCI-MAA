import React, { useState, useEffect } from 'react';
import { Search, Filter, ExternalLink, Clock, Tag, RefreshCw, AlertCircle, Newspaper } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

// Mock data for initial deployment
const mockArticles = [
  {
    id: '1',
    title: 'IFAC Releases New International Ethics Standards',
    description: 'The International Federation of Accountants has published updated ethics standards for professional accountants worldwide.',
    link: 'https://www.ifac.org',
    pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: 'IFAC',
    category: 'ifac',
    author: 'IFAC News Team',
    imageUrl: null,
    tags: ['Ethics', 'IFAC', 'Standards']
  },
  {
    id: '2',
    title: 'IASB Proposes Changes to IFRS 17 Insurance Contracts',
    description: 'The International Accounting Standards Board is seeking feedback on proposed amendments to IFRS 17.',
    link: 'https://www.ifrs.org',
    pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    source: 'IASB',
    category: 'iasb',
    author: 'IASB Staff',
    imageUrl: null,
    tags: ['IFRS 17', 'Insurance', 'IASB']
  },
  {
    id: '3',
    title: 'FASB Updates Revenue Recognition Standards',
    description: 'Financial Accounting Standards Board announces clarifications to ASC 606 revenue recognition.',
    link: 'https://www.fasb.org',
    pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    source: 'FASB',
    category: 'fasb',
    author: 'FASB News',
    imageUrl: null,
    tags: ['ASC 606', 'Revenue', 'FASB', 'GAAP']
  },
  {
    id: '4',
    title: 'SEC Enhances ESG Disclosure Requirements',
    description: 'Securities and Exchange Commission adopts new rules for climate-related disclosures.',
    link: 'https://www.sec.gov',
    pubDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    source: 'SEC',
    category: 'regulatory',
    author: 'SEC Staff',
    imageUrl: null,
    tags: ['ESG', 'SEC', 'Disclosure', 'Climate']
  },
  {
    id: '5',
    title: 'PCAOB Updates Audit Quality Indicators',
    description: 'Public Company Accounting Oversight Board releases new metrics for audit quality assessment.',
    link: 'https://pcaobus.org',
    pubDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    source: 'PCAOB',
    category: 'regulatory',
    author: 'PCAOB News',
    imageUrl: null,
    tags: ['Audit Quality', 'PCAOB', 'Metrics']
  }
];

const categories = [
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

const AccountingNewsSectionFallback: React.FC = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState(mockArticles);
  const [featuredArticles, setFeaturedArticles] = useState(mockArticles.slice(0, 3));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      setError('Database setup required. Please run the setup script to enable live news feeds.');
    }, 2000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filtered);
    } else {
      setArticles(mockArticles);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = mockArticles.filter(article => article.category === category);
      setArticles(filtered);
    } else {
      setArticles(mockArticles);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'ifac': 'bg-blue-100 text-blue-800',
      'iasb': 'bg-green-100 text-green-800',
      'fasb': 'bg-purple-100 text-purple-800',
      'accounting': 'bg-gray-100 text-gray-800',
      'audit': 'bg-red-100 text-red-800',
      'tax': 'bg-yellow-100 text-yellow-800',
      'regulatory': 'bg-indigo-100 text-indigo-800',
      'compliance': 'bg-orange-100 text-orange-800',
      'business': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Accounting & Financial News
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest developments from IFAC, IASB, FASB, and leading accounting publications
          </p>
        </div>

        {/* Setup Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-2">Database Setup Required</h3>
              <p className="text-sm text-yellow-700">
                To display live accounting news feeds, please run the database setup script: 
                <code className="bg-yellow-100 px-2 py-1 rounded ml-1">database/setup_accounting_news_feeds.sql</code>
              </p>
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Updates</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(article.pubDate)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.source}</span>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      Read more
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search accounting news..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}`}>
                    {article.category.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate(article.pubDate)}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center"
                      >
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.source}</span>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    Read more
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountingNewsSectionFallback;
