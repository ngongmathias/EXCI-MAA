import { FC } from 'react';
import MotionInView from '../../enhanced/MotionInView';
import { useLanguage } from '../../../contexts/LanguageContext';

const MissionSection: FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionInView>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('aboutPage.mission.title')}</h2>
            <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        </MotionInView>

        <MotionInView>
          <div className="mx-auto max-w-4xl text-lg leading-8 text-gray-700 space-y-6">
            <p>
              {t('aboutPage.mission.description1')}
            </p>
            <p>
              {t('aboutPage.mission.description2')}
            </p>
          </div>
        </MotionInView>
      </div>
    </section>
  );
};

export default MissionSection;


