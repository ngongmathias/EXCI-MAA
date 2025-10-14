import { FC, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../../lib/constants/routes';
import { Check, X, ArrowRight, Zap, BarChart3, Briefcase, Calendar, Building2 } from 'lucide-react';

type BillingCycle = 'monthly' | 'annually';

const PricingSection: FC = () => {
  const { t } = useTranslation();
  
  const pricingPlans = [
    {
      id: 'starter',
      name: t('servicesPage.pricing.plans.starter.name'),
      description: t('servicesPage.pricing.plans.starter.description'),
      monthlyPrice: 299,
      annualPrice: 287,
      features: t('servicesPage.pricing.plans.starter.features', { returnObjects: true }) as string[],
      notIncluded: t('servicesPage.pricing.plans.starter.notIncluded', { returnObjects: true }) as string[],
      popular: false,
      buttonText: t('servicesPage.pricing.plans.starter.buttonText'),
      color: 'from-blue-500 to-blue-600',
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      id: 'professional',
      name: t('servicesPage.pricing.plans.professional.name'),
      description: t('servicesPage.pricing.plans.professional.description'),
      monthlyPrice: 699,
      annualPrice: 671,
      features: t('servicesPage.pricing.plans.professional.features', { returnObjects: true }) as string[],
      notIncluded: t('servicesPage.pricing.plans.professional.notIncluded', { returnObjects: true }) as string[],
      popular: true,
      buttonText: t('servicesPage.pricing.plans.professional.buttonText'),
      color: 'from-green-500 to-green-600',
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      id: 'enterprise',
      name: t('servicesPage.pricing.plans.enterprise.name'),
      description: t('servicesPage.pricing.plans.enterprise.description'),
      monthlyPrice: 1499,
      annualPrice: 1439,
      features: t('servicesPage.pricing.plans.enterprise.features', { returnObjects: true }) as string[],
      notIncluded: t('servicesPage.pricing.plans.enterprise.notIncluded', { returnObjects: true }) as string[],
      popular: false,
      buttonText: t('servicesPage.pricing.plans.enterprise.buttonText'),
      color: 'from-purple-500 to-purple-600',
      icon: <Building2 className="h-6 w-6" />
    }
  ];

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const ref = useRef<HTMLDivElement>(null!);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly');
  };

  const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;

  const PricingCard = ({ 
    plan, 
    isAnnual,
    isPopular = false 
  }: { 
    plan: typeof pricingPlans[0], 
    isAnnual: boolean,
    isPopular?: boolean 
  }) => {
    const cardRef = useRef<HTMLDivElement>(null!);
    const cardInView = useInView(cardRef, { once: true, amount: 0.1 });
    const [isHovered, setIsHovered] = useState(false);
    
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    // priceText not used; omit to satisfy linter
    const annualSavings = Math.round(((plan.monthlyPrice * 12 - plan.annualPrice * 12) / (plan.monthlyPrice * 12)) * 100);

    return (
      <MotionDiv
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={cardInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: isPopular ? 0.2 : 0 }}
        className={`relative flex flex-col p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
          isPopular ? 'border-blue-500' : 'border-transparent'
        } ${isPopular ? 'transform -translate-y-2' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isPopular && (
          <div className="absolute top-0 right-0 -mt-3 -mr-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              MOST POPULAR
            </div>
          </div>
        )}
        
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.color} text-white`}>
            {plan.icon}
          </div>
          <h3 className="ml-3 text-xl font-bold text-gray-900">{plan.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-extrabold text-gray-900">${price}</span>
            <span className="ml-1 text-lg font-medium text-gray-500">/month</span>
          </div>
          {isAnnual && (
            <p className="mt-1 text-sm text-gray-500">
              Billed annually (${plan.annualPrice * 12})
              <span className="ml-2 text-green-600 font-medium">Save {annualSavings}%</span>
            </p>
          )}
          {!isAnnual && (
            <p className="mt-1 text-sm text-gray-500">
              or ${plan.annualPrice * 12} billed annually
            </p>
          )}
        </div>
        
        <Link
          to={ROUTES.CONSULTATION}
          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg`}
        >
          {plan.buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-medium text-gray-900">{t('servicesPage.pricing.whatsIncluded')}</h4>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="ml-2 text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          {plan.notIncluded.length > 0 && (
            <>
              <h4 className="text-sm font-medium text-gray-900 mt-6">{t('servicesPage.pricing.notIncluded')}</h4>
              <ul className="space-y-3">
                {plan.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-400">
                    <X className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    <span className="ml-2">{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        <MotionDiv 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </MotionDiv>
    );
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <MotionDiv 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{t('servicesPage.pricing.title')} <span className="text-blue-600">{t('servicesPage.pricing.titleHighlight')}</span> {t('servicesPage.pricing.titleSuffix')}</h2>
          </MotionDiv>
          <MotionDiv 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>{t('servicesPage.pricing.subtitle')}</p>
          </MotionDiv>
          
          <MotionDiv 
            className="mt-8 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={`mr-4 text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              {t('servicesPage.pricing.monthlyBilling')}
            </span>
            <button
              type="button"
              className={`${
                billingCycle === 'annually' ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              role="switch"
              aria-checked={billingCycle === 'annually'}
              onClick={toggleBillingCycle}
            >
              <span className="sr-only">Toggle billing cycle</span>
              <span
                aria-hidden="true"
                className={`${
                  billingCycle === 'annually' ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
            <span className="ml-4 text-sm font-medium text-gray-900">
              {t('servicesPage.pricing.annualBilling')} <span className="text-green-600">{t('servicesPage.pricing.saveUpTo')}</span>
            </span>
          </MotionDiv>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id}
              plan={plan}
              isAnnual={billingCycle === 'annually'}
              isPopular={plan.popular}
            />
          ))}
        </div>
        
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
            <p className="text-lg text-gray-600 mb-8">
              {t('servicesPage.pricing.needCustomSolution')}
            </p>
        <Link
          to={ROUTES.CONSULTATION}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {t('servicesPage.pricing.getCustomQuote')}
            <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
        </MotionDiv>
        
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{t('servicesPage.pricing.notSureWhichPlan')}</h3>
            <p className="mt-2 text-gray-600">
              {t('servicesPage.pricing.expertsHelp')}
            </p>
            <div className="mt-6">
            <Link
              to={ROUTES.CONSULTATION}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 shadow-sm"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t('servicesPage.pricing.scheduleFreeConsultation')}
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;