import { FC } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, Users, Award, Globe, BarChart2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const HistorySection: FC = () => {
  const { t } = useLanguage();
  
  const timeline = t('aboutPage.history.timeline', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    description: string;
  }>;

  const icons = [
    <Building2 className="h-6 w-6 text-blue-600" />,
    <MapPin className="h-6 w-6 text-blue-600" />,
    <Award className="h-6 w-6 text-blue-600" />,
    <BarChart2 className="h-6 w-6 text-blue-600" />,
    <Globe className="h-6 w-6 text-blue-600" />,
    <Users className="h-6 w-6 text-blue-600" />
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('aboutPage.history.title')}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('aboutPage.history.subtitle')}
          </p>
        </div>
        
        <div className="mt-16">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                  >
                    {/* Content */}
                    <div className={`w-1/2 p-6 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                      <div className="mt-2 text-sm font-medium text-blue-600">{item.year}</div>
                    </div>
                    
                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-white shadow-lg">
                      {icons[index]}
                    </div>
                    
                    {/* Empty div for spacing */}
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            {t('aboutPage.history.journeyContinues')}
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {t('aboutPage.history.learnMoreStory')}
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;