import { FC } from 'react';
import { Award, Briefcase, User } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const Partners: FC = () => {
  const { t } = useLanguage();
  const founders = [
    {
      name: t('partners.founders.pierre.name'),
      title: t('partners.founders.pierre.title'),
      description: t('partners.founders.pierre.description'),
      image: '/images/Pierre.PNG',
      specialties: t('partners.founders.pierre.specialties', { returnObjects: true }) as string[],
    },
    {
      name: t('partners.founders.patrick.name'),
      title: t('partners.founders.patrick.title'),
      description: t('partners.founders.patrick.description'),
      image: '/images/Patrick Ngatcha.PNG',
      specialties: t('partners.founders.patrick.specialties', { returnObjects: true }) as string[],
    },
  ];

  // intentionally no partners grid for now

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {founders.map((founder, index) => (
            <div key={index} className="card">
              <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0 bg-white shadow">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {founder.title}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {founder.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {founder.specialties.map((specialty, specIndex) => (
                      <span
                        key={specIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div> */}

        {/* Partners Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div> */}

        {/* Trust Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('offices.title')}
            </h3>
            <p className="text-gray-600">
              {t('offices.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('about.feature1Title')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('about.feature1Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('training.title')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('training.subtitle')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {t('insights.heroTitle')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('insights.heroSubtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;