"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmailPreview from "@/app/components/notifications/EmailPreview"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">通知管理</h1>
        <p className="text-sm text-muted-foreground">
          管理系統自動發送的通知信息，查看模板及進行測試發送
        </p>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">電子郵件通知</TabsTrigger>
          <TabsTrigger value="system">系統通知</TabsTrigger>
          <TabsTrigger value="settings">通知設定</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4">
          <h2 className="text-lg font-semibold">電子郵件通知模板</h2>
          <p className="text-sm text-muted-foreground mb-4">
            預覽、測試和自定義電子郵件通知模板，確保重要資訊能有效傳達給適當的人員。
          </p>
          
          <EmailPreview />
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <h2 className="text-lg font-semibold">系統內部通知</h2>
          <p className="text-sm text-muted-foreground">
            管理系統內通知，如提醒、警告和更新信息等。這些通知會出現在用戶的通知中心。
          </p>
          
          <div className="rounded-md border p-8 text-center">
            <p className="text-muted-foreground">系統通知設定功能正在開發中...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <h2 className="text-lg font-semibold">通知設定</h2>
          <p className="text-sm text-muted-foreground">
            配置通知發送規則、頻率和發送渠道。
          </p>
          
          <div className="rounded-md border p-8 text-center">
            <p className="text-muted-foreground">通知設定功能正在開發中...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 