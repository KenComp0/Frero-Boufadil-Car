import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import frTranslations from './fr.json';
import enTranslations from './en.json';
import arTranslations from './ar.json';

const savedLang = localStorage.getItem('fbc-lang') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslations },
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    lng: savedLang,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('fbc-lang', lng);
  if (lng === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
  }
});

// Initial setup
if (savedLang === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
} else {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = savedLang;
}

export default i18n;
