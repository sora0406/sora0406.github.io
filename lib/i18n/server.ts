import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from '@/lib/i18n';

/**
 * 獲取當前語言
 * @param locale 請求的語言
 * @returns 有效的語言
 */
export async function getLocale(locale: string): Promise<string> {
  // 確保語言在支援的語言列表中
  if (!locale || !locales.includes(locale as any)) {
    return defaultLocale;
  }
  
  return locale;
}

/**
 * 獲取語言的翻譯消息
 * @param locale 語言
 * @returns 翻譯消息
 */
export async function getMessages(locale: string) {
  try {
    // 確保語言有效
    if (!locale || !locales.includes(locale as any)) {
      locale = defaultLocale;
    }
    
    // 動態導入語言文件
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale: ${locale}`, error);
    return {}; // 返回空對象
  }
} 