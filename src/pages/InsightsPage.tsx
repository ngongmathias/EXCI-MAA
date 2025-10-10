import React from 'react';
import InsightsHero from '../components/pages/insights/InsightsHero';
import EventsSection from '../components/pages/insights/EventsSection';
import BlogSection from '../components/pages/insights/BlogSection';
import PromotionsSection from '../components/pages/insights/PromotionsSection';

const InsightsPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <InsightsHero />
      <EventsSection />
      <BlogSection />
      <PromotionsSection />
    </div>
  );
};

export default InsightsPage;


