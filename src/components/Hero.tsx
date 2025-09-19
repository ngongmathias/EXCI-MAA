'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, BarChart2, Globe, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: 'Financial Excellence',
    description: 'Comprehensive financial solutions tailored to your needs'
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global Reach',
    description: 'International expertise with local market knowledge'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Risk Management',
    description: 'Protecting your assets and investments'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Client-Centric',
    description: 'Personalized service for every client'
  }
];

const heroTexts = [
  'Global Tax Expertise',
  'Financial Solutions',
  'Business Consulting',
  'Audit & Assurance'
];

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-exci-blue-50 to-white py-16 lg:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-exci-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-exci-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-64 h-64 bg-exci-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 z-10">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-exci-blue-100 text-exci-blue-800 rounded-full text-sm font-medium">
                Trusted by 1000+ clients worldwide
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block">Transforming</span>
                <span className={`inline-block mt-2 bg-gradient-to-r from-exci-blue-600 to-exci-blue-400 bg-clip-text text-transparent transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                  {heroTexts[currentText]}
                </span>
              </h1>
              
              <p className="text-xl text-blue-600 font-semibold">
                Professional accounting, auditing, and consulting firm with international presence
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We deliver innovative financial solutions and strategic guidance to help businesses and individuals navigate complex financial landscapes with confidence and clarity.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-2 bg-exci-blue-50 rounded-lg text-exci-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/contact"
                className="btn-primary group inline-flex items-center justify-center space-x-2 px-6 py-3 text-base font-medium rounded-lg shadow-sm text-white bg-exci-blue-600 hover:bg-exci-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-exci-blue-500 transition-colors duration-200"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Global Presence</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Canada</div>
                      <div className="text-exci-blue-100">+1 416 624 2510</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">France</div>
                      <div className="text-exci-blue-100">+33 652 452 1402</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Rwanda</div>
                      <div className="text-exci-blue-100">+250 787 779 965</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Cameroon</div>
                      <div className="text-exci-blue-100">+237 698 835 251</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">✓</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    </section>
  );
}
