'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageSquare, Phone, Mail, ArrowRight } from 'lucide-react';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-exci-blue-50 to-white -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center bg-exci-blue-100 rounded-full p-3 mb-4">
            <HelpCircle className="h-8 w-8 text-exci-blue-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our services, processes, and how we can help your business thrive.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div 
            className="space-y-4"
            variants={container}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={faq.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                variants={item}
              >
                <button
                  className="w-full px-6 py-5 text-left focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-${faq.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <motion.span
                      className="ml-4 flex-shrink-0 text-exci-blue-600"
                      animate={{
                        rotate: activeIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.span>
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-${faq.id}`}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { 
                          opacity: 1, 
                          height: 'auto',
                          transition: { 
                            opacity: { duration: 0.3 },
                            height: { duration: 0.3 }
                          } 
                        },
                        collapsed: { 
                          opacity: 0, 
                          height: 0,
                          transition: { 
                            opacity: { duration: 0.2 },
                            height: { duration: 0.2 }
                          }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0 text-gray-600">
                        <div className="border-t border-gray-100 mt-2 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 bg-gradient-to-r from-exci-blue-900 to-exci-blue-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="text-2xl font-bold text-white">Still have questions?</h3>
              <p className="mt-4 text-exci-blue-100">
                Can't find the answer you're looking for? Our team is here to help. 
                Reach out to us and we'll get back to you as soon as possible.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-700 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-exci-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-white">Chat with us</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      Our team is here to help
                    </p>
                    <a 
                      href="#contact-form"
                      className="mt-2 inline-flex items-center text-sm font-medium text-exci-yellow-400 hover:text-exci-yellow-300 group"
                    >
                      Send us a message
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-exci-blue-700 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-exci-yellow-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-white">Call us</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      Monday to Friday, 9am to 6pm
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
                    <h4 className="text-sm font-medium text-white">Email us</h4>
                    <p className="mt-1 text-sm text-exci-blue-100">
                      We'll get back to you within 24 hours
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
                <h3 className="text-xl font-bold text-white">Can't find what you're looking for?</h3>
                <p className="mt-2 text-exci-blue-100">
                  Our team of experts is here to answer any questions you may have.
                </p>
                <div className="mt-6">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center justify-center rounded-full border border-transparent bg-exci-yellow-500 px-6 py-3 text-base font-medium text-exci-blue-900 shadow-sm hover:bg-exci-yellow-400 focus:outline-none focus:ring-2 focus:ring-exci-yellow-500 focus:ring-offset-2 focus:ring-offset-exci-blue-900 transition-colors duration-200"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}