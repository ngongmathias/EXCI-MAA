import { FC } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

type TestimonialItem = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
};

const Star: FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`h-5 w-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.967 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.802-2.036a1 1 0 00-1.176 0l-2.802 2.036c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"
    />
  </svg>
);

const ClientsSection: FC = () => {
  const { t } = useLanguage();

  const testimonials = t('aboutPage.clients.items', { returnObjects: true }) as TestimonialItem[];

  return (
    <section className="bg-white py-16 pt-32 mt-[100vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('aboutPage.clients.title')}</h2>
          <p className="mt-3 text-lg text-gray-600">{t('aboutPage.clients.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div key={item.name} className="bg-gray-50 border border-gray-100 rounded-xl p-6"> 
              <div className="flex items-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={(item.rating ?? 5) > i} />
                ))}
              </div>
              <p className="italic text-gray-700 mb-6">“{item.quote}”</p>
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-gray-600 text-sm">{item.role}, {item.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;


