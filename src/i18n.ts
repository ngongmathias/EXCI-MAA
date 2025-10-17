import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../locales/en/translation.json' assert { type: 'json' };
import fr from '../locales/fr/translation.json' assert { type: 'json' };
import ar from '../locales/ar/translation.json' assert { type: 'json' };
import rw from '../locales/rw/translation.json' assert { type: 'json' };
import ki from '../locales/ki/translation.json' assert { type: 'json' };
import zh from '../locales/zh/translation.json' assert { type: 'json' };
import lg from '../locales/lg/translation.json' assert { type: 'json' };

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
  rw: { translation: rw },
  ki: { translation: ki },
  zh: { translation: zh },
  lg: { translation: lg },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV, 
    interpolation: {                                                        
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;