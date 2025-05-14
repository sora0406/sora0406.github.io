"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ClipboardCheck, BarChart3, ArrowRight } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">專案管理</h1>
        <p className="text-sm text-muted-foreground">
          管理供應商問卷收集和組織邊界專案進度
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 問卷追蹤卡片 */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">問卷追蹤</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground pb-4">
              查看供應商問卷填寫狀況、到期日，提供重新傳送要求和提醒填寫功能。
            </div>
            <dl className="grid grid-cols-2 gap-4 py-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">待填寫問卷</dt>
                <dd className="text-3xl font-bold">42</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">即將到期</dt>
                <dd className="text-3xl font-bold text-amber-500">16</dd>
              </div>
            </dl>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/dashboard/projects/questionnaires">
                進入問卷追蹤
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* 專案進度卡片 */}
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">專案進度</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground pb-4">
              查看組織內所有邊界專案的進度狀況，掌握整體專案狀態。
            </div>
            <dl className="grid grid-cols-2 gap-4 py-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">進行中專案</dt>
                <dd className="text-3xl font-bold">18</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">完成率</dt>
                <dd className="text-3xl font-bold text-emerald-500">67%</dd>
              </div>
            </dl>
            <Button variant="outline" className="w-full justify-between" asChild>
              <Link href="/dashboard/projects/progress">
                查看專案進度
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 