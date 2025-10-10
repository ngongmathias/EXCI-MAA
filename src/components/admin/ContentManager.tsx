import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ContentManager: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('admin.contentTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('admin.contentSubtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContentManager;


