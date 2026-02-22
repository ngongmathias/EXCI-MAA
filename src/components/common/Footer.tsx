import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROUTES } from '../../lib/constants/routes';

const Footer: FC = () => {
  const { t } = useLanguage();

  const footerLinks = {
    quickLinks: [
      { name: t('nav.about'), href: ROUTES.ABOUT },
      { name: 'Leadership & Governance', href: ROUTES.LEADERSHIP },
      { name: t('nav.services'), href: ROUTES.SERVICES },
      { name: t('nav.globalOffices') ?? 'Global Offices', href: ROUTES.GLOBAL_OFFICES },
      { name: t('nav.insights') ?? 'Insights', href: ROUTES.INSIGHTS },
      { name: 'Case Studies', href: ROUTES.CASE_STUDIES },
      { name: t('nav.careers') ?? 'Careers', href: ROUTES.CAREERS },
      { name: t('nav.contact'), href: ROUTES.CONTACT },
    ],
    legal: [
      { name: t('footer.privacyPolicy'), href: ROUTES.PRIVACY_POLICY },
      { name: t('footer.cookiePolicy'), href: ROUTES.COOKIE_POLICY },
      { name: t('footer.termsOfService'), href: '#' },
    ],
    compliance: [
      { name: 'AML / Ethics Statement', href: ROUTES.ETHICS },
      { name: 'Quality & Independence', href: ROUTES.QUALITY },
      { name: 'Legal Disclaimer', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/exci-maa-cameroun/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/ExciMaa/', label: 'Twitter' },
    { icon: Facebook, href: 'https://web.facebook.com/ExciMaaOfficial/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/excimaa/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Bio */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="/images/logos/logo-removebg-preview.png"
                alt="EXCI-MAA"
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="ml-3 text-2xl font-bold tracking-tight text-white">EXCI-MAA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {t('footer.description', 'Professional accounting, auditing, and consulting firm with an international presence. Delivering excellence through over 14 years of strategic partnership.')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 rounded-md hover:bg-blue-900 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Compliance & Ethics</h3>
            <ul className="space-y-3">
              {footerLinks.compliance.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Global Presence */}
          <div className="space-y-6">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs">{t('footer.globalPresence')}</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">General Inquiries</p>
                  <a href="mailto:contact@excimaa.ca" className="text-sm text-slate-300 hover:text-white transition-colors">contact@excimaa.ca</a>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <div>
                  <p className="text-xs text-slate-500 mb-1">West & Central Africa</p>
                  <a href="tel:+237233427940" className="text-sm text-slate-300 hover:text-white transition-colors">+237 233 427 940</a>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-500 italic">Registered under OHADA Regulations. Member of various regional professional bodies.</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EXCI-MAA Group. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link, i) => (
              <Link key={i} to={link.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
