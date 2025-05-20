"use client"

import { useState } from "react"
import { Download, Edit, Plus, Search, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Supplier {
  id: string;
  name: string;
  companyId: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  vehicleCount?: number;
  mergeRecords?: {
    sourceId: string;
    sourceName: string;
    boundary: string;
    importDate: string;
  }[];
}

// 添加外部供應商的介面定義
interface ExternalSupplier {
  id: string;
  name: string;
  companyId: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  category: string;
}

// 添加組織邊界供應商的介面定義 - 加在 ExternalSupplier 介面之後
interface OrganizationSupplier {
  id: string;
  name: string;
  originalName?: string; // 設為可選屬性
  contact: string;
  email: string;
  phone: string;
  address: string;
  boundary: string;
  category: string;
  similarTo: Array<{
    supplierId: string;
    supplierName: string;
    confidence: number;
  }>;
}

// 在 Supplier 接口下方添加 OrganizationBoundary 接口
interface OrganizationBoundary {
  id: string;
  name: string;
  description?: string;
}

// 模擬供應商數據
const initialSuppliers = [
  {
    id: "1",
    name: "新竹物流",
    companyId: "TW12345678",
    contact: "張小明",
    email: "contact@hct.com.tw",
    phone: "02-2216-5589",
    address: "新北市新莊區新北大道三段7號",
    country: "台灣",
    vehicleCount: 3800
  },
  {
    id: "2",
    name: "統一速達",
    companyId: "TW23456789",
    contact: "李大華",
    email: "info@t-cat.com.tw",
    phone: "02-2552-5525",
    address: "台北市大同區承德路三段210號",
    country: "台灣",
    vehicleCount: 2500
  },
  {
    id: "3",
    name: "宅配通",
    companyId: "TW34567890",
    contact: "王美麗",
    email: "contact@pelican.com.tw",
    phone: "02-2659-5511",
    address: "台北市南港區三重路66號",
    country: "台灣",
    vehicleCount: 2000
  },
  {
    id: "4",
    name: "長榮國際儲運",
    companyId: "TW45678901",
    contact: "林志明",
    email: "service@evergreen.com.tw",
    phone: "02-2500-1800",
    address: "台北市松山區民生東路三段135號",
    country: "台灣",
    vehicleCount: 1500
  },
  {
    id: "5",
    name: "台塑汽車貨運",
    companyId: "TW56789012",
    contact: "陳大同",
    email: "info@fpcc-logistics.com.tw",
    phone: "02-2718-6168",
    address: "台北市松山區敦化北路201號",
    country: "台灣",
    vehicleCount: 1200
  },
  {
    id: "6",
    name: "捷盛運輸",
    companyId: "TW67890123",
    contact: "黃小玲",
    email: "contact@js-transport.com.tw",
    phone: "03-3868-1288",
    address: "桃園市蘆竹區南崁路二段337號",
    country: "台灣",
    vehicleCount: 1000
  },
  {
    id: "7",
    name: "統昶行銷",
    companyId: "TW78901234",
    contact: "吳俊傑",
    email: "service@tonchang.com.tw",
    phone: "02-2269-5803",
    address: "新北市土城區中央路三段240號",
    country: "台灣",
    vehicleCount: 900
  },
  {
    id: "8",
    name: "捷盟行銷",
    companyId: "TW89012345",
    contact: "蔡佳玲",
    email: "info@jme.com.tw",
    phone: "02-2999-6788",
    address: "新北市新店區中正路516號",
    country: "台灣",
    vehicleCount: 800
  },
  {
    id: "9",
    name: "大智通文化行銷",
    companyId: "TW90123456",
    contact: "楊美玉",
    email: "contact@dachi.com.tw",
    phone: "02-2531-3000",
    address: "台北市中山區建國北路二段258號",
    country: "台灣",
    vehicleCount: 700
  },
  {
    id: "10",
    name: "中國貨櫃運輸",
    companyId: "TW01234567",
    contact: "周小明",
    email: "info@cmtlogistics.com.tw",
    phone: "02-2381-3456",
    address: "台北市中正區忠孝西路一段66號",
    country: "台灣",
    vehicleCount: 600
  },
  {
    id: "11",
    name: "捷迅",
    companyId: "TW10987654",
    contact: "李小華",
    email: "contact@jet-speed.com.tw",
    phone: "03-3932-333",
    address: "桃園市大園區三民路二段75號",
    country: "台灣",
    vehicleCount: 500
  },
  {
    id: "12",
    name: "裕國冷凍冷藏",
    companyId: "TW21098765",
    contact: "張志偉",
    email: "service@yukogroup.com.tw",
    phone: "02-2500-5500",
    address: "台北市南港區三重路19-3號",
    country: "台灣",
    vehicleCount: 400
  },
  {
    id: "13",
    name: "台灣航空貨運承攬",
    companyId: "TW32109876",
    contact: "王建國",
    email: "info@taiwanair-freight.com.tw",
    phone: "03-3931-3931",
    address: "桃園市大園區航勤北路3號",
    country: "台灣",
    vehicleCount: 300
  },
  {
    id: "14",
    name: "好好國際物流",
    companyId: "TW43210987",
    contact: "林美珠",
    email: "contact@goodgood-logistics.com.tw",
    phone: "02-2658-5858",
    address: "台北市大安區復興南路一段137號",
    country: "台灣",
    vehicleCount: 200
  },
]

// 模擬外部供應商數據庫
const externalSuppliers = [
  {
    id: "ext1",
    name: "高科技電子有限公司",
    companyId: "TW45678901",
    contact: "陳志明",
    email: "contact@hitechelectronics.com",
    phone: "02-8765-4321",
    address: "台北市內湖區內湖路一段123號",
    country: "台灣",
    category: "電子製造",
  },
  {
    id: "ext2",
    name: "環保材料股份有限公司",
    companyId: "TW56789012",
    contact: "林小華",
    email: "info@ecomaterials.com",
    phone: "03-5555-6666",
    address: "桃園市中壢區中央西路300號",
    country: "台灣",
    category: "材料製造",
  },
  {
    id: "ext3",
    name: "智慧科技工業有限公司",
    companyId: "TW67890123",
    contact: "黃大明",
    email: "contact@smarttechindustry.com",
    phone: "04-7777-8888",
    address: "台中市南屯區工業區二路456號",
    country: "台灣",
    category: "智慧製造",
  },
  {
    id: "ext4",
    name: "新創能源科技股份有限公司",
    companyId: "TW78901234",
    contact: "吳小芳",
    email: "info@newenergytech.com",
    phone: "07-9999-0000",
    address: "高雄市前鎮區前鎮路789號",
    country: "台灣",
    category: "能源科技",
  },
  {
    id: "ext5",
    name: "雲端數據系統有限公司",
    companyId: "TW89012345",
    contact: "趙明德",
    email: "contact@clouddatasystems.com",
    phone: "02-2222-1111",
    address: "台北市松山區松山路567號",
    country: "台灣",
    category: "資訊科技",
  },
  {
    id: "ext6",
    name: "生物科技研發股份有限公司",
    companyId: "TW90123456",
    contact: "周小玲",
    email: "info@biotechrd.com",
    phone: "06-3333-4444",
    address: "台南市安南區安南路234號",
    country: "台灣",
    category: "生物科技",
  },
  {
    id: "ext7",
    name: "精密機械工業有限公司",
    companyId: "TW01234567",
    contact: "劉大偉",
    email: "contact@precisionmachinery.com",
    phone: "04-5555-6666",
    address: "台中市大里區大里路345號",
    country: "台灣",
    category: "機械製造",
  },
  {
    id: "ext8",
    name: "創新醫療器材股份有限公司",
    companyId: "TW12340987",
    contact: "張美玉",
    email: "info@innovativemedical.com",
    phone: "03-7777-8888",
    address: "新竹市東區光復路一段678號",
    country: "台灣",
    category: "醫療器材",
  },
]

// 供應商類別
const supplierCategories = [
  "全部",
  "電子製造",
  "材料製造",
  "智慧製造",
  "能源科技",
  "資訊科技",
  "生物科技",
  "機械製造",
  "醫療器材",
]

// 在 const SuppliersPage 函數開始前添加以下模擬數據
const organizationBoundaries: OrganizationBoundary[] = [
  { id: "boundary1", name: "台灣子公司" },
  { id: "boundary2", name: "中國製造基地" },
  { id: "boundary3", name: "美國分公司" },
  { id: "boundary4", name: "歐盟事業部" }
];

// 擴展外部供應商數據，添加邊界資訊
const allOrganizationSuppliers = [
  // 總部邊界
  {
    id: "org1",
    name: "台灣電子股份有限公司",
    originalName: "台灣 Electronics Co., Ltd.",
    contact: "陳志明",
    email: "contact@taiwanelectronics.com",
    phone: "02-8765-4321",
    address: "台北市信義區信義路五段7號",
    boundary: "總部",
    category: "電子製造",
    similarTo: [] // 用於記錄與現有供應商的關聯
  },
  {
    id: "org2",
    name: "綠能科技有限公司",
    originalName: "Green Technology Co., Ltd.",
    contact: "林小華",
    email: "info@greentechltd.com",
    phone: "03-5555-6666",
    address: "桃園市中壢區中央西路300號",
    boundary: "總部",
    category: "能源科技",
    similarTo: []
  },
  // 研發中心邊界
  {
    id: "org3",
    name: "創新電子研發有限公司",
    originalName: "Innovative Electronics R&D Co., Ltd.",
    contact: "王大明",
    email: "contact@innovativeelec.com",
    phone: "03-1234-5678",
    address: "新竹科學園區展業一路2號",
    boundary: "研發中心",
    category: "電子製造",
    similarTo: []
  },
  {
    id: "org4",
    name: "半導體技術股份有限公司",
    originalName: "Semiconductor Tech Co., Ltd.",
    contact: "李小龍",
    email: "info@semicon-tech.com",
    phone: "03-2345-6789",
    address: "新竹科學園區力行三路10號",
    boundary: "研發中心",
    category: "電子製造",
    similarTo: []
  },
  // 製造廠區邊界
  {
    id: "org5",
    name: "精密機械工業股份有限公司",
    originalName: "Precision Machinery Industry Co., Ltd.",
    contact: "張大鵬",
    email: "contact@precision-machine.com",
    phone: "04-8765-4321",
    address: "台中市大雅區中清路200號",
    boundary: "製造廠區",
    category: "機械製造",
    similarTo: []
  },
  {
    id: "org6",
    name: "先進材料製造有限公司",
    originalName: "Advanced Materials Manufacturing Co.",
    contact: "林美玲",
    email: "info@advancedmaterials.com",
    phone: "04-7654-3210",
    address: "台中市大里區工業區五路8號",
    boundary: "製造廠區",
    category: "材料製造",
    similarTo: []
  },
  // 物流中心邊界
  {
    id: "org7",
    name: "全球運輸物流股份有限公司",
    originalName: "Global Transport Logistics Co.",
    contact: "陳小美",
    email: "contact@global-logistics.com",
    phone: "03-9876-5432",
    address: "桃園市大園區航站南路1號",
    boundary: "物流中心",
    category: "物流服務",
    similarTo: []
  },
  {
    id: "org8",
    name: "速達快遞服務有限公司",
    originalName: "Speed Express Service Co., Ltd.",
    contact: "王小華",
    email: "info@speed-express.com",
    phone: "02-3456-7890",
    address: "新北市新莊區化成路10號",
    boundary: "物流中心",
    category: "物流服務",
    similarTo: []
  },
  // 銷售據點邊界
  {
    id: "org9",
    name: "數位科技銷售股份有限公司",
    originalName: "Digital Tech Sales Co.",
    contact: "李大同",
    email: "contact@digital-sales.com",
    phone: "02-2345-6789",
    address: "台北市大安區忠孝東路四段100號",
    boundary: "銷售據點",
    category: "資訊科技",
    similarTo: []
  },
  {
    id: "org10",
    name: "智慧解決方案有限公司",
    originalName: "Smart Solutions Co., Ltd.",
    contact: "張小玲",
    email: "info@smartsolutions.com",
    phone: "07-1234-5678",
    address: "高雄市前鎮區中山路100號",
    boundary: "銷售據點",
    category: "智慧製造",
    similarTo: []
  },
  // 重複/相似的供應商 - 用於測試整併功能
  {
    id: "org11",
    name: "台灣電子科技",
    originalName: "台灣 Electronics Technology",
    contact: "林大明",
    email: "contact@taiwanelectronics-tech.com",
    phone: "02-2222-3333",
    address: "台北市內湖區內湖路一段88號",
    boundary: "製造廠區",
    category: "電子製造",
    similarTo: []
  },
  {
    id: "org12",
    name: "綠能科技",
    originalName: "Green Tech",
    contact: "王小明",
    email: "info@greentech.com",
    phone: "04-5555-6666",
    address: "台中市西屯區科技路20號",
    boundary: "研發中心",
    category: "能源科技",
    similarTo: []
  }
];

// 模擬組織邊界供應商數據
const mockOrgSuppliers: OrganizationSupplier[] = [
  {
    id: "org1",
    name: "台灣電子科技股份有限公司",
    contact: "王小明",
    email: "wang@台灣-tech.com",
    phone: "02-1234-5678",
    address: "台北市內湖區科技路100號",
    boundary: "boundary1",
    category: "製造商",
    similarTo: []
  },
  {
    id: "org2",
    name: "大中華電子有限公司",
    contact: "張大同",
    email: "zhang@greatertw.com",
    phone: "0755-8765-4321",
    address: "深圳市南山區科技園路88號",
    boundary: "boundary2",
    category: "製造商",
    similarTo: []
  },
  {
    id: "org3",
    name: "美國先進材料公司",
    contact: "John Smith",
    email: "john@usadvmat.com",
    phone: "+1-408-555-1234",
    address: "1234 Innovation Dr, San Jose, CA 95110",
    boundary: "boundary3",
    category: "原料供應商",
    similarTo: []
  },
  {
    id: "org4",
    name: "歐洲包裝解決方案",
    contact: "Hans Mueller",
    email: "hans@eupack.eu",
    phone: "+49-30-12345678",
    address: "Industriestraße 10, 10115 Berlin, Germany",
    boundary: "boundary4",
    category: "包裝商",
    similarTo: []
  },
  {
    id: "org5",
    name: "台灣物流運輸有限公司",
    contact: "李小華",
    email: "li@twlogistics.com",
    phone: "03-9876-5432",
    address: "桃園市大園區航空城路200號",
    boundary: "boundary1",
    category: "物流服務",
    similarTo: []
  },
  {
    id: "org6",
    name: "台灣電子科技（OEM部門）",
    contact: "王小明",
    email: "wang.oem@台灣-tech.com",
    phone: "02-1234-5679",
    address: "台北市內湖區科技路100號",
    boundary: "boundary1",
    category: "製造商",
    similarTo: []
  }
];

// 添加一個接口用於翻譯文本
interface TranslationProps {
  t?: (key: string, params?: Record<string, string | number>) => string;
}

// 修改 SuppliersPage 組件，接受翻譯參數
export function SuppliersPage({ t }: TranslationProps = {}) {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: "",
    name: "",
    companyId: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    vehicleCount: 0
  });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExternalSuppliers, setSelectedExternalSuppliers] = useState<ExternalSupplier[]>([]);
  
  // 添加新的狀態變量
  const [importStep, setImportStep] = useState(1);
  const [selectedBoundary, setSelectedBoundary] = useState("all");
  const [selectedOrgSuppliers, setSelectedOrgSuppliers] = useState<OrganizationSupplier[]>([]);
  const [orgSupplierSearchTerm, setOrgSupplierSearchTerm] = useState("");
  const [supplierMergeMap, setSupplierMergeMap] = useState<Record<string, string>>({});
  
  // 批次合併相關狀態
  const [selectedSuppliersForBatch, setSelectedSuppliersForBatch] = useState<string[]>([]);
  const [batchMergeTarget, setBatchMergeTarget] = useState<string>("");

  // 在這裡使用 mockOrgSuppliers 作為可用數據來源
  const allOrganizationSuppliers = mockOrgSuppliers;

  // 過濾供應商
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // 過濾外部供應商
  const filteredExternalSuppliers = externalSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "全部" || supplier.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // 過濾組織邊界供應商
  const filteredOrgSuppliers = allOrganizationSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(orgSupplierSearchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(orgSupplierSearchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(orgSupplierSearchTerm.toLowerCase())

    const matchesBoundary = selectedBoundary === "all" || supplier.boundary === selectedBoundary
    const matchesCategory = selectedCategory === "all" || supplier.category === selectedCategory

    return matchesSearch && matchesBoundary && matchesCategory
  })

  // 處理文本翻譯的函數
  const translate = (key: string, defaultText: string, params?: Record<string, string | number>) => {
    if (t) {
      try {
        return t(key, params);
      } catch (error) {
        console.warn(`Missing translation for key: ${key}`);
        return defaultText;
      }
    }
    return defaultText;
  };

  // 處理添加供應商
  const handleAddSupplier = () => {
    // 實現添加供應商的邏輯
    console.log("添加供應商:", newSupplier);
    
    // 創建一個新的供應商物件，自動生成ID
    const id = (suppliers.length + 1).toString();
    const supplierToAdd = { ...newSupplier, id };
    
    // 更新供應商列表
    setSuppliers([...suppliers, supplierToAdd]);
    
    // 重置表單和關閉對話框
    setNewSupplier({
      id: "",
      name: "",
      companyId: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      vehicleCount: 0
    });
    setIsAddDialogOpen(false);
  };

  // 處理編輯供應商
  const handleEditSupplier = () => {
    if (currentSupplier) {
      // 找到要更新的供應商索引
      const index = suppliers.findIndex(s => s.id === currentSupplier.id);
      
      if (index !== -1) {
        // 創建新的供應商列表，替換編輯的供應商
        const updatedSuppliers = [...suppliers];
        updatedSuppliers[index] = currentSupplier;
        
        // 更新狀態
        setSuppliers(updatedSuppliers);
        setIsEditDialogOpen(false);
        setCurrentSupplier(null);
      }
    }
  };

  // 處理刪除供應商
  const handleDeleteSupplier = (id: string) => {
    // 過濾掉要刪除的供應商
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    setIsDeleteDialogOpen(false);
  };

  // 選擇或取消選擇外部供應商
  const toggleExternalSupplier = (supplier: ExternalSupplier) => {
    const isSelected = selectedExternalSuppliers.some(s => s.id === supplier.id)
    if (isSelected) {
      setSelectedExternalSuppliers(selectedExternalSuppliers.filter(s => s.id !== supplier.id))
    } else {
      setSelectedExternalSuppliers([...selectedExternalSuppliers, supplier])
    }
  }

  // 選擇或取消選擇組織邊界供應商
  const toggleOrgSupplier = (supplier: OrganizationSupplier) => {
    const isSelected = selectedOrgSuppliers.some(s => s.id === supplier.id)
    if (isSelected) {
      setSelectedOrgSuppliers(selectedOrgSuppliers.filter(s => s.id !== supplier.id))
      
      // 如果取消選擇，也從合併映射中移除
      const updatedMergeMap = { ...supplierMergeMap }
      delete updatedMergeMap[supplier.id]
      setSupplierMergeMap(updatedMergeMap)
    } else {
      setSelectedOrgSuppliers([...selectedOrgSuppliers, supplier])
      
      // 自動尋找相似的供應商
      const similarSuppliers = findSimilarSuppliers(supplier)
      
      // 如果找到相似的供應商，更新 supplier.similarTo
      const updatedSupplier = { 
        ...supplier, 
        similarTo: similarSuppliers.map(s => ({
          supplierId: s.id,
          supplierName: s.name,
          confidence: calculateSimilarity(supplier.name, s.name)
        }))
      }
      
      // 更新選定的供應商列表
      setSelectedOrgSuppliers(prev => 
        [...prev.filter(s => s.id !== supplier.id), updatedSupplier]
      )
      
      // 如果有高度相似的供應商，建議合併
      if (similarSuppliers.length > 0) {
        // 找到最相似的供應商
        const mostSimilar = similarSuppliers.sort((a, b) => 
          calculateSimilarity(supplier.name, b.name) - calculateSimilarity(supplier.name, a.name)
        )[0]
        
        // 更新合併映射
        setSupplierMergeMap({
          ...supplierMergeMap,
          [supplier.id]: mostSimilar.id
        })
      } else {
        // 如果沒有相似的供應商，標記為新供應商
        setSupplierMergeMap({
          ...supplierMergeMap,
          [supplier.id]: "new"
        })
      }
    }
  }
  
  // 尋找相似的供應商
  const findSimilarSuppliers = (supplier: OrganizationSupplier) => {
    return suppliers.filter(existingSupplier => {
      // 計算名稱相似度 (簡單實現，實際應使用更複雜的算法)
      const similarity = calculateSimilarity(supplier.name, existingSupplier.name)
      return similarity > 0.5 // 相似度閾值
    })
  }
  
  // 計算字符串相似度 (基本實現，可以用更複雜的算法如萊文斯坦距離)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase()
    const s2 = str2.toLowerCase()
    
    // 如果一個是另一個的子字符串，給予高相似度
    if (s1.includes(s2) || s2.includes(s1)) {
      return 0.8
    }
    
    // 計算共同字符
    let commonChars = 0
    for (const char of s1) {
      if (s2.includes(char)) {
        commonChars++
      }
    }
    
    // 返回相似度分數 (0-1)
    return commonChars / Math.max(s1.length, s2.length)
  }
  
  // 更新供應商合併映射
  const updateSupplierMerge = (orgSupplierId: string, targetSupplierId: string) => {
    setSupplierMergeMap({
      ...supplierMergeMap,
      [orgSupplierId]: targetSupplierId
    })
  }
  
  // 選擇/取消選擇供應商進行批次合併
  const toggleSupplierForBatch = (supplierId: string) => {
    if (selectedSuppliersForBatch.includes(supplierId)) {
      setSelectedSuppliersForBatch(selectedSuppliersForBatch.filter(id => id !== supplierId))
    } else {
      setSelectedSuppliersForBatch([...selectedSuppliersForBatch, supplierId])
    }
  }
  
  // 批次合併供應商到指定目標
  const applyBatchMerge = () => {
    if (!batchMergeTarget || selectedSuppliersForBatch.length === 0) {
      toast({
        title: "錯誤",
        description: "請選擇批次操作目標和至少一個要處理的供應商",
        variant: "destructive",
      })
      return
    }
    
    // 更新所有選中供應商的合併映射
    const updatedMergeMap = { ...supplierMergeMap }
    selectedSuppliersForBatch.forEach(supplierId => {
      updatedMergeMap[supplierId] = batchMergeTarget
    })
    
    setSupplierMergeMap(updatedMergeMap)
    
    const operationType = batchMergeTarget === "new" ? "創建為新供應商" : "合併到同一目標供應商"
    toast({
      title: "成功",
      description: `已將 ${selectedSuppliersForBatch.length} 個供應商設定為${operationType}`,
    })
    
    // 重置批次合併選擇
    setSelectedSuppliersForBatch([])
    setBatchMergeTarget("")
  }
  
  // 進入下一步
  const handleNextStep = () => {
    if (importStep === 1) {
      if (selectedOrgSuppliers.length === 0) {
        toast({
          title: "警告",
          description: "請至少選擇一個供應商",
          variant: "destructive",
        })
        return
      }
      
      // 為所有選定的供應商初始化合併映射
      const initialMergeMap: Record<string, string> = {}
      selectedOrgSuppliers.forEach(supplier => {
        // 檢查是否有相似的供應商
        const similarSuppliers = findSimilarSuppliers(supplier)
        if (similarSuppliers.length > 0) {
          // 找到最相似的供應商
          const mostSimilar = similarSuppliers.sort((a, b) => 
            calculateSimilarity(supplier.name, b.name) - calculateSimilarity(supplier.name, a.name)
          )[0]
          initialMergeMap[supplier.id] = mostSimilar.id
        } else {
          initialMergeMap[supplier.id] = "new"
        }
      })
      
      setSupplierMergeMap(initialMergeMap)
      setImportStep(2)
    } else if (importStep === 2) {
      // 執行實際的導入操作
      handleImportOrgSuppliers()
    }
  }
  
  // 返回上一步
  const handlePreviousStep = () => {
    setImportStep(1)
  }
  
  // 導入組織邊界供應商
  const handleImportOrgSuppliers = () => {
    // 檢查是否有重複的供應商
    const duplicateSuppliers = selectedOrgSuppliers.filter(orgSupplier => 
      suppliers.some(supplier => supplier.email === orgSupplier.email)
    )

    if (duplicateSuppliers.length > 0 && Object.values(supplierMergeMap).includes("new")) {
      const duplicateNames = duplicateSuppliers.map(s => s.name).join(", ")
      toast({
        title: "警告",
        description: `以下供應商可能重複：${duplicateNames}，請在整併步驟中處理`,
        variant: "destructive",
      })
      return
    }

    // 處理供應商導入
    const newSuppliersMap: Record<string, Supplier> = {}
    const updatedSuppliers = [...suppliers]
    const currentDate = new Date().toISOString().split('T')[0] // 取得當前日期 YYYY-MM-DD
    
    // 處理合併映射
    Object.entries(supplierMergeMap).forEach(([orgSupplierId, targetSupplierId]) => {
      const orgSupplier = selectedOrgSuppliers.find(s => s.id === orgSupplierId)
      if (!orgSupplier) return
      
      // 找到對應的邊界名稱
      const boundaryName = organizationBoundaries.find(b => b.id === orgSupplier.boundary)?.name || orgSupplier.boundary
      
      if (targetSupplierId === "new") {
        // 創建新供應商
        const newSupplierId = `imp${Date.now()}-${orgSupplier.id}`
        const newCompanyId = `TW${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`
        
        const newSupplier: Supplier = {
          id: newSupplierId,
          name: orgSupplier.name,
          companyId: newCompanyId,
          contact: orgSupplier.contact,
          email: orgSupplier.email,
          phone: orgSupplier.phone,
          address: orgSupplier.address,
          country: "台灣", // 默認值
          vehicleCount: 0,
          mergeRecords: [], // 新供應商沒有合併記錄
        }
        
        newSuppliersMap[orgSupplierId] = newSupplier
        updatedSuppliers.push(newSupplier)
      } else {
        // 合併到現有供應商
        const existingSupplierIndex = updatedSuppliers.findIndex(s => s.id === targetSupplierId)
        if (existingSupplierIndex !== -1) {
          // 創建合併記錄
          const mergeRecord = {
            sourceId: orgSupplier.id,
            sourceName: orgSupplier.name,
            boundary: boundaryName,
            importDate: currentDate
          }
          
          // 更新現有供應商的合併記錄
          const existingSupplier = updatedSuppliers[existingSupplierIndex]
          const updatedSupplier = {
            ...existingSupplier,
            mergeRecords: [
              ...(existingSupplier.mergeRecords || []),
              mergeRecord
            ]
          }
          
          updatedSuppliers[existingSupplierIndex] = updatedSupplier
          console.log(`供應商 ${orgSupplier.name} 合併到 ID 為 ${targetSupplierId} 的現有供應商，並添加合併記錄`)
        }
      }
    })
    
    // 更新供應商列表
    setSuppliers(updatedSuppliers)
    
    // 重置狀態
    setSelectedOrgSuppliers([])
    setSupplierMergeMap({})
    setImportStep(1)
    setIsImportDialogOpen(false)

    toast({
      title: "成功",
      description: `已導入 ${Object.keys(newSuppliersMap).length} 個新供應商，合併 ${
        selectedOrgSuppliers.length - Object.keys(newSuppliersMap).length
      } 個供應商到現有記錄`,
    })
  }

  return (
    <TooltipProvider>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-xl font-bold tracking-tight">{translate('title', '供應商管理')}</h2>
            <p className="text-sm text-muted-foreground">
              {translate('manageSuppliersDescription', '管理您的供應商信息和數據收集流程')}
                        </p>
                      </div>
                          <div className="flex gap-2">
            <Button variant="css-primary" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
              {translate('addSupplier', '添加供應商')}
              </Button>
            <Button variant="css-secondary" onClick={() => setIsImportDialogOpen(true)}>
                <Download className="mr-2 h-4 w-4" />
              {translate('importSuppliers', '導入供應商')}
                </Button>
        </div>
      </div>

      <div className="mb-2 mx-2 mt-4 flex items-center ">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            placeholder={translate('searchSuppliers', '搜索供應商...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
 
          <div className="border border-[#C4C4C4] rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translate('company_name', '公司名稱')}</TableHead>
                  <TableHead>{translate('country', '國家')}</TableHead>
                  <TableHead>{translate('contact', '聯絡人')}</TableHead>
                  <TableHead>{translate('email', '電子郵件')}</TableHead>
                  <TableHead>{translate('phone', '電話')}</TableHead>
                  <TableHead>{translate('vehicle_count', '車輛數量')}</TableHead>
                  <TableHead className="text-right">{translate('action', '操作')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      {translate('no_supplier', '沒有找到供應商')}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSuppliers.map((supplier) => (
                    <TableRow key={supplier.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{supplier.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{supplier.companyId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{supplier.country}</TableCell>
                      <TableCell>{supplier.contact}</TableCell>
                      <TableCell>{supplier.email}</TableCell>
                      <TableCell>{supplier.phone}</TableCell>
                      <TableCell>{supplier.vehicleCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Dialog>
                            <DialogTrigger asChild>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-1 border-[#3A81C5]/30">
                                      <div className="flex items-center justify-center">
                                      <Search className="h-3.5 w-3.5 text-[#3A81C5]" />
                                      <span className="sr-only">查看</span>
                                      </div>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>查看詳情</p>
                                  </TooltipContent>
                                </Tooltip>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle>供應商詳情</DialogTitle>
                                  <DialogDescription>查看供應商的詳細資訊和合併記錄</DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                  <div>
                                    <h3 className="text-lg font-medium mb-4">基本資訊</h3>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-sm text-muted-foreground">公司名稱</p>
                                        <div>
                                          <p className="font-medium">{supplier.name}</p>
                                          <p className="text-xs text-muted-foreground mt-1">{supplier.companyId}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">國家</p>
                                        <p>{supplier.country}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">聯絡人</p>
                                        <p>{supplier.contact}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">電子郵件</p>
                                        <p>{supplier.email}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">電話</p>
                                        <p>{supplier.phone}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-muted-foreground">地址</p>
                                        <p>{supplier.address}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-lg font-medium mb-4">合併記錄</h3>
                                    {!supplier.mergeRecords || supplier.mergeRecords.length === 0 ? (
                                      <p className="text-sm text-muted-foreground py-4">
                                        此供應商沒有合併記錄。
                                      </p>
                                    ) : (
                                      <ScrollArea className="h-[300px] border rounded-md">
                                        <div className="p-4 space-y-4">
                                          {supplier.mergeRecords.map((record, index) => (
                                            <div key={index} className="border-b pb-3 last:border-none">
                                              <div className="flex items-center justify-between">
                                                <h4 className="font-medium">{record.sourceName}</h4>
                                                <span className="text-xs text-muted-foreground">{record.importDate}</span>
                                              </div>
                                              <p className="text-sm mt-1">
                                                <span className="text-muted-foreground">來源 ID:</span> {record.sourceId}
                                              </p>
                                              <p className="text-sm mt-1">
                                                <span className="text-muted-foreground">來源邊界:</span> {record.boundary}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </ScrollArea>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {/* 合併記錄按鈕 */}
                            {supplier.mergeRecords && supplier.mergeRecords.length > 0 && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="text-xs bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700">
                                    合併記錄 ({supplier.mergeRecords.length})
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{supplier.name} 的合併記錄</DialogTitle>
                                    <DialogDescription>此供應商的所有合併記錄</DialogDescription>
                                  </DialogHeader>
                                  <ScrollArea className="h-[400px] border rounded-md mt-4">
                                    <div className="p-4 space-y-4">
                                      {supplier.mergeRecords.map((record, index) => (
                                        <div key={index} className="border p-3 rounded-md">
                                          <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-lg">{record.sourceName}</h4>
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                              {record.importDate}
                                            </Badge>
                                          </div>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                              <span className="text-muted-foreground">來源 ID:</span>
                                              <p className="font-medium">{record.sourceId}</p>
                                            </div>
                                            <div>
                                              <span className="text-muted-foreground">來源邊界:</span>
                                              <p className="font-medium">{record.boundary}</p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            )}

                            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                              <DialogTrigger asChild>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-1 border-[#3A81C5]/30" onClick={() => setCurrentSupplier(supplier)}>
                                      <div className="flex items-center justify-center">
                                <Edit className="h-3.5 w-3.5 text-[#3A81C5]" />
                                <span className="sr-only">編輯</span>
                                      </div>
                              </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>編輯</p>
                                  </TooltipContent>
                                </Tooltip>
                            </DialogTrigger>
                              {currentSupplier && (
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>編輯供應商</DialogTitle>
                                  <DialogDescription>更新供應商信息</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-name">公司名稱</Label>
                                    <Input
                                      id="edit-name"
                                        value={currentSupplier.name}
                                      onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-companyId">公司ID</Label>
                                      <Input
                                        id="edit-companyId"
                                        value={currentSupplier.companyId}
                                        onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                            companyId: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-country">國家</Label>
                                      <Input
                                        id="edit-country"
                                        value={currentSupplier.country}
                                        onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                            country: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-contact">聯絡人</Label>
                                    <Input
                                      id="edit-contact"
                                        value={currentSupplier.contact}
                                      onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                          contact: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-email">電子郵件</Label>
                                    <Input
                                      id="edit-email"
                                      type="email"
                                        value={currentSupplier.email}
                                      onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                          email: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-phone">電話</Label>
                                    <Input
                                      id="edit-phone"
                                        value={currentSupplier.phone}
                                      onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                          phone: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-address">地址</Label>
                                    <Input
                                      id="edit-address"
                                        value={currentSupplier.address}
                                      onChange={(e) =>
                                          setCurrentSupplier({
                                            ...currentSupplier,
                                          address: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    取消
                                  </Button>
                                  <Button onClick={handleEditSupplier}>保存</Button>
                                </DialogFooter>
                              </DialogContent>
                            )}
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-1 border-[#A32929]/30">
                                  <Trash2 className="h-3.5 w-3.5 text-[#A32929]" />
                                  <span className="sr-only">刪除</span>
                                </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>刪除</p>
                                  </TooltipContent>
                                </Tooltip>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>確認刪除</AlertDialogTitle>
                                <AlertDialogDescription>
                                  您確定要刪除供應商 "{supplier.name}" 嗎？此操作無法撤銷。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>取消</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteSupplier(supplier.id)}>
                                  刪除
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
 
    </div>
    </TooltipProvider>
  )
}

// 在檔案最後添加預設導出
export default SuppliersPage;
