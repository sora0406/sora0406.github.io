"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// 動態導入原始組件，避免循環依賴
const DynamicSurveyResultsPage = dynamic(
  () => import('@/app/dashboard/survey-results/page'),
  { ssr: false, loading: () => <div>載入中...</div> }
);

export default function LocalizedSurveyResultsPage() {
  // 使用各種相關的翻譯
  const tDashboard = useTranslations('dashboard');
  const tWarRoom = useTranslations('war_room');
  const tCommon = useTranslations('common');
  
  return <DynamicSurveyResultsPage 
    tDashboard={tDashboard} 
    tWarRoom={tWarRoom} 
    tCommon={tCommon} 
  />;
} 