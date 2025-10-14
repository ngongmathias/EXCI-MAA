import { FC, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, FileText, PieChart, Briefcase, Shield, Users, CheckCircle, ChevronDown, Calendar } from 'lucide-react';

const DetailedServices: FC = () => {
  const services = [
    {
      id: 'accounting',
      title: 'Accounting & Bookkeeping',
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      shortDesc: 'Comprehensive financial record keeping and reporting',
      description: 'Our expert accounting team provides comprehensive bookkeeping services to keep your financial records accurate and up-to-date. We handle everything from day-to-day transactions to complex financial reporting, ensuring compliance with all relevant regulations.',
      features: [
        'Monthly bookkeeping and financial statements',
        'Accounts payable and receivable management',
        'Bank and credit card reconciliations',
        'Payroll processing and reporting',
        'Financial reporting and analysis',
        'Chart of accounts setup and maintenance',
        'Inventory tracking and valuation',
        'Fixed asset management',
        'Cash flow analysis and forecasting',
        'Budget preparation and monitoring'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
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
        'Special purpose audits',
        'Risk assessment and management',
        'Fraud detection and prevention',
        'Regulatory compliance reviews',
        'Due diligence services',
        'Performance and efficiency audits'
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
        'Tax dispute resolution',
        'Tax compliance and filing',
        'Transfer pricing documentation',
        'Tax optimization strategies',
        'Estate and succession planning',
        'Multi-jurisdictional tax coordination'
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
        'Performance improvement',
        'Strategic planning and execution',
        'Market analysis and competitive intelligence',
        'Investment analysis and due diligence',
        'Change management and transformation',
        'Board advisory and governance'
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
        'Business continuity planning',
        'Enterprise risk management',
        'Operational risk evaluation',
        'Financial risk assessment',
        'Regulatory compliance frameworks',
        'Crisis management and recovery'
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
        'Compliance with labor laws',
        'Employee onboarding and offboarding',
        'Compensation and benefits analysis',
        'HR technology implementation',
        'Workforce planning and analytics',
        'Employee relations and conflict resolution'
      ],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100'
    }
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.1 });

  const toggleService = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const ServiceCard = ({ service, index, isExpanded, onToggle }: { service: typeof services[0], index: number, isExpanded: boolean, onToggle: () => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const cardInView = useInView(cardRef as React.RefObject<Element>, { once: true, amount: 0.1 });

    const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;

    return (
      <MotionDiv
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
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
            <MotionDiv
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </MotionDiv>
          </div>
        </div>
        
        <MotionDiv
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
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to={'/consultation'}
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Link>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    );
  };

  const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our <span className="text-blue-600">Comprehensive</span> Services
            </h2>
          </MotionDiv>
          <MotionDiv 
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mt-4 text-xl text-gray-600">
              Tailored financial solutions to meet your unique business needs and drive sustainable growth.
            </p>
          </MotionDiv>
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
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg text-gray-600 mb-6">
              Need a custom solution? Our experts are here to help.
            </p>
            <a
              href="/consultation"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-lg transition-colors duration-200"
            >
              Get a Free Consultation
            </a>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;