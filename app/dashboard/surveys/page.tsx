"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Eye, FileText, Plus, Search } from "lucide-react"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// 模擬問卷數據
const initialSurveys = [
  {
    id: "1",
    title: "企業碳排放評估問卷",
    description: "評估供應商的碳排放量和減碳措施，包含範疇1-3的排放數據和能源消耗資訊",
    totalQuestions: 28,
    respondents: ["台灣電子股份有限公司", "綠能科技有限公司"],
    deadline: new Date("2023-12-15"),
    status: "active",
    responseRate: 65,
  },
  {
    id: "2",
    title: "供應鏈風險評估問卷",
    description: "評估供應商的供應鏈風險和業務連續性計劃",
    totalQuestions: 15,
    respondents: ["永續材料工業股份有限公司", "綠能科技有限公司"],
    deadline: new Date("2023-11-20"),
    status: "completed",
    responseRate: 100,
  },
  {
    id: "3",
    title: "產品碳足跡資訊收集",
    description: "收集供應商產品的碳足跡數據，包含原料取得、製造、運輸和廢棄階段的排放",
    totalQuestions: 22,
    respondents: ["台灣電子股份有限公司"],
    deadline: new Date("2023-10-10"),
    status: "expired",
    responseRate: 0,
  },
  {
    id: "4",
    title: "2023年度供應商ESG評估",
    description: "全面評估供應商在環境、社會和公司治理方面的表現",
    totalQuestions: 36,
    respondents: ["台灣電子股份有限公司", "永續材料工業股份有限公司", "綠能科技有限公司"],
    deadline: new Date("2023-12-30"),
    status: "active",
    responseRate: 42,
  },
]

export default function SurveysPage() {
  const [surveys, setSurveys] = useState(initialSurveys)
  const [searchTerm, setSearchTerm] = useState("")

  // 過濾問卷
  const filteredSurveys = surveys.filter(
    (survey) =>
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.respondents.some((respondent) => respondent.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 獲取狀態標籤
  const getStatusBadge = (status: "active" | "completed" | "expired" | string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">進行中</Badge>
      case "completed":
        return <Badge className="bg-blue-500">已完成</Badge>
      case "expired":
        return <Badge variant="destructive">已過期</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  // 獲取回覆率顏色
  const getResponseRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-500"
    if (rate >= 50) return "text-amber-500"
    return "text-red-500"
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">問卷模板</h1>
            <p className="text-sm text-muted-foreground">建立和管理供應商碳排放與ESG相關資訊收集問卷</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/surveys/new">
              <Plus className="mr-2 h-4 w-4" />
              創建問卷
            </Link>
          </Button>
        </div>
        <Card>
          {/* <CardHeader>
            <CardTitle>問卷列表</CardTitle>
            <CardDescription>查看和管理您已建立的所有供應商評估問卷</CardDescription>
          </CardHeader> */}
          <CardContent>
            <div className="m-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索問卷..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>問卷標題</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>問題數量</TableHead>
                  <TableHead>回覆率</TableHead>
                  <TableHead>回覆者</TableHead>
                  <TableHead>截止日期</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      沒有找到問卷
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSurveys.map((survey) => (
                    <TableRow key={survey.id}>
                      <TableCell className="font-medium">{survey.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{survey.description}</TableCell>
                      <TableCell>{survey.totalQuestions}</TableCell>
                      <TableCell>
                        <span className={getResponseRateColor(survey.responseRate)}>{survey.responseRate}%</span>
                      </TableCell>
                      <TableCell>{survey.respondents.length}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          {format(survey.deadline, "yyyy-MM-dd")}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(survey.status)}</TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/dashboard/surveys/${survey.id}`}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">查看</span>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>查看</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
} 