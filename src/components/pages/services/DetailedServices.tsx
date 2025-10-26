import { FC, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BarChart3, FileText, PieChart, Briefcase, Shield, Users, CheckCircle, ChevronDown, Calendar } from 'lucide-react';

const DetailedServices: FC = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      id: 'accounting',
      title: t('servicesPage.detailedServices.services.accounting.title'),
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      shortDesc: t('servicesPage.detailedServices.services.accounting.shortDesc'),
      description: t('servicesPage.detailedServices.services.accounting.description'),
      features: t('servicesPage.detailedServices.services.accounting.features', { returnObjects: true }) as string[],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      id: 'audit',
      title: t('servicesPage.detailedServices.services.audit.title'),
      icon: <FileText className="h-8 w-8 text-green-600" />,
      shortDesc: t('servicesPage.detailedServices.services.audit.shortDesc'),
      description: t('servicesPage.detailedServices.services.audit.description'),
      features: t('servicesPage.detailedServices.services.audit.features', { returnObjects: true }) as string[],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      id: 'tax',
      title: t('servicesPage.detailedServices.services.tax.title'),
      icon: <PieChart className="h-8 w-8 text-purple-600" />,
      shortDesc: t('servicesPage.detailedServices.services.tax.shortDesc'),
      description: t('servicesPage.detailedServices.services.tax.description'),
      features: t('servicesPage.detailedServices.services.tax.features', { returnObjects: true }) as string[],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      id: 'advisory',
      title: t('servicesPage.detailedServices.services.advisory.title'),
      icon: <Briefcase className="h-8 w-8 text-yellow-600" />,
      shortDesc: t('servicesPage.detailedServices.services.advisory.shortDesc'),
      description: t('servicesPage.detailedServices.services.advisory.description'),
      features: t('servicesPage.detailedServices.services.advisory.features', { returnObjects: true }) as string[],
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100'
    },
    {
      id: 'risk',
      title: t('servicesPage.detailedServices.services.risk.title'),
      icon: <Shield className="h-8 w-8 text-red-600" />,
      shortDesc: t('servicesPage.detailedServices.services.risk.shortDesc'),
      description: t('servicesPage.detailedServices.services.risk.description'),
      features: t('servicesPage.detailedServices.services.risk.features', { returnObjects: true }) as string[],
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-100'
    },
    {
      id: 'hr',
      title: t('servicesPage.detailedServices.services.hr.title'),
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      shortDesc: t('servicesPage.detailedServices.services.hr.shortDesc'),
      description: t('servicesPage.detailedServices.services.hr.description'),
      features: t('servicesPage.detailedServices.services.hr.features', { returnObjects: true }) as string[],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      iconBg: 'bg-indigo-100'
    },
    {
      id: 'training',
      title: t('servicesPage.detailedServices.services.training.title'),
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      shortDesc: t('servicesPage.detailedServices.services.training.shortDesc'),
      description: t('servicesPage.detailedServices.services.training.description'),
      features: t('servicesPage.detailedServices.services.training.features', { returnObjects: true }) as string[],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
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
                {t('servicesPage.detailedServices.scheduleAppointment')}
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
              {t('servicesPage.detailedServices.title')} <span className="text-blue-600">{t('servicesPage.detailedServices.titleHighlight')}</span> {t('servicesPage.detailedServices.titleSuffix')}
            </h2>
          </MotionDiv>
          <MotionDiv 
            className="mt-4 text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mt-4 text-xl text-gray-600">
              {t('servicesPage.detailedServices.subtitle')}
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
              {t('servicesPage.detailedServices.needCustomSolution')}
            </p>
            <a
              href="/consultation"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-lg transition-colors duration-200"
            >
              {t('servicesPage.detailedServices.getFreeConsultation')}
            </a>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

export default DetailedServices;