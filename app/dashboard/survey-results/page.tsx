"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  BarChart3, ChevronDown, Download, Filter, Search, PieChart, Clock, Calendar,
  TrendingUp, Target, BarChart, AlertTriangle, Truck, Factory, Shield, Users,
  MapPin, ArrowUpDown, ArrowDown, BarChart2, Eye
} from "lucide-react"
import { format } from "date-fns"
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { 
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem 
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// 動態載入 ApexCharts，避免伺服器端渲染問題
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// 導入新的數據源切換Hook
import { useSurveyData } from "@/hooks/useSurveyData"

// 定義問卷回覆數據的類型
interface Answer {
  [key: string]: string;
}

interface AnswerCategory {
  [category: string]: Answer;
}

interface SurveyResponse {
  id: string;
  surveyTitle: string;
  supplierName: string;
  respondentName: string;
  respondentEmail: string;
  completedDate: Date;
  answers: AnswerCategory;
  type: "organization" | "product"; // 新增類型區分組織溫盤和產品碳足跡
}

interface FieldInfo {
  id: string;
  category: string;
  field: string;
  selected: boolean;
  type: "organization" | "product";
}

// 定義各區塊的分類
interface CategoryGroup {
  title: string;
  categories: string[];
}

// 定義欄位項目
interface FieldItem {
  category: string;
  field: string;
  defaultVisible?: boolean;
}

// 組織溫盤的欄位分組
const organizationGroups: CategoryGroup[] = [
  {
    title: "基本和驗證資訊",
    categories: ["基本資訊", "驗證資訊"]
  },
  {
    title: "排放量資料",
    categories: ["排放量資料"]
  }
];

// 產品碳足跡的欄位分組
const productGroups: CategoryGroup[] = [
  {
    title: "產品和驗證資訊",
    categories: ["產品資訊", "驗證資訊"]
  },
  {
    title: "碳足跡數據",
    categories: ["碳足跡數據"]
  }
];

// 組織溫盤的欄位 - 只保留類別1、二、三
const organizationFields: FieldItem[] = [
  { category: "排放量資料", field: "類別1排放量", defaultVisible: true },
  { category: "排放量資料", field: "類別2排放量", defaultVisible: true },
  { category: "排放量資料", field: "類別3排放量", defaultVisible: true },
  { category: "基本資訊", field: "盤查期間", defaultVisible: false },
  { category: "基本資訊", field: "採用標準", defaultVisible: false },
  { category: "基本資訊", field: "邊界", defaultVisible: false },
  { category: "驗證資訊", field: "查證", defaultVisible: false },
  { category: "驗證資訊", field: "查證證書", defaultVisible: false }
];

// 產品碳足跡的欄位 - 只保留貨運服務碳足跡
const productFields: FieldItem[] = [
  { category: "產品資訊", field: "產品名稱", defaultVisible: true },
  { category: "產品資訊", field: "報導期間", defaultVisible: true },
  { category: "碳足跡數據", field: "產品碳足跡", defaultVisible: true },
  { category: "驗證資訊", field: "查證", defaultVisible: false },
  { category: "驗證資訊", field: "查證證書", defaultVisible: false }
];

// 模擬問卷回覆數據 - 組織溫盤
const organizationResponses: SurveyResponse[] = [
  {
    id: "1",
    surveyTitle: "企業碳排放評估問卷",
    supplierName: "新竹物流",
    respondentName: "張小明",
    respondentEmail: "contact@hct.com.tw",
    completedDate: new Date("2023-10-18T14:35:22"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "5200.000",
        "類別1排放量": "1250.000",
        "類別2排放量": "3500.000",
        "類別3排放量": "450.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2022-001"
      }
    }
  },
  {
    id: "2",
    surveyTitle: "組織溫室氣體盤查報告",
    supplierName: "統一速達",
    respondentName: "李大華",
    respondentEmail: "info@t-cat.com.tw",
    completedDate: new Date("2023-09-25T10:22:15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "股權比例法"
      },
      "排放量資料": {
        "總排放量": "3200.000",
        "類別1排放量": "850.000",
        "類別2排放量": "2100.000",
        "類別3排放量": "250.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2022-002"
      }
    }
  },
  {
    id: "3",
    surveyTitle: "2023年度溫室氣體盤查",
    supplierName: "宅配通",
    respondentName: "王美麗",
    respondentEmail: "contact@pelican.com.tw",
    completedDate: new Date("2023-11-05T09:15:00"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "4800.000",
        "類別1排放量": "1500.000",
        "類別2排放量": "2800.000",
        "類別3排放量": "500.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-003"
      }
    }
  },
  {
    id: "org4",
    surveyTitle: "組織溫室氣體排放盤查",
    supplierName: "長榮國際儲運",
    respondentName: "林志明",
    respondentEmail: "service@evergreen.com.tw",
    completedDate: new Date("2023-08-20T15:30:10"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "7600.000",
        "類別1排放量": "2300.000",
        "類別2排放量": "4500.000",
        "類別3排放量": "800.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2022-004"
      }
    }
  },
  {
    id: "org5",
    surveyTitle: "企業溫室氣體盤查",
    supplierName: "台塑汽車貨運",
    respondentName: "陳志遠",
    respondentEmail: "chen@fpg-transport.com.tw",
    completedDate: new Date("2023-09-15T11:40:25"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "6800.000",
        "類別1排放量": "2100.000",
        "類別2排放量": "3900.000",
        "類別3排放量": "800.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2022-005"
      }
    }
  },
  {
    id: "org6",
    surveyTitle: "運輸業溫室氣體盤查報告",
    supplierName: "捷盛運輸",
    respondentName: "黃麗華",
    respondentEmail: "huanglh@js-transport.com.tw",
    completedDate: new Date("2023-07-20T09:30:45"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "股權比例法"
      },
      "排放量資料": {
        "總排放量": "2800.000",
        "類別1排放量": "950.000",
        "類別2排放量": "1650.000",
        "類別3排放量": "200.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2022-006"
      }
    }
  },
  {
    id: "org7",
    surveyTitle: "行銷物流碳排放評估",
    supplierName: "統昶行銷",
    respondentName: "劉建宏",
    respondentEmail: "liou@tonchang.com",
    completedDate: new Date("2023-10-05T14:20:15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "2200.000",
        "類別1排放量": "650.000",
        "類別2排放量": "1350.000",
        "類別3排放量": "200.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-007"
      }
    }
  },
  {
    id: "org8",
    surveyTitle: "物流業碳排放報告",
    supplierName: "捷盟行銷",
    respondentName: "林俊傑",
    respondentEmail: "lin@jm-logistics.com",
    completedDate: new Date("2023-11-15T10:10:30"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "2400.000",
        "類別1排放量": "780.000",
        "類別2排放量": "1400.000",
        "類別3排放量": "220.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-008"
      }
    }
  },
  {
    id: "org9",
    surveyTitle: "文化行銷溫室氣體盤查",
    supplierName: "大智通文化行銷",
    respondentName: "周慧敏",
    respondentEmail: "chou@dzt-marketing.com.tw",
    completedDate: new Date("2023-08-28T16:45:20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "1950.000",
        "類別1排放量": "520.000",
        "類別2排放量": "1250.000",
        "類別3排放量": "180.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2022-009"
      }
    }
  },
  {
    id: "org10",
    surveyTitle: "貨櫃運輸溫室氣體排放報告",
    supplierName: "中國貨櫃運輸",
    respondentName: "張世昌",
    respondentEmail: "chang@cct.com.tw",
    completedDate: new Date("2023-12-01T09:25:40"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "股權比例法"
      },
      "排放量資料": {
        "總排放量": "9200.000",
        "類別1排放量": "3100.000",
        "類別2排放量": "5200.000",
        "類別3排放量": "900.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "DNV-ISO14064-2023-010"
      }
    }
  },
  {
    id: "org11",
    surveyTitle: "快遞企業碳排放盤查",
    supplierName: "捷迅",
    respondentName: "王建民",
    respondentEmail: "wang@jetspeed.com.tw",
    completedDate: new Date("2023-09-10T13:50:25"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "3100.000",
        "類別1排放量": "950.000",
        "類別2排放量": "1950.000",
        "類別3排放量": "200.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2022-011"
      }
    }
  },
  {
    id: "org12",
    surveyTitle: "冷凍冷藏運輸溫室氣體盤查",
    supplierName: "裕國冷凍冷藏",
    respondentName: "李美玲",
    respondentEmail: "li@yukuo-cold.com.tw",
    completedDate: new Date("2023-11-20T11:30:15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "4900.000",
        "類別1排放量": "1800.000",
        "類別2排放量": "2700.000",
        "類別3排放量": "400.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "SGS-ISO14064-2023-012"
      }
    }
  },
  {
    id: "org13",
    surveyTitle: "航空貨運碳排放評估",
    supplierName: "台灣航空貨運承攬",
    respondentName: "鄭明仁",
    respondentEmail: "cheng@taf.com.tw",
    completedDate: new Date("2023-10-15T15:15:30"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "股權比例法"
      },
      "排放量資料": {
        "總排放量": "5500.000",
        "類別1排放量": "1700.000",
        "類別2排放量": "3100.000",
        "類別3排放量": "700.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "BSI-ISO14064-2023-013"
      }
    }
  },
  {
    id: "org14",
    surveyTitle: "國際物流溫室氣體盤查",
    supplierName: "好好國際物流",
    respondentName: "蔡志明",
    respondentEmail: "tsai@goodgood-logistics.com",
    completedDate: new Date("2023-12-10T10:45:20"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "3700.000",
        "類別1排放量": "1100.000",
        "類別2排放量": "2200.000",
        "類別3排放量": "400.000"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-014"
      }
    }
  }
];

