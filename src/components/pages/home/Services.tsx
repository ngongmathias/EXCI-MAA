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
      id: 'accounting',
      icon: Calculator,
      title: 'services.service1Title',
      shortDesc: 'Comprehensive financial record keeping',
      description: 'Professional accounting services including bookkeeping, financial statements, and tax preparation to keep your business financially healthy.',
      color: 'bg-blue-500',
      category: 'finance',
      features: [
        'Bookkeeping & Financial Statements',
        'Tax Preparation & Planning',
        'Payroll Processing',
        'Financial Reporting',
        'Budgeting & Forecasting',
        'Chart of accounts setup',
        'Inventory tracking',
        'Fixed asset management',
        'Cash flow analysis',
        'Budget monitoring'
      ]
    },
    {
      id: 'audit',
      icon: FileCheck,
      title: 'services.service2Title',
      shortDesc: 'Independent financial verification',
      description: 'Our audit services provide independent verification of your financial statements, ensuring accuracy and compliance with regulations.',
      color: 'bg-green-500',
      category: 'finance',
      features: [
        'Financial Statement Audits',
        'Internal Control Evaluation',
        'Compliance Audits',
        'Operational Audits',
        'Special Purpose Audits',
        'Risk assessment',
        'Fraud detection',
        'Regulatory compliance',
        'Due diligence',
        'Performance audits'
      ]
    },
    {
      id: 'tax',
      icon: FileText,
      title: 'services.service2Title',
      shortDesc: 'Strategic tax planning',
      description: 'Expert tax planning and compliance services to minimize your tax liability while ensuring full compliance with tax laws.',
      color: 'bg-purple-500',
      category: 'finance',
      features: [
        'Tax Planning & Strategy',
        'Tax Return Preparation',
        'Tax Dispute Resolution',
        'International Tax Planning',
        'Estate & Succession Planning',
        'Tax compliance',
        'Transfer pricing',
        'Tax optimization',
        'Multi-jurisdictional coordination',
        'Tax audit support'
      ]
    },
    {
      id: 'advisory',
      icon: Briefcase,
      title: 'services.service3Title',
      shortDesc: 'Strategic business guidance',
      description: 'Strategic advice to help your business grow, improve operations, and increase profitability.',
      color: 'bg-yellow-500',
      category: 'business',
      features: [
        'Business Planning',
        'Financial Modeling',
        'Mergers & Acquisitions',
        'Business Valuation',
        'Exit Planning',
        'Strategic planning',
        'Market analysis',
        'Investment analysis',
        'Change management',
        'Board advisory'
      ]
    },
    {
      id: 'risk',
      icon: Shield,
      title: 'services.service6Title',
      shortDesc: 'Identify and mitigate risks',
      description: 'Comprehensive risk assessment and management services to protect your business from potential threats.',
      color: 'bg-red-500',
      category: 'business',
      features: [
        'Risk Assessment',
        'Internal Controls',
        'Fraud Prevention',
        'Business Continuity Planning',
        'Regulatory Compliance',
        'Enterprise risk management',
        'Operational risk evaluation',
        'Financial risk assessment',
        'Compliance frameworks',
        'Crisis management'
      ]
    },
    {
      id: 'reporting',
      icon: BarChart3,
      title: 'services.service4Title',
      shortDesc: 'Accurate financial insights',
      description: 'Professional financial reporting services to help you make informed business decisions.',
      color: 'bg-indigo-500',
      category: 'finance',
      features: [
        'Monthly Financial Statements',
        'Management Reports',
        'KPI Dashboards',
        'Budget vs. Actual Analysis',
        'Cash Flow Forecasting',
        'Employee onboarding',
        'Benefits analysis',
        'HR technology',
        'Workforce planning',
        'Employee relations'
      ]
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
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('services.categories.all')}
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'finance' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('services.categories.finance')}
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === 'business' 
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
              <div className={`h-2 ${service.color}`}></div>
              <div className="p-6">
                <div className={`w-12 h-12 ${service.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon className={`h-6 w-6 ${service.color.replace('bg-', 'text-')}`} />
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
                    className="inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Calendar className="mr-1 h-3 w-3" />
                    Schedule
                  </Link>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors text-sm"
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
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
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
                      Get Started
                    </Link>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Close
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