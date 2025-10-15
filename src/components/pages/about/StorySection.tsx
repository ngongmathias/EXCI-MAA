import { FC } from 'react';
import MotionInView from '../../enhanced/MotionInView';
import { useLanguage } from '../../../contexts/LanguageContext';

const StorySection: FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <MotionInView>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('aboutPage.story.title')}</h2>
              <div className="mt-3 w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-lg leading-8 text-gray-700 mb-5">
                {t('aboutPage.story.description1')}
              </p>
              <p className="text-lg leading-8 text-gray-700 mb-5">
                {t('aboutPage.story.description2')}
              </p>
              <p className="text-lg leading-8 text-gray-700">
                {t('aboutPage.story.description3')}
              </p>
            </div>
          </MotionInView>
          <MotionInView>
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('aboutPage.story.whatWeDo')}</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {t('aboutPage.story.services', { returnObjects: true }).map((service: string, index: number) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
};

export default StorySection;


