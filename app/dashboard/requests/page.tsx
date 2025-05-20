"use client"

import { RequestsPageComponent } from './component'

export function RequestsPage({ t }: { t: (key: string, params?: Record<string, any>) => string }) {
  // 直接使用新的組件
  return <RequestsPageComponent t={t} />
}

// 在檔案最後添加預設導出
export default RequestsPage;