// 模擬問卷回覆數據 - 產品碳足跡
const productResponses: SurveyResponse[] = [
  {
    id: "4",
    surveyTitle: "產品碳足跡資訊收集",
    supplierName: "長榮國際儲運",
    respondentName: "林志明",
    respondentEmail: "service@evergreen.com.tw",
    completedDate: new Date("2023-08-15T16:42:30"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高效能貨運服務",
        "產品ID": "FRT-2023-A1",
        "系統邊界": "搖籃到大門",
        "宣告單位": "1噸貨物運輸",
        "報導期間": "2022年",
        "生命週期": "10年"
      },
      "碳足跡數據": {
        "產品碳足跡": "2.5 kgCO2e/宣告單位"
      },
      "生命週期階段": {
        "原(物)料取得": "1.2 kgCO2e/片",
        "產品製造": "1.1 kgCO2e/片",
        "銷售配送": "0.2 kgCO2e/片",
        "產品使用": "暫不計算",
        "產品廢棄": "暫不計算"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "SGS-CF-2022-001"
      }
    }
  },
  {
    id: "5",
    surveyTitle: "產品碳足跡資訊收集",
    supplierName: "創新材料科技股份有限公司",
    respondentName: "林美玲",
    respondentEmail: "lin@innovative-materials.com",
    completedDate: new Date("2023-10-28T11:10:45"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高性能複合材料板材",
        "產品ID": "CM-2023-B2",
        "系統邊界": "搖籃到墳墓",
        "宣告單位": "1平方公尺",
        "報導期間": "2023年",
        "生命週期": "15年"
      },
      "碳足跡數據": {
        "產品碳足跡": "4.5 kgCO2e/平方公尺"
      },
      "生命週期階段": {
        "原(物)料取得": "2.3 kgCO2e/平方公尺",
        "產品製造": "1.5 kgCO2e/平方公尺",
        "銷售配送": "0.2 kgCO2e/平方公尺",
        "產品使用": "0.3 kgCO2e/平方公尺",
        "產品廢棄": "0.2 kgCO2e/平方公尺"
      },
      "驗證資訊": {
        "採用標準": "ISO 14067:2018",
        "查證": "是",
        "查證證書": "BSI-CF-2023-002"
      }
    }
  },
  {
    id: "6",
    surveyTitle: "產品碳足跡評估",
    supplierName: "永續電子元件有限公司",
    respondentName: "趙明仁",
    respondentEmail: "chao@sustainable-component.com",
    completedDate: new Date("2023-12-05T14:25:30"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "低碳電源模組",
        "產品ID": "PM-2023-C3",
        "系統邊界": "搖籃到大門",
        "宣告單位": "1個模組",
        "報導期間": "2023年",
        "生命週期": "8年"
      },
      "碳足跡數據": {
        "產品碳足跡": "3.2 kgCO2e/個"
      },
      "生命週期階段": {
        "原(物)料取得": "1.8 kgCO2e/個",
        "產品製造": "1.2 kgCO2e/個",
        "銷售配送": "0.2 kgCO2e/個",
        "產品使用": "暫不計算",
        "產品廢棄": "暫不計算"
      },
      "驗證資訊": {
        "採用標準": "PAS 2050:2011",
        "查證": "是",
        "查證證書": "TUV-CF-2023-003"
      }
    }
  }
];

