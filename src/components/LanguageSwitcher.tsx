'use client';

import {useRouter, usePathname} from 'next/navigation';
import {Globe} from 'lucide-react';
import {useState} from 'react';

const languages = [
  {code: 'en', name: 'English', flag: '🇺🇸'},
  {code: 'fr', name: 'Français', flag: '🇫🇷'},
  {code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼'},
  {code: 'ar', name: 'العربية', flag: '🇸🇦'},
  {code: 'de', name: 'Deutsch', flag: '🇩🇪'},
  {code: 'sw', name: 'Kiswahili', flag: '🇹🇿'},
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract locale from pathname or default to 'en'
  const locale = pathname.split('/')[1] || 'en';
  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2 ${
                locale === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
