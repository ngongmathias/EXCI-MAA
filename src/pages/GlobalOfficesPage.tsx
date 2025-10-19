import React from 'react';
import GlobalOfficesHero from '../components/pages/global-offices/GlobalOfficesHero';
import GlobalPresenceDropdown from '../components/common/GlobalPresenceDropdown';
import CapitalShowcase from '../components/pages/global-offices/CapitalShowcase';
import TeamMembers from '../components/pages/global-offices/TeamMembers';
import { useLanguage } from '../contexts/LanguageContext';

const GlobalOfficesPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <GlobalOfficesHero />
      
      {/* Global Presence Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('globalOffices.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('globalOffices.subtitle')}
            </p>
          </div>
          <GlobalPresenceDropdown />
        </div>
      </div>

      {/* Capital Showcase */}
      <CapitalShowcase />

      {/* Team Members Section - Replaces OfficesList */}
      <TeamMembers />
    </div>
  );
};

export default GlobalOfficesPage;