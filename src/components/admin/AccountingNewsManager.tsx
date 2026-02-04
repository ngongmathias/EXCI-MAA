import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, Clock, ExternalLink, Settings } from 'lucide-react';
import { fetchAllAccountingNews, getAccountingNewsSources } from '../../lib/accountingNewsService';

interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: string;
  description?: string;
  isActive: boolean;
}

interface RefreshResult {
  success: boolean;
  articlesAdded: number;
  errors: string[];
  sourcesProcessed: number;
}

const AccountingNewsManager: React.FC = () => {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [refreshResult, setRefreshResult] = useState<RefreshResult | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  useEffect(() => {
    loadSources();
    loadLastRefreshTime();
  }, []);

  const loadSources = async () => {
    try {
      const newsSources = await getAccountingNewsSources();
      setSources(newsSources);
    } catch (error) {
      console.error('Error loading sources:', error);
    }
  };

  const loadLastRefreshTime = () => {
    const stored = localStorage.getItem('lastAccountingNewsRefresh');
    if (stored) {
      setLastRefreshTime(new Date(stored));
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setRefreshResult(null);

    try {
      const result = await fetchAllAccountingNews();
      setRefreshResult(result);
      
      if (result.success) {
        setLastRefreshTime(new Date());
        localStorage.setItem('lastAccountingNewsRefresh', new Date().toISOString());
      }
    } catch (error) {
      setRefreshResult({
        success: false,
        articlesAdded: 0,
        errors: ['Failed to refresh news feeds'],
        sourcesProcessed: 0
      });
    } finally {
      setIsRefreshing(false);
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
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accounting News Manager</h1>
        <p className="text-gray-600">
          Manage and refresh accounting news feeds from IFAC, IASB, FASB, and other industry sources
        </p>
      </div>

      {/* Refresh Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">News Feed Management</h2>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {lastRefreshTime 
                ? `Last refreshed: ${lastRefreshTime.toLocaleString()}`
                : 'Never refreshed'
              }
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh All Feeds'}
          </button>
        </div>

        {/* Refresh Result */}
        {refreshResult && (
          <div className={`rounded-lg p-4 ${
            refreshResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              {refreshResult.success ? (
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${
                  refreshResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {refreshResult.success ? 'Refresh Successful' : 'Refresh Failed'}
                </h3>
                {refreshResult.success && (
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• {refreshResult.articlesAdded} articles added</p>
                    <p>• {refreshResult.sourcesProcessed} sources processed</p>
                  </div>
                )}
                {refreshResult.errors.length > 0 && (
                  <div className="text-sm text-red-700 space-y-1">
                    {refreshResult.errors.map((error, index) => (
                      <p key={index}>• {error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* News Sources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">News Sources</h2>
          <div className="flex items-center text-sm text-gray-600">
            <Settings className="w-4 h-4 mr-1" />
            {sources.length} active sources
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source) => (
            <div key={source.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{source.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(source.category)}`}>
                    {source.category.toUpperCase()}
                  </span>
                </div>
                <div className={`w-2 h-2 rounded-full mt-1 ${
                  source.isActive ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              </div>
              
              {source.description && (
                <p className="text-sm text-gray-600 mb-3">{source.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center"
                >
                  View feed
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  source.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {source.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {sources.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Settings className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news sources configured</h3>
            <p className="text-gray-600">
              Please run the database setup script to configure news sources
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Setup Instructions</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>• Run the setup script: <code className="bg-blue-100 px-2 py-1 rounded">database/setup_accounting_news_feeds.sql</code></p>
          <p>• This will create tables and populate them with major accounting news sources</p>
          <p>• Click "Refresh All Feeds" to fetch the latest articles</p>
          <p>• News is automatically tagged with relevant accounting keywords</p>
          <p>• Old articles are automatically cleaned up after 60 days</p>
        </div>
      </div>
    </div>
  );
};

export default AccountingNewsManager;
