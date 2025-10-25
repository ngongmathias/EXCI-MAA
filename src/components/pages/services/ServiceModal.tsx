import { FC, useEffect } from 'react';
import { X, Check, ArrowRight, Phone, Mail } from 'lucide-react';
import { getTranslatedServices } from '../../../data/services';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ServiceModalProps {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: FC<ServiceModalProps> = ({ serviceId, isOpen, onClose }) => {
  const { t } = useLanguage();
  
  const services = getTranslatedServices(t);
  const service = services.find(s => s.id === serviceId);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 mt-1">{service.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('serviceModal.whatsIncluded')}</h3>
              <div className="space-y-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('serviceModal.ourProcess')}</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('serviceModal.process.step1.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('serviceModal.process.step1.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('serviceModal.process.step2.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('serviceModal.process.step2.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('serviceModal.process.step3.title')}</h4>
                    <p className="text-gray-600 text-sm">{t('serviceModal.process.step3.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">{t('serviceModal.readyToStart')}</h3>
                <p className="text-blue-100 mb-4">
                  {t('serviceModal.discussText')} {service.title.toLowerCase()} {t('serviceModal.servicesText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/consultation"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={onClose}
                  >
                    <span>{t('serviceModal.bookConsultation')}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <div className="flex items-center space-x-4 text-blue-100">
                    <a
                      href="tel:+1234567890"
                      className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+1 (234) 567-890</span>
                    </a>
                    <a
                      href="mailto:info@exci-maa.com"
                      className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>info@exci-maa.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;