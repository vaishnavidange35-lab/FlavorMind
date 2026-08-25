import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.json';
import hiTranslations from './locales/hi/translation.json';
import mrTranslations from './locales/mr/translation.json';
import teTranslations from './locales/te/translation.json';

const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  mr: { translation: mrTranslations },
  te: { translation: teTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'mr', 'te'],
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
