import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, Users, Shield, Lightbulb, Briefcase, PieChart } from 'lucide-react';

const ServicesHero: FC = () => {
  const services = [
    { name: 'Accounting & Bookkeeping', icon: <BarChart3 className="h-6 w-6" /> },
    { name: 'Audit & Assurance', icon: <FileText className="h-6 w-6" /> },
    { name: 'Tax Consulting', icon: <PieChart className="h-6 w-6" /> },
    { name: 'Business Advisory', icon: <Briefcase className="h-6 w-6" /> },
    { name: 'Risk Management', icon: <Shield className="h-6 w-6" /> },
    { name: 'Financial Reporting', icon: <BarChart3 className="h-6 w-6" /> },
  ];

  const AnimatedGradientText = ({ children }: { children: React.ReactNode }) => {
    return (
      <span className="animate-text-gradient bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-500 bg-[200%_auto] bg-clip-text text-transparent">
        {children}
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Business with <AnimatedGradientText>Expert Financial Solutions</AnimatedGradientText>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-gray-600 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover how our comprehensive financial services can drive growth, ensure compliance, and optimize your business performance.
          </motion.p>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="w-8 h-14 rounded-full border-2 border-blue-400 flex justify-center p-2"
        >
          <motion.div
            className="w-1 h-3 bg-blue-400 rounded-full"
            animate={{
              y: [0, 10],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesHero;