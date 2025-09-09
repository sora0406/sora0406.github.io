"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" 
import { CalendarIcon, Eye, Plus, Search, MessageSquare, BarChart3, TrendingUp, Target, PieChart, Clock, Download, Filter, BarChart2, MapPin } from "lucide-react"
import { format } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import dynamic from 'next/dynamic'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CircleIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { getSuppliers, dataSourceOptions, type SupplierDataSource } from "@/lib/mocks/suppliers"
import { useSurveyData } from "@/hooks/useSurveyData"
import { cn } from "@/lib/utils"

// 動態載入 ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

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

// Case 3: 材料製造業的數據要求
const materialsRequests = [
  {
    id: "materials-1",
    title: "原材料碳足跡評估",
    description: "請提供主要原材料的碳足跡數據，包括採礦、冶煉和加工過程的碳排放。",
    suppliers: getSuppliers('materials').slice(0, 5).map(s => s.id),
    requestedData: ["原材料碳足跡"],
    deadline: new Date("2024-02-15"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "materials-2",
    title: "材料製程能源消耗評估",
    description: "請評估材料製程的能源使用效率，包括熔煉、軋製和表面處理過程。",
    suppliers: getSuppliers('materials').slice(5, 10).map(s => s.id),
    requestedData: ["製程能源消耗"],
    deadline: new Date("2024-01-31"),
    status: "active",
    reminderDays: 5,
  },
  {
    id: "materials-3",
    title: "合金材料環境影響評估",
    description: "請提供合金材料生產的環境影響評估，包括空氣和水污染控制措施。",
    suppliers: getSuppliers('materials').slice(10, 15).map(s => s.id),
    requestedData: ["環境影響評估"],
    deadline: new Date("2024-02-28"),
    status: "active",
    reminderDays: 10,
  },
  {
    id: "materials-4",
    title: "稀土元素開採碳排放",
    description: "請提供稀土元素開採和提煉過程的碳排放數據及減排計劃。",
    suppliers: getSuppliers('materials').slice(15, 20).map(s => s.id),
    requestedData: ["開採碳排放"],
    deadline: new Date("2024-03-15"),
    status: "active",
    reminderDays: 14,
  },
  {
    id: "materials-5",
    title: "高分子材料回收方案",
    description: "請提供高分子材料的回收再利用方案，包括循環經濟實施計劃。",
    suppliers: getSuppliers('materials').slice(20, 25).map(s => s.id),
    requestedData: ["回收方案"],
    deadline: new Date("2024-02-10"),
    status: "completed",
    reminderDays: 7,
  },
  {
    id: "materials-6",
    title: "陶瓷材料製程優化",
    description: "請提供陶瓷材料製程的節能減碳優化措施及實施成效。",
    suppliers: getSuppliers('materials').slice(25, 30).map(s => s.id),
    requestedData: ["製程優化"],
    deadline: new Date("2024-01-20"),
    status: "completed",
    reminderDays: 5,
  },
  {
    id: "materials-7",
    title: "半導體材料純度檢測",
    description: "請提供半導體級材料的純度檢測報告，包括雜質控制和品質保證。",
    suppliers: getSuppliers('materials').slice(0, 8).map(s => s.id),
    requestedData: ["純度檢測"],
    deadline: new Date("2024-03-01"),
    status: "active",
    reminderDays: 10,
  },
  {
    id: "materials-8",
    title: "磁性材料性能評估",
    description: "請提供永磁材料的磁性能評估報告，包括溫度穩定性和耐腐蝕性測試。",
    suppliers: getSuppliers('materials').slice(8, 15).map(s => s.id),
    requestedData: ["性能評估"],
    deadline: new Date("2024-02-20"),
    status: "active",
    reminderDays: 7,
  },
  {
    id: "materials-9",
    title: "生物基材料生命週期評估",
    description: "請提供生物基塑膠材料的完整生命週期評估，包括可生物降解性驗證。",
    suppliers: getSuppliers('materials').slice(15, 22).map(s => s.id),
    requestedData: ["生命週期評估"],
    deadline: new Date("2024-03-31"),
    status: "active",
    reminderDays: 14,
  },
  {
    id: "materials-10",
    title: "奈米材料安全性評估",
    description: "請提供奈米級材料的安全性評估報告，包括職業健康和環境安全措施。",
    suppliers: getSuppliers('materials').slice(22, 30).map(s => s.id),
    requestedData: ["安全性評估"],
    deadline: new Date("2024-01-25"),
    status: "expired",
    reminderDays: 5,
  }
];

// 供應商碳排放數據結構
interface CarbonAnswer {
  [key: string]: string;
}

interface CarbonAnswerCategory {
  [category: string]: CarbonAnswer;
}

interface CarbonResponse {
  id: string;
  surveyTitle: string;
  supplierName: string;
  respondentName: string;
  respondentEmail: string;
  completedDate: Date;
  answers: CarbonAnswerCategory;
  type: "organization" | "product";
}

// 模擬碳排放數據
const carbonResponses: CarbonResponse[] = [
  {
    id: "carbon1",
    surveyTitle: "企業碳排放評估問卷",
    supplierName: "應用材料股份有限公司",
    respondentName: "Michael Johnson",
    respondentEmail: "mjohnson@appliedmaterials.com",
    completedDate: new Date("2023-12-01"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日"
      },
      "排放量資料": {
        "總排放量": "5850.000",
        "類別1排放量": "1250.000",
        "類別2排放量": "3500.000",
        "類別3排放量": "1100.000"
      }
    }
  },
  {
    id: "carbon2", 
    surveyTitle: "產品碳足跡評估",
    supplierName: "台積電設備",
    respondentName: "張志偉",
    respondentEmail: "chang@tsmc-equipment.com",
    completedDate: new Date("2023-12-05"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "晶圓製程設備",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "52.3 kgCO2e/單位"
      }
    }
  },
  {
    id: "carbon3",
    surveyTitle: "組織溫室氣體盤查",
    supplierName: "旭化成株式會社",
    respondentName: "田中太郎",
    respondentEmail: "tanaka@asahi-kasei.com",
    completedDate: new Date("2023-12-08"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月1日 至 2023年12月31日"
      },
      "排放量資料": {
        "總排放量": "2870.000",
        "類別1排放量": "850.000",
        "類別2排放量": "1650.000",
        "類別3排放量": "370.000"
      }
    }
  },
  {
    id: "carbon4",
    surveyTitle: "產品碳足跡調查",
    supplierName: "矽品精密工業",
    respondentName: "李明華",
    respondentEmail: "li@spil.com.tw",
    completedDate: new Date("2023-12-10"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "IC封裝測試服務",
        "報導期間": "2023年1月1日 至 2023年12月31日"
      },
      "碳足跡數據": {
        "產品碳足跡": "22.8 kgCO2e/單位"
      }
    }
  }
];

