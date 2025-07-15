"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { format, parse } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getSuppliers } from "@/lib/mocks/suppliers"

// 模擬數據版本歷史記錄
interface DataVersion {
  version: number
  updatedTime: string
  inventoryPeriod: {
    start: string
    end: string
  }
  inventoryStandard: string
  boundaryAddress: string
  totalEmissions: number
  category1: number
  category2: number
}

interface RequestDetails {
  id: string
  name: string
  type: string
  supplier: {
    name: string
    id: string
  }
  contactPerson: string
  email: string
  expirationDate: string
  status: "in_progress" | "confirmed"
  dataVersions: DataVersion[]
}

// 模擬請求詳細資料
const mockRequestDetails: RequestDetails = {
  id: "req-001",
  name: "2024年度碳排放數據收集",
  type: "Organizational Carbon Emissions",
  supplier: {
    name: "台塑科技",
    id: "SUP-001"
  },
  contactPerson: "John Doe",
  email: "john.doe@example.com",
  expirationDate: "2024-12-31",
  status: "in_progress",
  dataVersions: Array.from({ length: 10 }, (_, i) => ({
    version: 10 - i,
    updatedTime: format(new Date(), "yyyy-MM-dd HH:mm"),
    inventoryPeriod: {
      start: format(new Date(), "yyyy-MM-dd"),
      end: format(new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()), "yyyy-MM-dd")
    },
    inventoryStandard: "ISO 14064-1:2018",
    boundaryAddress: "新竹科學園區工業東路1號",
    totalEmissions: 624352,
    category1: 231,
    category2: 232323
  }))
}

export default function RequestDetailsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supplierId = searchParams.get('supplier')
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(null)

  // 模擬從API加載數據
  useEffect(() => {
    // 在實際應用中，這裡會從API獲取數據
    const supplier = getSuppliers('default').find(s => s.id === supplierId) || {
      name: "台塑科技",
      id: "SUP-001"
    }

    const currentDate = new Date()
    const startDate = format(currentDate, "MM/dd/yyyy")
    const endDate = format(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()), "MM/dd/yyyy")

    setRequestDetails({
      id: "req-001",
      name: "2024年度碳排放數據收集",
      type: "Organizational Carbon Emissions",
      supplier: {
        name: supplier.name,
        id: supplier.id
      },
      contactPerson: "John Doe",
      email: "john.doe@example.com",
      expirationDate: format(new Date(2024, 11, 31), "yyyy-MM-dd"),
      status: "in_progress",
      dataVersions: Array.from({ length: 10 }, (_, i) => ({
        version: 10 - i,
        updatedTime: format(currentDate, "yyyy-MM-dd HH:mm"),
        inventoryPeriod: {
          start: startDate,
          end: endDate
        },
        inventoryStandard: "ISO 14064-1:2018",
        boundaryAddress: "新竹科學園區工業東路1號",
        totalEmissions: 624352,
        category1: 231,
        category2: 232323
      }))
    })
  }, [supplierId])

  const getStatusBadge = (status: RequestDetails["status"]) => {
    switch (status) {
      case "in_progress":
        return <Badge className="bg-blue-500">進行中</Badge>
      case "confirmed":
        return <Badge className="bg-green-500">已確認</Badge>
      default:
        return <Badge>未知狀態</Badge>
    }
  }

  if (!requestDetails) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <h2 className="text-lg font-medium">載入中...</h2>
          <p className="text-sm text-muted-foreground">請稍候</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">查看詳情</h1>
          <p className="text-sm text-muted-foreground">
            查看數據要求的詳細資訊和回應歷史
          </p>
        </div>
        <div className="ml-auto">
          {getStatusBadge(requestDetails.status)}
        </div>
      </div>

      {/* 基本信息卡片 */}
      <div className="grid grid-cols-2 gap-6 p-6 border rounded-lg bg-card">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">要求名稱</div>
          <div className="text-sm">{requestDetails.name}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">供應商名稱</div>
          <div className="text-sm">{requestDetails.supplier.name}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">要求類型</div>
          <div className="text-sm">{requestDetails.type}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">截止日期</div>
          <div className="text-sm">{requestDetails.expirationDate}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">聯絡人</div>
          <div className="text-sm">{requestDetails.contactPerson}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Email</div>
          <div className="text-sm">{requestDetails.email}</div>
        </div>
      </div>

      {/* 數據版本歷史 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">數據版本</h2>
          <Button variant="outline" className="gap-2">
            重新發送要求
          </Button>
        </div>
        
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">版本</TableHead>
                <TableHead className="w-[180px]">更新時間</TableHead>
                <TableHead className="w-[200px]">盤查期間</TableHead>
                <TableHead className="w-[180px]">盤查標準</TableHead>
                <TableHead className="w-[200px]">邊界地址</TableHead>
                <TableHead className="w-[150px] text-right">總排放量</TableHead>
                <TableHead className="w-[120px] text-right">類別1</TableHead>
                <TableHead className="w-[120px] text-right">類別2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestDetails.dataVersions.map((version) => (
                <TableRow key={version.version}>
                  <TableCell className="font-medium">v{version.version}</TableCell>
                  <TableCell>{version.updatedTime}</TableCell>
                  <TableCell>
                    {version.inventoryPeriod.start} – {version.inventoryPeriod.end}
                  </TableCell>
                  <TableCell>{version.inventoryStandard}</TableCell>
                  <TableCell>{version.boundaryAddress}</TableCell>
                  <TableCell className="text-right">{version.totalEmissions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{version.category1.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{version.category2.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
