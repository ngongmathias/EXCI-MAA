import { FC, useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Users, Briefcase, Mail, BookOpen, Globe, UserPlus, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import AuthButton from './AuthButton';
import { getTranslatedServices } from '../../data/services';
import { getOfficesForDropdown, getCapitalCity } from '../../data/officesHelper';
import ServiceModal from '../pages/services/ServiceModal';
import OfficeModal from '../pages/global-offices/OfficeModal';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOfficesOpen, setIsOfficesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<{ country: string; capital: string } | null>(null);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);
  
  const services = getTranslatedServices(t);
  const offices = getOfficesForDropdown();

  const navigationBefore = [
    {name: t('nav.about'), href: '/about', icon: <Users className="h-4 w-4" />},
  ];

  const navigationAfter = [
    {name: t('nav.careers'), href: '/careers', icon: <UserPlus className="h-4 w-4" />},
    {name: t('nav.insights'), href: '/insights', icon: <BookOpen className="h-4 w-4" />},
    {name: t('nav.contact'), href: '/contact', icon: <Mail className="h-4 w-4" />}
  ];

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      if (officesRef.current && !officesRef.current.contains(event.target as Node)) {
        setIsOfficesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    setSelectedService(serviceId);
    setIsServicesOpen(false);
  };

  const handleOfficeClick = (country: string, capital: string) => {
    setSelectedOffice({ country, capital });
    setIsOfficesOpen(false);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  const closeOfficeModal = () => {
    setSelectedOffice(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="h-12 w-auto">
                <img 
                  src="/images/logos/logo.png" 
                  alt="EXCI-MAA Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {/* Navigation items before Services */}
            {navigationBefore.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname.startsWith('/services') || isServicesOpen
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname.startsWith('/services') || isServicesOpen
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  <Briefcase className="h-4 w-4" />
                </span>
                <span>{t('nav.services')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Services Dropdown Menu */}
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <Link
                        to="/services"
                        onClick={() => setIsServicesOpen(false)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {t('servicesDropdown.viewAllServices')}
                      </Link>
                    </div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      {t('servicesDropdown.ourServices')}
                    </div>
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.id)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{service.title}</div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Global Offices Dropdown */}
            <div className="relative" ref={officesRef}>
              <button
                onClick={() => setIsOfficesOpen(!isOfficesOpen)}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname.startsWith('/global-offices') || isOfficesOpen
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname.startsWith('/global-offices') || isOfficesOpen
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  <Globe className="h-4 w-4" />
                </span>
                <span>{t('nav.globalOffices')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  isOfficesOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Offices Dropdown Menu */}
              {isOfficesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <Link
                        to="/global-offices"
                        onClick={() => setIsOfficesOpen(false)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {t('globalOfficesDropdown.viewAllOffices')}
                      </Link>
                    </div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      {t('globalOfficesDropdown.ourOffices')}
                    </div>
                    {offices.map((office) => (
                      <button
                        key={office.id}
                        onClick={() => handleOfficeClick(office.country, office.capital)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{office.flag}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{office.country}</div>
                            <div className="text-xs text-gray-500 mt-1">{office.city}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation items after Services */}
            {navigationAfter.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          { /* Desktop Actions */ }
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Navigation items before Services */}
            {navigationBefore.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Services Section */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="px-3 py-2">
                <div className="flex items-center space-x-3">
                  <Briefcase className="h-5 w-5 text-gray-500" />
                  <span className="text-base font-medium text-gray-700">{t('nav.services')}</span>
                </div>
              </div>
              <div className="ml-6 space-y-1">
                <Link
                  to="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  {t('servicesDropdown.viewAllServices')}
                </Link>
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      handleServiceClick(service.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{service.icon}</span>
                      <span>{service.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Global Offices Section */}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="px-3 py-2">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span className="text-base font-medium text-gray-700">{t('nav.globalOffices')}</span>
                </div>
              </div>
              <div className="ml-6 space-y-1">
                <Link
                  to="/global-offices"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  {t('globalOfficesDropdown.viewAllOffices')}
                </Link>
                {offices.map((office) => (
                  <button
                    key={office.id}
                    onClick={() => {
                      handleOfficeClick(office.country, office.capital);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{office.flag}</span>
                      <span>{office.country}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Navigation items after Services */}
            {navigationAfter.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={`transition-colors duration-200 ${
                  location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
                    ? 'text-blue-600'
                    : 'text-gray-500 group-hover:text-blue-600'
                }`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between px-3 py-2">
              <LanguageSwitcher />
              <AuthButton />
            </div>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          serviceId={selectedService}
          isOpen={!!selectedService}
          onClose={closeServiceModal}
        />
      )}

      {/* Office Modal */}
      {selectedOffice && (
        <OfficeModal
          country={selectedOffice.country}
          capital={selectedOffice.capital}
          isOpen={!!selectedOffice}
          onClose={closeOfficeModal}
        />
      )}
    </header>
  );
};

export default Header;