import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ChevronDown, ChevronUp, Calendar, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ServiceFAQ {
    question: string;
    answer: string;
}

export interface ServiceProcess {
    step: number;
    title: string;
    description: string;
}

export interface ServiceDetailProps {
    badgeLabel: string;
    title: string;
    tagline: string;
    disclaimer?: string;
    whatWeDo: {
        intro: string;
        bullets: string[];
    };
    whoItIsFor: string[];
    deliverables: string[];
    process: ServiceProcess[];
    timeline: string;
    faqs: ServiceFAQ[];
    accentColor?: string; // Tailwind bg/text colour pair e.g. 'blue'
}

const ServiceDetailLayout: FC<ServiceDetailProps> = ({
    badgeLabel,
    title,
    tagline,
    disclaimer,
    whatWeDo,
    whoItIsFor,
    deliverables,
    process,
    timeline,
    faqs,
    accentColor = 'blue',
}) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const acc = {
        bg: `bg-${accentColor}-900`,
        light: `bg-${accentColor}-50`,
        text: `text-${accentColor}-900`,
        border: `border-${accentColor}-200`,
        badge: `bg-${accentColor}-100 text-${accentColor}-800`,
        bullet: `text-${accentColor}-600`,
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero strip */}
            <section className={`relative py-24 ${acc.bg} overflow-hidden`}>
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0 bg-grid-white" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 bg-white/10 text-white`}>
                        {badgeLabel}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-xl text-blue-100 max-w-2xl">{tagline}</p>
                    {disclaimer && (
                        <p className="mt-6 text-sm text-blue-200/80 italic border-l-2 border-blue-400/40 pl-4">
                            {disclaimer}
                        </p>
                    )}
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-5xl py-16 space-y-20">

                {/* What we do */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">What We Do</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">{whatWeDo.intro}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {whatWeDo.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${acc.bullet}`} />
                                <span className="text-slate-700 text-sm">{b}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Who it's for + Deliverables */}
                <div className="grid md:grid-cols-2 gap-10">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Who It's For</h2>
                        <ul className="space-y-2">
                            {whoItIsFor.map((w, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                                    <span className={`w-2 h-2 rounded-full ${acc.bg} shrink-0`} />
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Deliverables</h2>
                        <ul className="space-y-2">
                            {deliverables.map((d, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 text-sm">
                                    <CheckCircle className={`w-4 h-4 shrink-0 ${acc.bullet}`} />
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Our Process */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Approach</h2>
                    <div className="relative">
                        <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200 hidden md:block" />
                        <div className="space-y-8">
                            {process.map((p) => (
                                <div key={p.step} className="flex gap-6 items-start">
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full ${acc.bg} text-white flex items-center justify-center text-sm font-bold shadow-md z-10`}>
                                        {p.step}
                                    </div>
                                    <div className="pb-4">
                                        <h3 className="font-semibold text-slate-900 mb-1">{p.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${acc.light} ${acc.text} text-sm font-medium`}>
                        <Calendar className="w-4 h-4" />
                        Typical timeline: {timeline}
                    </div>
                </section>

                {/* FAQs */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`rounded-xl border ${acc.border} overflow-hidden`}>
                                <button
                                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    {faq.question}
                                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA block */}
                <section className={`rounded-2xl ${acc.light} p-10 text-center`}>
                    <h2 className={`text-2xl font-bold ${acc.text} mb-2`}>Ready to get started?</h2>
                    <p className="text-slate-600 mb-6 text-sm">Speak with an engagement partner — confidential, no obligation.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${acc.bg} text-white font-semibold text-sm hover:opacity-90 transition`}
                        >
                            <Calendar className="w-4 h-4" />
                            Book a Consultation
                        </Link>
                        <Link
                            to="/global-offices"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-300 transition"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Talk to an Office
                        </Link>
                    </div>
                    <div className="flex justify-center gap-8 mt-8 text-xs text-slate-500">
                        <span>⏱ Response within 1 business day</span>
                        <span>🔒 Confidential inquiry</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ServiceDetailLayout;
