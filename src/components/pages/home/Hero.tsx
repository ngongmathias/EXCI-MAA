import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Shield, Users, Globe } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import MotionInView from '../../enhanced/MotionInView';
import CompactSlideshow from '../../common/CompactSlideshow';
import { offices } from '../../../data/offices';

const features = (t: (k: string) => string) => [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: t('services.service3Title'),
    description: t('hero.feature2')
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: t('about.feature2Title'),
    description: t('hero.feature1')
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: t('services.service6Title'),
    description: t('hero.feature2')
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: t('about.feature3Title'),
    description: t('about.feature3Desc')
  }
];

const heroTexts = (t: (k: string) => string) => [
  t('services.service2Title'),
  t('services.title'),
  t('services.service3Title'),
  t('services.service4Title')
];

const Hero: FC = () => {
  const { t } = useLanguage();
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts(t).length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [t]);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white min-h-[90vh] overflow-hidden">
      <section className="relative py-16 lg:py-28">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 right-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 z-10">
              <MotionInView>
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-800 rounded-full text-sm font-medium shadow-lg">
                    {t('offices.subtitle')}
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-600 font-medium tracking-wide uppercase">
                      Experts Comptables Internationaux - MAA
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      <span className="block">{t('hero.title')}</span>
                      <span className={`inline-block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                        {heroTexts(t)[currentText]}
                      </span>
                    </h1>
                  </div>

                  <p className="text-xl text-blue-600 font-semibold">
                    {t('hero.subtitle')}
                  </p>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('hero.description')}
                  </p>
                </div>
              </MotionInView>

              {/* Key Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features(t).map((feature, index) => (
                  <MotionInView key={index} delay={index * 0.05}>
                    <div className="flex items-start space-x-3 p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </MotionInView>
                ))}
              </div>

              {/* CTA Buttons */}
              <MotionInView>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    to="/contact"
                    className="btn-primary group inline-flex items-center justify-center space-x-2 px-6 py-3 text-base font-medium rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-xl"
                  >
                    <span>{t('hero.cta2')}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/services"
                    className="btn-secondary inline-flex items-center justify-center bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white shadow-lg hover:shadow-xl"
                  >
                    {t('services.viewAll')}
                  </Link>
                </div>
              </MotionInView>
            </div>

            {/* Visual Element */}
            <div className="relative space-y-6">
              {/* Slideshow Component */}
              <MotionInView>
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <CompactSlideshow className="h-64 md:h-80" />
                </div>
              </MotionInView>

              {/* Global Presence Card */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white relative shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-6 text-white">{t('offices.title')}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {offices.slice(0, 8).map((office) => (
                        <div key={office.id} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all cursor-default">
                          <div className="font-bold text-white mb-1">{office.country}</div>
                          <div className="text-blue-100 text-xs overflow-hidden text-ellipsis whitespace-nowrap">{office.phone}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">✓</span>
                  </div>
                </div>
              </div>

              {/* Floating success indicator */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">★</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">Since 2012</div>
                    <div className="text-xs text-gray-500">Professional Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
      </section>
    </div>
  );
};

export default Hero;