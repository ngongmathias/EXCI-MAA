'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { Send, AlertCircle, CheckCircle, Loader2, Upload, FileText, X, Check } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacyPolicy: boolean;
  file: FileList | null;
};

export default function EnhancedContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>();

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  // Handle file selection
  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }
    setFile(file);
    setFileName(file.name);
    setValue('file', [file] as unknown as FileList);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setFile(null);
    setFileName('');
    setValue('file', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'file' && value && (value as FileList).length > 0) {
            formData.append('file', (value as FileList)[0]);
          } else if (key !== 'file') {
            formData.append(key, value as string);
          }
        }
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been sent successfully!',
        });
        reset();
        setFile(null);
        setFileName('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10
      } 
    },
  };

  const successVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    exit: { scale: 0.8, opacity: 0 }
  };

  // Calculate background gradient position based on mouse position
  const backgroundGradient = `radial-gradient(
    circle at ${mousePosition.x}px ${mousePosition.y}px,
    rgba(56, 189, 248, 0.1) 0%,
    rgba(99, 102, 241, 0.1) 50%,
    rgba(168, 85, 247, 0.1) 100%
  )`;

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background */}
      <div 
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: backgroundGradient,
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{
              y: [null, -20],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {submitStatus.type === 'success' ? (
              <motion.div
                key="success"
                variants={successVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
              >
                <div className="p-8 sm:p-12 text-center">
                  <motion.div
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      rotate: [0, 20, -10, 10, 0],
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 300,
                      damping: 15,
                      delay: 0.2
                    }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setSubmitStatus({ type: null, message: '' })}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-exci-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-exci-blue-500/30 transition-all duration-300"
                  >
                    Send Another Message
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={container}
                initial="hidden"
                animate="show"
                className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
              >
                {/* Form header */}
                <div className="p-8 sm:p-10 border-b border-white/10">
                  <motion.h3
                    variants={item}
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-exci-blue-600 to-purple-600 mb-2"
                  >
                    Get In Touch
                  </motion.h3>
                  <motion.p 
                    variants={item}
                    className="text-gray-600 text-lg"
                  >
                    Have a project in mind? Let's make it happen.
                  </motion.p>
                </div>

                {/* Form content */}
                <div className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Name Field */}
                      <motion.div 
                        variants={item}
                        className="relative"
                      >
                        <div className="relative">
                          <input
                            id="name"
                            type="text"
                            {...register('name', { 
                              required: 'Name is required',
                              minLength: { value: 2, message: 'Name must be at least 2 characters' }
                            })}
                            className={`peer w-full bg-white/50 border-0 border-b-2 ${
                              errors.name 
                                ? 'border-red-400 focus:border-red-500' 
                                : 'border-gray-200 focus:border-exci-blue-500'
                            } py-3 px-0 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0`}
                            placeholder=" "
                          />
                          <label 
                            htmlFor="name"
                            className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-exci-blue-600"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.name.message}
                          </p>
                        )}
                      </motion.div>

                      {/* Email Field */}
                      <motion.div 
                        variants={item}
                        className="relative"
                      >
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                              },
                            })}
                            className={`peer w-full bg-white/50 border-0 border-b-2 ${
                              errors.email 
                                ? 'border-red-400 focus:border-red-500' 
                                : 'border-gray-200 focus:border-exci-blue-500'
                            } py-3 px-0 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0`}
                            placeholder=" "
                          />
                          <label 
                            htmlFor="email"
                            className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-exci-blue-600"
                          >
                            Email Address <span className="text-red-500">*</span>
                          </label>
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.email.message}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Phone Field */}
                    <motion.div 
                      variants={item}
                      className="relative"
                    >
                      <div className="relative">
                        <input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="peer w-full bg-white/50 border-0 border-b-2 border-gray-200 focus:border-exci-blue-500 py-3 px-0 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0"
                          placeholder=" "
                        />
                        <label 
                          htmlFor="phone"
                          className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-exci-blue-600"
                        >
                          Phone Number (Optional)
                        </label>
                      </div>
                    </motion.div>

                    {/* Subject Field */}
                    <motion.div 
                      variants={item}
                      className="relative"
                    >
                      <div className="relative">
                        <select
                          id="subject"
                          {...register('subject', { required: 'Subject is required' })}
                          className={`peer w-full bg-white/50 border-0 border-b-2 ${
                            errors.subject 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-exci-blue-500'
                          } py-3 px-0 text-gray-900 focus:outline-none focus:ring-0 appearance-none`}
                          defaultValue=""
                        >
                          <option value="" disabled>Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Project Quote">Project Quote</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Career">Career Opportunities</option>
                          <option value="Other">Other</option>
                        </select>
                        <label 
                          htmlFor="subject"
                          className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-exci-blue-600"
                        >
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.subject.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Message Field */}
                    <motion.div 
                      variants={item}
                      className="relative"
                    >
                      <div className="relative">
                        <textarea
                          id="message"
                          rows={4}
                          {...register('message', {
                            required: 'Message is required',
                            minLength: {
                              value: 10,
                              message: 'Message must be at least 10 characters',
                            },
                          })}
                          className={`peer w-full bg-white/50 border-0 border-b-2 ${
                            errors.message 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-exci-blue-500'
                          } py-3 px-0 text-gray-900 placeholder-transparent focus:outline-none focus:ring-0 resize-none`}
                          placeholder=" "
                        />
                        <label 
                          htmlFor="message"
                          className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-exci-blue-600"
                        >
                          Your Message <span className="text-red-500">*</span>
                        </label>
                      </div>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message.message}
                        </p>
                      )}
                    </motion.div>

                    {/* File Upload */}
                    <motion.div 
                      variants={item}
                      className="relative"
                    >
                      <div 
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                          errors.file 
                            ? 'border-red-300 bg-red-50' 
                            : 'border-gray-300 hover:border-exci-blue-400 bg-white/50 hover:bg-white/70'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileInputChange}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        />
                        <div className="space-y-2">
                          <div className="mx-auto w-12 h-12 bg-exci-blue-50 rounded-full flex items-center justify-center">
                            <Upload className="w-6 h-6 text-exci-blue-600" />
                          </div>
                          <div className="text-sm text-gray-600">
                            {fileName ? (
                              <div className="flex items-center justify-center space-x-2">
                                <FileText className="w-5 h-5 text-exci-blue-600" />
                                <span className="truncate max-w-xs">{fileName}</span>
                                <button 
                                  type="button" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile();
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <span className="font-medium text-exci-blue-600 hover:text-exci-blue-700">Click to upload</span> or drag and drop
                                <p className="text-xs text-gray-500 mt-1">PDF, DOC, XLS, JPG, PNG (max 5MB)</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <input type="hidden" {...register('file')} />
                    </motion.div>

                    {/* Privacy Policy */}
                    <motion.div 
                      variants={item}
                      className="flex items-start pt-2"
                    >
                      <div className="flex items-center h-5">
                        <input
                          id="privacy-policy"
                          type="checkbox"
                          {...register('privacyPolicy', {
                            required: 'You must accept the privacy policy',
                          })}
                          className="h-4 w-4 rounded border-gray-300 text-exci-blue-600 focus:ring-exci-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="privacy-policy"
                          className="font-medium text-gray-700"
                        >
                          I agree to the{' '}
                          <a
                            href="/privacy-policy"
                            className="text-exci-blue-600 hover:text-exci-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            privacy policy
                          </a>{' '}
                          and{' '}
                          <a
                            href="/terms"
                            className="text-exci-blue-600 hover:text-exci-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            terms of service
                          </a>
                          .<span className="text-red-500">*</span>
                        </label>
                        {errors.privacyPolicy && (
                          <p className="mt-1 text-red-600 text-sm flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.privacyPolicy.message}
                          </p>
                        )}
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div 
                      variants={item}
                      className="pt-4"
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex justify-center items-center py-4 px-6 rounded-xl text-base font-medium text-white shadow-lg transition-all duration-300 ${
                          isSubmitting
                            ? 'bg-exci-blue-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-exci-blue-600 to-purple-600 hover:from-exci-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-exci-blue-500/30'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="-ml-1 mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </motion.div>

                    {/* Error Message */}
                    {submitStatus.type === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start"
                      >
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{submitStatus.message}</span>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
