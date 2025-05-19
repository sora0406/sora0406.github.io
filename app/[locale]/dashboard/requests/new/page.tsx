"use client";

import React from 'react';
import RequestsNewPage from '@/app/dashboard/requests/new/page';
import { useTranslations } from 'next-intl';

export default function LocalizedRequestsNewPage() {
  // 使用請求相關的翻譯
  const t = useTranslations('requests');
  
  // 渲染原始的請求頁面內容，傳遞翻譯函數
  return <RequestsNewPage />;
} 