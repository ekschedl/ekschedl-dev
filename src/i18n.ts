// Sprachverwaltung. Registriert Deutsch, Englisch und Russisch und legt die Standardsprache fest.
import { createI18n } from 'vue-i18n'

import de from './locales/de'
import en from './locales/en'
import ru from './locales/ru'

export const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
    de,
    en,
    ru
  }
})
