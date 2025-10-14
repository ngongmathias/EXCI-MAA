import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type CourseCategory = {
  id: string;
  title: string;
  items: string[];
};

export default function TrainingPage() {
  const { t } = useLanguage();
  
  const categories: CourseCategory[] = [
    {
      id: 'accounting',
      title: t('training.categories.accounting.title'),
      items: (t as any)('training.categories.accounting.courses', { returnObjects: true }) as string[],
    },
    {
      id: 'audit',
      title: t('training.categories.audit.title'),
      items: (t as any)('training.categories.audit.courses', { returnObjects: true }) as string[],
    },
    {
      id: 'advice',
      title: t('training.categories.advice.title'),
      items: (t as any)('training.categories.advice.courses', { returnObjects: true }) as string[],
    },
    {
      id: 'various',
      title: t('training.categories.various.title'),
      items: (t as any)('training.categories.various.courses', { returnObjects: true }) as string[],
    },
  ];
  const [active, setActive] = useState<string>('accounting');

  // Typed alias to avoid TS prop inference issues with framer-motion generics
  const MotionDiv = motion.div as unknown as React.FC<React.HTMLAttributes<HTMLDivElement> & any>;

  const activeCategory = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-white">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, x: 40, y: -40 }}
          animate={{ opacity: 0.6, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl"
        />
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, x: -40, y: 40 }}
          animate={{ opacity: 0.6, scale: 1, x: 0, y: 0 }}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-blue-200 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <BookOpen className="h-4 w-4" />
            {t('training.title')}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            {t('training.subtitle')}
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto"></p>
        </MotionDiv>

        {/* Tabs */}
        <div className="mb-10 overflow-x-auto">
          <div className="inline-flex gap-2 rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-200">
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active list */}
        <AnimatePresence mode="wait">
          <MotionDiv
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeCategory.items.map((item, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.02 }}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-gray-700 leading-relaxed">{item}</p>
              </MotionDiv>
            ))}
          </MotionDiv>
        </AnimatePresence>
      </div>
    </section>
  );
}
