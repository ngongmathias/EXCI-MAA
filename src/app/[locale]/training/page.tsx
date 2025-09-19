import {useTranslations} from 'next-intl';
import {Metadata} from 'next';
import TrainingHero from '@/components/TrainingHero';
import TrainingCategories from '@/components/TrainingCategories';
import BookingSection from '@/components/BookingSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Training Courses - EXCI-MAA',
  description: 'Professional training programs in accounting, auditing, and business consulting.',
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen">
      <TrainingHero />
      <TrainingCategories />
      <BookingSection />
      <TestimonialsSection />
    </div>
  );
}
