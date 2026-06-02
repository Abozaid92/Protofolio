import { ar } from './ar';
import { en } from './en';
import type { Locale } from './config';

const dictionaries = {
  ar,
  en,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.en;
};
