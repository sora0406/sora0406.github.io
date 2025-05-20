"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from '@/lib/i18n/use-translations';
import { useTranslations as useNextIntlTranslations } from 'next-intl';

// 動態導入原始組件，避免循環依賴
const DynamicProjectProgressPage = dynamic(
  () => import('@/app/dashboard/projects/progress/page'),
  { ssr: false, loading: () => <div>載入中...</div> }
);

export default function LocalizedProjectProgressPage() {
  // 使用儀表板相關的翻譯
  const { t } = useTranslations('nav');
  // 獲取 projects 的翻譯
  const tProjects = useNextIntlTranslations('nav');
  // 獲取按鈕和UI相關的翻譯
  const tButtons = useNextIntlTranslations('buttons');
  
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight mb-6">
        {tProjects('projects')}
      </h2>
      <DynamicProjectProgressPage t={(key: string) => tButtons(key)} />
    </div>
  );
} 