import { ArrowLeft, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReminderDialog } from "./components/reminder-dialog"

// 模擬數據要求
const initialRequests = [
  {
    id: "1",
    title: "2023年度碳排放數據收集",
    description: "收集2023年度的組織和產品碳排放數據，用於年度ESG報告。",
    suppliers: [
      {
        id: "1",
        name: "台灣電子股份有限公司",
        email: "contact@taiwanelectronics.com",
        status: "pending",
      },
      {
        id: "2",
        name: "綠能科技有限公司",
        email: "info@greentechltd.com",
        status: "submitted",
      },
    ],
    requestedData: ["組織溫盤碳排放", "產品碳足跡"],
    deadline: new Date("2023-12-31"),
    status: "active",
    createdAt: new Date("2023-10-01"),
    reminderDays: 3,
  },
  {
    id: "2",
    title: "供應商基本信息更新",
    description: "更新供應商的基本信息，包括聯絡人、地址和電話等。",
    suppliers: [
      {
        id: "3",
        name: "永續材料工業股份有限公司",
        email: "contact@sustainablematerials.com",
        status: "submitted",
      },
      {
        id: "1",
        name: "台灣電子股份有限公司",
        email: "contact@taiwanelectronics.com",
        status: "submitted",
      },
    ],
    requestedData: ["公司基本資訊"],
    deadline: new Date("2023-11-15"),
    status: "completed",
    createdAt: new Date("2023-09-15"),
    reminderDays: 5,
  },
  {
    id: "3",
    title: "產品碳足跡調查",
    description: "收集產品生命週期的碳排放數據，用於產品碳足跡認證。",
    suppliers: [
      {
        id: "2",
        name: "綠能科技有限公司",
        email: "info@greentechltd.com",
        status: "not_submitted",
      },
    ],
    requestedData: ["產品碳足跡"],
    deadline: new Date("2023-10-30"),
    status: "expired",
    createdAt: new Date("2023-09-01"),
    reminderDays: 7,
  },
]

// 獲取狀態標籤
const getStatusBadge = (status: string) => {
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

// 獲取供應商提交狀態標籤
const getSupplierStatusBadge = (status: string) => {
  switch (status) {
    case "submitted":
      return <Badge className="bg-green-500">已提交</Badge>
    case "pending":
      return <Badge variant="outline">待提交</Badge>
    case "not_submitted":
      return <Badge variant="destructive">未提交</Badge>
    default:
      return <Badge variant="outline">未知</Badge>
  }
}

// 定義類型
interface Supplier {
  id: string
  name: string
  email: string
  status: string
}

interface Request {
  id: string
  title: string
  description: string
  suppliers: Supplier[]
  requestedData: string[]
  deadline: Date
  status: string
  createdAt: Date
  reminderDays: number
}

// 靜態匯出所需
export function generateStaticParams() {
  // 以 initialRequests 模擬靜態 id 列表
  return initialRequests.map((req) => ({ id: req.id }))
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = initialRequests.find((r) => r.id === params.id) as Request

  if (!request) {
    return <div className="flex items-center justify-center h-full">找不到此要求</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href="/dashboard/requests">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </a>
        </Button>
        <div>
          {/* <h1 className="text-3xl font-bold tracking-tight">{request.title}</h1> */}
          <div className="flex items-center gap-2 mt-1">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">創建於 {format(request.createdAt, "yyyy-MM-dd")}</span>
            {getStatusBadge(request.status)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>要求詳情</CardTitle>
            <CardDescription>數據要求的詳細信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">描述</h3>
              <p className="text-sm text-muted-foreground">{request.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">要求的數據</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {request.requestedData.map((data, index) => (
                  <li key={index}>{data}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">截止日期</h3>
              <p className="text-sm text-muted-foreground">{format(request.deadline, "yyyy-MM-dd")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">提醒設定</h3>
              <p className="text-sm text-muted-foreground">到期前 {request.reminderDays} 天自動提醒</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>供應商</CardTitle>
            <CardDescription>參與此數據要求的供應商</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>供應商</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {request.suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{getSupplierStatusBadge(supplier.status)}</TableCell>
                    <TableCell className="text-right">
                      <ReminderDialog 
                        supplier={supplier} 
                        disabled={supplier.status === "submitted"} 
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={request.status !== "active"}>
              下載數據
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
