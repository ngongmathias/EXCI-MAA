import {useTranslations} from 'next-intl';
import {Metadata} from 'next';
import ServicesHero from '@/components/ServicesHero';
import DetailedServices from '@/components/DetailedServices';
import ProcessSection from '@/components/ProcessSection';
import PricingSection from '@/components/PricingSection';

export const metadata: Metadata = {
  title: 'Our Services - EXCI-MAA',
  description: 'Professional accounting, auditing, and consulting services tailored to your business needs.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <DetailedServices />
      <ProcessSection />
      <PricingSection />
    </div>
  );
}
