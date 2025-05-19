"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Eye, PenSquare, RefreshCw, Search, History } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

// 模擬問卷數據
const mySurveys = [
  {
    id: "1",
    title: "企業碳排放評估問卷",
    description: "請提供貴公司的碳排放數據和減碳措施",
    sender: "新竹物流",
    senderLogo: "/company-logos/hct-logistics.png",
    sentDate: new Date("2023-11-01"),
    deadline: new Date("2023-12-15"),
    status: "pending", // pending, inProgress, completed, expired
    lastUpdate: null,
    completedPercent: 0,
    revisions: [],
  },
  {
    id: "2",
    title: "供應鏈風險評估問卷",
    description: "評估貴公司的供應鏈風險和業務連續性計劃",
    sender: "統一速達",
    senderLogo: "/company-logos/t-cat.png",
    sentDate: new Date("2023-10-15"),
    deadline: new Date("2023-11-30"),
    status: "inProgress",
    lastUpdate: new Date("2023-11-05"),
    completedPercent: 45,
    revisions: [],
  },
  {
    id: "3",
    title: "產品碳足跡資訊收集",
    description: "請提供貴公司產品的碳足跡數據",
    sender: "宅配通",
    senderLogo: "/company-logos/pelican.png",
    sentDate: new Date("2023-09-20"),
    deadline: new Date("2023-10-20"),
    status: "completed",
    lastUpdate: new Date("2023-10-18"),
    completedPercent: 100,
    revisions: [],
  },
  {
    id: "4",
    title: "2023年度供應商ESG評估",
    description: "全面評估貴公司在環境、社會和公司治理方面的表現",
    sender: "長榮國際儲運",
    senderLogo: "/company-logos/evergreen.png",
    sentDate: new Date("2023-10-01"),
    deadline: new Date("2023-10-31"),
    status: "expired",
    lastUpdate: null,
    completedPercent: 0,
    revisions: [],
  },
  {
    id: "5",
    title: "供應商能源使用調查",
    description: "關於貴公司能源使用效率和再生能源使用情況的調查",
    sender: "台塑汽車貨運",
    senderLogo: "/company-logos/fpcc-logistics.png",
    sentDate: new Date("2023-09-01"),
    deadline: new Date("2023-09-30"),
    status: "completed",
    lastUpdate: new Date("2023-09-25"),
    completedPercent: 100,
    revisions: [
      { 
        version: 1,
        date: new Date("2023-09-15"),
        note: "初次提交" 
      },
      { 
        version: 2,
        date: new Date("2023-09-25"),
        note: "更新能源使用數據" 
      }
    ],
  },
]

export default function MySurveysPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // 過濾問卷
  const filteredSurveys = mySurveys.filter(
    (survey) =>
      (survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        survey.sender.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" ||
        (activeTab === "pending" && (survey.status === "pending" || survey.status === "inProgress")) ||
        (activeTab === "completed" && survey.status === "completed") ||
        (activeTab === "expired" && survey.status === "expired"))
  )

  // 獲取狀態標籤
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500">待回覆</Badge>
      case "inProgress":
        return <Badge className="bg-blue-500">填寫中</Badge>
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>
      case "expired":
        return <Badge variant="destructive">已過期</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  // 獲取操作按鈕
  const getActionButton = (survey: any) => {
    switch (survey.status) {
      case "pending":
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard/my-surveys/${survey.id}`}>
                  <PenSquare className="h-4 w-4" />
                  <span className="sr-only">開始填寫</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>開始填寫</p>
            </TooltipContent>
          </Tooltip>
        )
      case "inProgress":
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" asChild>
                <Link href={`/dashboard/my-surveys/${survey.id}`}>
                  <PenSquare className="h-4 w-4" />
                  <span className="sr-only">繼續填寫</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>繼續填寫</p>
            </TooltipContent>
          </Tooltip>
        )
      case "completed":
        return (
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/my-surveys/${survey.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">查看</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>查看</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/my-surveys/${survey.id}/edit`}>
                    <PenSquare className="h-4 w-4" />
                    <span className="sr-only">編輯</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>編輯</p>
              </TooltipContent>
            </Tooltip>
            
            {survey.revisions.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/dashboard/my-surveys/${survey.id}/history`}>
                      <History className="h-4 w-4" />
                      <span className="sr-only">歷史版本</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>歷史版本</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )
      case "expired":
        return (
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <Link href={`/dashboard/my-surveys/${survey.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">查看</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>查看</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">要求編輯</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>要求編輯</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          {/* <h1 className="text-2xl font-bold tracking-tight">我的問卷</h1> */}
          <p className=" text-sm text-muted-foreground">管理和回覆指派給您的問卷</p>
        </div>
        
        <Card>
          {/* <CardHeader>
            <CardTitle>問卷列表</CardTitle>
            <CardDescription>查看所有指派給您的問卷和回覆狀態</CardDescription>
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
            
            <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">全部問卷</TabsTrigger>
                <TabsTrigger value="pending">待回覆</TabsTrigger>
                <TabsTrigger value="completed">已完成</TabsTrigger>
                <TabsTrigger value="expired">已過期</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>問卷標題</TableHead>
                  <TableHead className="w-[200px] ">發送方</TableHead>
                  <TableHead className="w-[100px] ">狀態</TableHead>
                  <TableHead className="w-[140px] ">進度</TableHead>
                  <TableHead className="w-[160px] ">截止日期</TableHead>
                  <TableHead className="w-[140px] ">上次更新</TableHead>
                  <TableHead className="text-left">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      沒有找到問卷
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSurveys.map((survey) => (
                    <TableRow key={survey.id}>
                      <TableCell>
                        <div className="font-medium">{survey.title}</div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{survey.description}</div>
                      </TableCell>
                      <TableCell>{survey.sender}</TableCell>
                      <TableCell>{getStatusBadge(survey.status)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${survey.completedPercent}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                          {survey.completedPercent}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          {format(survey.deadline, "yyyy-MM-dd")}
                        </div>
                        {survey.status === "expired" && (
                          <div className="text-xs text-destructive mt-1">已過期</div>
                        )}
                      </TableCell>
                      <TableCell>
                        {survey.lastUpdate ? (
                          format(survey.lastUpdate, "yyyy-MM-dd")
                        ) : (
                          <span className="text-muted-foreground">尚未回覆</span>
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        {getActionButton(survey)}
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