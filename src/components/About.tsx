'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Users, Globe, Award, Target, BarChart2, Shield, Lightbulb, UserPlus, Briefcase, ArrowRight } from 'lucide-react';

const stats = [
  { icon: Users, value: '27+', label: 'Years Experience' },
  { icon: Globe, value: '6+', label: 'Countries' },
  { icon: Award, value: '500+', label: 'Clients Served' },
  { icon: Target, value: '99%', label: 'Success Rate' },
];

const coreValues = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: 'Excellence',
    description: 'Delivering exceptional quality in every service we provide.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Integrity',
    description: 'Upholding the highest standards of professionalism and ethics.'
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Innovation',
    description: 'Embracing new ideas and technologies to drive success.'
  },
  {
    icon: <UserPlus className="h-6 w-6" />,
    title: 'Partnership',
    description: 'Building lasting relationships based on trust and mutual success.'
  }
];

const team = [
  {
    name: 'Pierre Kemeni',
    role: 'Founder & CEO',
    bio: 'MBA, CPA, DEC with over 27 years of international accounting and auditing experience.',
    image: '/images/team/pierre.jpg'
  },
  {
    name: 'Patrick Ngatcha',
    role: 'Managing Director',
    bio: 'DEC, DSCG, Master CCA, MSTCF with 13+ years in business development and financial consulting.',
    image: '/images/team/patrick.jpg'
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-exci-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-exci-blue-700 bg-exci-blue-100 rounded-full mb-4">
            About Our Firm
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pioneering Financial Excellence <span className="text-exci-blue-600">Since 1996</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-exci-blue-400 to-exci-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8" ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                EXCI-MAA stands at the forefront of financial consulting, offering unparalleled expertise in auditing, accounting, taxation, and business development. With a distinguished presence across North America, Europe, and Africa, we bring a global perspective with local market intelligence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our team of certified professionals combines decades of experience with innovative solutions to navigate the complex financial landscapes of today's dynamic markets. We're committed to empowering businesses with strategic insights and actionable intelligence.
              </p>
            </motion.div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-exci-blue-50 rounded-lg text-exci-blue-600">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-exci-blue-600 hover:bg-exci-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-exci-blue-500 transition-colors duration-200"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Stats and Visual */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-exci-blue-100 text-exci-blue-600 mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
