import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Users, Globe, Award, Target, BarChart2, Shield, Lightbulb, UserPlus, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

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

const About: FC = () => {
  const ref = useRef(null);
  const { t } = useLanguage();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
            {t('about.title')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('about.subtitle')} <span className="text-blue-600">Since 1996</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
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
                {t('about.feature1Desc')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t('about.feature2Desc')}
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
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('about.feature1Title')}</h3>
                      <p className="text-sm text-gray-600">{t('about.feature1Desc')}</p>
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
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <span>{t('services.learnMore')}</span>
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
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
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
};

export default About;