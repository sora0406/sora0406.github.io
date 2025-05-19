"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, Eye, Plus, Search, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleIcon } from "lucide-react"

// 模擬數據要求
const initialRequests = [
  {
    id: "1",
    title: "2023年度碳排放數據收集",
    description: "請提供貴公司2023年度的碳排放數據，包括範疇1、2和3的排放數據。",
    suppliers: ["新竹物流", "統一速達"],
    requestedData: ["組織溫室氣體排放", "產品碳足跡"],
    deadline: new Date("2023-12-31"),
    status: "active",
    reminderDays: 3,
  },
  {
    id: "2",
    title: "供應商基本信息更新",
    description: "請更新貴公司的基本聯絡資訊、主要產品服務清單及認證情況。",
    suppliers: ["宅配通", "新竹物流"],
    requestedData: ["公司基本資訊"],
    deadline: new Date("2023-11-15"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "3",
    title: "產品碳足跡調查",
    description: "請提供貴公司主要產品的碳足跡數據，包括生產、運輸和使用階段的碳排放資訊。",
    suppliers: ["統一速達"],
    requestedData: ["產品碳足跡"],
    deadline: new Date("2023-10-30"),
    status: "expired",
    reminderDays: 7,
  },
]

export function RequestsPage({ t }: { t: (key: string, params?: Record<string, any>) => string }) {
  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  
  // 添加 handleNavigate 函數
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    window.location.href = path;
  };

  // 過濾數據要求
  const filteredRequests = requests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.suppliers.some((supplier) => supplier.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 獲取狀態標籤
  const getStatusBadge = (status: "active" | "completed" | "expired" | string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">{t('status_active')}</Badge>
      case "completed":
        return <Badge className="bg-blue-500">{t('status_completed')}</Badge>
      case "expired":
        return <Badge variant="destructive">{t('status_expired')}</Badge>
      default:
        return <Badge variant="outline">{t('status_unknown')}</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            {/* <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1> */}
            <p className="text-smtext-muted-foreground">{t('description')}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="css-secondary" onClick={() => handleNavigate("/dashboard/requests/responses")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              {t('view_response')}
            </Button>
            <Button variant="css-primary" onClick={() => handleNavigate("/dashboard/requests/new")}>
              <Plus className="mr-2 h-4 w-4" />
              {t('new_request')}
            </Button>
          </div>
        </div>
        <Card>
          {/* <CardHeader>
            <CardTitle>數據要求列表</CardTitle>
            <CardDescription>查看和管理您的所有數據要求</CardDescription>
          </CardHeader> */}
          <CardContent>
            <div className="m-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('request_name')}</TableHead>
                  <TableHead>{t('suppliers')}</TableHead>
                  <TableHead>{t('deadline')}</TableHead>
                  <TableHead>{t('status')}</TableHead>
                  <TableHead className="text-right">{t('action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      {t('no_requests_found')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <div className="text-base font-medium">{request.title}</div>
                        <div className="text-sm text-muted-foreground">{request.description}</div>
                      </TableCell>
                      <TableCell>
                        {request.suppliers.map((supplier: any, idx: number) => (
                          <div className="flex items-center gap-2" key={idx}>
                            <CircleIcon className="h-2 w-2" />
                            <span className="text-sm">{supplier}</span>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell>{format(request.deadline, "yyyy-MM-dd")}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleNavigate(`/dashboard/requests/${request.id}`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          {t('view')}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleNavigate(`/dashboard/requests/responses?request=${request.id}`)}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {t('view_response')}
                        </Button>
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

// 在檔案最後添加預設導出
export default RequestsPage;
