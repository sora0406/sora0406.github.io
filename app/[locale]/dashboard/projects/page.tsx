"use client";

import React, { Suspense } from 'react';
import ProjectsPageContent from '@/app/dashboard/projects/page';
import { useTranslations } from '@/lib/i18n/use-translations';

export default function LocalizedProjectsPage() {
  // 使用儀表板相關的翻譯
  const { t } = useTranslations('dashboard');
  
  // 使用 Suspense 來避免 hydration 不匹配問題
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
} 