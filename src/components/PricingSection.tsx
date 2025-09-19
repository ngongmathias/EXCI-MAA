'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, X, ArrowRight, Zap, BarChart3, Briefcase, DollarSign, MessageSquare, Phone, Mail, Calendar, User, Building2 } from 'lucide-react';

type BillingCycle = 'monthly' | 'annually';

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
    color: 'from-exci-blue-500 to-exci-blue-600',
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

const features = [
  { id: 'bookkeeping', name: 'Bookkeeping' },
  { id: 'financial-reports', name: 'Financial Reports' },
  { id: 'tax-estimates', name: 'Tax Estimates' },
  { id: 'support', name: 'Support' },
  { id: 'transactions', name: 'Transactions/Month' },
  { id: 'dashboard', name: 'Financial Dashboard' },
  { id: 'tax-filing', name: 'Tax Filing' },
  { id: 'inventory', name: 'Inventory Management' },
  { id: 'account-manager', name: 'Dedicated Account Manager' },
  { id: 'custom-reporting', name: 'Custom Reporting' },
  { id: 'tax-planning', name: 'Tax Planning' },
  { id: 'audit-support', name: 'Audit Support' }
];

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const priceText = isAnnual ? `$${price}/month` : `$${price}/month`;
  const annualSavings = Math.round(((plan.monthlyPrice * 12 - plan.annualPrice * 12) / (plan.monthlyPrice * 12)) * 100);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: isPopular ? 0.2 : 0 }}
      className={`relative flex flex-col p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
        isPopular ? 'border-exci-blue-500' : 'border-transparent'
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

const FeatureComparisonTable = () => {
  return (
    <div className="mt-16 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-xl">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Feature
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
              Starter
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
              Professional
            </th>
            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {features.map((feature) => (
            <tr key={feature.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {feature.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                {getFeatureStatus('starter', feature.id)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                {getFeatureStatus('professional', feature.id)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                {getFeatureStatus('enterprise', feature.id)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getFeatureStatus = (planId: string, featureId: string) => {
  const plan = pricingPlans.find(p => p.id === planId);
  if (!plan) return null;
  
  if (featureId === 'transactions') {
    if (planId === 'starter') return 'Up to 50';
    if (planId === 'professional') return 'Up to 200';
    return 'Unlimited';
  }
  
  if (featureId === 'support') {
    if (planId === 'starter') return 'Email';
    if (planId === 'professional') return 'Email & Phone';
    return '24/7 Priority';
  }
  
  const isIncluded = plan.features.some(f => 
    f.toLowerCase().includes(featureId.split('-').join(' '))
  );
  
  return isIncluded ? (
    <Check className="h-5 w-5 text-green-500 mx-auto" />
  ) : (
    <X className="h-5 w-5 text-gray-300 mx-auto" />
  );
};

const CustomQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    services: [] as string[]
  });
  
  const services = [
    'Accounting & Bookkeeping',
    'Tax Preparation',
    'Financial Advisory',
    'Audit & Assurance',
    'Business Consulting',
    'Payroll Services'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const services = [...prev.services];
      const index = services.indexOf(service);
      
      if (index > -1) {
        services.splice(index, 1);
      } else {
        services.push(service);
      }
      
      return {
        ...prev,
        services
      };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-12 bg-white shadow-lg rounded-2xl p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Get a Custom Quote</h3>
        <p className="mt-2 text-gray-600">Tell us about your business needs and we'll prepare a personalized quote.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="focus:ring-exci-blue-500 focus:border-exci-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="focus:ring-exci-blue-500 focus:border-exci-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="ACME Inc."
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="focus:ring-exci-blue-500 focus:border-exci-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="focus:ring-exci-blue-500 focus:border-exci-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Services of Interest</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service) => (
            <div key={service} className="flex items-center">
              <input
                id={`service-${service}`}
                name="services"
                type="checkbox"
                className="h-4 w-4 text-exci-blue-600 focus:ring-exci-blue-500 border-gray-300 rounded"
                checked={formData.services.includes(service)}
                onChange={() => handleServiceToggle(service)}
              />
              <label htmlFor={`service-${service}`} className="ml-2 block text-sm text-gray-700">
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Tell us about your needs</label>
        <div className="mt-1">
          <textarea
            id="message"
            name="message"
            rows={4}
            className="shadow-sm focus:ring-exci-blue-500 focus:border-exci-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
            placeholder="Please describe your business and what services you're interested in..."
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-exci-blue-600 to-exci-blue-700 hover:from-exci-blue-700 hover:to-exci-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-exci-blue-500 transition-all duration-200"
        >
          Request Custom Quote
        </button>
      </div>
      
      <p className="mt-4 text-center text-sm text-gray-500">
        We'll get back to you within 24 hours with a personalized quote.
      </p>
    </form>
  );
};

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly');
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
            Simple, Transparent <span className="text-exci-blue-600">Pricing</span>
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
                billingCycle === 'annually' ? 'bg-exci-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-exci-blue-500 focus:ring-offset-2`}
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
            href="#custom-quote"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-exci-blue-600 to-exci-blue-700 hover:from-exci-blue-700 hover:to-exci-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Get a Custom Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
        
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Compare All Features</h3>
          <FeatureComparisonTable />
        </div>
        
        <div id="custom-quote" className="mt-24">
          <CustomQuoteForm />
        </div>
        
        <div className="mt-16 bg-exci-blue-50 rounded-2xl p-8 text-center">
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-exci-blue-700 bg-white hover:bg-gray-50 shadow-sm"
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
}