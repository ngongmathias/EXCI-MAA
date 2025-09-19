'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, FileText, PieChart, Briefcase, Shield, Users, ArrowRight, CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    id: 'accounting',
    title: 'Accounting & Bookkeeping',
    icon: <BarChart3 className="h-8 w-8 text-exci-blue-600" />,
    shortDesc: 'Comprehensive financial record keeping and reporting',
    description: 'Our expert accounting team provides comprehensive bookkeeping services to keep your financial records accurate and up-to-date. We handle everything from day-to-day transactions to complex financial reporting, ensuring compliance with all relevant regulations.',
    features: [
      'Monthly bookkeeping and financial statements',
      'Accounts payable and receivable management',
      'Bank and credit card reconciliations',
      'Payroll processing and reporting',
      'Financial reporting and analysis'
    ],
    color: 'from-exci-blue-500 to-exci-blue-600',
    bgColor: 'bg-exci-blue-50',
    iconBg: 'bg-exci-blue-100'
  },
  {
    id: 'audit',
    title: 'Audit & Assurance',
    icon: <FileText className="h-8 w-8 text-green-600" />,
    shortDesc: 'Independent financial verification and compliance',
    description: 'Our audit services provide independent verification of your financial statements, ensuring accuracy and compliance with accounting standards. We help identify risks and improve your financial processes.',
    features: [
      'Financial statement audits',
      'Internal control evaluations',
      'Compliance audits',
      'Operational audits',
      'Special purpose audits'
    ],
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100'
  },
  {
    id: 'tax',
    title: 'Tax Consulting',
    icon: <PieChart className="h-8 w-8 text-purple-600" />,
    shortDesc: 'Strategic tax planning and compliance',
    description: 'Our tax experts provide comprehensive tax planning and compliance services to minimize your tax liability while ensuring full compliance with all tax laws and regulations.',
    features: [
      'Tax planning and strategy',
      'Corporate and individual tax returns',
      'Tax audit support',
      'International tax planning',
      'Tax dispute resolution'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100'
  },
  {
    id: 'advisory',
    title: 'Business Advisory',
    icon: <Briefcase className="h-8 w-8 text-yellow-600" />,
    shortDesc: 'Strategic business consulting and planning',
    description: 'Our business advisory services help organizations navigate complex business challenges, improve performance, and achieve sustainable growth through strategic planning and implementation.',
    features: [
      'Business planning and strategy',
      'Financial modeling and forecasting',
      'Mergers and acquisitions',
      'Business valuation',
      'Performance improvement'
    ],
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    iconBg: 'bg-yellow-100'
  },
  {
    id: 'risk',
    title: 'Risk Management',
    icon: <Shield className="h-8 w-8 text-red-600" />,
    shortDesc: 'Identify and mitigate business risks',
    description: 'Our risk management services help organizations identify, assess, and mitigate risks that could impact their business objectives and operations.',
    features: [
      'Risk assessment and analysis',
      'Internal audit services',
      'Fraud prevention and detection',
      'Compliance monitoring',
      'Business continuity planning'
    ],
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100'
  },
  {
    id: 'hr',
    title: 'HR & Payroll Services',
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    shortDesc: 'Comprehensive HR and payroll solutions',
    description: 'Our HR and payroll services help organizations manage their most valuable asset - their people - while ensuring compliance with employment laws and regulations.',
    features: [
      'Payroll processing',
      'HR policy development',
      'Employee benefits administration',
      'Performance management',
      'Compliance with labor laws'
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    iconBg: 'bg-indigo-100'
  }
];

const ServiceCard = ({ service, index, isExpanded, onToggle }: { service: typeof services[0], index: number, isExpanded: boolean, onToggle: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${service.bgColor} border border-gray-100`}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${service.iconBg}`}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-1 text-gray-600">{service.shortDesc}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
          padding: isExpanded ? '0 1.5rem 1.5rem' : '0 1.5rem 0',
        }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-100">
          <p className="text-gray-700 mb-4">{service.description}</p>
          <div className="space-y-2">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 inline-flex items-center text-exci-blue-600 hover:text-exci-blue-800 font-medium transition-colors">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function DetailedServices() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-exci-blue-600">Comprehensive</span> Services
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tailored financial solutions to meet your unique business needs and drive sustainable growth.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedId === service.id}
              onToggle={() => toggleService(service.id)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Need a custom solution? Our experts are here to help.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-exci-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-exci-blue-700 focus:outline-none focus:ring-2 focus:ring-exci-blue-500 focus:ring-offset-2 sm:text-lg transition-colors duration-200"
            >
              Get a Free Consultation
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}