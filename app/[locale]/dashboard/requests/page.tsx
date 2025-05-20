"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

// 動態導入新的組件，關閉 SSR
const RequestsPageComponent = dynamic(() => import('@/app/dashboard/requests/component'), {
  ssr: false,
});

export default function LocalizedRequestsPage() {
  // 使用數據要求相關的翻譯
  const t = useTranslations('requests');
  
  // 渲染組件，並將翻譯函數傳給子組件
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestsPageComponent t={t} />
    </Suspense>
  );
} 