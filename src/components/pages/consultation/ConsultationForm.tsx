import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../contexts/LanguageContext';
import { services as servicesData } from '../../../data/services';
import { countries } from '../../../data/countries';
import { insertItem } from '../../../services/supabaseCrud';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  countrySlug: string;
  serviceId: string;
  message: string;
};

const ConsultationForm: FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    countrySlug: countries[0]?.slug ?? '',
    serviceId: servicesData[0]?.id ?? '',
    message: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await insertItem('consultation_requests', {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        country_slug: form.countrySlug,
        service_id: form.serviceId,
        message: form.message,
      });
      navigate('/contact', { replace: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="consultation-form" onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Jane Doe"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Company</label>
        <input
          name="company"
          value={form.company}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Acme Inc."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="jane@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+1 555 123 4567"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <select
          name="countrySlug"
          value={form.countrySlug}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {countries.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Service</label>
        <select
          name="serviceId"
          value={form.serviceId}
          onChange={onChange}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {servicesData.map((s) => (
            <option key={s.id} value={s.id}>{t(s.title)}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Additional Details</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell us more about your needs..."
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? 'Submitting...' : 'Submit Consultation Request'}
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;


