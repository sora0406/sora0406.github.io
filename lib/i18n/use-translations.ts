"use client"

import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { formatString } from './index';

/**
 * 擴展next-intl的useTranslations，添加格式化功能
 * @param namespace 翻譯命名空間
 * @returns 一個包含t方法的對象，用於獲取翻譯
 */
export function useTranslations(namespace: string) {
  const translate = useNextIntlTranslations(namespace);

  /**
   * 獲取翻譯並可選地進行格式化
   * @param key 翻譯鍵
   * @param params 可選的格式化參數
   * @returns 格式化後的翻譯文本
   */
  const t = (key: string, params?: Record<string, string | number>) => {
    try {
      const message = translate(key);
      
      if (params && Object.keys(params).length > 0) {
        return formatString(message, params);
      }
      
      return message;
    } catch (error) {
      console.warn(`Missing translation for ${namespace}.${key}`);
      return `${namespace}.${key}`;
    }
  };

  return { t };
}

/**
 * 日期格式化的翻譯hook
 * @returns 格式化日期的方法
 */
export function useDateTranslations() {
  const { t } = useTranslations('dates');
  
  const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium') => {
    try {
      const options: Intl.DateTimeFormatOptions = 
        format === 'short' 
          ? { year: 'numeric', month: 'numeric', day: 'numeric' }
          : format === 'medium'
            ? { year: 'numeric', month: 'long', day: 'numeric' }
            : { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      
      return new Intl.DateTimeFormat(undefined, options).format(date);
    } catch (error) {
      return date.toISOString().split('T')[0];
    }
  };
  
  return { formatDate };
} 