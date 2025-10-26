import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AccreditationLogo = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
};

const Accreditations: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Accreditation logos data using actual logos from public/images/logosforaccreditations
  const accreditations: AccreditationLogo[] = [
    {
      id: 'acca-approved-employer',
      name: 'ACCA Approved Employer',
      description: 'Association of Chartered Certified Accountants Approved Employer',
      logo: '/images/logosforaccreditations/ACCAApproved Employer.png',
    },
    {
      id: 'cosumaf',
      name: 'COSUMAF',
      description: 'Certification by COSUMAF',
      logo: '/images/logosforaccreditations/Certification by COSUMAF.jpg',
    },
    {
      id: 'icpar',
      name: 'ICPAR',
      description: 'The Institute of Certified Public Accountants of Rwanda',
      logo: '/images/logosforaccreditations/The Institute of Certified Public Accountants of Rwanda (ICPAR).png',
    },
    {
      id: 'acca-great-britain',
      name: 'The Order of ACCA of Great Britain',
      description: 'The Order of ACCA of Great Britain (ACCA)',
      logo: '/images/logosforaccreditations/The Order of ACCA of Great Britain (ACCA).png',
    },
    {
      id: 'onecca',
      name: 'ONECCA',
      description: 'The Order of Chartered Accountants of Cameroon',
      logo: '/images/logosforaccreditations/The Order of Chartered Accountants of Cameroon (ONECCA).png',
    },
    {
      id: 'ontario-ca',
      name: 'Chartered Accountants of Ontario',
      description: 'The Order of Chartered Accountants of Ontario, Canada',
      logo: '/images/logosforaccreditations/The Order of Chartered Accountants of Ontario, Canada.jpg',
    },
    {
      id: 'quebec-ca',
      name: 'Chartered Accountants of Quebec',
      description: 'The Order of Chartered Accountants of Quebec, Canada',
      logo: '/images/logosforaccreditations/The Order of Chartered Accountants of Quebec, Canada.png',
    },
    {
      id: 'opc-burundi',
      name: 'OPC Burundi',
      description: 'The Order of Professional Accountants Burundi',
      logo: '/images/logosforaccreditations/The Order of Professional Accountants Burundi (OPC).jpg',
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % accreditations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [accreditations.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Professional Certifications
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Accreditations & Certifications
          </h2>
        </div>

        {/* Slideshow Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center p-8 md:p-12"
              >
                {/* Logo */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <div className="aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-8">
                    <img
                      src={accreditations[currentSlide].logo}
                      alt={accreditations[currentSlide].name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-2xl font-bold text-gray-400">${accreditations[currentSlide].name}</div>`;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {accreditations[currentSlide].name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    {accreditations[currentSlide].description}
                  </p>
                  {accreditations[currentSlide].website && (
                    <a
                      href={accreditations[currentSlide].website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Visit Website
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {accreditations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide
                    ? 'bg-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
            <motion.div
              className="bg-blue-600 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSlide + 1) / accreditations.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accreditations;