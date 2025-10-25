import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Shield, Users, Globe } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import MotionInView from '../../enhanced/MotionInView';

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
  }, []);

  

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 min-h-[90vh] overflow-hidden">
      <section className="relative py-16 lg:py-28">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
          <div className="absolute -left-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>
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
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                <span className="block">{t('hero.title')}</span>
                <span className={`inline-block mt-2 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                  {heroTexts(t)[currentText]}
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 font-semibold drop-shadow-lg">
                {t('hero.subtitle')}
              </p>
              
              <p className="text-lg text-white/90 leading-relaxed drop-shadow-lg">
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
          <div className="relative">
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{t('offices.title')}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Canada</div>
                      <div className="text-blue-100">+1 416 624 2510</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">France</div>
                      <div className="text-blue-100">+33 652 452 1402</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Rwanda</div>
                      <div className="text-blue-100">+250 787 779 965</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Cameroon</div>
                      <div className="text-blue-100">+237 698 835 251</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Burundi</div>
                      <div className="text-blue-100">+257 793 439 93</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">United States of America</div>
                      <div className="text-blue-100">+1 502 299 247</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="font-semibold">Republic of Congo</div>
                      <div className="text-blue-100">+ 1(416) 624 2510 / +242 06 444 0729</div>
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
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-xl opacity-30 animate-pulse pointer-events-none"></div>
    </section>
    </div>
  );
};

export default Hero;