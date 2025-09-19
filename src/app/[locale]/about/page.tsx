import {useTranslations} from 'next-intl';
import {Metadata} from 'next';
import AboutHero from '@/components/AboutHero';
import TeamSection from '@/components/TeamSection';
import ValuesSection from '@/components/ValuesSection';
import HistorySection from '@/components/HistorySection';

export const metadata: Metadata = {
  title: 'About Us - EXCI-MAA',
  description: 'Learn about EXCI-MAA, a professional accounting, auditing, and consulting firm with international presence.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
}
