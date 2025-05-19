"use client";

import React from 'react';
import { usePathname, redirect } from 'next/navigation';
import DashboardPageContent from '@/app/dashboard/page';
import { useTranslations } from '@/lib/i18n/use-translations';

export default function LocalizedDashboardPage({ params }: { params: { locale: string } }) {
  // 檢查當前路徑，如果是根路徑 /{locale}/dashboard，則重定向到 /{locale}/dashboard/survey-results
  const pathname = usePathname();
  if (pathname === `/${params.locale}/dashboard`) {
    redirect(`/${params.locale}/dashboard/survey-results`);
  }

  // 使用儀表板相關的翻譯
  const { t } = useTranslations('dashboard');
  
  // 渲染原始的儀表板頁面內容
  return <DashboardPageContent />;
} 