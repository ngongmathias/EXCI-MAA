import { FC } from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Users, Award } from 'lucide-react';

const AboutHero: FC = () => {
  const stats = [
    { id: 1, name: 'Years of Experience', value: '27+', icon: <Award className="h-8 w-8 text-white" /> },
    { id: 2, name: 'Countries Served', value: '6+', icon: <Globe className="h-8 w-8 text-white" /> },
    { id: 3, name: 'Team Members', value: '50+', icon: <Users className="h-8 w-8 text-white" /> },
    { id: 4, name: 'Client Satisfaction', value: '98%', icon: <Award className="h-8 w-8 text-white" /> },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">About EXCI-MAA</span>
                <span className="block text-blue-600">Your Trusted Financial Partner</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                With over 27 years of excellence in financial services, EXCI-MAA has been a trusted partner for businesses across multiple countries, providing expert accounting, auditing, and consulting services.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get in Touch
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8 lg:mb-0">
            <span className="block">Trusted by businesses worldwide</span>
          </h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 mx-auto mb-2">
                  {stat.icon}
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;