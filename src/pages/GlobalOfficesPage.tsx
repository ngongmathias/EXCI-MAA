import React from 'react';
import GlobalOfficesHero from '../components/pages/global-offices/GlobalOfficesHero';
import InteractiveMap from '../components/pages/global-offices/InteractiveMap';
import OfficesList from '../components/pages/global-offices/OfficesList';

const GlobalOfficesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <GlobalOfficesHero />
      <InteractiveMap />
      <OfficesList />
    </div>
  );
};

export default GlobalOfficesPage;


