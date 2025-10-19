import React from 'react';
import GlobalOfficesHero from '../components/pages/global-offices/GlobalOfficesHero';
import GlobalPresenceDropdown from '../components/common/GlobalPresenceDropdown';
import CapitalShowcase from '../components/pages/global-offices/CapitalShowcase';
import OfficesList from '../components/pages/global-offices/OfficesList';

const GlobalOfficesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <GlobalOfficesHero />
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Interactive Global Presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our offices around the world and discover the services we offer in each location
            </p>
          </div>
          <GlobalPresenceDropdown />
        </div>
      </div>
      <CapitalShowcase />
      <OfficesList />
    </div>
  );
};

export default GlobalOfficesPage;