// 合併所有回覆
const surveyResponsesData: SurveyResponse[] = [...organizationResponses, ...productResponses];

// 提取所有可能的欄位
const extractAllFields = (data: SurveyResponse[], type: "organization" | "product"): FieldInfo[] => {
  const predefinedFields = type === "organization" ? organizationFields : productFields;
  
  return predefinedFields.map(field => ({
    id: `${field.category}-${field.field}-${type}`,
    category: field.category,
    field: field.field,
    selected: field.defaultVisible !== undefined ? field.defaultVisible : true, // 使用預設可見性
    type
  }));
};

// 獲取所有報導年度
const extractYears = (responses: SurveyResponse[]): string[] => {
  const years = new Set<string>();
  
  responses.forEach(response => {
    let period = "";
    if (response.type === "organization") {
      period = response.answers["基本資訊"]?.["盤查期間"] || "";
    } else {
      period = response.answers["產品資訊"]?.["報導期間"] || "";
    }
    
    const yearMatch = period.match(/(\d{4})年/);
    if (yearMatch && yearMatch[1]) {
      years.add(yearMatch[1]);
    }
  });
  
  return Array.from(years).sort().reverse();
};

// 計算碳足跡統計數據
const calculateCarbonStats = (responses: SurveyResponse[], year: string | null = null) => {
  // 過濾指定年份的數據
  const filteredResponses = year 
    ? responses.filter(response => {
        if (response.type === "organization") {
          return response.answers["基本資訊"]?.["盤查期間"]?.includes(`${year}年`);
        } else {
          return response.answers["產品資訊"]?.["報導期間"]?.includes(`${year}年`);
        }
      })
    : responses;
  
  // 計算組織溫盤總排放量
  const orgTotalEmission = filteredResponses
    .filter(response => response.type === "organization")
    .reduce((total, response) => {
      const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
      return total + emission;
    }, 0);
  
  // 計算類別1、二、三排放量
  const scope1Emission = filteredResponses
    .filter(response => response.type === "organization")
    .reduce((total, response) => {
      const emissionStr = response.answers["排放量資料"]?.["類別1排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
      return total + emission;
    }, 0);
  
  const scope2Emission = filteredResponses
    .filter(response => response.type === "organization")
    .reduce((total, response) => {
      const emissionStr = response.answers["排放量資料"]?.["類別2排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
      return total + emission;
    }, 0);
  
  const scope3Emission = filteredResponses
    .filter(response => response.type === "organization")
    .reduce((total, response) => {
      const emissionStr = response.answers["排放量資料"]?.["類別3排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
      return total + emission;
    }, 0);
  
  // 計算產品碳足跡總量
  const productTotalFootprint = filteredResponses
    .filter(response => response.type === "product")
    .reduce((total, response) => {
      const footprintStr = response.answers["碳足跡數據"]?.["產品碳足跡"] || "0";
      const footprintParts = footprintStr.split(" ");
      const footprint = parseFloat(footprintParts[0]) || 0;
      return total + footprint;
    }, 0);
  
  // 獲取供應商數量
  const orgCount = new Set(
    filteredResponses
      .filter(response => response.type === "organization")
      .map(response => response.supplierName)
  ).size;
  
  const productCount = new Set(
    filteredResponses
      .filter(response => response.type === "product")
      .map(response => response.supplierName)
  ).size;
  
  return {
    orgTotalEmission: orgTotalEmission.toFixed(2),
    scope1Emission: scope1Emission.toFixed(2),
    scope2Emission: scope2Emission.toFixed(2),
    scope3Emission: scope3Emission.toFixed(2),
    productTotalFootprint: productTotalFootprint.toFixed(2),
    orgCount,
    productCount,
    totalResponses: filteredResponses.length
  };
};

// 增加虛擬台灣地區資料
const taiwanRegions = [
  { id: "north", name: "北部", suppliers: ["新竹物流", "統一速達", "捷迅", "捷盟行銷", "台灣航空貨運承攬", "好好國際物流"], lat: 25.047763, lng: 121.517551 },
  { id: "central", name: "中部", suppliers: ["統昶行銷", "大智通文化行銷", "裕國冷凍冷藏"], lat: 24.147735, lng: 120.673648 },
  { id: "south", name: "南部", suppliers: ["宅配通", "捷盛運輸", "台塑汽車貨運"], lat: 22.997415, lng: 120.212608 },
  { id: "east", name: "東部", suppliers: [], lat: 23.993908, lng: 121.601171 },
  { id: "international", name: "國際", suppliers: ["長榮國際儲運", "中國貨櫃運輸"], lat: 25.077760, lng: 121.233561 }
];

export default function WarRoomPage({ 
  tDashboard, 
  tWarRoom, 
  tCommon 
}: { 
  tDashboard?: any, 
  tWarRoom?: any, 
  tCommon?: any 
}) {
  // 數據源切換Hook
  const { 
    dataSource, 
    surveyData, 
    isLoading: isDataSourceLoading, 
    switchDataSource, 
    dataSourceOptions 
  } = useSurveyData();

  // 狀態管理
  const [searchText, setSearchText] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<"organization" | "product">("product");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showDate, setShowDate] = useState<boolean>(true);
  const [orgFields, setOrgFields] = useState<FieldInfo[]>([]);
  const [productFields, setProductFields] = useState<FieldInfo[]>([]);
  const [currentOrgBlockIndex, setCurrentOrgBlockIndex] = useState<number>(0);
  const [currentProductBlockIndex, setCurrentProductBlockIndex] = useState<number>(0);
  const [stats, setStats] = useState(calculateCarbonStats(surveyResponsesData));
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [activeChart, setActiveChart] = useState<"suppliers" | "map">("suppliers");
  
  // 所有可用年份
  const availableYears = useMemo(() => extractYears(surveyData), [surveyData]);
  
  // 從surveyData分離組織和產品數據
  const organizationResponses = useMemo(() => 
    surveyData.filter(response => response.type === "organization"), 
    [surveyData]
  );
  
  const productResponses = useMemo(() => 
    surveyData.filter(response => response.type === "product"), 
    [surveyData]
  );
  
  // 初始化欄位選擇
  useEffect(() => {
    if (!isDataSourceLoading && surveyData.length > 0) {
      setOrgFields(extractAllFields(organizationResponses, "organization"));
      setProductFields(extractAllFields(productResponses, "product"));
      setIsDataLoaded(true);
      
      // 預設選擇最新年份
      if (availableYears.length > 0) {
        setSelectedYear(availableYears[0]);
      }
    }
  }, [availableYears, organizationResponses, productResponses, isDataSourceLoading, surveyData]);
  
  // 當選擇的年份變化或數據源變化時重新計算統計數據
  useEffect(() => {
    if (!isDataSourceLoading && surveyData.length > 0) {
      setStats(calculateCarbonStats(surveyData, selectedYear));
    }
  }, [selectedYear, surveyData, isDataSourceLoading]);
  
  // 當前所有欄位
  const allFields = useMemo(() => {
    return tabValue === "organization" ? orgFields : productFields;
  }, [tabValue, orgFields, productFields]);
  
  // 當前區塊分組
  const currentGroups = useMemo(() => {
    return tabValue === "organization" ? organizationGroups : productGroups;
  }, [tabValue]);
  
  // 當前區塊索引
  const currentBlockIndex = useMemo(() => {
    return tabValue === "organization" ? currentOrgBlockIndex : currentProductBlockIndex;
  }, [tabValue, currentOrgBlockIndex, currentProductBlockIndex]);
  
  // 根據當前類別過濾欄位
  const fieldsByCategory = useMemo(() => {
    if (selectedCategory === "all") {
      return allFields;
    }
    return allFields.filter(field => field.category === selectedCategory);
  }, [allFields, selectedCategory]);
  
  // 取得所有被選擇的欄位
  const selectedFields = useMemo(() => {
    return allFields.filter(field => field.selected);
  }, [allFields]);
  
  // 按組分組欄位
  const fieldsByGroup = useMemo(() => {
    const result: { [key: string]: FieldInfo[] } = {};
    
    currentGroups.forEach(group => {
      result[group.title] = allFields.filter(field => 
        group.categories.includes(field.category)
      );
    });
    
    return result;
  }, [allFields, currentGroups]);
  
  // 過濾回覆
  const filteredResponses = useMemo(() => {
    let responses = surveyData.filter(response => response.type === tabValue);
    
    // 按年份過濾
    if (selectedYear) {
      responses = responses.filter(response => {
        if (response.type === "organization") {
          return response.answers["基本資訊"]?.["盤查期間"]?.includes(`${selectedYear}年`);
    } else {
          return response.answers["產品資訊"]?.["報導期間"]?.includes(`${selectedYear}年`);
        }
      });
    }
    
    // 按搜尋文字過濾
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      responses = responses.filter(response => 
        response.supplierName.toLowerCase().includes(searchLower) ||
        response.respondentName.toLowerCase().includes(searchLower) ||
        response.respondentEmail.toLowerCase().includes(searchLower)
      );
    }
    
    return responses;
  }, [surveyData, tabValue, selectedYear, searchText]);
  
  // 處理年份選擇
  const handleYearChange = (year: string) => {
    setSelectedYear(year === "all" ? null : year);
  };

  // 處理標籤頁切換
  const handleTabChange = (value: string) => {
    setTabValue(value as "organization" | "product");
    setSelectedCategory("all");
  };
  
  // 模擬打開原始問卷的函數
  const viewOriginalSurvey = (responseId: string) => {
    console.log(`查看問卷 ID: ${responseId}`);
  };
  
  // 計算總碳足跡和總排放量的分佈
  const calculateScopesPercentage = () => {
    const total = parseFloat(stats.orgTotalEmission);
    if (total === 0) return { scope1: 0, scope2: 0, scope3: 0 };
    
    const scope1 = (parseFloat(stats.scope1Emission) / total) * 100;
    const scope2 = (parseFloat(stats.scope2Emission) / total) * 100;
    const scope3 = (parseFloat(stats.scope3Emission) / total) * 100;
    
    return { scope1, scope2, scope3 };
  };
  
  const scopePercentages = calculateScopesPercentage();
  
  // 計算排放量最高的供應商資料
  const topEmitters = useMemo(() => {
    // 組織排放量
    const orgEmitters = organizationResponses
      .filter(response => !selectedYear || response.answers["基本資訊"]?.["盤查期間"]?.includes(`${selectedYear}年`))
      .map(response => {
      const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
        return {
          name: response.supplierName,
          value: emission,
          unit: "tCO2e",
          type: "organization"
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    
    // 產品碳足跡
    const productEmitters = productResponses
      .filter(response => !selectedYear || response.answers["產品資訊"]?.["報導期間"]?.includes(`${selectedYear}年`))
      .map(response => {
      const footprintStr = response.answers["碳足跡數據"]?.["產品碳足跡"] || "0";
      const footprintParts = footprintStr.split(" ");
      const footprint = parseFloat(footprintParts[0]) || 0;
        return {
          name: response.supplierName,
          value: footprint,
          unit: footprintParts[1] || "kgCO2e",
          type: "product"
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
    
    return {
      organization: orgEmitters,
      product: productEmitters
    };
  }, [organizationResponses, productResponses, selectedYear]);
  
  // 計算供應商區域分布
  const supplierRegionDistribution = useMemo(() => {
    // 獲取所有供應商名稱
    const allSuppliers = new Set([
      ...organizationResponses.map(r => r.supplierName),
      ...productResponses.map(r => r.supplierName)
    ]);
    
    // 計算每個區域的供應商數量
    const distribution = taiwanRegions.map(region => {
      // 計算此區域的供應商數量
      const count = region.suppliers.filter(s => allSuppliers.has(s)).length;
      // 計算此區域供應商的總排放量
      const totalEmission = [...organizationResponses, ...productResponses]
        .filter(r => region.suppliers.includes(r.supplierName))
        .reduce((sum, r) => {
          if (r.type === "organization") {
            const emissionStr = r.answers["排放量資料"]?.["總排放量"] || "0";
            return sum + (parseFloat(emissionStr.split(" ")[0]) || 0);
          } else {
            const footprintStr = r.answers["碳足跡數據"]?.["產品碳足跡"] || "0";
            return sum + (parseFloat(footprintStr.split(" ")[0]) || 0);
          }
    }, 0);

    return {
        ...region,
        count,
        totalEmission: totalEmission.toFixed(2)
      };
    });
    
    return distribution;
  }, [organizationResponses, productResponses]);
  
  // 生成組織排放量圖表配置
  const organizationChartOptions = useMemo<ApexOptions>(() => {
    return {
      chart: {
        type: 'bar' as const,
        toolbar: {
          show: false
        },
        fontFamily: 'inherit',
        background: '#ffffff',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: false,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: '12px',
          colors: ['#333']
        },
        formatter: function(val: number, opt: any) {
          return val.toFixed(2) + '';
        }
      },
      colors: ['#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
      xaxis: {
        categories: topEmitters.organization.map(item => item.name),
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 600
          },
          rotate: -45,
          rotateAlways: false,
          trim: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function(val: number) {
            return val.toFixed(0) + '';
          },
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: '排放量 (tCO2e)',
          style: {
            fontSize: '13px',
            fontWeight: 500
          }
        }
      },
      title: {
        text: tWarRoom?.('tags.organization_emission') || '組織溫室氣體排放量 (tCO2e)',
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#334155'
        },
        offsetY: 10
      },
      subtitle: {
        text: selectedYear ? (tWarRoom?.('tags.data_year', {year: selectedYear}) || `${selectedYear}年度數據`) : (tWarRoom?.('tags.all_years') || '所有年度'),
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#64748b'
        },
        offsetY: 30
      },
      tooltip: {
        y: {
          formatter: function(val: number) {
            return val.toFixed(2) + '';
          }
        },
        theme: 'light',
        style: {
          fontSize: '12px'
        }
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 4,
        position: 'back'
      },
      legend: {
        show: false
      }
    };
  }, [topEmitters.organization, selectedYear, tWarRoom]);
  
  // 生成產品碳足跡圖表配置
  const productChartOptions = useMemo<ApexOptions>(() => {
    return {
      chart: {
        type: 'bar' as const,
        toolbar: {
          show: false
        },
        fontFamily: 'inherit',
        background: '#ffffff',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: false,
          columnWidth: '60%',
          distributed: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: '12px',
          colors: ['#333']
        },
        formatter: function(val: number, opt: any) {
          const emitter = topEmitters.product[opt.dataPointIndex];
          return val.toFixed(2) + ' ' + (emitter ? emitter.unit : 'kgCO2e');
        }
      },
      colors: ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
      xaxis: {
        categories: topEmitters.product.map(item => item.name),
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 600
          },
          rotate: -45,
          rotateAlways: false,
          trim: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function(val: number) {
            return val.toFixed(0);
          },
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: '碳足跡 (kgCO2e/宣告單位)',
          style: {
            fontSize: '13px',
            fontWeight: 500
          }
        }
      },
      title: {
        text: tWarRoom?.('tags.product_footprint') || '產品碳足跡 (kgCO2e)',
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#334155'
        },
        offsetY: 10
      },
      subtitle: {
        text: selectedYear ? (tWarRoom?.('tags.data_year', {year: selectedYear}) || `${selectedYear}年度數據`) : (tWarRoom?.('tags.all_years') || '所有年度'),
        align: 'center',
        style: {
          fontSize: '12px',
          color: '#64748b'
        },
        offsetY: 30
      },
      tooltip: {
        y: {
          formatter: function(val: number, opt: any) {
            const emitter = topEmitters.product[opt.dataPointIndex];
            return val.toFixed(2) + ' ' + (emitter ? emitter.unit : 'kgCO2e');
          }
        },
        theme: 'light',
        style: {
          fontSize: '12px'
        }
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 4,
        position: 'back'
      },
      legend: {
        show: false
      }
    };
  }, [topEmitters.product, selectedYear, tWarRoom]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{tWarRoom?.('title') || '戰情室'}</h1>
          <p className="text-sm text-muted-foreground">
            {tWarRoom?.('subtitle') || '監控供應鏈碳排放狀況，追蹤減碳進度'}
          </p>
        </div>
        
        {/* 數據源和年份選擇 */}
        <div className="flex items-center gap-4">
          {/* 數據源選擇器 */}
          <div className="flex items-center gap-2">
            <Select value={dataSource} onValueChange={switchDataSource}>
              <SelectTrigger className="h-6 px-4 py-3 text-xs text-gray-300 bg-white border-none rounded-md hover:bg-accent focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-w-[120px] w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dataSourceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 年份選擇 */}
          <div className="flex items-center gap-2">
            <Label htmlFor="year-select" className="text-sm font-medium">年度:</Label>
            <Select 
              value={selectedYear || "all"}
              onValueChange={handleYearChange}
            >
              <SelectTrigger id="year-select" >
                <SelectValue placeholder="選擇年份" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tWarRoom?.('tags.all_years') || '所有年份'}</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year}>{year}年</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* 數據儀表板 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tWarRoom?.('statistics.total_responses') || '總回覆數'}
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResponses}</div>
            <p className="text-xs text-muted-foreground">
              {selectedYear ? `${selectedYear}${tWarRoom?.('tags.data_year', {year: selectedYear}) || '年度數據'}` : tWarRoom?.('tags.all_years') || '所有年度'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tWarRoom?.('statistics.carbon_footprint') || '產品總碳足跡'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productTotalFootprint} kgCO2e</div>
            <p className="text-xs text-muted-foreground">
              {tWarRoom?.('summary.product_suppliers') || '產品碳足跡供應商'}: {stats.productCount}
            </p>
          </CardContent>
        </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tWarRoom?.('statistics.total_emission') || '組織總排放量'}
          </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{stats.orgTotalEmission} tCO2e</div>
            <p className="text-xs text-muted-foreground">
              {tWarRoom?.('summary.org_suppliers') || '組織排放供應商'}: {stats.orgCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tWarRoom?.('scope_distribution') || '排放類別分佈'}
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs">{tWarRoom?.('scope1') || '範疇 1'}</span>
                  <span className="ml-auto text-xs">{scopePercentages.scope1.toFixed(1)}%</span>
                </div>
                <Progress value={scopePercentages.scope1} className="h-1 bg-slate-200" />
              </div>
              <div>
                <div className="mb-1 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 mr-1"></div>
                  <span className="text-xs">{tWarRoom?.('scope2') || '範疇 2'}</span>
                  <span className="ml-auto text-xs">{scopePercentages.scope2.toFixed(1)}%</span>
                </div>
                <Progress value={scopePercentages.scope2} className="h-1 bg-slate-200" />
              </div>
              <div>
                <div className="mb-1 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-slate-500 mr-1"></div>
                  <span className="text-xs">{tWarRoom?.('scope3') || '範疇 3'}</span>
                  <span className="ml-auto text-xs">{scopePercentages.scope3.toFixed(1)}%</span>
                </div>
                <Progress value={scopePercentages.scope3} className="h-1 bg-slate-200" />
              </div>
            </div>
          </CardContent>
        </Card>
                    </div>
                    
      {/* 數據可視化圖表 */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle>{tWarRoom?.('supplier_carbon_data') || '供應商碳排放視覺化'}</CardTitle>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <Button 
                variant={activeChart === "suppliers" ? "default" : "outline"} 
                            size="sm" 
                onClick={() => setActiveChart("suppliers")}
                className="flex items-center gap-1"
                          >
                <BarChart2 className="h-4 w-4" />
                {tWarRoom?.('chart_options.suppliers') || '排放量排名'}
                          </Button>
                          <Button 
                variant={activeChart === "map" ? "default" : "outline"} 
                            size="sm" 
                onClick={() => setActiveChart("map")}
                className="flex items-center gap-1"
                          >
                <MapPin className="h-4 w-4" />
                {tWarRoom?.('chart_options.map') || '供應商分佈'}
                          </Button>
                        </div>
                      </div>
        </CardHeader>
        <CardContent>
          {activeChart === "suppliers" ? (
            <div className="space-y-8">
              {/* 兩個圖表並排顯示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 使用 ApexCharts 的組織溫盤排放量排名 */}
                <div className="space-y-3">
                  <div className="h-80">
                    {typeof window !== 'undefined' && topEmitters.organization.length > 0 ? (
                      <ReactApexChart 
                        options={organizationChartOptions} 
                        series={[{ 
                          name: '排放量', 
                          data: topEmitters.organization.map(item => item.value) 
                        }]} 
                        type="bar" 
                        height={300} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">沒有可用數據</p>
                                  </div>
                    )}
                            </div>
                  
                  {/* 前五大組織排放量列表 */}
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{tWarRoom?.('top_emitters.organization_title') || '前五大組織碳排放供應商'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">{tWarRoom?.('top_emitters.rank') || '排名'}</TableHead>
                            <TableHead>{tWarRoom?.('top_emitters.supplier_name') || '供應商名稱'}</TableHead>
                            <TableHead className="text-right">{tWarRoom?.('top_emitters.emission') || '排放量'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topEmitters.organization.map((item, index) => (
                            <TableRow key={`org-${index}`}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.value.toFixed(2)} {item.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
              </div>
                
                {/* 使用 ApexCharts 的產品碳足跡排名 */}
                <div className="space-y-3">
                  <div className="h-80">
                    {typeof window !== 'undefined' && topEmitters.product.length > 0 ? (
                      <ReactApexChart 
                        options={productChartOptions} 
                        series={[{ 
                          name: '碳足跡', 
                          data: topEmitters.product.map(item => item.value) 
                        }]} 
                        type="bar" 
                        height={300} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">沒有可用數據</p>
                        </div>
                    )}
            </div>
            
                  {/* 前五大產品碳足跡列表 */}
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{tWarRoom?.('top_emitters.product_title') || '前五大產品碳足跡供應商'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">{tWarRoom?.('top_emitters.rank') || '排名'}</TableHead>
                            <TableHead>{tWarRoom?.('top_emitters.supplier_name') || '供應商名稱'}</TableHead>
                            <TableHead className="text-right">{tWarRoom?.('top_emitters.carbon_footprint') || '碳足跡'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topEmitters.product.map((item, index) => (
                            <TableRow key={`prod-${index}`}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.value.toFixed(2)} {item.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                        </div>
                        </div>
                      </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                {tWarRoom?.('regional_distribution.title') || '供應商區域分佈'}
              </h3>
              
              {/* 台灣地圖模擬 */}
              <div className="relative w-full h-[400px] bg-slate-100 rounded-lg overflow-hidden">
                {/* 模擬台灣地圖背景 - 在實際實現時可替換為真實的地圖組件 */}
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                  <svg viewBox="0 0 400 600" className="w-full h-full max-w-md max-h-[400px]">
                    {/* 簡化的台灣輪廓 */}
                    <path
                      d="M200,100 C300,120 350,200 340,300 C330,400 270,500 200,550 C130,500 70,400 60,300 C50,200 100,120 200,100"
                      fill="#e2e8f0"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    
                    {/* 區域標記點 */}
                    {supplierRegionDistribution.map((region) => {
                      const x = ((region.id === "north" ? 180 : 
                                 region.id === "central" ? 170 : 
                                 region.id === "south" ? 160 : 
                                 region.id === "east" ? 240 :
                                 300));
                      
                      const y = ((region.id === "north" ? 150 : 
                                 region.id === "central" ? 280 : 
                                 region.id === "south" ? 410 : 
                                 region.id === "east" ? 280 :
                                 100));
                      
                      // 根據供應商數量和排放量決定圓圈大小
                      const size = region.count > 0 ? Math.max(10, Math.min(40, region.count * 10)) : 0;
                      
                      return region.count > 0 ? (
                        <g key={region.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r={size}
                            fill={region.id === "international" ? "rgba(236, 72, 153, 0.6)" : "rgba(59, 130, 246, 0.6)"}
                            stroke={region.id === "international" ? "#ec4899" : "#3b82f6"}
                            strokeWidth="2"
                          />
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {region.count}
                          </text>
                          <text
                            x={x}
                            y={y + size + 15}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#1e293b"
                            fontSize="12"
                            fontWeight="medium"
                          >
                            {region.name}
                          </text>
                        </g>
                      ) : null;
                    })}
                  </svg>
                        </div>
                      </div>
              
              {/* 區域詳情列表 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {supplierRegionDistribution
                  .filter(region => region.count > 0)
                  .map(region => (
                    <Card key={region.id} className="bg-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{region.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{tWarRoom?.('regional_distribution.supplier_count') || '供應商數量'}:</span>
                            <span className="font-medium">{region.count}</span>
                                  </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{tWarRoom?.('regional_distribution.total_emission') || '排放總量'}:</span>
                            <span className="font-medium">{region.totalEmission}</span>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                      ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 主要資料卡 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{tWarRoom?.('supplier_carbon_data') || '供應商碳排放資料'}</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={tWarRoom?.('filters.search') || '搜尋供應商...'}
                  className="pl-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowDate(!showDate)}>
                <Clock className="h-4 w-4 mr-1" />
                {showDate ? (tWarRoom?.('filters.hide_date') || '隱藏日期') : (tWarRoom?.('filters.toggle_date') || '顯示日期')}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                {tWarRoom?.('filters.export') || '匯出'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Tabs value={tabValue} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="product" className="relative">
                  {tWarRoom?.('data_table.product_carbon_footprint') || '產品碳足跡'}
                  <Badge className="ml-2 bg-blue-500">{filteredResponses.filter(r => r.type === "product").length}</Badge>
                    </TabsTrigger>
                <TabsTrigger value="organization">
                  {tWarRoom?.('data_table.org_ghg_emission') || '組織溫室氣體排放'}
                  <Badge className="ml-2 bg-slate-500">{filteredResponses.filter(r => r.type === "organization").length}</Badge>
                </TabsTrigger>
                </TabsList>
                
              <div className="mt-4">
                {/* 無論產品或組織都使用單一整合表格 */}
                <TabsContent value={tabValue}>
                  <div className="flex justify-end mb-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Filter className="h-4 w-4" />
                          {tWarRoom?.('filters.display_fields') || '顯示欄位'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>{tWarRoom?.('filters.select_fields') || '選擇要顯示的欄位'}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {(tabValue === "organization" ? organizationFields : productFields).map((field) => (
                          <DropdownMenuCheckboxItem
                            key={`${field.category}-${field.field}`}
                            checked={allFields.find(f => f.category === field.category && f.field === field.field)?.selected}
                            onCheckedChange={(checked) => {
                              // 更新欄位選擇
                              if (tabValue === "organization") {
                                setOrgFields(prev => 
                                  prev.map(f => 
                                    f.category === field.category && f.field === field.field 
                                      ? { ...f, selected: !!checked } 
                                      : f
                                  )
                                );
                              } else {
                                setProductFields(prev => 
                                  prev.map(f => 
                                    f.category === field.category && f.field === field.field 
                                      ? { ...f, selected: !!checked } 
                                      : f
                                  )
                                );
                              }
                            }}
                          >
                            {field.field}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                        </div>
                  <div className="rounded-md border">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                            <TableHead className="w-[180px]">{tWarRoom?.('data_table.supplier') || '供應商'}</TableHead>
                            
                            {selectedFields.map((fieldInfo) => (
                                    <TableHead key={fieldInfo.id} className="whitespace-nowrap">
                                {fieldInfo.field}
                                    </TableHead>
                                  ))}
                                  
                            {showDate && (
                              <TableHead className="whitespace-nowrap">{tWarRoom?.('data_table.completion_date') || '完成日期'}</TableHead>
                            )}
                            
                            <TableHead className="text-right">{tWarRoom?.('data_table.actions') || '操作'}</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredResponses.length === 0 ? (
                                  <TableRow>
                              <TableCell 
                                colSpan={selectedFields.length + 3} 
                                className="h-24 text-center"
                              >
                                {tWarRoom?.('data_table.no_data') || '沒有符合條件的數據'}
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  filteredResponses.map((response) => (
                                    <TableRow key={response.id}>
                                <TableCell className="font-medium">
                                        {response.supplierName}
                                  <div className="text-xs text-muted-foreground">
                                            {response.respondentName}
                                  </div>
                                          </TableCell>
                                      
                                {selectedFields.map((fieldInfo) => (
                                        <TableCell key={fieldInfo.id} className="whitespace-nowrap">
                                          {response.answers[fieldInfo.category]?.[fieldInfo.field] || "-"}
                                        </TableCell>
                                      ))}
                                      
                                      {showDate && (
                                        <TableCell className="whitespace-nowrap">
                                    {format(response.completedDate, "yyyy-MM-dd")}
                                        </TableCell>
                                      )}
                                      
                                <TableCell className="text-right">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => viewOriginalSurvey(response.id)}
                                        >
                                          <BarChart3 className="h-4 w-4 mr-1" />
                                    {tWarRoom?.('data_table.view_survey') || '查看詳情'}
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                    </TabsContent>
              </div>
              </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 