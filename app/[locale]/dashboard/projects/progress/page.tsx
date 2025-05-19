"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/lib/i18n/use-translations';

// 動態導入原始組件，避免循環依賴
const DynamicProjectProgressPage = dynamic(
  () => import('@/app/dashboard/projects/progress/page'),
  { ssr: false, loading: () => <div>載入中...</div> }
);

export default function LocalizedProjectProgressPage() {
  // 使用儀表板相關的翻譯
  const { t } = useTranslations('dashboard');
  
  return <DynamicProjectProgressPage />;
} 