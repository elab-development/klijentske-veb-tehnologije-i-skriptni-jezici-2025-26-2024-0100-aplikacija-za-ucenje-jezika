import type { LanguageShortCode } from '../types/Language';

const flagCountryCodes: Record<LanguageShortCode, string> = {
  en: 'gb',
  de: 'de',
  es: 'es',
};

export const getLanguageFlagUrl = (shortCode: LanguageShortCode) =>
  `https://flagcdn.com/w80/${flagCountryCodes[shortCode]}.png`;
