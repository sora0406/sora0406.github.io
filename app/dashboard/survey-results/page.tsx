"use client"

import { useState, useMemo } from "react"
import { 
  BarChart3, Check, ChevronDown, Download, Filter, PlusCircle, Settings, X, BarChart, Activity 
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

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
  type: "organization" | "product"; // 新增類型
}

// 定義各區塊的分類
interface CategoryGroup {
  title: string;
  categories: string[];
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
  },
  {
    title: "能源使用",
    categories: ["能源使用"]
  }
];

// 產品碳足跡的欄位分組
const productGroups: CategoryGroup[] = [
  {
    title: "產品和驗證資訊",
    categories: ["產品資訊", "驗證資訊"]
  },
  {
    title: "碳足跡數據和生命週期",
    categories: ["碳足跡數據", "生命週期階段"]
  }
];

// 組織溫盤的欄位
const organizationFields = [
  { category: "基本資訊", field: "盤查期間" },
  { category: "基本資訊", field: "採用標準" },
  { category: "基本資訊", field: "邊界" },
  { category: "排放量資料", field: "總排放量" },
  { category: "排放量資料", field: "類別1排放量" },
  { category: "排放量資料", field: "類別2排放量" },
  { category: "排放量資料", field: "類別3排放量" },
  { category: "排放量資料", field: "類別4排放量" },
  { category: "排放量資料", field: "類別5排放量" },
  { category: "排放量資料", field: "類別6排放量" },
  { category: "能源使用", field: "電力" },
  { category: "能源使用", field: "蒸氣" },
  { category: "能源使用", field: "再生能源" },
  { category: "驗證資訊", field: "查證" },
  { category: "驗證資訊", field: "查證證書" }
];

// 產品碳足跡的欄位
const productFields = [
  { category: "產品資訊", field: "產品名稱" },
  { category: "產品資訊", field: "產品ID" },
  { category: "產品資訊", field: "系統邊界" },
  { category: "產品資訊", field: "宣告單位" },
  { category: "產品資訊", field: "報導期間" },
  { category: "產品資訊", field: "生命週期" },
  { category: "碳足跡數據", field: "產品碳足跡" },
  { category: "生命週期階段", field: "原(物)料取得" },
  { category: "生命週期階段", field: "產品製造" },
  { category: "生命週期階段", field: "銷售配送" },
  { category: "生命週期階段", field: "產品使用" },
  { category: "生命週期階段", field: "產品廢棄" },
  { category: "驗證資訊", field: "採用標準" },
  { category: "驗證資訊", field: "查證" },
  { category: "驗證資訊", field: "查證證書" }
];

