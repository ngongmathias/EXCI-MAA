import React from 'react';
import CareersHero from '../components/pages/careers/CareersHero';
import JobListings from '../components/pages/careers/JobListings';
import OrganizationalChart from '../components/pages/careers/OrganizationalChart';
import BenefitsSection from '../components/pages/careers/BenefitsSection';

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <CareersHero />
      <JobListings />
      <OrganizationalChart />
      <BenefitsSection />
    </div>
  );
};

export default CareersPage;


