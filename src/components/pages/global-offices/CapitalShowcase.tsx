import React from 'react';
import { countries } from '../../../data/countries';
import { useLanguage } from '../../../contexts/LanguageContext';

const CapitalShowcase: React.FC = () => {
  const { t } = useLanguage();

  const cityImageBySlug: Record<string, string> = {
    'cameroon': '/images/Cities/Cameroon-Yaounde.jpg',
    'canada': '/images/Cities/Canada.jpg',
    'rwanda': '/images/Cities/rwanda.jpg',
    'france': '/images/Cities/France-paris.jpg',
    'burundi': '/images/Cities/Burundi.jpeg',
    'united-states': '/images/Cities/USA-washington.jpeg',
    'democratic-republic-of-congo': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80', // Kinshasa skyline
    'gabon': 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80', // Libreville
    'united-arab-emirates': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', // Dubai
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            {t('globalOffices.heroTitle') ?? 'Global Offices'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('globalOffices.heroSubtitle') ?? 'Our international presence and local expertise'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((c) => (
            <figure key={c.slug} className="overflow-hidden rounded-xl shadow group bg-gray-50">
              <div className="aspect-[16/9] overflow-hidden bg-gray-200">
                <img
                  src={cityImageBySlug[c.slug] ?? `/images/capitals/${c.slug}.jpg`}
                  alt={`${c.capitalName}, ${c.name}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/logos/logo-placeholder.svg';
                  }}
                  loading="lazy"
                />
              </div>
              <figcaption className="p-5">
                <div className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  {c.name}
                </div>
                <div className="mt-1 text-lg font-medium text-gray-900">
                  {c.capitalName}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapitalShowcase;


