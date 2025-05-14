"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, History, ArrowRight, Search } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模擬問卷歷史數據
const surveyHistoryList = [
  {
    id: "5",
    title: "供應商能源使用調查",
    description: "關於貴公司能源使用效率和再生能源使用情況的調查",
    sender: "綠能科技有限公司",
    status: "已完成",
    lastUpdated: new Date("2023-09-25"),
    revisionsCount: 2,
    lastChangeNote: "更新能源使用數據"
  },
  {
    id: "2",
    title: "產品碳足跡調查",
    description: "用於評估供應商產品碳足跡的問卷調查",
    sender: "台灣永續發展協會",
    status: "已完成",
    lastUpdated: new Date("2023-08-18"),
    revisionsCount: 3,
    lastChangeNote: "更新產品生命週期階段排放數據"
  },
  {
    id: "7",
    title: "ESG績效評估調查",
    description: "評估供應商在環境、社會和治理方面的表現",
    sender: "綠色供應鏈協會",
    status: "已完成",
    lastUpdated: new Date("2023-10-05"),
    revisionsCount: 1,
    lastChangeNote: "初次提交"
  },
  {
    id: "10",
    title: "供應商年度永續報告",
    description: "年度供應商永續績效問卷調查",
    sender: "台灣電子製造協會",
    status: "已過期",
    lastUpdated: new Date("2022-11-30"),
    revisionsCount: 4,
    lastChangeNote: "最終更新並提交"
  },
  {
    id: "14",
    title: "再生能源使用承諾",
    description: "評估供應商對再生能源轉型的承諾和計劃",
    sender: "綠能科技有限公司",
    status: "已完成",
    lastUpdated: new Date("2023-07-12"),
    revisionsCount: 2,
    lastChangeNote: "更新再生能源採購計劃"
  }
]

export default function SurveyHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // 過濾和搜尋邏輯
  const filteredSurveys = surveyHistoryList.filter(survey => {
    // 先過濾狀態
    if (filter !== "all" && survey.status !== filter) {
      return false
    }
    
    // 再搜尋關鍵字
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        survey.title.toLowerCase().includes(searchLower) ||
        survey.description.toLowerCase().includes(searchLower) ||
        survey.sender.toLowerCase().includes(searchLower)
      )
    }
    
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">問卷歷史紀錄</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/my-surveys">
            返回我的問卷
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜尋問卷標題、描述或發送者..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          defaultValue="all"
          onValueChange={setFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="所有狀態" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有狀態</SelectItem>
            <SelectItem value="已完成">已完成</SelectItem>
            <SelectItem value="進行中">進行中</SelectItem>
            <SelectItem value="已過期">已過期</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {filteredSurveys.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <History className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">找不到問卷歷史</h3>
                <p className="mt-2 text-muted-foreground">
                  嘗試使用不同的搜尋條件或篩選設定
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredSurveys.map(survey => (
            <Card key={survey.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{survey.title}</CardTitle>
                    <CardDescription>{survey.description}</CardDescription>
                  </div>
                  <Badge
                    variant={survey.status === "已過期" ? "outline" : "default"}
                    className={
                      survey.status === "已完成"
                        ? "bg-green-500/10 text-green-500"
                        : survey.status === "進行中"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-gray-500/10 text-gray-500"
                    }
                  >
                    {survey.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-8">
                      <div>
                        <span className="text-muted-foreground">來自: </span>
                        <span className="font-medium">{survey.sender}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">最後更新: </span>
                        <span className="font-medium">{format(survey.lastUpdated, "yyyy-MM-dd")}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">修訂版本: </span>
                        <span className="font-medium">{survey.revisionsCount} 次</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/dashboard/my-surveys/${survey.id}/history`}>
                        查看修訂歷史
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {survey.lastChangeNote && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-3">
                      <Clock className="h-4 w-4" />
                      <span>最後變更: {survey.lastChangeNote}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 