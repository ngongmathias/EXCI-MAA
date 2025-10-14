import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MapPin, Globe, DollarSign, Calendar, Users } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const Training: FC = () => {
  const { t } = useLanguage();
  const trainingCategories = [
    {
      title: t('training.categories.accounting.title'),
      courses: (t as any)('training.categories.accounting.courses', { returnObjects: true }) as string[],
      price: t('training.categories.accounting.price'),
      duration: t('training.categories.accounting.duration')
    },
    {
      title: t('training.categories.audit.title'),
      courses: (t as any)('training.categories.audit.courses', { returnObjects: true }) as string[],
      price: t('training.categories.audit.price'),
      duration: t('training.categories.audit.duration')
    },
    {
      title: t('training.categories.advice.title'),
      courses: (t as any)('training.categories.advice.courses', { returnObjects: true }) as string[],
      price: t('training.categories.advice.price'),
      duration: t('training.categories.advice.duration')
    },
    {
      title: t('training.categories.various.title'),
      courses: (t as any)('training.categories.various.courses', { returnObjects: true }) as string[],
      price: t('training.categories.various.price'),
      duration: t('training.categories.various.duration')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('training.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('training.subtitle')}
          </p>
          
          {/* Training Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">{t('globalOffices.listSubtitle')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">{t('globalOffices.heroSubtitle')}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">{t('training.subtitle')}</span>
            </div>
          </div>
        </div>

        {/* Training Categories */}
        <div className="space-y-12">
          {trainingCategories.map((category, index) => (
            <div key={index} className="card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{category.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>10</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold text-blue-600">{category.price}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/training"
                  className="btn-primary mt-4 lg:mt-0 inline-flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{t('hero.cta1')}</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.courses.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">{t('careers.heroTitle')}</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('careers.heroSubtitle')}
            </p>
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t('hero.cta2')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;