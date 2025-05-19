"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  CalendarIcon, 
  Clock, 
  Download, 
  Edit, 
  Send, 
  Trash, 
  Users 
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// 模擬數據要求
const initialRequests = [
  {
    id: "1",
    title: "2023年度碳排放數據收集",
    description: "請提供貴公司2023年度的碳排放數據，包括範疇1、2和3的排放數據，以及減排措施的相關資訊。",
    suppliers: ["新竹物流", "統一速達"],
    supplierCount: 2,
    requestedData: ["組織溫室氣體排放", "產品碳足跡"],
    deadline: new Date("2023-12-31"),
    status: "active",
    reminderDays: 3,
    createdAt: new Date("2023-10-01"),
    responseCount: 1,
    pendingCount: 1,
    instructions: "請依照ISO 14064-1標準和GHG Protocol提供溫室氣體排放數據。如有任何疑問，請聯繫sustainability@example.com。"
  },
  {
    id: "2",
    title: "供應商基本信息更新",
    description: "請更新貴公司的基本聯絡資訊、主要產品服務清單及認證情況。",
    suppliers: ["宅配通", "新竹物流"],
    supplierCount: 2,
    requestedData: ["公司基本資訊"],
    deadline: new Date("2023-11-15"),
    status: "completed",
    reminderDays: 5,
    createdAt: new Date("2023-09-15"),
    responseCount: 2,
    pendingCount: 0,
    instructions: "請確保所有資訊為最新狀態，尤其是聯絡人資訊和認證文件。"
  },
  {
    id: "3",
    title: "產品碳足跡調查",
    description: "請提供貴公司主要產品的碳足跡數據，包括生產、運輸和使用階段的碳排放資訊。",
    suppliers: ["統一速達"],
    supplierCount: 1,
    requestedData: ["產品碳足跡"],
    deadline: new Date("2023-10-30"),
    status: "expired",
    reminderDays: 7,
    createdAt: new Date("2023-08-30"),
    responseCount: 0,
    pendingCount: 1,
    instructions: "請參照PAS 2050或ISO 14067標準進行產品碳足跡計算，並提供計算方法和數據來源。"
  },
]

// 獲取狀態標籤
const getStatusBadge = (status: "active" | "completed" | "expired" | string, t?: any) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500">{t?.('status_active') || '進行中'}</Badge>
    case "completed":
      return <Badge className="bg-blue-500">{t?.('status_completed') || '已完成'}</Badge>
    case "expired":
      return <Badge variant="destructive">{t?.('status_expired') || '已過期'}</Badge>
    default:
      return <Badge variant="outline">{t?.('status_unknown') || '未知'}</Badge>
  }
}

export default function RequestDetailPage({ t }: { t?: any }) {
  const router = useRouter()
  const params = useParams()
  const requestId = params.id as string
  const [request, setRequest] = useState<any>(null)

  // 模擬從API獲取數據
  useEffect(() => {
    const foundRequest = initialRequests.find(req => req.id === requestId)
    if (foundRequest) {
      setRequest(foundRequest)
    }
  }, [requestId])

  // 如果找不到請求
  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <h1 className="text-xl font-bold mb-4">{t?.('request_not_found') || '找不到該數據要求'}</h1>
        <Button onClick={() => router.push("/dashboard/requests")}>
          {t?.('back_to_requests') || '返回數據要求列表'}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 頁首 */}
      <div>
        <Button variant="ghost" size="sm" className="mb-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t?.('back') || '返回'}
        </Button>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{request.title}</h1>
          <div className="flex gap-2">
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4 mr-2" />
              {t?.('delete') || '刪除'}
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              {t?.('edit') || '編輯'}
            </Button>
            <Button size="sm">
              <Send className="h-4 w-4 mr-2" />
              {t?.('send_reminder') || '發送提醒'}
            </Button>
          </div>
        </div>
      </div>

      {/* 狀態卡片 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t?.('status') || '狀態'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {getStatusBadge(request.status, t)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t?.('deadline') || '截止日期'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {format(request.deadline, "yyyy-MM-dd")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t?.('suppliers') || '供應商'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              {request.supplierCount} {t?.('suppliers_count') || '家供應商'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t?.('response_rate') || '回應率'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold">{Math.round((request.responseCount / request.supplierCount) * 100)}%</div>
            <div className="text-xs text-muted-foreground">
              {request.responseCount} / {request.supplierCount} {t?.('responded') || '已回應'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要內容 */}
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">{t?.('details') || '詳細資訊'}</TabsTrigger>
          <TabsTrigger value="responses">{t?.('responses') || '回應'}</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t?.('request_details') || '請求詳情'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('description') || '描述'}</h3>
                <p>{request.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('instructions') || '填寫說明'}</h3>
                <p>{request.instructions}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('request_type') || '要求類型'}</h3>
                  <div>{request.requestedData.join(", ")}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('created_at') || '創建日期'}</h3>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {format(request.createdAt, "yyyy-MM-dd")}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('reminder_setting') || '提醒設定'}</h3>
                  <div>
                    {t?.('reminder_before_days', { days: request.reminderDays }) || `到期前 ${request.reminderDays} 天`}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{t?.('deadline') || '截止日期'}</h3>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    {format(request.deadline, "yyyy-MM-dd")}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t?.('target_suppliers') || '目標供應商'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {request.suppliers.map((supplier: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <div>{supplier}</div>
                    <Button variant="ghost" size="sm">
                      {t?.('view_supplier') || '查看供應商'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t?.('response_summary') || '回應摘要'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {t?.('response_status') || '回應狀態'}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-md">
                    <div className="text-2xl font-bold">{request.responseCount}</div>
                    <div className="text-sm text-muted-foreground">{t?.('total_responses') || '總回應數'}</div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="text-2xl font-bold text-green-500">{request.responseCount - request.pendingCount}</div>
                    <div className="text-sm text-muted-foreground">{t?.('completed') || '已完成'}</div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="text-2xl font-bold text-amber-500">{request.pendingCount}</div>
                    <div className="text-sm text-muted-foreground">{t?.('pending') || '待處理'}</div>
                  </div>
                  <div className="p-4 border rounded-md">
                    <div className="text-2xl font-bold text-red-500">{request.supplierCount - request.responseCount}</div>
                    <div className="text-sm text-muted-foreground">{t?.('not_responded') || '未回應'}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <Button onClick={() => router.push(`/dashboard/requests/responses?request=${requestId}`)}>
                  {t?.('view_all_responses') || '查看所有回應'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
