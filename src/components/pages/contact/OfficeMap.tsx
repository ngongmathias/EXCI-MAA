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
  address: '123 Business Avenue, Riyadh 12345, Saudi Arabia',
  phone: '+966 12 345 6789',
  email: 'riyadh@exci-maa.com',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
};

export default function OfficeMap() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google) {
      initMap();
    } else {
      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    }

    return () => {
      // Clean up
      if (window.google) {
        window.initMap = undefined;
      }
    };
  }, []);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: OFFICE_LOCATION.lat, lng: OFFICE_LOCATION.lng },
      zoom: 15,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{ visibility: 'simplified' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9f5f9' }],
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });

    // Create a custom marker icon
    const markerIcon = {
      url: '/map-marker.svg',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 40),
    };

    // Add marker
    const markerInstance = new window.google.maps.Marker({
      position: { lat: OFFICE_LOCATION.lat, lng: OFFICE_LOCATION.lng },
      map: mapInstance,
      title: 'EXCI-MAA Office',
      icon: markerIcon,
      animation: window.google.maps.Animation.DROP,
    });

    // Create info window content
    const contentString = `
      <div class="p-2 max-w-xs">
        <h3 class="font-bold text-exci-blue-900 text-lg mb-1">EXCI-MAA Office</h3>
        <p class="text-gray-700 text-sm mb-2">${OFFICE_LOCATION.address}</p>
        <a href="tel:${OFFICE_LOCATION.phone}" class="text-exci-blue-600 hover:text-exci-blue-800 text-sm flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          ${OFFICE_LOCATION.phone}
        </a>
      </div>
    `;

    const infoWindowInstance = new window.google.maps.InfoWindow({
      content: contentString,
      maxWidth: 300,
    });

    // Add click event to marker
    markerInstance.addListener('click', () => {
      infoWindowInstance.open(mapInstance, markerInstance);
    });

    // Open info window by default
    setTimeout(() => {
      infoWindowInstance.open(mapInstance, markerInstance);
    }, 1000);

    setMap(mapInstance);
    setMarker(markerInstance);
    setInfoWindow(infoWindowInstance);
    setIsMapLoaded(true);
  };

  return (
    <div className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-exci-blue-50 to-white -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('contact.map.findOurOffice')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.map.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Container */}
          <motion.div 
            className="h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div 
              ref={mapRef} 
              className="w-full h-full"
              style={{ opacity: isMapLoaded ? 1 : 0.7, transition: 'opacity 0.5s ease-in-out' }}
            />
            {!isMapLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="animate-pulse">
                    <div className="h-8 w-8 bg-exci-yellow-400 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Office Information */}
          <motion.div 
            className="space-y-6"
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
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE_LOCATION.lat},${OFFICE_LOCATION.lng}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center mt-2 text-sm font-medium text-exci-yellow-600 hover:text-exci-yellow-700 group"
                    >
                      {t('contact.map.getDirections')}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
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