import { FC, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { insertItem } from '../../../services/supabaseCrud';
import { getTranslatedServices } from '../../../data/services';

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactForm: FC = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const servicesData = getTranslatedServices(t);
  const [form, setForm] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError(null);
    try {
      await insertItem('contact_submissions', {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        message: form.message
      });
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t?.('contact.form.title') ?? 'Get in Touch'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t?.('contact.form.subtitle') ?? 'Have questions or ready to start your project? Fill out the form below and our team will get back to you as soon as possible.'}
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t?.('contact.form.name') ?? 'Name'}</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t?.('contact.form.name_placeholder') ?? 'Jane Doe'}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t?.('contact.form.email') ?? 'Email'}</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t?.('contact.form.email_placeholder') ?? 'jane@example.com'}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t?.('contact.form.phone') ?? 'Phone'}</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t?.('contact.form.phone_placeholder') ?? '+1 555 123 4567'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t?.('contact.form.subject') ?? 'Subject'}</label>
            <select
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">{t?.('contact.form.select_subject') ?? 'Select a subject'}</option>
              {servicesData.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Other">{t?.('contact.form.other') ?? 'Other'}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">{t?.('contact.form.message') ?? 'Message'}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={6}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t?.('contact.form.message_placeholder') ?? 'Tell us more...'}
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? (t?.('contact.form.submitting') ?? 'Submitting...') : (t?.('contact.form.submit') ?? 'Send Message')}
            </button>

            {submitted && (
              <p className="text-green-700 text-sm">
                {t?.('contact.form.success') ?? 'Thank you! Your message has been sent.'}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm">
                {t?.('contact.form.error') ?? 'Unable to submit. Please try again.'}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;


