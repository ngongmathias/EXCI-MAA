'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What services does EXCI-MAA provide?',
    answer: 'We offer a comprehensive range of accounting, auditing, tax, and business advisory services tailored to meet the unique needs of businesses in Saudi Arabia and beyond. Our services include financial reporting, tax planning, internal auditing, and business consulting.'
  },
  {
    id: 2,
    question: 'How can I schedule a consultation?',
    answer: 'You can schedule a consultation by calling our office, sending us an email, or using the contact form on this page. Our team will get back to you within 24 hours to confirm your appointment.'
  },
  {
    id: 3,
    question: 'What industries do you specialize in?',
    answer: 'We have extensive experience working with various industries including healthcare, construction, retail, technology, and professional services. Our team has the expertise to handle the unique financial challenges of each sector.'
  },
  {
    id: 4,
    question: 'What are your business hours?',
    answer: 'Our office is open from Sunday to Thursday, 9:00 AM to 6:00 PM. We are closed on Fridays and Saturdays as well as on public holidays.'
  },
  {
    id: 5,
    question: 'Do you offer remote or virtual services?',
    answer: 'Yes, we offer both in-person and virtual consultation services to accommodate our clients\' needs. Our team is equipped with secure video conferencing tools to provide the same level of service remotely.'
  },
  {
    id: 6,
    question: 'How do you ensure data security and confidentiality?',
    answer: 'We take data security very seriously. All client information is handled with the utmost confidentiality and protected using industry-standard security measures, including encryption and secure file sharing systems.'
  }
];

export default function FAQSection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  return (
    <div className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-exci-blue-50 to-white -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-exci-blue-100 rounded-full p-3 mb-4">
            <HelpCircle className="h-8 w-8 text-exci-blue-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('contact.faq.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('contact.faq.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-exci-blue-500 focus:ring-inset hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={activeIndex === faq.id}
                  aria-controls={`faq-${faq.id}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {t(`contact.faq.questions.${index}.question`, { defaultValue: faq.question })}
                    </h3>
                    <span
                      className="ml-4 flex-shrink-0 text-exci-blue-600"
                      style={{
                        transform: activeIndex === faq.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                      }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </span>
                  </div>
                </button>
                {activeIndex === faq.id && (
                  <div
                    id={`faq-${faq.id}`}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-600">
                      <div className="border-t border-gray-100 mt-2 pt-4">
                        {t(`contact.faq.questions.${index}.answer`, { defaultValue: faq.answer })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div 
          className="mt-16 bg-gradient-to-r from-exci-blue-900 to-exci-blue-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-bold text-white">{t('contact.faq.stillHaveQuestions')}</h3>
              <p className="mt-4 text-exci-blue-100">
                {t('contact.faq.stillHaveDescription')}
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-700 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-exci-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-white">{t('contact.faq.chatWithUs')}</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      {t('contact.faq.chatDescription')}
                    </p>
                    <a 
                      href="#contact-form"
                      className="mt-2 inline-flex items-center text-sm font-medium text-exci-yellow-400 hover:text-exci-yellow-300 group"
                    >
                      {t('contact.faq.sendUsMessage')}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-700 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-exci-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-white">{t('contact.faq.callUs')}</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      {t('contact.faq.callDescription')}
                    </p>
                    <a 
                      href="tel:+966123456789"
                      className="mt-2 inline-block text-sm font-medium text-exci-yellow-400 hover:text-exci-yellow-300"
                    >
                      +966 12 345 6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-700 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-exci-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-white">{t('contact.faq.emailUs')}</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      {t('contact.faq.emailDescription')}
                    </p>
                    <a 
                      href="mailto:info@exci-maa.com"
                      className="mt-2 inline-block text-sm font-medium text-exci-yellow-400 hover:text-exci-yellow-300 break-all"
                    >
                      info@exci-maa.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-exci-blue-900 p-8 sm:p-10 lg:p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-exci-blue-800 mb-6">
                  <MessageSquare className="h-8 w-8 text-exci-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('contact.faq.cantFindWhat')}</h3>
                <p className="mt-2 text-exci-blue-100">
                  {t('contact.faq.expertsDescription')}
                </p>
                <div className="mt-6">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center rounded-full border border-transparent bg-exci-yellow-500 px-6 py-3 text-base font-medium text-exci-blue-900 shadow-sm hover:bg-exci-yellow-400 focus:outline-none focus:ring-2 focus:ring-exci-yellow-500 focus:ring-offset-2 focus:ring-offset-exci-blue-900 transition-colors duration-200"
                  >
                    {t('contact.faq.contactSupport')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}