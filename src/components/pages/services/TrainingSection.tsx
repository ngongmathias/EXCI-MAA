import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, FileCheck, Briefcase, Layers, Calendar } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ROUTES } from '../../../lib/constants/routes';
import MotionInView from '../../enhanced/MotionInView';

type TrainingCard = {
  id: string;
  icon: any;
  title: string;
  shortDesc: string;
  color: string;
  duration: string;
  price: string;
  courses: string[];
};

const TrainingSection: FC = () => {
  const { t } = useLanguage();

  const cards: TrainingCard[] = [
    {
      id: 'accounting',
      icon: Calculator,
      title: t('training.categories.accounting.title'),
      shortDesc: t('training.subtitle'),
      color: 'bg-blue-500',
      duration: t('training.categories.accounting.duration'),
      price: t('training.categories.accounting.price'),
      courses: (t as any)('training.categories.accounting.courses', { returnObjects: true }) as string[]
    },
    {
      id: 'audit',
      icon: FileCheck,
      title: t('training.categories.audit.title'),
      shortDesc: t('training.subtitle'),
      color: 'bg-green-500',
      duration: t('training.categories.audit.duration'),
      price: t('training.categories.audit.price'),
      courses: (t as any)('training.categories.audit.courses', { returnObjects: true }) as string[]
    },
    {
      id: 'advice',
      icon: Briefcase,
      title: t('training.categories.advice.title'),
      shortDesc: t('training.subtitle'),
      color: 'bg-yellow-500',
      duration: t('training.categories.advice.duration'),
      price: t('training.categories.advice.price'),
      courses: (t as any)('training.categories.advice.courses', { returnObjects: true }) as string[]
    },
    {
      id: 'various',
      icon: Layers,
      title: t('training.categories.various.title'),
      shortDesc: t('training.subtitle'),
      color: 'bg-purple-500',
      duration: t('training.categories.various.duration'),
      price: t('training.categories.various.price'),
      courses: (t as any)('training.categories.various.courses', { returnObjects: true }) as string[]
    }
  ];

  const [selected, setSelected] = useState<TrainingCard | null>(null);
  const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('training.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('training.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <MotionInView key={card.id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 ${card.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 ${card.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                    <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    {/* <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{card.duration}</span>
                    <span className="inline-flex items-center gap-1"><DollarSign className="h-4 w-4" /><span className="font-semibold text-blue-600">{card.price}</span></span> */}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {card.courses.slice(0, 3).map((c, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      to={ROUTES.CONSULTATION}
                      className="inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      {t('services.schedule')}
                    </Link>
                    <button
                      onClick={() => setSelected(card)}
                      className="text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors text-sm"
                    >
                      {t('services.learnMore')}
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </MotionInView>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelected(null)}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e: any) => e.stopPropagation()}
            >
              <div className={`h-2 ${selected.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className={`w-12 h-12 ${selected.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4`}>
                      <selected.icon className={`h-6 w-6 ${selected.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{selected.title}</h3>
                   
                  </div>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6">{selected.shortDesc}</p>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{t('services.keyFeatures', { defaultValue: 'Key Topics' })}</h4>
                  <ul className="space-y-2 mb-6">
                    {selected.courses.map((c, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{c}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Link 
                      to={ROUTES.CONSULTATION}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors"
                    >
                      {t('services.getStarted', { defaultValue: 'Get Started' })}
                    </Link>
                    <button
                      onClick={() => setSelected(null)}
                      className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      {t('common.close', { defaultValue: 'Close' })}
                    </button>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TrainingSection;
