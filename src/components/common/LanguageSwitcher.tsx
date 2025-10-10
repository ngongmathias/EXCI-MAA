import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, SupportedLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as SupportedLanguage, name: 'Français', flag: '🇫🇷' },
    { code: 'ar' as SupportedLanguage, name: 'العربية', flag: '🇸🇦' },
    { code: 'rw' as SupportedLanguage, name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'ki' as SupportedLanguage, name: 'Kirundi', flag: '🇧🇮' },
    { code: 'zh' as SupportedLanguage, name: '中文', flag: '🇨🇳' },
    { code: 'lg' as SupportedLanguage, name: 'Luganda', flag: '🇺🇬' },
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-exci-blue-500"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline">{currentLang.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setLanguage(language.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                currentLanguage === language.code ? 'bg-exci-blue-50 text-exci-blue-600' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;


