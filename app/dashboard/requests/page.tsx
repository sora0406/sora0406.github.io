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

// 模擬數據要求
const initialRequests = [
  {
    id: "1",
    title: "2023年度碳排放數據收集",
    suppliers: ["台灣電子股份有限公司", "綠能科技有限公司"],
    requestedData: ["組織溫盤碳排放", "原物料/產品碳足跡"],
    deadline: new Date("2023-12-31"),
    status: "active",
    reminderDays: 3,
  },
  {
    id: "2",
    title: "供應商基本信息更新",
    suppliers: ["永續材料工業股份有限公司", "台灣電子股份有限公司"],
    requestedData: ["公司基本資訊"],
    deadline: new Date("2023-11-15"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "3",
    title: "產品碳足跡調查",
    suppliers: ["綠能科技有限公司"],
    requestedData: ["原物料/產品碳足跡"],
    deadline: new Date("2023-10-30"),
    status: "expired",
    reminderDays: 7,
  },
]

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")

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
        return <Badge className="bg-green-500">進行中</Badge>
      case "completed":
        return <Badge className="bg-blue-500">已完成</Badge>
      case "expired":
        return <Badge variant="destructive">已過期</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">數據要求</h1>
            <p className="text-smtext-muted-foreground">管理您向供應商發送的數據要求</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/requests/responses">
                <MessageSquare className="mr-2 h-4 w-4" />
                查看回應
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/requests/new">
                <Plus className="mr-2 h-4 w-4" />
                創建要求
              </Link>
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
                placeholder="搜索數據要求..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>標題</TableHead>
                  <TableHead>供應商</TableHead>
                  <TableHead>要求數據</TableHead>
                  <TableHead>截止日期</TableHead>
                  <TableHead>提醒設定</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      沒有找到數據要求
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>{request.suppliers.join(", ")}</TableCell>
                      <TableCell>{request.requestedData.join(", ")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          {format(request.deadline, "yyyy-MM-dd")}
                        </div>
                      </TableCell>
                      <TableCell>到期前 {request.reminderDays} 天</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/dashboard/requests/${request.id}`}>
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
                            <Button variant="outline" size="icon" asChild className="ml-2">
                              <Link href={`/dashboard/requests/responses?request=${request.id}`}>
                                <MessageSquare className="h-4 w-4" />
                                <span className="sr-only">查看回應</span>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>查看回應</p>
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
