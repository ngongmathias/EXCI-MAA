import React from 'react';
import { X, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface OfficeModalProps {
  country: string;
  capital: string;
  isOpen: boolean;
  onClose: () => void;
}

// Capital cities mapping
const getCapitalCity = (country: string): string => {
  const capitals: { [key: string]: string } = {
    'Cameroon': 'Yaoundé',
    'Canada': 'Ottawa', 
    'Rwanda': 'Kigali',
    'United States': 'Washington DC',
    'France': 'Paris',
    'Burundi': 'Gitega',
    'Democratic Republic of Congo': 'Kinshasa',
    'Gabon': 'Libreville',
    'United Arab Emirates': 'Abu Dhabi'
  };
  return capitals[country] || country;
};

const OfficeModal: React.FC<OfficeModalProps> = ({ country, capital, isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{country}</h2>
              <p className="text-sm text-gray-600">{t('officeModal.capitalCity')}: {capital}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              {t('officeModal.contactMessage').replace('{country}', country).replace('{capital}', capital)}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{t('officeModal.email')}</p>
                <a 
                  href="mailto:contactcam@excimaa.ca" 
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  contactcam@excimaa.ca
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">{t('officeModal.phone')}</p>
                <div className="space-y-1">
                  <a 
                    href="tel:+237233427940" 
                    className="block text-green-600 hover:text-green-700 text-sm"
                  >
                    (+237) 233 427 940
                  </a>
                  <a 
                    href="tel:+250787779965" 
                    className="block text-green-600 hover:text-green-700 text-sm"
                  >
                    (+250) 787 779 965
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfficeModal;