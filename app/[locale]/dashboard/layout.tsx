"use client";

import React from 'react';
import DashboardLayout from '@/app/dashboard/layout';
import { useTranslations } from 'next-intl';

export default function LocalizedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用導航相關的翻譯
  const tNav = useTranslations('nav');
  const tMessages = useTranslations('messages');
  
  // 渲染原始的儀表板佈局內容，傳遞翻譯函數
  return <DashboardLayout tNav={tNav} tMessages={tMessages}>{children}</DashboardLayout>;
} 