// 計算碳排放統計
const calculateCarbonStats = (responses: CarbonResponse[]) => {
  const orgResponses = responses.filter(r => r.type === "organization");
  const productResponses = responses.filter(r => r.type === "product");
  
  const orgTotalEmission = orgResponses.reduce((total, response) => {
    const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
    const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
    return total + emission;
  }, 0);

  const productTotalFootprint = productResponses.reduce((total, response) => {
    const footprintStr = response.answers["碳足跡數據"]?.["產品碳足跡"] || "0";
    const footprint = parseFloat(footprintStr.split(" ")[0]) || 0;
    return total + footprint;
  }, 0);

  return {
    orgTotalEmission: orgTotalEmission.toFixed(2),
    productTotalFootprint: productTotalFootprint.toFixed(2),
    orgCount: orgResponses.length,
    productCount: productResponses.length,
    totalResponses: responses.length
  };
};

export function RequestsPageComponent({ t }: { t: (key: string, params?: Record<string, any>) => string }) {
  if (!t) {
    t = (key) => key;
  }
  
  const [caseType, setCaseType] = useState<SupplierDataSource>("materials")
  const { surveyData, dataSource, switchDataSource } = useSurveyData()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"overview" | "requests">("overview")
  const [carbonSearchTerm, setCarbonSearchTerm] = useState("")
  const [selectedDataType, setSelectedDataType] = useState<"organization" | "product">("organization")
  const router = useRouter()
  
  // 計算碳排放統計數據 - 使用動態問卷數據
  const carbonStats = useMemo(() => {
    const responses = surveyData.map(survey => ({
      id: survey.id,
      surveyTitle: survey.surveyTitle,
      supplierName: survey.supplierName,
      respondentName: survey.respondentName,
      respondentEmail: survey.respondentEmail,
      completedDate: survey.completedDate,
      answers: survey.answers,
      type: survey.type
    }));
    return calculateCarbonStats(responses);
  }, [surveyData])
  
  // 過濾碳排放數據 - 使用動態問卷數據
  const filteredCarbonData = useMemo(() => {
    let data = surveyData.filter(response => response.type === selectedDataType)
    
    if (carbonSearchTerm) {
      const searchLower = carbonSearchTerm.toLowerCase()
      data = data.filter(response => 
        response.supplierName.toLowerCase().includes(searchLower) ||
        response.respondentName.toLowerCase().includes(searchLower)
      )
    }
    
    return data
  }, [selectedDataType, carbonSearchTerm, surveyData])
  
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    router.push(path);
  };

  // 根據 case 類型選擇對應的數據
  const requests = caseType === "tsmc" ? tsmcRequests : caseType === "materials" ? materialsRequests : defaultRequests;
  const suppliers = getSuppliers(caseType);
  
  // 同步數據源切換
  React.useEffect(() => {
    if (caseType !== dataSource) {
      switchDataSource(caseType);
    }
  }, [caseType, dataSource, switchDataSource]);

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
      <div className="compact-layout">
        <div className="compact-header -mx-4 -mt-6 px-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">{t('title')}</h1>
              <p className="text-sm text-slate-600 mt-1">
                {t('description')}
              </p>
            </div>
          <div className="flex items-center gap-4">
            <Select value={caseType} onValueChange={(value: SupplierDataSource) => setCaseType(value)}>
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
            {activeTab === "requests" && (
              <Button onClick={() => handleNavigate("/dashboard/requests/new")} className="professional-button-primary">
                <Plus className="mr-2 h-4 w-4" /> {t('create_new')}
              </Button>
            )}
            </div>
          </div>
        </div>

        {/* 標籤頁導航 */}
        <div className="professional-tabs mb-6">
            <button
              className={cn("professional-tab", activeTab === "overview" && "data-[state=active]:bg-white")}
              onClick={() => setActiveTab("overview")}
              data-state={activeTab === "overview" ? "active" : "inactive"}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              總覽檢視
            </button>
            <button
              className={cn("professional-tab", activeTab === "requests" && "data-[state=active]:bg-white")}
              onClick={() => setActiveTab("requests")}
              data-state={activeTab === "requests" ? "active" : "inactive"}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              數據要求
            </button>
        </div>

          {/* 總覽頁籤 */}
          {activeTab === "overview" && (
            <div className="ultra-compact">
              {/* 統計卡片 */}
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <div className="ultra-compact-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-600">總回覆數</p>
                      <p className="text-xl font-semibold text-slate-900">{carbonStats.totalResponses}</p>
                      <p className="text-xs text-slate-500">供應商問卷回覆</p>
                    </div>
                    <div className="p-2 bg-slate-100 rounded-md">
                      <BarChart3 className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="ultra-compact-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-600">組織總排放量</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {carbonStats.orgTotalEmission} <span className="text-sm font-normal text-slate-500">tCO2e</span>
                      </p>
                      <p className="text-xs text-slate-500">組織溫室氣體排放: {carbonStats.orgCount}家</p>
                    </div>
                    <div className="p-2 bg-slate-100 rounded-md">
                      <Target className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="ultra-compact-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-600">產品總碳足跡</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {carbonStats.productTotalFootprint} <span className="text-sm font-normal text-slate-500">kgCO2e</span>
                      </p>
                      <p className="text-xs text-slate-500">產品碳足跡: {carbonStats.productCount}家</p>
                    </div>
                    <div className="p-2 bg-slate-100 rounded-md">
                      <TrendingUp className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="ultra-compact-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-600">覆蓋率</p>
                      <p className="text-xl font-semibold text-slate-900">100%</p>
                      <p className="text-xs text-slate-500">數據收集完整度</p>
                    </div>
                    <div className="p-2 bg-slate-100 rounded-md">
                      <PieChart className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 供應商碳排放資料表格 */}
              <div className="professional-card">
                <div className="p-4 border-b border-slate-200/60">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">供應商碳排放資料</h2>
                    <div className="flex items-center gap-2">
                      <div className="relative w-60">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                          type="search"
                          placeholder="搜尋供應商..."
                          className="professional-input pl-8"
                          value={carbonSearchTerm}
                          onChange={(e) => setCarbonSearchTerm(e.target.value)}
                        />
                      </div>
                      <button className="professional-button-secondary compact-button">
                        <Download className="h-4 w-4 mr-1" />
                        匯出
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="professional-tabs mb-4">
                    <button
                      className={cn("professional-tab", selectedDataType === "organization" && "data-[state=active]:bg-white")}
                      onClick={() => setSelectedDataType("organization")}
                      data-state={selectedDataType === "organization" ? "active" : "inactive"}
                    >
                      組織溫室氣體排放
                      <span className="ml-2 professional-badge">{surveyData.filter(r => r.type === "organization").length}</span>
                    </button>
                    <button
                      className={cn("professional-tab", selectedDataType === "product" && "data-[state=active]:bg-white")}
                      onClick={() => setSelectedDataType("product")}
                      data-state={selectedDataType === "product" ? "active" : "inactive"}
                    >
                      產品碳足跡
                      <span className="ml-2 professional-badge">{surveyData.filter(r => r.type === "product").length}</span>
                    </button>
                  </div>
                  
                  <div className="modern-border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="professional-table min-w-full">
                        <thead className="professional-table-header">
                          <tr>
                            <th className="professional-table-cell min-w-[200px]">供應商</th>
                            {selectedDataType === "organization" ? (
                              <>
                                <th className="professional-table-cell min-w-[150px] text-right">總排放量</th>
                                <th className="professional-table-cell min-w-[140px] text-right">類別1排放量</th>
                                <th className="professional-table-cell min-w-[140px] text-right">類別2排放量</th>
                                <th className="professional-table-cell min-w-[140px] text-right">類別3排放量</th>
                                <th className="professional-table-cell min-w-[120px] text-center">完成日期</th>
                                <th className="professional-table-cell min-w-[120px] text-center">操作</th>
                              </>
                            ) : (
                              <>
                                <th className="professional-table-cell min-w-[220px]">產品名稱</th>
                                <th className="professional-table-cell min-w-[200px]">報導期間</th>
                                <th className="professional-table-cell min-w-[160px] text-right">產品碳足跡</th>
                                <th className="professional-table-cell min-w-[120px] text-center">完成日期</th>
                                <th className="professional-table-cell min-w-[120px] text-center">操作</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCarbonData.length === 0 ? (
                            <tr>
                              <td colSpan={selectedDataType === "organization" ? 7 : 6} className="professional-table-data text-center py-8">
                                沒有符合條件的數據
                              </td>
                            </tr>
                          ) : (
                            filteredCarbonData.map((response) => (
                              <tr key={response.id} className="hover:bg-slate-50/50">
                                <td className="professional-table-data">
                                  <div className="font-medium text-slate-900">{response.supplierName}</div>
                                  <div className="text-xs text-slate-500">{response.respondentName}</div>
                                </td>
                                
                                {selectedDataType === "organization" ? (
                                  <>
                                    <td className="professional-table-data text-right">
                                      <div className="font-semibold text-slate-900">
                                        {response.answers["排放量資料"]?.["總排放量"] || "0"} <span className="text-xs text-slate-500">tCO2e</span>
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-right">
                                      <div className="text-slate-700">
                                        {response.answers["排放量資料"]?.["類別1排放量"] || "0"} <span className="text-xs text-slate-500">tCO2e</span>
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-right">
                                      <div className="text-slate-700">
                                        {response.answers["排放量資料"]?.["類別2排放量"] || "0"} <span className="text-xs text-slate-500">tCO2e</span>
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-right">
                                      <div className="text-slate-700">
                                        {response.answers["排放量資料"]?.["類別3排放量"] || "0"} <span className="text-xs text-slate-500">tCO2e</span>
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-center">
                                      <div className="text-slate-600">
                                        {format(response.completedDate, "yyyy-MM-dd")}
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-center">
                                      <button className="professional-button-secondary compact-button">
                                        <BarChart3 className="h-4 w-4 mr-1" />
                                        查看問卷
                                      </button>
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="professional-table-data">
                                      <div className="font-medium text-slate-900">
                                        {response.answers["產品資訊"]?.["產品名稱"] || "-"}
                                      </div>
                                    </td>
                                    <td className="professional-table-data">
                                      <div className="text-slate-600">
                                        {response.answers["產品資訊"]?.["報導期間"] || "-"}
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-right">
                                      <div className="font-semibold text-slate-900">
                                        {response.answers["碳足跡數據"]?.["產品碳足跡"] || "-"}
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-center">
                                      <div className="text-slate-600">
                                        {format(response.completedDate, "yyyy-MM-dd")}
                                      </div>
                                    </td>
                                    <td className="professional-table-data text-center">
                                      <button className="professional-button-secondary compact-button">
                                        <BarChart3 className="h-4 w-4 mr-1" />
                                        查看問卷
                                      </button>
                                    </td>
                                  </>
                                )}
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 數據要求頁籤 */}
          {activeTab === "requests" && (
            <div className="ultra-compact">
              <div className="flex items-center gap-4 mb-4">
                <input
                  type="search"
                  placeholder={t('search')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="professional-input max-w-sm"
                />
              </div>

              <div className="modern-border rounded-lg overflow-hidden">
                <table className="professional-table">
                  <thead className="professional-table-header">
                    <tr>
                      <th className="professional-table-cell w-[300px]">{t('request_name')}</th>
                      <th className="professional-table-cell w-[300px]">{t('supplier')}</th>
                      <th className="professional-table-cell w-[240px]">{t('request_type')}</th>
                      <th className="professional-table-cell w-[150px]">{t('deadline')}</th>
                      <th className="professional-table-cell w-[120px]">{t('status')}</th>
                      <th className="professional-table-cell text-right">{t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="professional-table-data text-center py-8">
                          {t('no_requests_found')}
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.flatMap((request) => {
                        const requestSuppliers = request.suppliers
                          .map(id => suppliers.find(s => s.id === id))
                          .filter(s => s !== undefined);
                        
                        return requestSuppliers.map((supplier) => (
                          <tr key={`${request.id}-${supplier?.id}`} className="hover:bg-slate-50/50">
                            <td className="professional-table-data">
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
                            </td>
                            <td className="professional-table-data">
                              <div className="text-sm font-medium text-slate-900">{supplier?.name}</div>
                              <div className="text-xs text-slate-500">{supplier?.id}</div>
                            </td>
                            <td className="professional-table-data">
                              <div className="text-sm">
                                {request.requestedData.join(", ")}
                              </div>
                            </td>
                            <td className="professional-table-data text-sm">
                              {format(request.deadline, "yyyy-MM-dd")}
                            </td>
                            <td className="professional-table-data">
                              <div className="text-sm">
                                {getStatusBadge(request.status)}
                              </div>
                            </td>
                            <td className="professional-table-data text-right">
                              <div className="flex justify-end gap-2">
                                <Link href={`/dashboard/requests/${request.id}?supplier=${supplier?.id}`} passHref>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="professional-button-secondary compact-button h-8 w-8 p-1">
                                        <Eye className="h-3.5 w-3.5" />
                                        <span className="sr-only">{t('view')}</span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{t('view')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </Link>
                                <Link href={`/dashboard/requests/responses?request=${request.id}`} passHref>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button className="professional-button-secondary compact-button h-8 w-8 p-1">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        <span className="sr-only">{t('view_responses')}</span>
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{t('view_responses')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ));
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
    </TooltipProvider>
  )
}

export default RequestsPageComponent; 