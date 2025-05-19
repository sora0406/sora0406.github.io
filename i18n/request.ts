import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  // 確保語言在支援的語言列表中
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale
  };
}); 