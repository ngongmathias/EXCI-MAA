import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ROUTES } from '../../lib/constants/routes';

const Footer: FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('nav.about'), href: ROUTES.ABOUT },
    { name: t('nav.services'), href: ROUTES.SERVICES },
    { name: t('nav.careers') ?? 'Careers', href: ROUTES.CAREERS },
    { name: t('nav.insights') ?? 'Insights', href: ROUTES.INSIGHTS },
    { name: t('nav.globalOffices') ?? 'Global Offices', href: ROUTES.GLOBAL_OFFICES },
    { name: t('nav.contact'), href: ROUTES.CONTACT },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://web.facebook.com/ExciMaaOfficial/?_rdc=1&_rdr', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/ExciMaa/', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/exci-maa-cameroun/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/excimaa/', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main flex container */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start w-full gap-8 lg:gap-12 text-center lg:text-left">
          
          {/* Company Info */}
          <div className="flex flex-col items-center lg:items-start flex-1 max-w-xs">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <img
                src="/images/logos/logo-removebg-preview.png"
                alt="EXCI-MAA Logo"
                className="h-8 w-auto mr-2 object-contain"
              />
              <span className="text-xl font-bold">EXCI-MAA</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start flex-1 max-w-xs">
            <h3 className="text-lg font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-start flex-1 max-w-xs">
            <h3 className="text-lg font-semibold mb-6">{t('contact.title')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">(+237) 233 427 940</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">(+250) 787 779 965</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">contactcam@excimaa.ca</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 w-full max-w-4xl mx-auto mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 EXCI-MAA. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
