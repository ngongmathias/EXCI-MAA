import React, { useState } from 'react';
import { countries, Country } from '../../../data/countries';
import { offices } from '../../../data/offices';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Phone, Mail, MapPin, X } from 'lucide-react';

const CapitalShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const cityImageBySlug: Record<string, string> = {
    'cameroon': '/images/Cities/Cameroon-Yaounde.jpg',
    'canada': '/images/Cities/Canada.jpg',
    'rwanda': '/images/Cities/rwanda.jpg',
    'france': '/images/Cities/France-paris.jpg',
    'burundi': '/images/Cities/Burundi.jpeg',
    'united-states': '/images/Cities/USA-washington.jpeg',
    'republic-of-congo': 'images/Cities/DRC.jpeg', // Brazzaville skyline
    'gabon': 'images/Cities/Libreville-1.jpg', // Libreville
    'united-arab-emirates': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80', // Dubai
  };

  // Get office details for a country
  const getOfficeForCountry = (country: Country) => {
    return offices.find(office => 
      office.country.toLowerCase() === country.name.toLowerCase() ||
      office.city.toLowerCase() === country.capitalName.toLowerCase()
    );
  };

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setSelectedCountry(null);
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
            <figure 
              key={c.slug} 
              className="overflow-hidden rounded-xl shadow group bg-gray-50 cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => handleCountryClick(c)}
            >
              <div className="aspect-[16/9] overflow-hidden bg-gray-200">
                <img
                  src={cityImageBySlug[c.slug] ?? `/images/capitals/${c.slug}.jpg`}
                  alt={`${c.capitalName}, ${c.name}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
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

        {/* Contact Details Modal */}
        {selectedCountry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-200">
                <div className="pr-8">
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCountry.name}</h3>
                  <p className="text-lg text-blue-600">{selectedCountry.capitalName}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {(() => {
                  const office = getOfficeForCountry(selectedCountry);
                  if (office) {
                    return (
                      <div className="space-y-6">
                        {/* Office Image */}
                        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={cityImageBySlug[selectedCountry.slug] ?? office.image}
                            alt={`${office.city}, ${office.country}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/logos/logo-placeholder.svg';
                            }}
                          />
                        </div>

                        {/* Office Name */}
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{office.name}</h4>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900">Address</p>
                              <p className="text-gray-600">{office.address}</p>
                              <p className="text-gray-600">{office.city}, {office.country}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Phone className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900">Phone</p>
                              <p className="text-gray-600">{office.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3">
                            <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900">Email</p>
                              <a href={`mailto:${office.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                                {office.email}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Services</p>
                          <div className="flex flex-wrap gap-2">
                            {office.services.map((service, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Google Maps Link */}
                        {office.googleMapsUrl && (
                          <div>
                            <a
                              href={office.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                              View on Google Maps
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div className="space-y-4">
                        <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-200">
                          <img
                            src={cityImageBySlug[selectedCountry.slug]}
                            alt={`${selectedCountry.capitalName}, ${selectedCountry.name}`}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/logos/logo-placeholder.svg';
                            }}
                          />
                        </div>
                        
                        <div className="text-center py-4">
                          <p className="text-gray-600">Contact information for this location:</p>
                          <div className="mt-4 space-y-2">
                            {selectedCountry.phones.map((phone, index) => (
                              <div key={index} className="flex items-center justify-center space-x-2">
                                <Phone className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-900">{phone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CapitalShowcase;


