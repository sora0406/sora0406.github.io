"use client";

import React from 'react';
import ResponsesPageContent from '@/app/dashboard/requests/responses/page';
import { useTranslations } from 'next-intl';

export default function LocalizedResponsesPage() {
  // 使用數據要求相關的翻譯
  const t = useTranslations('requests');
  
  // 渲染原始的數據要求頁面內容，傳遞翻譯函數
  return <ResponsesPageContent t={t} />;
} 