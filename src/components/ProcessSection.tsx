'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Search, FileText, Users, CheckCircle, BarChart, MessageSquare, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Discovery & Analysis',
    description: 'We begin by understanding your business needs, challenges, and goals through in-depth discussions and analysis.',
    icon: <Search className="h-6 w-6 text-white" />,
    color: 'bg-exci-blue-600',
    borderColor: 'border-exci-blue-600',
    duration: '1-2 Weeks',
    keyPoints: [
      'Initial consultation',
      'Business assessment',
      'Requirement gathering',
      'Scope definition'
    ]
  },
  {
    id: 2,
    title: 'Proposal & Planning',
    description: 'We develop a customized service plan with clear objectives, timelines, and deliverables tailored to your needs.',
    icon: <FileText className="h-6 w-6 text-white" />,
    color: 'bg-green-600',
    borderColor: 'border-green-600',
    duration: '3-5 Days',
    keyPoints: [
      'Customized service plan',
      'Pricing structure',
      'Timeline agreement',
      'Team assignment'
    ]
  },
  {
    id: 3,
    title: 'Team Onboarding',
    description: 'Our expert team is assigned to your project, ensuring the right skills and expertise for your specific requirements.',
    icon: <Users className="h-6 w-6 text-white" />,
    color: 'bg-purple-600',
    borderColor: 'border-purple-600',
    duration: '2-3 Days',
    keyPoints: [
      'Dedicated account manager',
      'Team introduction',
      'Access to tools',
      'Communication setup'
    ]
  },
  {
    id: 4,
    title: 'Implementation',
    description: 'We execute the agreed-upon services with precision, keeping you informed at every step of the process.',
    icon: <CheckCircle className="h-6 w-6 text-white" />,
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    duration: 'Varies by project',
    keyPoints: [
      'Regular progress updates',
      'Quality assurance',
      'Issue resolution',
      'Milestone reviews'
    ]
  },
  {
    id: 5,
    title: 'Review & Reporting',
    description: 'We provide comprehensive reports and analysis, ensuring complete transparency and understanding of the results.',
    icon: <BarChart className="h-6 w-6 text-white" />,
    color: 'bg-red-600',
    borderColor: 'border-red-600',
    duration: '1 Week',
    keyPoints: [
      'Performance metrics',
      'Financial reporting',
      'Compliance check',
      'Recommendations'
    ]
  },
  {
    id: 6,
    title: 'Ongoing Support',
    description: 'Our relationship continues with ongoing support, regular reviews, and strategic guidance for continuous improvement.',
    icon: <MessageSquare className="h-6 w-6 text-white" />,
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-600',
    duration: 'Ongoing',
    keyPoints: [
      'Dedicated support',
      'Regular check-ins',
      'Strategic advice',
      'Service optimization'
    ]
  }
];

const ProcessCard = ({ step, index, isActive, onClick }: { step: typeof processSteps[0], index: number, isActive: boolean, onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative pl-8 pb-10 border-l-2 ${isActive ? 'border-exci-blue-500' : 'border-gray-200'} transition-colors duration-300`}
    >
      <div 
        className={`absolute -left-3.5 w-7 h-7 rounded-full flex items-center justify-center ${step.color} border-4 border-white shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 z-10`}
        onClick={onClick}
      >
        {step.icon}
      </div>
      
      <div 
        className={`p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${isActive ? 'ring-2 ring-exci-blue-500' : ''}`}
        onClick={onClick}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{step.duration}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Step {index + 1}
          </span>
        </div>
        
        <motion.div
          initial={false}
          animate={{
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0,
            marginTop: isActive ? '1rem' : '0',
          }}
          className="overflow-hidden"
        >
          <p className="text-gray-700">{step.description}</p>
          <div className="mt-4 space-y-2">
            {step.keyPoints.map((point, i) => (
              <div key={i} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-exci-blue-600">Proven</span> Process
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A structured approach to delivering exceptional financial services tailored to your business needs.
          </motion.p>
        </div>

        <div ref={ref} className="max-w-3xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-exci-blue-500 to-green-500 opacity-20"></div>
          
          {/* Process steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <ProcessCard 
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => toggleStep(index)}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team of experts is ready to guide you through our process and deliver exceptional financial services for your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-md bg-exci-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-exci-blue-700 focus:outline-none focus:ring-2 focus:ring-exci-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Get a Free Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-exci-blue-600 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-exci-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}