import { FC, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ArrowRight, Zap, BarChart3, Briefcase, DollarSign, MessageSquare, Phone, Mail, Calendar, User, Building2 } from 'lucide-react';

type BillingCycle = 'monthly' | 'annually';

const PricingSection: FC = () => {
  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 299,
      annualPrice: 287,
      features: [
        'Basic bookkeeping',
        'Monthly financial reports',
        'Quarterly tax estimates',
        'Email support',
        'Up to 50 transactions/month',
        'Basic financial dashboard'
      ],
      notIncluded: [
        'Audit support',
        'Dedicated account manager',
        'Custom reporting',
        'Tax filing',
        'Inventory management'
      ],
      popular: false,
      buttonText: 'Get Started',
      color: 'from-blue-500 to-blue-600',
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing businesses',
      monthlyPrice: 699,
      annualPrice: 671,
      features: [
        'Everything in Starter',
        'Advanced bookkeeping',
        'Weekly financial reports',
        'Monthly tax estimates',
        'Priority email & phone support',
        'Up to 200 transactions/month',
        'Advanced financial dashboard',
        'Basic tax filing',
        'Inventory tracking'
      ],
      notIncluded: [
        'Audit support',
        'Dedicated account manager',
        'Custom reporting',
        'Advanced tax planning'
      ],
      popular: true,
      buttonText: 'Get Started',
      color: 'from-green-500 to-green-600',
      icon: <Briefcase className="h-6 w-6" />
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For established businesses with complex needs',
      monthlyPrice: 1499,
      annualPrice: 1439,
      features: [
        'Everything in Professional',
        'Full-service accounting',
        'Custom financial reporting',
        'Dedicated account manager',
        '24/7 priority support',
        'Unlimited transactions',
        'Advanced tax planning',
        'Audit support',
        'Custom integrations',
        'Board meeting preparation',
        'CFO advisory services'
      ],
      notIncluded: [],
      popular: false,
      buttonText: 'Contact Sales',
      color: 'from-purple-500 to-purple-600',
      icon: <Building2 className="h-6 w-6" />
    }
  ];

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly');
  };

  const PricingCard = ({ 
    plan, 
    billingCycle,
    isAnnual,
    isPopular = false 
  }: { 
    plan: typeof pricingPlans[0], 
    billingCycle: BillingCycle,
    isAnnual: boolean,
    isPopular?: boolean 
  }) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { once: true, amount: 0.1 });
    const [isHovered, setIsHovered] = useState(false);
    
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    const priceText = isAnnual ? `$${price}/month` : `$${price}/month`;
    const annualSavings = Math.round(((plan.monthlyPrice * 12 - plan.annualPrice * 12) / (plan.monthlyPrice * 12)) * 100);

    return (
      <motion.div
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
        
        <a
          href="#contact"
          className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg`}
        >
          {plan.buttonText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
        
        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-medium text-gray-900">What's included:</h4>
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
              <h4 className="text-sm font-medium text-gray-900 mt-6">Not included:</h4>
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
        
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    );
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the perfect plan for your business needs. No hidden fees, cancel anytime.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={`mr-4 text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly Billing
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
              Annual Billing <span className="text-green-600">(Save up to 20%)</span>
            </span>
          </motion.div>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              isAnnual={billingCycle === 'annually'}
              isPopular={plan.popular}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-8">
            Need a custom solution? We offer tailored packages for businesses with unique requirements.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get a Custom Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
        
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Not sure which plan is right for you?</h3>
            <p className="mt-2 text-gray-600">
              Our experts are here to help you choose the perfect solution for your business needs.
              Schedule a free 30-minute consultation to discuss your requirements.
            </p>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 shadow-sm"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;