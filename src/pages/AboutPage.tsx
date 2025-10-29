import { FC } from 'react';
import AboutHero from '../components/pages/about/AboutHero';
import HistorySection from '../components/pages/about/HistorySection';
// import ValuesSection from '../components/pages/about/ValuesSection';
// import TeamSection from '../components/pages/about/TeamSection';
import MissionSection from '../components/pages/about/MissionSection';
import StorySection from '../components/pages/about/StorySection';
import KeysToSuccessSection from '../components/pages/about/KeysToSuccessSection';
import ClientsSection from '../components/pages/about/ClientsSection';
import OrganizationalStructure from '../components/pages/about/OrganizationalStructure';
import TypicalOfficeOrganigram from '../components/pages/about/TypicalOfficeOrganigram';
import AccreditationsSection from '../components/pages/about/AccreditationsSection';
import ClientSectorsSection from '../components/pages/about/ClientSectorsSection';

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <MissionSection />
      <StorySection />
      <KeysToSuccessSection />
      <AccreditationsSection />
      <ClientSectorsSection />
      <OrganizationalStructure />
      <HistorySection />
      <TypicalOfficeOrganigram />
      <ClientsSection/>
      {/* <ValuesSection /> */}
      {/* <TeamSection /> */}
    </div>
  );
};

export default AboutPage;