import {useTranslations} from 'next-intl';
import {Metadata} from 'next';
import ContactHero from '@/components/ContactHero';
import ContactForm from '@/components/ContactForm';
import OfficeMap from '@/components/OfficeMap';
import FAQSection from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'Contact Us - EXCI-MAA',
  description: 'Get in touch with our experts for professional accounting, auditing, and consulting services.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <ContactForm />
      <OfficeMap />
      <FAQSection />
    </div>
  );
}