// 模擬問卷回覆數據 - 組織溫盤
const organizationResponses: SurveyResponse[] = [
  {
    id: "1",
    surveyTitle: "企業碳排放評估問卷",
    supplierName: "台灣電子股份有限公司",
    respondentName: "王大明",
    respondentEmail: "wang@tw-electronics.com",
    completedDate: new Date("2023-10-18T14:35:22"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "5200.000 tCO2e",
        "類別1排放量": "1250.000 tCO2e",
        "類別2排放量": "3500.000 tCO2e",
        "類別3排放量": "350.000 tCO2e",
        "類別4排放量": "80.000 tCO2e",
        "類別5排放量": "15.000 tCO2e",
        "類別6排放量": "5.000 tCO2e"
      },
      "能源使用": {
        "電力": "7,500,000 度",
        "蒸氣": "2,200 噸",
        "再生能源": "500,000 度"
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
    supplierName: "綠能科技有限公司",
    respondentName: "李小華",
    respondentEmail: "lee@green-tech.com",
    completedDate: new Date("2023-09-25T10:22:15"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2022年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "股權比例法"
      },
      "排放量資料": {
        "總排放量": "3200.000 tCO2e",
        "類別1排放量": "850.000 tCO2e",
        "類別2排放量": "2100.000 tCO2e",
        "類別3排放量": "180.000 tCO2e",
        "類別4排放量": "45.000 tCO2e",
        "類別5排放量": "20.000 tCO2e",
        "類別6排放量": "5.000 tCO2e"
      },
      "能源使用": {
        "電力": "4,500,000 度",
        "蒸氣": "1,500 噸",
        "再生能源": "800,000 度"
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
    supplierName: "友好塑膠工業有限公司",
    respondentName: "張小方",
    respondentEmail: "chang@friendly-plastic.com",
    completedDate: new Date("2023-11-05T09:15:00"),
    type: "organization",
    answers: {
      "基本資訊": {
        "盤查期間": "2023年1月-12月",
        "採用標準": "ISO 14064-1:2018",
        "邊界": "營運控制權法"
      },
      "排放量資料": {
        "總排放量": "4800.000 tCO2e",
        "類別1排放量": "1500.000 tCO2e",
        "類別2排放量": "2800.000 tCO2e",
        "類別3排放量": "320.000 tCO2e",
        "類別4排放量": "120.000 tCO2e",
        "類別5排放量": "40.000 tCO2e",
        "類別6排放量": "20.000 tCO2e"
      },
      "能源使用": {
        "電力": "6,200,000 度",
        "蒸氣": "1,800 噸",
        "再生能源": "200,000 度"
      },
      "驗證資訊": {
        "查證": "是",
        "查證證書": "TUV-ISO14064-2023-003"
      }
    }
  }
];

// 模擬問卷回覆數據 - 產品碳足跡
const productResponses: SurveyResponse[] = [
  {
    id: "4",
    surveyTitle: "產品碳足跡資訊收集",
    supplierName: "台灣半導體科技股份有限公司",
    respondentName: "陳志明",
    respondentEmail: "chen@tw-semicon.com",
    completedDate: new Date("2023-08-15T16:42:30"),
    type: "product",
    answers: {
      "產品資訊": {
        "產品名稱": "高效能記憶體晶片",
        "產品ID": "MEM-2023-A1",
        "系統邊界": "搖籃到大門",
        "宣告單位": "1片 DRAM",
        "報導期間": "2022年",
        "生命週期": "10年"
      },
      "碳足跡數據": {
        "產品碳足跡": "2.5 kgCO2e/片"
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
    selected: false,
    type
  }));
};

export default function SurveyResultsPage() {
  // 狀態管理
  const [tabValue, setTabValue] = useState<"organization" | "product">("organization"); // 添加 tab 狀態
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [orgFields, setOrgFields] = useState<FieldInfo[]>(() => 
    extractAllFields(surveyResponsesData, "organization").map(field => ({
      ...field,
      selected: true // 預設所有欄位都選中
    }))
  );
  const [productFields, setProductFields] = useState<FieldInfo[]>(() => 
    extractAllFields(surveyResponsesData, "product").map(field => ({
      ...field,
      selected: true // 預設所有欄位都選中
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // 新增當前查看的資料區塊
  const [currentOrgBlockIndex, setCurrentOrgBlockIndex] = useState(0);
  const [currentProductBlockIndex, setCurrentProductBlockIndex] = useState(0);

  // 獲取當前顯示的區塊索引
  const currentBlockIndex = useMemo(() => {
    return tabValue === "organization" ? currentOrgBlockIndex : currentProductBlockIndex;
  }, [tabValue, currentOrgBlockIndex, currentProductBlockIndex]);
  
  // 取得當前的欄位集合
  const allFields = useMemo(() => {
    return tabValue === "organization" ? orgFields : productFields;
  }, [tabValue, orgFields, productFields]);
  
  // 基本欄位選擇狀態
  const [showSupplier, setShowSupplier] = useState(true);
  const [showRespondent, setShowRespondent] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  
  // 根據當前 tab 和搜索詞過濾回覆
  const filteredResponses = useMemo(() => {
    const typeResponses = surveyResponsesData.filter(response => response.type === tabValue);
    
    if (!searchTerm.trim()) return typeResponses;
    
    return typeResponses.filter(response => {
      const searchLower = searchTerm.toLowerCase();
      return (
        response.surveyTitle.toLowerCase().includes(searchLower) ||
        response.supplierName.toLowerCase().includes(searchLower) ||
        response.respondentName.toLowerCase().includes(searchLower) ||
        response.respondentEmail.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, tabValue]);
  
  // 根據類別過濾欄位
  const filteredFields = useMemo(() => {
    if (selectedCategory === "all") return allFields;
    return allFields.filter(field => field.category === selectedCategory);
  }, [allFields, selectedCategory]);
  
  // 獲取當前類型的區塊分組
  const currentGroups = useMemo(() => {
    return tabValue === "organization" ? organizationGroups : productGroups;
  }, [tabValue]);
  
  // 按區塊分組欄位
  const fieldsByGroup = useMemo(() => {
    const groups = tabValue === "organization" ? organizationGroups : productGroups;
    return groups.reduce<Record<string, FieldInfo[]>>((acc, group) => {
      acc[group.title] = allFields.filter(field => group.categories.includes(field.category));
      return acc;
    }, {});
  }, [allFields, tabValue]);
  
  // 獲取所有類別
  const categories = useMemo(() => {
    return Array.from(new Set(allFields.map(field => field.category)));
  }, [allFields]);
  
  // 處理欄位選擇
  const toggleField = (fieldId: string) => {
    if (tabValue === "organization") {
      setOrgFields(prev => 
        prev.map(field => 
          field.id === fieldId 
            ? { ...field, selected: !field.selected } 
            : field
        )
      );
    } else {
      setProductFields(prev => 
        prev.map(field => 
          field.id === fieldId 
            ? { ...field, selected: !field.selected } 
            : field
        )
      );
    }
  };
  
  // 全選/取消全選當前類別的欄位
  const toggleAllFields = (selected: boolean) => {
    if (tabValue === "organization") {
      setOrgFields(prev => 
        prev.map(field => 
          selectedCategory === "all" || field.category === selectedCategory
            ? { ...field, selected } 
            : field
        )
      );
    } else {
      setProductFields(prev => 
        prev.map(field => 
          selectedCategory === "all" || field.category === selectedCategory
            ? { ...field, selected } 
            : field
        )
      );
    }
  };
  
  // 目前選中的欄位
  const selectedFieldsInfo = useMemo(() => {
    return allFields.filter(field => field.selected);
  }, [allFields]);
  
  // 生成 CSV 數據
  const generateCSV = () => {
    // 實作CSV匯出功能
    console.log("匯出CSV", tabValue);
  };

  // 處理標籤頁切換
  const handleTabChange = (value: string) => {
    setTabValue(value as "organization" | "product");
    setSelectedCategory("all");
  };

  // 處理區塊切換
  const handleBlockChange = (index: number) => {
    if (tabValue === "organization") {
      setCurrentOrgBlockIndex(index);
    } else {
      setCurrentProductBlockIndex(index);
    }
  };
  
  // 模擬打開原始問卷的函數
  const viewOriginalSurvey = (responseId: string) => {
    console.log(`查看問卷 ID: ${responseId}`);
    // 實際實現可能需要導航到問卷詳情頁面
    // router.push(`/dashboard/surveys/responses/${responseId}`);
  };

  // 計算總碳足跡和總排放量
  const totalStats = useMemo(() => {
    // 計算組織溫盤總排放量
    const orgTotalEmission = organizationResponses.reduce((total, response) => {
      const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
      const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
      return total + emission;
    }, 0);

    // 計算產品碳足跡總量
    const productTotalFootprint = productResponses.reduce((total, response) => {
      const footprintStr = response.answers["碳足跡數據"]?.["產品碳足跡"] || "0";
      const footprintParts = footprintStr.split(" ");
      const footprint = parseFloat(footprintParts[0]) || 0;
      const unit = footprintParts[1] || "kgCO2e";
      return total + footprint;
    }, 0);

    return {
      orgTotalEmission: orgTotalEmission.toFixed(2),
      productTotalFootprint: productTotalFootprint.toFixed(2),
      orgCount: organizationResponses.length,
      productCount: productResponses.length
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Topbar - 加入RWD響應式設計 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">問卷分析</h1>
          <p className="text-sm text-muted-foreground">
            檢視所有已回覆的問卷結果並進行自訂分析
          </p>
        </div>
        <Button onClick={generateCSV} className="whitespace-nowrap self-start sm:self-auto">
          <Download className="mr-2 h-4 w-4" />
          匯出CSV
        </Button>
      </div>
      
      {/* 統計摘要區塊 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={`bg-gradient-to-br from-blue-50 to-blue-100 border-blue-150 ${tabValue === 'organization' ? 'ring-2 ring-blue-300' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-800 flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              組織溫室氣體總排放量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-bold text-blue-900">
                  {totalStats.orgTotalEmission} <span className="text-lg">tCO2e</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">來自 {totalStats.orgCount} 家供應商</p>
              </div>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-200/50"
                onClick={() => setTabValue("organization")}>
                查看詳情
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`bg-gradient-to-br from-green-50 to-green-100 border-green-200 ${tabValue === 'product' ? 'ring-2 ring-green-300' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-800 flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              產品碳足跡總量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-3xl font-bold text-green-900">
                  {totalStats.productTotalFootprint} <span className="text-lg">kgCO2e</span>
                </div>
                <p className="text-sm text-green-700 mt-1">來自 {totalStats.productCount} 個產品</p>
              </div>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-200/50"
                onClick={() => setTabValue("product")}>
                查看詳情
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="organization" value={tabValue} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="organization">組織溫盤</TabsTrigger>
            <TabsTrigger value="product">產品碳足跡</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {tabValue === "organization" ? "組織溫室氣體盤查結果" : "產品碳足跡評估結果"}
          </CardTitle>
          <CardDescription>
            共有 {filteredResponses.length} 份問卷回覆
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 搜索與欄位選擇 - 改進RWD */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto sm:flex-1">
                <Input
                  placeholder="搜索問卷或供應商..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:max-w-xs"
                />
              </div>
              
              <div className="flex items-center gap-2 self-start">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2 whitespace-nowrap">
                      <Settings className="h-4 w-4" />
                      顯示欄位
                      {selectedFieldsInfo.length > 0 && (
                        <Badge>{selectedFieldsInfo.length}</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] md:w-96 p-0" align="end">
                    <div className="p-4 border-b">
                      <div className="font-medium">欄位設定</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        選擇您想要在表格中顯示的欄位
                      </div>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="show-supplier" 
                            checked={showSupplier} 
                            onCheckedChange={(checked) => setShowSupplier(!!checked)}
                          />
                          <Label htmlFor="show-supplier">供應商</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="show-respondent" 
                            checked={showRespondent} 
                            onCheckedChange={(checked) => setShowRespondent(!!checked)}
                          />
                          <Label htmlFor="show-respondent">填寫人</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="show-date" 
                            checked={showDate} 
                            onCheckedChange={(checked) => setShowDate(!!checked)}
                          />
                          <Label htmlFor="show-date">日期</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="show-survey" 
                            checked={showSurvey} 
                            onCheckedChange={(checked) => setShowSurvey(!!checked)}
                          />
                          <Label htmlFor="show-survey">問卷</Label>
                        </div>
                      </div>
                    </div>
                    
                    {/* 修改欄位設定，按群組顯示 */}
                    <Tabs defaultValue={currentGroups[0].title} className="w-full">
                      <div className="px-4 pt-4">
                        <TabsList className="mb-2 overflow-x-auto w-full flex items-center">
                          {currentGroups.map(group => (
                            <TabsTrigger key={group.title} value={group.title} className="flex-shrink-0">
                              {group.title}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        <div className="flex items-center gap-2 justify-end">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleAllFields(true)}
                          >
                            全選
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleAllFields(false)}
                          >
                            清除
                          </Button>
                        </div>
                      </div>
                      {currentGroups.map(group => (
                        <TabsContent key={group.title} value={group.title} className="m-0">
                          <ScrollArea className="h-72">
                            <div className="px-4 py-2 space-y-4">
                              {allFields
                                .filter(field => group.categories.includes(field.category))
                                .map((fieldInfo) => (
                                  <div key={fieldInfo.id} className="flex items-center gap-2">
                                    <Checkbox 
                                      id={fieldInfo.id} 
                                      checked={fieldInfo.selected} 
                                      onCheckedChange={() => toggleField(fieldInfo.id)}
                                    />
                                    <Label htmlFor={fieldInfo.id} className="flex-1 cursor-pointer">
                                      <span className="text-xs text-muted-foreground mr-2">
                                        [{fieldInfo.category}]
                                      </span>
                                      {fieldInfo.field}
                                    </Label>
                                  </div>
                                ))
                              }
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* 資料區塊選擇區 */}
            <div className="mt-6">
              <Tabs 
                defaultValue={currentGroups[0].title} 
                value={currentGroups[currentBlockIndex].title}
                onValueChange={(value) => {
                  const newIndex = currentGroups.findIndex(group => group.title === value);
                  if (newIndex !== -1) handleBlockChange(newIndex);
                }}
                className="w-full"
              >
                <TabsList className="w-full flex justify-start mb-4 overflow-x-auto p-1 bg-muted rounded-lg">
                  {currentGroups.map((group, index) => (
                    <TabsTrigger 
                      key={group.title} 
                      value={group.title}
                      className="px-4 py-2 flex-shrink-0 font-medium"
                    >
                      {group.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {currentGroups.map((group, groupIndex) => {
                  const groupFields = fieldsByGroup[group.title].filter(field => field.selected);
                  
                  return (
                    <TabsContent 
                      key={group.title} 
                      value={group.title} 
                      className="m-0 space-y-4"
                    >
                      {groupFields.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground border rounded-md">
                          尚未選擇此區塊的顯示欄位
                        </div>
                      ) : (
                        <div className="overflow-hidden rounded-md border">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  {/* 供應商識別資訊始終顯示 */}
                                  <TableHead className="sticky left-0 z-20 bg-background whitespace-nowrap">供應商名稱</TableHead>
                                  {showSurvey && <TableHead className="whitespace-nowrap">問卷名稱</TableHead>}
                                  {showRespondent && (
                                    <>
                                      <TableHead className="whitespace-nowrap">填寫人</TableHead>
                                      <TableHead className="whitespace-nowrap">填寫人Email</TableHead>
                                    </>
                                  )}
                                  
                                  {/* 欄位資料 */}
                                  {groupFields.map((fieldInfo) => (
                                    <TableHead key={fieldInfo.id} className="whitespace-nowrap">
                                      <div className="flex flex-col">
                                        <span className="text-xs font-normal text-muted-foreground">
                                          {fieldInfo.category}
                                        </span>
                                        <span>{fieldInfo.field}</span>
                                      </div>
                                    </TableHead>
                                  ))}
                                  
                                  {showDate && <TableHead className="whitespace-nowrap">更新時間</TableHead>}
                                  <TableHead className="whitespace-nowrap">操作</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredResponses.length === 0 ? (
                                  <TableRow>
                                    <TableCell colSpan={100} className="text-center h-32">
                                      沒有找到符合條件的問卷回覆
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  filteredResponses.map((response) => (
                                    <TableRow key={response.id}>
                                      {/* 供應商識別資訊始終顯示 */}
                                      <TableCell className="sticky left-0 z-20 bg-background font-medium whitespace-nowrap">
                                        {response.supplierName}
                                      </TableCell>
                                      {showSurvey && (
                                        <TableCell className="whitespace-nowrap">
                                          {response.surveyTitle}
                                        </TableCell>
                                      )}
                                      {showRespondent && (
                                        <>
                                          <TableCell className="whitespace-nowrap">
                                            {response.respondentName}
                                          </TableCell>
                                          <TableCell className="whitespace-nowrap">
                                            {response.respondentEmail}
                                          </TableCell>
                                        </>
                                      )}
                                      
                                      {/* 欄位資料 */}
                                      {groupFields.map((fieldInfo) => (
                                        <TableCell key={fieldInfo.id} className="whitespace-nowrap">
                                          {response.answers[fieldInfo.category]?.[fieldInfo.field] || "-"}
                                        </TableCell>
                                      ))}
                                      
                                      {showDate && (
                                        <TableCell className="whitespace-nowrap">
                                          {format(response.completedDate, "yyyy-MM-dd HH:mm")}
                                        </TableCell>
                                      )}
                                      
                                      {/* 操作按鈕 */}
                                      <TableCell className="whitespace-nowrap">
                                        <Button 
                                          variant="ghost" 
                                          size="sm"
                                          onClick={() => viewOriginalSurvey(response.id)}
                                          className="hover:bg-primary/10"
                                        >
                                          <BarChart3 className="h-4 w-4 mr-1" />
                                          查看問卷
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 