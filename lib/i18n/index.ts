// 支援的語言列表
export const locales = ['zh-TW', 'en', 'zh-CN'];
export const defaultLocale = 'zh-TW';

// 獲取語言名稱的函數
export function getLanguageName(locale: string): string {
  const localeNames: Record<string, string> = {
    'zh-TW': '繁體中文',
    'en': 'English',
    'zh-CN': '简体中文'
  };
  
  return localeNames[locale] || locale;
}

// 簡單的格式化字符串函數，接受參數
export function formatString(str: string, params: Record<string, string | number>): string {
  return str.replace(/{([^{}]*)}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
} 