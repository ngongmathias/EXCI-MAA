import { FC } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { offices } from '../data/offices';
import MotionInView from '../components/enhanced/MotionInView';
import Meta from '../components/common/Meta';

const GlobalOfficesPage: FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-height-screen bg-slate-50">
      <Meta
        title="Our Global Presence"
        description="Explore EXCI-MAA's global network of offices across Africa, Europe, and North America. Local expertise with international standards."
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              Global Reach, Local Expertise
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Our Global Presence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl"
            >
              Strategically located in key financial hubs across Africa, Europe, and North America to serve our international clientele with excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Office Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <MotionInView key={office.id} delay={index * 0.05}>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-900/10 transition-all duration-300 flex flex-col h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={office.image || `/images/Cities/${office.country}.jpeg`}
                      alt={office.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{office.name}</h3>
                      <p className="text-blue-100 text-xs flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {office.city}, {office.country}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex-grow space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-blue-900 mr-3 mt-1 shrink-0" />
                        <p className="text-slate-600 text-sm leading-relaxed">{office.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-blue-900 mr-3 shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-slate-600 text-sm hover:text-blue-900 transition-colors font-medium">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-blue-900 mr-3 shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-slate-600 text-sm hover:text-blue-900 transition-colors">
                          {office.email}
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Core Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] rounded border border-slate-100">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <a
                      href={office.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-2 text-sm font-semibold text-blue-900 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Maps
                    </a>
                  </div>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>

      {/* Global Support Section */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Need Inter-regional Support?</h2>
            <p className="text-slate-600 mb-8">
              Our global team coordinates seamless cross-border solutions. Whether you're expanding into Africa or establishing a presence in North America, we're here to guide you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/contact"
                className="btn-primary"
              >
                Inquire Globally
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="mailto:contact@excimaa.ca"
                className="btn-secondary"
              >
                Contact Headquarters
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GlobalOfficesPage;