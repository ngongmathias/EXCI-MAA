import { FC } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Shield, BarChart2, Lightbulb, Users2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ValuesSection: FC = () => {
  const { t } = useLanguage();
  
  const values = t('aboutPage.values.values', { returnObjects: true }) as Array<{
    name: string;
    description: string;
  }>;

  const icons = [
    <Award className="h-8 w-8 text-blue-600" />,
    <Shield className="h-8 w-8 text-blue-600" />,
    <Lightbulb className="h-8 w-8 text-blue-600" />,
    <Users className="h-8 w-8 text-blue-600" />,
    <BarChart2 className="h-8 w-8 text-blue-600" />,
    <Users2 className="h-8 w-8 text-blue-600" />
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('aboutPage.values.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {t('aboutPage.values.subtitle')}
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                variants={item}
                className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-50"></div>
                
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-50 text-blue-600">
                      {icons[index]}
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900">{value.name}</h3>
                  </div>
                  <p className="mt-2 text-gray-600 flex-grow">{value.description}</p>
                  
                  {/* Hover effect */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                      {t('aboutPage.values.learnMore')}
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 md:py-4 md:px-8 md:text-lg"
            >
              {t('aboutPage.values.learnMoreCulture')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;