"use client"

import Link from "next/link"
import { BarChart3, FileText, Users, ClipboardList, ClipboardCheck, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SupplyChainPage() {
  const modules = [
    {
      title: "供應商管理",
      description: "管理與追蹤您的供應商資訊",
      icon: Users,
      href: "/dashboard/suppliers",
      color: "bg-blue-50 text-blue-600",
      buttonText: "管理供應商",
    },
    {
      title: "數據要求",
      description: "向供應商發送並管理數據請求",
      icon: FileText,
      href: "/dashboard/requests",
      color: "bg-amber-50 text-amber-600",
      buttonText: "數據要求",
    },
    {
      title: "問卷追蹤",
      description: "追蹤問卷填寫進度與回覆",
      icon: ClipboardList,
      href: "/dashboard/projects/questionnaires",
      color: "bg-green-50 text-green-600",
      buttonText: "追蹤問卷",
    },
    {
      title: "碳排放戰情室",
      description: "分析與視覺化碳排放數據",
      icon: BarChart3,
      href: "/dashboard/survey-results",
      color: "bg-purple-50 text-purple-600",
      buttonText: "查看戰情",
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">供應鏈管理</h1>
        <p className="text-muted-foreground">
          全面管控您的供應鏈數據與碳排放狀況
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {modules.map((module, index) => (
          <Card key={index} className="overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
            <CardHeader className={`${module.color} p-4`}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
                <module.icon className="h-6 w-6" />
              </div>
              <CardDescription className="text-sm text-gray-700">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">
                {module.title === "供應商管理" && "管理您的供應商資訊、聯絡人與地理分佈"}
                {module.title === "數據要求" && "向供應商提出數據要求並追蹤回應狀態"}
                {module.title === "問卷追蹤" && "查看問卷完成進度與催覆進度"}
                {module.title === "戰情室" && "視覺化呈現供應鏈碳排放數據"}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={module.href} className="w-full">
                <Button className="w-full">{module.buttonText}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">最近活動</h2>
        <div className="rounded-lg border bg-card">
          <div className="flex items-center p-4 border-b">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">新增了供應商</div>
              <div className="text-sm text-muted-foreground">2023-06-15 14:30</div>
            </div>
          </div>
          <div className="flex items-center p-4 border-b">
            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <ClipboardList className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">問卷回覆率達到78%</div>
              <div className="text-sm text-muted-foreground">2023-06-14 10:15</div>
            </div>
          </div>
          <div className="flex items-center p-4">
            <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="font-medium">發送了5個數據要求</div>
              <div className="text-sm text-muted-foreground">2023-06-12 09:45</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 