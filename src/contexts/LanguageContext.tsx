import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '../i18n';

export type SupportedLanguage = 'en' | 'fr' | 'ar' | 'rw' | 'ki' | 'zh' | 'lg' | 'sw';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string, options?: any) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    console.error('useLanguage hook called outside of LanguageProvider. Make sure the component is wrapped with LanguageProvider.');
    throw new Error('useLanguage must be used within a LanguageProvider. Check that your component is properly wrapped in the LanguageProvider in App.tsx.');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize i18n and wait for it to be ready
    const initI18n = async () => {
      try {
        const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
        if (savedLanguage && ['en', 'fr', 'ar', 'rw', 'ki', 'zh', 'lg', 'sw'].includes(savedLanguage)) {
          setCurrentLanguage(savedLanguage);
          await i18n.changeLanguage(savedLanguage);
          document.documentElement.lang = savedLanguage;
          document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        } else {
          await i18n.changeLanguage('en');
        }
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setIsReady(true); // Still render with default language
      }
    };

    initI18n();
  }, []);

  const setLanguage = (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string, options?: any): any => {
    return i18n.t(key, options);
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
  };

  // Don't render children until i18n is ready
  if (!isReady) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};


