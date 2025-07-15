"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { CalendarIcon, Eye, Plus, Search, MessageSquare } from "lucide-react"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSuppliers, dataSourceOptions } from "@/lib/mocks/suppliers"

// 預設 Case 的數據要求
const defaultRequests = [
  {
    id: "1",
    title: "2023年度碳排放數據收集",
    description: "2023年度的碳排放數據，包括範疇1、2和3的排放數據。",
    suppliers: getSuppliers('default').slice(0, 2).map(s => s.id),
    requestedData: ["組織溫室氣體排放", "產品碳足跡"],
    deadline: new Date("2023-12-31"),
    status: "active",
    reminderDays: 3,
  },
  {
    id: "2",
    title: "供應商基本信息更新",
    description: "貴公司的基本聯絡資訊、主要產品服務清單及認證情況。",
    suppliers: getSuppliers('default').slice(2, 4).map(s => s.id),
    requestedData: ["公司基本資訊"],
    deadline: new Date("2023-11-15"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "3",
    title: "產品碳足跡調查",
    description: "主要產品的碳足跡數據，包括生產、運輸和使用階段的碳排放資訊。",
    suppliers: getSuppliers('default').slice(4, 5).map(s => s.id),
    requestedData: ["產品碳足跡"],
    deadline: new Date("2023-10-30"),
    status: "expired",
    reminderDays: 7,
  },
  {
    id: "4",
    title: "2024年度碳減排目標設定",
    description: "2024年度的碳減排目標，並提供具體的實施計劃。",
    suppliers: getSuppliers('default').slice(5, 7).map(s => s.id),
    requestedData: ["減排目標", "實施計劃"],
    deadline: new Date("2024-01-31"),
    status: "active",
    reminderDays: 5,
  },
  {
    id: "5",
    title: "能源使用效率評估",
    description: "的能源使用效率評估報告，包括主要耗能設備的效率分析。",
    suppliers: getSuppliers('default').slice(7, 9).map(s => s.id),
    requestedData: ["能源效率報告"],
    deadline: new Date("2024-02-15"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "6",
    title: "供應鏈碳足跡追蹤",
    description: "供應鏈中主要原材料的碳足跡數據。",
    suppliers: getSuppliers('default').slice(9, 11).map(s => s.id),
    requestedData: ["供應鏈碳足跡"],
    deadline: new Date("2024-03-01"),
    status: "active",
    reminderDays: 10,
  },
  {
    id: "7",
    title: "可再生能源使用報告",
    description: "貴公司目前可再生能源的使用情況及未來規劃。",
    suppliers: getSuppliers('default').slice(11, 13).map(s => s.id),
    requestedData: ["可再生能源報告"],
    deadline: new Date("2024-02-28"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "8",
    title: "碳排放減量成效報告",
    description: "過去一年實施的碳排放減量措施及其成效報告。",
    suppliers: getSuppliers('default').slice(0, 3).map(s => s.id),
    requestedData: ["減量成效報告"],
    deadline: new Date("2023-12-15"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "9",
    title: "環境管理系統認證更新",
    description: "最新的ISO 14001環境管理系統認證資訊。",
    suppliers: getSuppliers('default').slice(3, 6).map(s => s.id),
    requestedData: ["認證資訊"],
    deadline: new Date("2023-11-30"),
    status: "completed",
    reminderDays: 3,
  },
  {
    id: "10",
    title: "碳中和策略規劃",
    description: "達成碳中和的長期策略規劃及時程表。",
    suppliers: getSuppliers('default').slice(6, 8).map(s => s.id),
    requestedData: ["碳中和規劃"],
    deadline: new Date("2024-03-31"),
    status: "active",
    reminderDays: 14,
  }
];

// TSMC Case 的數據要求
const tsmcRequests = [
  {
    id: "tsmc-1",
    title: "半導體製程碳排放評估",
    description: "半導體製程的碳排放數據，包括製程能源消耗和溫室氣體排放。",
    suppliers: getSuppliers('tsmc').slice(0, 3).map(s => s.id),
    requestedData: ["製程碳排放"],
    deadline: new Date("2024-01-31"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "tsmc-2",
    title: "原物料碳足跡追蹤",
    description: "請提供主要原物料的碳足跡數據，包括運輸和儲存過程的排放。",
    suppliers: getSuppliers('tsmc').slice(3, 6).map(s => s.id),
    requestedData: ["原物料碳足跡"],
    deadline: new Date("2024-02-15"),
    status: "active",
    reminderDays: 5,
  },
  {
    id: "tsmc-3",
    title: "設備能源效率評估",
    description: "請評估主要生產設備的能源使用效率，並提供改善建議。",
    suppliers: getSuppliers('tsmc').slice(6, 9).map(s => s.id),
    requestedData: ["能源效率"],
    deadline: new Date("2024-01-15"),
    status: "completed",
    reminderDays: 3,
  },
  {
    id: "tsmc-4",
    title: "包裝材料環境影響評估",
    description: "請評估產品包裝材料的環境影響，包括材料碳足跡和回收方案。",
    suppliers: getSuppliers('tsmc').slice(9, 12).map(s => s.id),
    requestedData: ["包裝環境影響"],
    deadline: new Date("2024-02-28"),
    status: "active",
    reminderDays: 10,
  },
  {
    id: "tsmc-5",
    title: "供應商ESG績效評估",
    description: "的ESG績效報告，包括環境管理系統和碳排放管理方案。",
    suppliers: getSuppliers('tsmc').slice(12, 15).map(s => s.id),
    requestedData: ["ESG績效"],
    deadline: new Date("2024-03-15"),
    status: "active",
    reminderDays: 14,
  },
  {
    id: "tsmc-6",
    title: "化學品管理系統審查",
    description: "請提供化學品管理系統的審查報告，包括減量和替代方案。",
    suppliers: getSuppliers('tsmc').slice(15, 18).map(s => s.id),
    requestedData: ["化學品管理"],
    deadline: new Date("2024-01-20"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "tsmc-7",
    title: "水資源管理評估",
    description: "請提供水資源使用和回收的詳細報告，包括節水措施成效。",
    suppliers: getSuppliers('tsmc').slice(18, 21).map(s => s.id),
    requestedData: ["水資源管理"],
    deadline: new Date("2024-02-10"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "tsmc-8",
    title: "廢棄物管理系統審查",
    description: "請提供廢棄物管理系統的審查報告，包括減量和循環利用方案。",
    suppliers: getSuppliers('tsmc').slice(21, 24).map(s => s.id),
    requestedData: ["廢棄物管理"],
    deadline: new Date("2024-03-01"),
    status: "active",
    reminderDays: 10,
  },
  {
    id: "tsmc-9",
    title: "空氣污染防制成效報告",
    description: "請提供空氣污染防制設備的運行成效報告，包括排放監測數據。",
    suppliers: getSuppliers('tsmc').slice(24, 26).map(s => s.id),
    requestedData: ["空污防制"],
    deadline: new Date("2024-01-25"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "tsmc-10",
    title: "綠色製程創新計畫",
    description: "請提供綠色製程創新的實施計畫，包括節能減碳技術應用。",
    suppliers: getSuppliers('tsmc').slice(0, 5).map(s => s.id),
    requestedData: ["綠色創新"],
    deadline: new Date("2024-03-31"),
    status: "active",
    reminderDays: 14,
  }
];

export function RequestsPageComponent({ t }: { t: (key: string, params?: Record<string, any>) => string }) {
  if (!t) {
    t = (key) => key;
  }
  
  const [caseType, setCaseType] = useState<"default" | "tsmc">("default")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    router.push(path);
  };

  // 根據 case 類型選擇對應的數據
  const requests = caseType === "tsmc" ? tsmcRequests : defaultRequests;
  const suppliers = getSuppliers(caseType);

  // 過濾數據要求
  const filteredRequests = requests.filter(
    (request) =>
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.suppliers.some((supplierId) => {
        const supplier = suppliers.find(s => s.id === supplierId);
        return supplier?.name.toLowerCase().includes(searchTerm.toLowerCase());
      }),
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
            <h2 className="text-xl font-bold tracking-tight">{t('title')}</h2>
            <p className="text-muted-foreground">
              {t('description')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={caseType} onValueChange={(value: "default" | "tsmc") => setCaseType(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="選擇 Case" />
              </SelectTrigger>
              <SelectContent>
                {dataSourceOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => handleNavigate("/dashboard/requests/new")}>
              <Plus className="mr-2 h-4 w-4" /> {t('create_new')}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Input
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">{t('request_name')}</TableHead>
                <TableHead className="w-[300px]">{t('supplier')}</TableHead>
                <TableHead className="w-[240px]">{t('request_type')}</TableHead>
                <TableHead className="w-[150px]">{t('deadline')}</TableHead>
                <TableHead className="w-[120px]">{t('status')}</TableHead>
                <TableHead className="text-right">{t('action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    {t('no_requests_found')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.flatMap((request) => {
                  const requestSuppliers = request.suppliers
                    .map(id => suppliers.find(s => s.id === id))
                    .filter(s => s !== undefined);
                  
                  return requestSuppliers.map((supplier) => (
                    <TableRow key={`${request.id}-${supplier?.id}`}>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="text-sm font-medium cursor-help">
                              {request.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">{request.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{supplier?.name}</div>
                        <div className="text-sm text-gray-400">{supplier?.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {request.requestedData.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {format(request.deadline, "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {getStatusBadge(request.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/requests/${request.id}?supplier=${supplier?.id}`} passHref>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-1 border-[#3A81C5]/30">
                                  <div className="flex items-center justify-center">
                                    <Eye className="h-3.5 w-3.5 text-[#3A81C5]" />
                                    <span className="sr-only">{t('view')}</span>
                                  </div>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('view')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                          <Link href={`/dashboard/requests/responses?request=${request.id}`} passHref>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-1 border-[#3A81C5]/30">
                                  <div className="flex items-center justify-center">
                                    <MessageSquare className="h-3.5 w-3.5 text-[#3A81C5]" />
                                    <span className="sr-only">{t('view_responses')}</span>
                                  </div>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t('view_responses')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ));
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default RequestsPageComponent; 