import ContactHero from '../components/pages/contact/ContactHero';
import ContactForm from '../components/pages/contact/ContactForm';
import OfficeMap from '../components/pages/contact/OfficeMap';
import FAQs from '../components/pages/contact/FAQSection';
import Meta from '../components/common/Meta';

export default function ContactPage() {
  return (
    <>
      <Meta
        title="Contact Us"
        description="Get in touch with EXCI-MAA's global offices. We are here to help you with accounting, audit, tax, and advisory needs."
      />
      <ContactHero />
      <ContactForm />
      <OfficeMap />
      <FAQs />
    </>
  );
}


