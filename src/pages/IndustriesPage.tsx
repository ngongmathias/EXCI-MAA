import { FC } from 'react';
import { motion } from 'framer-motion';
import { Building2, Factory, Landmark, ShoppingBag, Truck, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import MotionInView from '../components/enhanced/MotionInView';
import Meta from '../components/common/Meta';

const industries = [
    { id: 'financial', icon: Landmark, title: 'Financial Services', desc: 'Expertise in banking, insurance, and asset management sectors.' },
    { id: 'manufacturing', icon: Factory, title: 'Manufacturing & Industrial', desc: 'Solutions for complex supply chains and industrial operations.' },
    { id: 'public', icon: Building2, title: 'Public Sector & NGOs', desc: 'Specialized auditing and advisory for non-profit and government entities.' },
    { id: 'retail', icon: ShoppingBag, title: 'Retail & Consumer', desc: 'Strategic support for the rapidly evolving consumer market.' },
    { id: 'logistics', icon: Truck, title: 'Logistics & Transport', desc: 'Efficiency and compliance solutions for the transport sector.' },
    { id: 'energy', icon: Zap, title: 'Energy & Natural Resources', desc: 'Navigating regulatory and financial complexities in extractive industries.' },
];

const IndustriesPage: FC = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50">
            <Meta
                title="Industries We Serve"
                description="Specialized professional services for Financial Services, Manufacturing, Public Sector, NGOs, Retail, and Energy sectors across Africa and beyond."
            />
            {/* Hero */}
            <section className="bg-slate-950 py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-grid-white"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Sectors We Serve
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl"
                    >
                        Our multidisciplinary teams bring deep industry-specific knowledge to help you solve your most complex business challenges.
                    </motion.p>
                </div>
            </section>

            {/* Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((industry, index) => (
                            <MotionInView key={industry.id} delay={index * 0.1}>
                                <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-900/20 hover:shadow-xl transition-all duration-300 group h-full">
                                    <div className="w-14 h-14 bg-blue-900/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                                        <industry.icon className="w-7 h-7 text-blue-900 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.title}</h3>
                                    <p className="text-slate-600 mb-6">{industry.desc}</p>
                                    <a href="/contact" className="inline-flex items-center text-sm font-semibold text-blue-900 hover:text-blue-700">
                                        Learn about our {industry.title} expertise
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </a>
                                </div>
                            </MotionInView>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-blue-900 py-16 text-white overflow-hidden relative">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl font-bold mb-6">Don't see your industry?</h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                        Our versatile teams have experience across dozens of niche sectors. Contact us to discuss how we can tailor our services to your specific market needs.
                    </p>
                    <a href="/contact" className="btn-secondary bg-white text-blue-900 border-none hover:bg-slate-100">
                        Work With Us
                    </a>
                </div>
            </section>
        </div>
    );
};

export default IndustriesPage;
