"use client"

import { useTranslations } from "next-intl"
import { formatString } from "@/lib/i18n"

interface MessageProps {
  /** 訊息的命名空間，例如 "nav", "buttons" 等 */
  namespace: string
  /** 訊息的鍵名 */
  id: string
  /** 替換變數的參數對象 */
  params?: Record<string, string | number>
}

/**
 * 用於顯示國際化訊息的組件
 * 
 * 用法示例：
 * <Message namespace="buttons" id="save" />
 * <Message namespace="pagination" id="page" params={{ page: 1 }} />
 */
export function Message({ namespace, id, params = {} }: MessageProps) {
  // 使用next-intl的useTranslations鉤子
  const t = useTranslations(namespace);

  try {
    // 獲取翻譯文本
    const message = t(id);
    
    // 如果有參數，則使用formatString進行格式化
    if (params && Object.keys(params).length > 0) {
      return <>{formatString(message, params)}</>;
    }
    
    // 否則直接返回翻譯文本
    return <>{message}</>;
  } catch (error) {
    // 如果獲取翻譯失敗，顯示鍵名
    console.warn(`Missing translation for ${namespace}.${id}`);
    return <>{`${namespace}.${id}`}</>;
  }
} 