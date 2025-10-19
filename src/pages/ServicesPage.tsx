import { FC } from 'react';
import ServicesHero from '../components/pages/services/ServicesHero';
import DetailedServices from '../components/pages/services/DetailedServices';
import ProcessSection from '../components/pages/services/ProcessSection';
import TrainingSection from '../components/pages/services/TrainingSection';
// import PricingSection from '../components/pages/services/PricingSection';

const ServicesPage: FC = () => {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <DetailedServices />
      <ProcessSection />
      <TrainingSection />
      {/* <PricingSection /> */}
    </div>
  );
};

export default ServicesPage;