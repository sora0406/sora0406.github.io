'use client';

import { useState, useEffect } from 'react';
import { getSurveyData, getSurveyDataSourceOptions, type SurveyResponse, type SurveyDataSource } from '@/lib/mocks/survey-data';

export function useSurveyData() {
  const [dataSource, setDataSource] = useState<SurveyDataSource>('default');
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 從 localStorage 載入保存的數據源選擇
  useEffect(() => {
    const savedDataSource = localStorage.getItem('survey-data-source') as SurveyDataSource;
    if (savedDataSource && (savedDataSource === 'default' || savedDataSource === 'tsmc' || savedDataSource === 'materials')) {
      setDataSource(savedDataSource);
    }
    setIsLoading(false);
  }, []);

  // 當數據源改變時更新問卷數據
  useEffect(() => {
    if (!isLoading) {
      const newSurveyData = getSurveyData(dataSource);
      setSurveyData(newSurveyData);
    }
  }, [dataSource, isLoading]);

  // 切換數據源
  const switchDataSource = (newDataSource: SurveyDataSource) => {
    setDataSource(newDataSource);
    localStorage.setItem('survey-data-source', newDataSource);
  };

  // 獲取當前數據源的顯示名稱
  const getDataSourceLabel = () => {
    switch (dataSource) {
      case 'tsmc':
        return 'Case2';
      case 'materials':
        return 'Case3';
      case 'default':
      default:
        return 'Case1';
    }
  };

  // 獲取數據源選項
  const dataSourceOptions = getSurveyDataSourceOptions();

  return {
    dataSource,
    surveyData,
    isLoading,
    switchDataSource,
    getDataSourceLabel,
    dataSourceOptions,
  };
} 