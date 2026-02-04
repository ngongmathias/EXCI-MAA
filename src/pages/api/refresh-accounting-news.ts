// API endpoint for refreshing accounting news
// This would be implemented as a serverless function or backend service
import { fetchAllAccountingNews } from '../../lib/accountingNewsService';

export async function handleRefreshAccountingNews() {
  try {
    const result = await fetchAllAccountingNews();
    
    if (result.success) {
      return {
        success: true,
        articlesAdded: result.articlesAdded,
        sourcesProcessed: result.sourcesProcessed,
        errors: result.errors
      };
    } else {
      return {
        success: false,
        error: 'Failed to refresh news feeds',
        errors: result.errors
      };
    }
  } catch (error) {
    console.error('Error in refresh-accounting-news API:', error);
    return {
      success: false,
      error: 'Internal server error'
    };
  }
}
