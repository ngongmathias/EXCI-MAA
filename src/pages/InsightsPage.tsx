import React, { useState, useRef, useEffect } from 'react';
import InsightsHero from '../components/pages/insights/InsightsHero';
import EventsSection from '../components/pages/insights/EventsSection';
import BlogSection from '../components/pages/insights/BlogSection';
import AccountingNewsSectionFallback from '../components/pages/insights/AccountingNewsSectionFallback';
// import PromotionsSection from '../components/pages/insights/PromotionsSection';

const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'events' | 'blog' | 'news'>('events');
  
  // Reference to the events, blog, and news sections for resetting pagination
  const eventsRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  
  // Add a scroll to top effect when switching tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);
  
  return (
    <div className="min-h-screen">
      <InsightsHero />
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 pt-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeTab === 'blog'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Accounting News
            </button>
          </div>
        </div>
      </section>
      <div ref={eventsRef}>
        {activeTab === 'events' && <EventsSection />}
      </div>
      <div ref={blogRef}>
        {activeTab === 'blog' && <BlogSection />}
      </div>
      <div ref={newsRef}>
        {activeTab === 'news' && <AccountingNewsSectionFallback />}
      </div>
      {/* <PromotionsSection /> */}
    </div>
  );
};

export default InsightsPage;


