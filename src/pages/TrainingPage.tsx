import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type CourseCategory = {
  id: string;
  title: string;
  items: string[];
};

const categories: CourseCategory[] = [
  {
    id: 'accounting',
    title: 'Accounting / Taxation / Social',
    items: [
      'How to keep and organize business accounts',
      'How to create or prepare a tax return and its annexes',
      'VAT deductibility and reporting rules',
      'How to anticipate and manage your tax audits',
      'The VAT problem in CONGO, CAMEROON, RWANDA, BURUNDI, GABON',
      "Establish your operating account and cash flow plan with confidence",
      'Techniques for detecting fraud in tax returns',
      'Impact of ARD and tax deficits on taxable income',
      'Framework between the DAS, declarations and the DSF: Case of a CNSS control',
      "Creation of an accounting allocation manual",
    ],
  },
  {
    id: 'audit',
    title: 'Statutory audit / Management control',
    items: [
      'Why audit your accounts?',
      'Accounting and Financial Audit Methodology',
      "What is the impact of the audit on the tax return?",
      'Theory and practice of internal auditing in SMEs, Banks and Insurance',
      'Theory and practice of management control',
      'Dashboards and performance evaluation',
      'External audit (Audit firm)',
      'Internal Audit – Planning and Execution',
      'Statutory audit',
      'Optimal management of your cash flow, particularly your overdraft',
      'Understanding treasury expectations from subsidiary and head office perspective',
      'Balance your supplier payments with your customer collections',
      'Evaluation of your information system – ICT IS',
      'Understand ERPs, their processes and see if your business may need them',
      'Review of fundamental concepts in internal control',
      'Review of fundamental concepts in internal auditing',
      'Detect and prevent fraud',
      'Risk management in the advertising sector',
    ],
  },
  {
    id: 'advice',
    title: 'Advice',
    items: [
      'The practice of consolidated accounts and the treatment of deferred taxes',
      'Understanding the basics and major issues of international taxation: Transfer pricing',
      'Evaluation of companies in the OHADA area',
      'Balance sheet revaluation: a necessity for all companies',
      'Practice of merger, demerger and liquidation in the OHADA area',
      'How to practice account consolidation in the OHADA area',
      'Writing a bankable business plan',
      'Business creation methodology',
      'Mergers – Acquisitions',
      'Legal, social and tax audit',
      'Support for drafting an internal control procedures manual',
    ],
  },
  {
    id: 'various',
    title: 'Various themes',
    items: [
      'How to handle difficult customers',
      'Unleash your charisma and develop your leadership in business and beyond',
      'Quality in the office / Company',
      'How to become a Financial/Management Controller or CFO and effective techniques',
      'Use accounting and management control to control banking risks',
      'OHADA Business Law',
      'Corporate taxation',
      'Master and audit permanent banking control',
      'Compliance audit of regulatory systems in insurance',
    ],
  },
];

export default function TrainingPage() {
  const { t } = useLanguage();
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
