'use client';

import { useState, useEffect } from 'react';
import { getSuppliers, type Supplier, type SupplierDataSource } from '@/lib/mocks/suppliers';

export function useSupplierData() {
  const [dataSource, setDataSource] = useState<SupplierDataSource>('default');
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 從 localStorage 載入保存的數據源選擇
  useEffect(() => {
    const savedDataSource = localStorage.getItem('supplier-data-source') as SupplierDataSource;
    if (savedDataSource && (savedDataSource === 'default' || savedDataSource === 'tsmc' || savedDataSource === 'materials')) {
      setDataSource(savedDataSource);
    }
    setIsLoading(false);
  }, []);

  // 當數據源改變時更新供應商數據
  useEffect(() => {
    if (!isLoading) {
      const newSuppliers = getSuppliers(dataSource);
      setSuppliers(newSuppliers);
    }
  }, [dataSource, isLoading]);

  // 切換數據源
  const switchDataSource = (newDataSource: SupplierDataSource) => {
    setDataSource(newDataSource);
    localStorage.setItem('supplier-data-source', newDataSource);
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

  return {
    dataSource,
    suppliers,
    isLoading,
    switchDataSource,
    getDataSourceLabel,
  };
} 