import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../../contexts/LanguageContext';

type PartnerLogo = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
};

const PartnersSection: FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Partner logos data - replace with actual partner logos when available
  const partners: PartnerLogo[] = [
    {
      id: 'onec',
      name: 'ONEC',
      description: 'Ordre National des Experts Comptables du Gabon',
      logo: '/images/logos/logo-placeholder.svg'
    },
    {
      id: 'onecca',
      name: 'ONECCA',
      description: 'Ordre National des Experts Comptables du Cameroun',
      logo: '/images/logos/logo-placeholder.svg'
    },
    {
      id: 'ordrec',
      name: 'ORDRE DES EXPERTS-COMPTABLES',
      description: 'Ordre des Experts-Comptables',
      logo: '/images/logos/logo-placeholder.svg'
    },
    {
      id: 'icpar',
      name: 'ICPAR',
      description: 'Institute of Certified Public Accountants of Rwanda',
      logo: '/images/logos/logo-placeholder.svg'
    },
    {
      id: 'cpa-canada',
      name: 'CPA Canada',
      description: 'Chartered Professional Accountants of Canada',
      logo: '/images/logos/logo-placeholder.svg'
    }
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [partners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            {t('aboutPage.partners.label', 'PARTENAIRES EXCI-MAA')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('aboutPage.partners.title', 'Nos partenaires')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('aboutPage.partners.subtitle', 'Ils nous font confiance')}
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                      <img
                        src={partners[currentSlide].logo}
                        alt={`${partners[currentSlide].name} logo`}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="text-2xl font-bold text-gray-400">${partners[currentSlide].name}</div>`;
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {partners[currentSlide].name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      {partners[currentSlide].description}
                    </p>
                    {partners[currentSlide].website && (
                      <a
                        href={partners[currentSlide].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Visiter le site
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-blue-600 h-1 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={currentSlide}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            {t('aboutPage.partners.note', 'Nos partenaires nous accompagnent dans notre mission d\'excellence')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
