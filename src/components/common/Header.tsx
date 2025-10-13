import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Briefcase, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import AuthButton from './AuthButton';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const navigation = [
    {name: t('nav.home'), href: '/', icon: <Home className="h-4 w-4" />},
    {name: t('nav.about'), href: '/about', icon: <Users className="h-4 w-4" />},
    {name: t('nav.services'), href: '/services', icon: <Briefcase className="h-4 w-4" />},
    {name: t('nav.contact'), href: '/contact', icon: <Mail className="h-4 w-4" />},
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
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
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
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

          {/* Desktop Actions */}
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
            {navigation.map((item) => (
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
    </header>
  );
};

export default Header;