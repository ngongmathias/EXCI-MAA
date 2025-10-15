'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { insertItem } from '../../../services/supabaseCrud';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Basic runtime sanity checks for configuration
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase environment variables are not configured');
      }

      console.log('[ContactForm] Submitting payload:', data);
      await insertItem('contact_submissions', data);
      reset();
      setIsSubmitted(true);
      console.log('[ContactForm] Submission successful');
    } catch (error) {
      const message = (error as any)?.message ?? 'Failed to send message. Please try again later.';
      console.error('[ContactForm] Error submitting form:', error);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isSubmitted) {
    return (
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center bg-gradient-to-br from-green-50 to-white p-12 rounded-2xl shadow-lg border border-green-100">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for reaching out. We've received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-exci-yellow-500 hover:bg-exci-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-exci-yellow-500 transition-colors duration-200"
          >
            Send Another Message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative bg-white py-16 sm:py-24" id="contact-form">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-exci-blue-50 to-white -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start your project? Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-exci-blue-900 px-8 py-12 sm:px-12 lg:py-16">
              <div className="max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
                <p className="mt-4 text-exci-blue-100">
                  Fill out the form and our team will get back to you within 24 hours. 
                  For immediate assistance, please call us directly.
                </p>
                
                <div className="mt-10 space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-exci-blue-800 rounded-lg p-3">
                      <svg className="h-6 w-6 text-exci-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-white">Call us</h4>
                      <p className="mt-1 text-exci-blue-100">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-exci-blue-800 rounded-lg p-3">
                      <svg className="h-6 w-6 text-exci-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-white">Email us</h4>
                      <p className="mt-1 text-exci-blue-100">info@exci-maa.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-exci-blue-800 rounded-lg p-3">
                      <svg className="h-6 w-6 text-exci-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-white">Visit us</h4>
                      <p className="mt-1 text-exci-blue-100">123 Business Ave, City, Country</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-exci-blue-800">
                  <h4 className="text-sm font-semibold text-exci-blue-200 uppercase tracking-wider">Business Hours</h4>
                  <p className="mt-2 text-exci-blue-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-exci-blue-100">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="px-8 py-12 sm:px-12 lg:py-16">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-6"
                >
                  <motion.div variants={item} className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Name is required' })}
                        className={`block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-exci-yellow-400 focus:border-exci-yellow-400 sm:text-sm p-3 border ${
                          errors.name ? 'border-red-300' : ''
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={item} className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-exci-yellow-400 focus:border-exci-yellow-400 sm:text-sm p-3 border ${
                          errors.email ? 'border-red-300' : ''
                        }`}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={item} className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone')}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-exci-yellow-400 focus:border-exci-yellow-400 sm:text-sm p-3 border"
                      placeholder="+1 (555) 123-4567"
                    />
                  </motion.div>
                  
                  <motion.div variants={item} className="space-y-1">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        {...register('subject', { required: 'Subject is required' })}
                        className={`block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-exci-yellow-400 focus:border-exci-yellow-400 sm:text-sm p-3 border ${
                          errors.subject ? 'border-red-300' : ''
                        }`}
                        defaultValue=""
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Accounting Services">Accounting Services</option>
                        <option value="Audit Services">Audit Services</option>
                        <option value="Tax Consultation">Tax Consultation</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.subject && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </motion.div>
                  
                  <motion.div variants={item} className="space-y-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={4}
                        {...register('message', { 
                          required: 'Message is required',
                          minLength: { value: 10, message: 'Message must be at least 10 characters' }
                        })}
                        className={`block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-exci-yellow-400 focus:border-exci-yellow-400 sm:text-sm p-3 border ${
                          errors.message ? 'border-red-300' : ''
                        }`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <div className="absolute top-3 right-3">
                          <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </motion.div>
                  
                  {submitError && (
                    <motion.div 
                      className="rounded-md bg-red-50 p-4"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{submitError}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div variants={item} className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className={`w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white duration-200 ${
                        isSubmitting ? 'bg-blue-600 opacity-75 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 aria-hidden="true" className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                          <span className="sr-only">Sending</span>
                          <span aria-live="polite">Sending...</span>
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="text-center text-sm text-gray-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p>We'll get back to you within 24 hours. Your information is secure.</p>
                </motion.div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}