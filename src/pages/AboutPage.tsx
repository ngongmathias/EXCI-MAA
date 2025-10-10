import { FC } from 'react';
import AboutHero from '../components/pages/about/AboutHero';
import HistorySection from '../components/pages/about/HistorySection';
import ValuesSection from '../components/pages/about/ValuesSection';
import TeamSection from '../components/pages/about/TeamSection';

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <HistorySection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
};

export default AboutPage;