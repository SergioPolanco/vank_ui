import { LOCALE_CURRENCIES } from '../constants/locale.constants';

export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat(LOCALE_CURRENCIES[currency] as string, {
    currency,
    style: 'currency',
  }).format(value);
};
