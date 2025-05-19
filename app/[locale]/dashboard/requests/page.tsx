"use client";

import React from 'react';
import RequestsPageContent from '@/app/dashboard/requests/page';
import { useTranslations } from 'next-intl';

export default function LocalizedRequestsPage() {
  // 使用數據要求相關的翻譯
  const t = useTranslations('requests');
  
  // 渲染原始的數據要求頁面內容，並將翻譯函數傳給子組件
  return <RequestsPageContent t={t} />;
} 