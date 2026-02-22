import { FC, useState, useRef } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { insertItem } from '../../../services/supabaseCrud';
import { Shield, Clock, Lock, CheckCircle, AlertCircle } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: string;
  country: string;
  entityType: string;
  turnover: string;
  timeline: string;
  message: string;
  file: File | null;
};

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  service: '',
  country: '',
  entityType: '',
  turnover: '',
  timeline: '',
  message: '',
  file: null,
};

const SERVICES = [
  'Audit & Assurance',
  'Tax Compliance & Advisory',
  'Accounting & Outsourcing',
  'Payroll & HR Compliance',
  'Risk & Internal Audit',
  'Advisory / CFO Services',
  'Legal / Corporate Secretarial',
  'Other',
];

const COUNTRIES = [
  'Cameroon', 'Congo (Republic of)', 'Côte d\'Ivoire', 'D.R. Congo',
  'Ethiopia', 'Gabon', 'Ghana', 'Kenya', 'Nigeria', 'Rwanda',
  'Senegal', 'South Africa', 'Tanzania', 'Uganda', 'Canada',
  'France', 'United Kingdom', 'United States', 'Other',
];

const ENTITY_TYPES = [
  'Company / Corporation',
  'NGO / Non-Profit',
  'Government / Public Body',
  'Financial Institution',
  'Individual / Sole Trader',
  'Other',
];

const TURNOVER_BANDS = [
  'Under $500K',
  '$500K – $2M',
  '$2M – $10M',
  '$10M – $50M',
  'Over $50M',
  'Prefer not to say',
];

const TIMELINES = [
  'Urgent (within 2 weeks)',
  'This month',
  'This quarter',
  'This year',
  'Just exploring',
];

const ContactForm: FC = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, file: e.target.files?.[0] ?? null }));
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
        organisation: form.organisation || null,
        service: form.service,
        country: form.country || null,
        entity_type: form.entityType || null,
        turnover: form.turnover || null,
        timeline: form.timeline || null,
        message: form.message,
      });
      setSubmitted(true);
      setForm(INITIAL_FORM);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err: any) {
      setError(err?.message || 'Unable to submit. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition';
  const labelCls = 'block text-sm font-medium text-slate-700 mb-0.5';

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Credibility signals */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-900" />
            <span>Response within 1 business day</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-900" />
            <span>Confidential inquiry</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-900" />
            <span>No obligation</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {t?.('contact.form.title') ?? 'Book a Consultation'}
            </h2>
            <p className="text-slate-500 text-sm">
              {t?.('contact.form.subtitle') ?? 'Tell us about your needs and we\'ll connect you with the right team.'}
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center gap-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
              <h3 className="text-xl font-semibold text-slate-900">Thank you — we'll be in touch shortly.</h3>
              <p className="text-slate-500 text-sm max-w-md">
                Your inquiry has been received. A member of our team will respond within 1 business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-blue-900 text-sm underline underline-offset-2"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Contact details */}
              <div>
                <label className={labelCls}>Full Name *</label>
                <input name="name" value={form.name} onChange={onChange} required className={inputCls} placeholder="Jane Doe" />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required className={inputCls} placeholder="jane@company.com" />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} className={inputCls} placeholder="+1 555 123 4567" />
              </div>
              <div>
                <label className={labelCls}>Organisation</label>
                <input name="organisation" value={form.organisation} onChange={onChange} className={inputCls} placeholder="Your company or NGO" />
              </div>

              {/* Qualification fields */}
              <div>
                <label className={labelCls}>Service Needed *</label>
                <select name="service" value={form.service} onChange={onChange} required className={inputCls}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Country / Jurisdiction</label>
                <select name="country" value={form.country} onChange={onChange} className={inputCls}>
                  <option value="">Select country…</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Entity Type</label>
                <select name="entityType" value={form.entityType} onChange={onChange} className={inputCls}>
                  <option value="">Select type…</option>
                  {ENTITY_TYPES.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Annual Turnover / Size <span className="text-slate-400 font-normal">(optional)</span></label>
                <select name="turnover" value={form.turnover} onChange={onChange} className={inputCls}>
                  <option value="">Prefer not to say</option>
                  {TURNOVER_BANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Timeline</label>
                <select name="timeline" value={form.timeline} onChange={onChange} className={inputCls}>
                  <option value="">Select timeline…</option>
                  {TIMELINES.map(tl => <option key={tl} value={tl}>{tl}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Attachment <span className="text-slate-400 font-normal">(optional)</span></label>
                <input ref={fileRef} type="file" onChange={onFileChange} className="mt-1 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100 cursor-pointer" accept=".pdf,.doc,.docx,.xls,.xlsx" />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className={labelCls}>Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} required rows={5} className={inputCls} placeholder="Briefly describe your situation, the challenge you're facing, or the service you need…" />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-start gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg text-white bg-blue-900 hover:bg-blue-800 font-semibold text-sm disabled:opacity-60 transition-colors"
                >
                  {submitting ? 'Submitting…' : 'Submit Inquiry'}
                </button>
                <p className="text-xs text-slate-400 self-center">
                  By submitting you agree to confidential handling of your information in accordance with our Privacy Policy.
                </p>
              </div>

              {error && (
                <div className="md:col-span-2 flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
