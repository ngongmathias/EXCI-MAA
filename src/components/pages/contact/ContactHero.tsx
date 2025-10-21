'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const getContactMethods = (t: (key: string) => string) => [
  {
    icon: <Mail className="h-6 w-6 text-exci-blue-600" />,
    title: t('contact.hero.contactMethods.emailUs'),
    description: t('contact.hero.contactMethods.emailDescription'),
    value: 'contactcam@excimaa.ca',
    href: 'mailto:contactcam@excimaa.ca',
    color: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    icon: <Phone className="h-6 w-6 text-green-600" />,
    title: t('contact.hero.contactMethods.callUs'),
    description: t('contact.hero.contactMethods.callDescription'),
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    icon: <Clock className="h-6 w-6 text-yellow-600" />,
    title: t('contact.hero.contactMethods.officeHours'),
    description: t('contact.hero.contactMethods.hoursDescription'),
    value: 'Mon - Fri: 9:00 - 18:00',
    color: 'bg-yellow-50',
    hoverColor: 'hover:bg-yellow-100'
  }
];

const ContactCard = ({ method, index }: { method: ReturnType<typeof getContactMethods>[0], index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const content = (
    <div className="p-1">
      <div className="flex items-start">
        <motion.div 
          className={`p-3 rounded-xl ${method.color} ${method.hoverColor} transition-all duration-300 group-hover:shadow-lg`}
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {method.icon}
        </motion.div>
        <div className="ml-4">
          <motion.h3 
            className="text-lg font-semibold text-gray-900"
            whileHover={{ x: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {method.title}
          </motion.h3>
          <p className="mt-1 text-sm text-gray-600">{method.description}</p>
          <motion.p 
            className="mt-2 text-base font-medium text-gray-900"
            whileHover={{ color: '#1e40af' }}
            transition={{ duration: 0.2 }}
          >
            {method.value}
          </motion.p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: index * 0.1
        }
      } : {}}
      whileHover={{ 
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      className={`group overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50`}
    >
      {method.href ? (
        <a 
          href={method.href} 
          target="_blank"
          className="block h-full"
        >
          {content}
        </a>
      ) : (
        <div className="h-full">
          {content}
        </div>
      )}
    </motion.div>
  );
};

export default function ContactHero() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }
            } : {}}
          >
            <motion.p 
              className="text-base font-semibold text-blue-600 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.2 }
              } : {}}
            >
              {t('contact.hero.getInTouch')}
            </motion.p>
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3 }
              } : {}}
            >
              {t('contact.hero.letsTalkAbout')}
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{t('contact.hero.businessNeeds')}</span>
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.4,
                  duration: 0.8 
                }
              } : {}}
            >
              {t('contact.hero.description')}
            </motion.p>
          </motion.div>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 w-[200vh] mx-auto"
        >
          {getContactMethods(t).map((method, index) => (
            <ContactCard key={method.title} method={method} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 0.6,
              duration: 0.8 
            }
          } : {}}
        >
          <p className="text-lg text-gray-600 mb-8">
            {t('contact.hero.orFillOut')}
          </p>
          <motion.a
            href="#contact-form"
            className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 px-8 py-4 text-base font-extrabold text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden border-2 border-blue-500/30"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)',
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 drop-shadow-md">{t('contact.hero.sendUsMessage')}</span>
            <MessageSquare className="ml-3 h-5 w-5 text-white transition-transform group-hover:translate-x-1 relative z-10" strokeWidth="2.5" />
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Animated wave divider */}
      <div className="relative h-24 md:h-32 -mb-1 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-auto" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,54.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-current text-exci-blue-700"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            className="fill-current text-exci-blue-600 opacity-70"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-exci-blue-500 opacity-40"
          />
        </svg>
      </div>
    </div>
  );
}