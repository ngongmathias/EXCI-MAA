'use client';

import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, X, Globe, User} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import AuthButton from './AuthButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Get current locale from pathname
  const locale = pathname.split('/')[1] || 'en';
  
  const navigation = [
    {name: 'Home', href: `/${locale}`},
    {name: 'About', href: `/${locale}/about`},
    {name: 'Services', href: `/${locale}/services`},
    {name: 'Training', href: `/${locale}/training`},
    {name: 'Contact', href: `/${locale}/contact`},
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`} className="flex items-center">
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
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
                    ? 'text-exci-blue-600 bg-exci-blue-50'
                    : 'text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-exci-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-exci-blue-500"
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
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
                    ? 'text-exci-blue-600 bg-exci-blue-50'
                    : 'text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
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
}
