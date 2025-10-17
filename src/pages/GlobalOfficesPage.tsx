import React from 'react';
import GlobalOfficesHero from '../components/pages/global-offices/GlobalOfficesHero';
import CapitalShowcase from '../components/pages/global-offices/CapitalShowcase';
import OfficesList from '../components/pages/global-offices/OfficesList';

const GlobalOfficesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <GlobalOfficesHero />
      <CapitalShowcase />
      <OfficesList />
    </div>
  );
};

export default GlobalOfficesPage;


