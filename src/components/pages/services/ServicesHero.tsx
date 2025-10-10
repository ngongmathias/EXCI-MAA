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
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 to-blue-800 pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-800/90"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px] opacity-20"></div>
        
        {/* Fixed gradient accents */}
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Business with <AnimatedGradientText>Expert Financial Solutions</AnimatedGradientText>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-xl leading-8 text-blue-100 mb-20"
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
          className="w-8 h-14 rounded-full border-2 border-yellow-400 flex justify-center p-2"
        >
          <motion.div
            className="w-1 h-3 bg-yellow-400 rounded-full"
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