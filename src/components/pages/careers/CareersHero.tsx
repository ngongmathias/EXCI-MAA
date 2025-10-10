import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

const CareersHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-exci-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t('careers.heroTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careers.heroSubtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;


