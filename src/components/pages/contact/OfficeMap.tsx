'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

// Define the type for the Google Maps object
declare global {
  interface Window {
    initMap?: () => void;
    google?: any;
  }
}

const OFFICE_LOCATION = {
  lat: 24.7136,  // Default to Dubai coordinates
  lng: 46.6753,
  address: 'BP 2606 Boulevard de la république – Douala (Cameroun)',
  phone: ' +237 233 42 79 40 && +237 698 835 251',
  email: 'contactcam@excimaa.ca',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
};

export default function OfficeMap() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-exci-blue-50 to-white -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-10 lg:space-y-0">

          {/* Map Container */}
          <motion.div
            className="h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >

          </motion.div>

          {/* Office Information */}
          <motion.div 
            className="flex space-y-6 "
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-exci-blue-900 mb-4">{t('contact.map.ourOffice')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-exci-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('contact.map.address')}</h4>
                    <p className="mt-1 text-sm text-gray-600">{OFFICE_LOCATION.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-100 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-exci-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('contact.map.phone')}</h4>
                    <a 
                      href={`tel:${OFFICE_LOCATION.phone}`}
                      className="mt-1 text-sm text-gray-600 hover:text-exci-blue-600"
                    >
                      {OFFICE_LOCATION.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-exci-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('contact.map.email')}</h4>
                    <a 
                      href={`mailto:${OFFICE_LOCATION.email}`}
                      className="mt-1 text-sm text-gray-600 hover:text-exci-blue-600 break-all"
                    >
                      {OFFICE_LOCATION.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-100 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-exci-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{t('contact.map.businessHours')}</h4>
                    <p className="mt-1 text-sm text-gray-600">{OFFICE_LOCATION.hours}</p>
                    <p className="text-sm text-gray-500">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-exci-blue-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">{t('contact.map.needHelpFinding')}</h3>
              <p className="text-exci-blue-100 text-sm mb-4">
                {t('contact.map.helpDescription')}
              </p>
              <button
                onClick={() => {
                  if (map && marker) {
                    map.panTo(marker.getPosition() as any);
                    map.setZoom(17);
                    if (infoWindow) {
                      infoWindow.open(map, marker);
                    }
                  }
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-exci-blue-900 bg-exci-yellow-400 hover:bg-exci-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-exci-blue-900 focus:ring-exci-yellow-400 transition-colors duration-200"
              >
                <MapPin className="-ml-1 mr-2 h-4 w-4" />
                {t('contact.map.centerMap')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}