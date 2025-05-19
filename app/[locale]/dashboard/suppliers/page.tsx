"use client";

import React from 'react';
import { SuppliersPage } from '@/app/dashboard/suppliers/page';
import { useTranslations } from 'next-intl';

export default function LocalizedSuppliersPage() {
  // 使用供應商相關的翻譯
  const t = useTranslations('suppliers');
  
  // 渲染原始的供應商頁面內容，傳遞翻譯函數
  return <SuppliersPage t={(key, params) => t(key, params)} />;
} 