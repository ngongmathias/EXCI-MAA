import { FC } from 'react';
import AboutHero from '../components/pages/about/AboutHero';
import HistorySection from '../components/pages/about/HistorySection';
import ValuesSection from '../components/pages/about/ValuesSection';
import TeamSection from '../components/pages/about/TeamSection';
import MissionSection from '../components/pages/about/MissionSection';
import StorySection from '../components/pages/about/StorySection';
import ClientsSection from '../components/pages/about/ClientsSection';

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionSection />
      <StorySection />
      <HistorySection />
      <ClientsSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
};

export default AboutPage;