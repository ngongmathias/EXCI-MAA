import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  FileText,
  BarChart3,
  Shield,
  Briefcase,
  FileCheck,
  Calendar,
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ROUTES } from '../../../lib/constants/routes';
import type { MouseEvent } from 'react';
import MotionInView from '../../enhanced/MotionInView';

type Service = {
  id: string;
  icon: any;
  title: string;
  shortDesc: string;
  description: string;
  color: string;
  category: string;
  features: string[];
};

const Services: FC = () => {
  // Create typed aliases for motion elements to avoid TS prop inference issues in this file
  const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;
  const [activeTab, setActiveTab] = useState('all');
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: 'audit',
      icon: FileCheck,
      title: 'services.service2Title',
      shortDesc: t('services.service2Desc'),
      description: t('services.service2Desc'),
      color: 'bg-blue-900',
      category: 'finance',
      features: (t as any)('serviceModal.features.audit', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.audit', { returnObjects: true })) : []
    },
    {
      id: 'tax',
      icon: FileText,
      title: 'services.service7Title',
      shortDesc: t('services.service7Desc'),
      description: t('services.service7Desc'),
      color: 'bg-blue-900',
      category: 'finance',
      features: (t as any)('serviceModal.features.audit', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.audit', { returnObjects: true })) : []
    },
    {
      id: 'accounting',
      icon: Calculator,
      title: 'services.service1Title',
      shortDesc: t('services.service1Desc'),
      description: t('services.service1Desc'),
      color: 'bg-blue-900',
      category: 'finance',
      features: (t as any)('serviceModal.features.accounting', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.accounting', { returnObjects: true })) : []
    },
    {
      id: 'advisory',
      icon: Briefcase,
      title: 'services.service3Title',
      shortDesc: t('services.service3Desc'),
      description: t('services.service3Desc'),
      color: 'bg-blue-900',
      category: 'business',
      features: (t as any)('serviceModal.features.managerial', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.managerial', { returnObjects: true })) : []
    },
    {
      id: 'risk',
      icon: Shield,
      title: 'services.service6Title',
      shortDesc: t('services.service6Desc'),
      description: t('services.service6Desc'),
      color: 'bg-blue-900',
      category: 'business',
      features: (t as any)('serviceModal.features.risk', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.risk', { returnObjects: true })) : []
    },
    {
      id: 'payroll',
      icon: BarChart3,
      title: 'services.service4Title',
      shortDesc: t('services.service4Desc'),
      description: t('services.service4Desc'),
      color: 'bg-blue-900',
      category: 'business',
      features: (t as any)('serviceModal.features.payrollSocial', { returnObjects: true }) ? Object.values((t as any)('serviceModal.features.payrollSocial', { returnObjects: true })) : []
    },
    {
      id: 'legal',
      icon: FileText,
      title: 'services.service8Title',
      shortDesc: t('services.service8Desc'),
      description: t('services.service8Desc'),
      color: 'bg-blue-900',
      category: 'business',
      features: []
    }
  ];

  // Filter services based on active tab
  const filteredServices = activeTab === 'all'
    ? services
    : services.filter(service => service.category === activeTab);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Service Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {t('services.categories.all')}
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'finance'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {t('services.categories.finance')}
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${activeTab === 'business'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {t('services.categories.business')}
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <MotionInView key={service.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-900 bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(service.title)}</h3>
                  <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to={ROUTES.CONSULTATION}
                      className="inline-flex items-center justify-center px-3 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      {t('services.schedule')}
                    </Link>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-blue-900 font-medium flex items-center hover:text-blue-800 transition-colors text-sm"
                    >
                      {t('services.learnMore')}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedService(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <div className={`h-2 ${selectedService.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className={`w-12 h-12 ${selectedService.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                      <selectedService.icon className={`h-6 w-6 ${selectedService.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{t(selectedService.title)}</h3>
                    <p className="text-gray-600 mt-1">{selectedService.shortDesc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{selectedService.description}</p>

                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.keyFeatures')}</h4>
                  <ul className="space-y-2 mb-6">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/contact"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                    >
                      {t('services.getStarted')}
                    </Link>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t('contact.form.errorTitle')}
                    </button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;