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
    name: "台灣電子股份有限公司",
    companyId: "TW12345678",
    contact: "張小明",
    email: "contact@taiwanelectronics.com",
    phone: "02-1234-5678",
    address: "台北市信義區信義路五段7號",
    country: "Taiwan",
  },
  {
    id: "2",
    name: "綠能科技有限公司",
    companyId: "TW23456789",
    contact: "李大華",
    email: "info@greentechltd.com",
    phone: "03-9876-5432",
    address: "新竹科學園區研發路2號",
    country: "Taiwan",
  },
  {
    id: "3",
    name: "永續材料工業股份有限公司",
    companyId: "TW34567890",
    contact: "王美麗",
    email: "contact@sustainablematerials.com",
    phone: "04-2222-3333",
    address: "台中市西屯區工業區一路88號",
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    country: "Taiwan",
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
    originalName: "Taiwan Electronics Co., Ltd.",
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
    originalName: "Taiwan Electronics Technology",
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
    email: "wang@taiwan-tech.com",
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
    email: "wang.oem@taiwan-tech.com",
    phone: "02-1234-5679",
    address: "台北市內湖區科技路100號",
    boundary: "boundary1",
    category: "製造商",
    similarTo: []
  }
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null)
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: "",
    name: "",
    companyId: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    country: "",
  })
  
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [externalSearchTerm, setExternalSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedExternalSuppliers, setSelectedExternalSuppliers] = useState<ExternalSupplier[]>([])
  
  // 添加新的狀態變量
  const [importStep, setImportStep] = useState(1)
  const [selectedBoundary, setSelectedBoundary] = useState("all")
  const [selectedOrgSuppliers, setSelectedOrgSuppliers] = useState<OrganizationSupplier[]>([])
  const [orgSupplierSearchTerm, setOrgSupplierSearchTerm] = useState("")
  const [supplierMergeMap, setSupplierMergeMap] = useState<Record<string, string>>({})
  
  // 批次合併相關狀態
  const [selectedSuppliersForBatch, setSelectedSuppliersForBatch] = useState<string[]>([])
  const [batchMergeTarget, setBatchMergeTarget] = useState<string>("")

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
      supplier.name.toLowerCase().includes(externalSearchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(externalSearchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(externalSearchTerm.toLowerCase())

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

  // 添加供應商
  const handleAddSupplier = () => {
    const id = (suppliers.length + 1).toString()
    setSuppliers([...suppliers, { ...newSupplier, id }])
    setNewSupplier({
      id: "",
      name: "",
      companyId: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
      country: "",
    })
    setShowAddDialog(false)
  }

  // 編輯供應商
  const handleEditSupplier = () => {
    if (editingSupplier) {
    setSuppliers(suppliers.map((supplier) => (supplier.id === editingSupplier.id ? editingSupplier : supplier)))
      setShowEditDialog(false)
    }
  }

  // 刪除供應商
  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id))
  }

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
          country: "Taiwan", // 默認值
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
          <h1 className="text-2xl font-bold tracking-tight">供應商管理</h1>
          <p className=" text-sm text-muted-foreground">管理您的供應商信息，包括添加、編輯和刪除供應商</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                導入供應商
              </Button>
            </DialogTrigger>
              <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle>導入供應商</DialogTitle>
                  <DialogDescription>
                    從外部邊界導入供應商資料。
                  </DialogDescription>
              </DialogHeader>

                {/* 步驟指示器 */}
                <div className="mb-6 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        importStep === 1 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
                      }`}>
                        1
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${importStep === 1 ? 'text-blue-500' : 'text-muted-foreground'}`}>
                          選擇邊界供應商
                        </p>
                      </div>
                </div>

                    <div className="flex-grow mx-4 h-0.5 bg-gray-200">
                      <div className={`h-0.5 bg-blue-500 transition-all ${
                        importStep === 2 ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center  ${
                        importStep === 2 ? 'bg-blue-500 text-white ' : 'bg-blue-100 text-blue-500 text-sm'
                      }`}>
                        2
                      </div>
                      <div className="ml-2">
                        <p className={`font-medium ${importStep === 2 ? 'text-blue-500' : 'text-muted-foreground'}`}>
                          合併供應商
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <ScrollArea className="h-[500px]">
                  {/* 第一步：選擇供應商 */}
                  {importStep === 1 && (
                    <>
                      <div className="mb-4 flex gap-4">
                        <div className="flex-1">
                          <Label htmlFor="selectedBoundary">選擇組織邊界</Label>
                          <Select 
                            value={selectedBoundary} 
                            onValueChange={setSelectedBoundary}
                          >
                            <SelectTrigger id="selectedBoundary">
                              <SelectValue placeholder="請選擇組織邊界" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">所有邊界</SelectItem>
                              {organizationBoundaries.map(boundary => (
                                <SelectItem key={boundary.id} value={boundary.id}>
                                  {boundary.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex-1">
                          <Label htmlFor="selectedCategory">選擇分類</Label>
                          <Select 
                            value={selectedCategory} 
                            onValueChange={setSelectedCategory}
                          >
                            <SelectTrigger id="selectedCategory">
                              <SelectValue placeholder="請選擇供應商分類" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">所有分類</SelectItem>
                              {['製造商', '原料供應商', '物流服務', '包裝商'].map(category => (
                                <SelectItem key={category} value={category}>
                        {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mb-4 relative">
                        <Input
                          placeholder="搜尋組織邊界供應商..."
                          className="pl-8"
                          value={orgSupplierSearchTerm}
                          onChange={(e) => setOrgSupplierSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      
                      {/* 選擇數量統計信息 */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm">
                          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                            已選擇: {selectedOrgSuppliers.length} / {allOrganizationSuppliers.length} 個供應商
                          </Badge>
                          {filteredOrgSuppliers.length < allOrganizationSuppliers.length && (
                            <span className="ml-2 text-muted-foreground">
                              (已篩選: {filteredOrgSuppliers.length} 個)
                            </span>
                          )}
                        </div>
                        {filteredOrgSuppliers.length > 0 && (
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedOrgSuppliers(filteredOrgSuppliers)
                              }}
                              disabled={filteredOrgSuppliers.length === selectedOrgSuppliers.length}
                            >
                              全選
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setSelectedOrgSuppliers([])}
                              disabled={selectedOrgSuppliers.length === 0}
                            >
                              清除選擇
                            </Button>
                          </div>
                        )}
                      </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                            <TableHead className="w-10"></TableHead>
                            <TableHead>名稱</TableHead>
                        <TableHead>聯絡人</TableHead>
                        <TableHead>電子郵件</TableHead>
                            <TableHead>邊界</TableHead>
                            <TableHead>分類</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                          {filteredOrgSuppliers.length === 0 ? (
                        <TableRow>
                              <TableCell colSpan={6} className="text-center py-4">
                                無符合條件的供應商
                          </TableCell>
                        </TableRow>
                      ) : (
                            filteredOrgSuppliers.map((supplier) => (
                          <TableRow
                            key={supplier.id}
                                className={selectedOrgSuppliers.some(s => s.id === supplier.id) 
                                  ? "bg-muted/50" 
                                  : ""
                                }
                          >
                            <TableCell>
                              <Checkbox
                                    checked={selectedOrgSuppliers.some(s => s.id === supplier.id)}
                                    onCheckedChange={() => toggleOrgSupplier(supplier)}
                              />
                            </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">{supplier.name}</div>
                                    {supplier.originalName && (
                                      <div className="text-xs text-muted-foreground mt-1">{supplier.originalName}</div>
                                    )}
                                  </div>
                                </TableCell>
                            <TableCell>{supplier.contact}</TableCell>
                            <TableCell>{supplier.email}</TableCell>
                                <TableCell>
                                  {organizationBoundaries.find(b => b.id === supplier.boundary)?.name}
                                </TableCell>
                            <TableCell>{supplier.category}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                    </>
                  )}

                  {/* 第二步：整併供應商 */}
                  {importStep === 2 && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">整併供應商</h3>
                </div>

                      {/* 分成左右兩個區塊的佈局 */}
                      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {/* 左側：待處理的供應商清單 (佔4份) */}
                        <div className="md:col-span-4 border rounded-md overflow-hidden">
                          <div className="bg-slate-50 p-3 border-b flex justify-between items-center">
                            <div className="flex items-center">
                              <h4 className="font-medium">待處理供應商清單</h4>
                              <Badge variant="outline" className="ml-3">
                                共 {selectedOrgSuppliers.length} 個供應商
                              </Badge>
                            </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                                size="sm" 
                                onClick={() => setSelectedSuppliersForBatch(selectedOrgSuppliers.map(s => s.id))}
                                disabled={selectedOrgSuppliers.length === 0 || selectedSuppliersForBatch.length === selectedOrgSuppliers.length}
                              >
                                全選
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setSelectedSuppliersForBatch([])}
                                disabled={selectedSuppliersForBatch.length === 0}
                    >
                      清除選擇
                    </Button>
                            </div>
                          </div>
                          
                          {/* 供應商列表 */}
                          <ScrollArea className="h-[450px]">
                            <div className="space-y-2 p-3">
                              {selectedOrgSuppliers.map(orgSupplier => {
                                const mergeTarget = supplierMergeMap[orgSupplier.id] || "new"
                                const similarSuppliers = findSimilarSuppliers(orgSupplier)
                                const isSelectedForBatch = selectedSuppliersForBatch.includes(orgSupplier.id)
                                const boundaryName = organizationBoundaries.find(b => b.id === orgSupplier.boundary)?.name || orgSupplier.boundary
                                
                                // 根據合併目標決定邊框顏色
                                const borderColorClass = (() => {
                                  if (!isSelectedForBatch) return "border-gray-200";
                                  if (mergeTarget === "new") return "border-emerald-200";
                                  return "border-amber-200";
                                })();
                                
                                return (
                                  <div 
                                    key={orgSupplier.id} 
                                    className={`border ${borderColorClass} rounded-md p-3 relative transition-all ${
                                      isSelectedForBatch ? 'bg-slate-50' : ''
                                    }`}
                                  >
                                    <div className="flex items-center mb-2">
                                      <div className="flex items-center">
                                        <Checkbox 
                                          checked={isSelectedForBatch}
                                          onCheckedChange={() => toggleSupplierForBatch(orgSupplier.id)}
                                          id={`batch-${orgSupplier.id}`}
                                          className="mr-2"
                                        />
                                        <Label 
                                          htmlFor={`batch-${orgSupplier.id}`} 
                                          className={`text-sm cursor-pointer ${isSelectedForBatch ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}
                                        >
                                          選擇
                                        </Label>
                                      </div>
                                      
                                      {/* 顯示邊界名稱與當前設定 */}
                                      <div className="ml-auto flex items-center gap-2">
                                        {mergeTarget !== "new" && (
                                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            合併至: {suppliers.find(s => s.id === mergeTarget)?.name}
                                          </Badge>
                                        )}
                                        {mergeTarget === "new" && (
                                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            創建新供應商
                                          </Badge>
                                        )}
                                      </div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium">{orgSupplier.name}</h4>
                                        <p className="text-xs text-muted-foreground mb-1">邊界: {boundaryName}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {orgSupplier.email} | {orgSupplier.phone}
                                        </p>
                                      </div>
                                      
                                      <div className="flex-1 max-w-[220px] ml-4">
                                        <Select 
                                          value={mergeTarget} 
                                          onValueChange={(value) => updateSupplierMerge(orgSupplier.id, value)}
                                        >
                                          <SelectTrigger id={`merge-${orgSupplier.id}`} className="h-8 text-xs">
                                            <SelectValue placeholder="選擇操作" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="new">創建新供應商</SelectItem>
                                            <SelectGroup>
                                              <SelectLabel>合併到現有供應商</SelectLabel>
                                              {similarSuppliers.map(sim => (
                                                <SelectItem key={sim.id} value={sim.id}>
                                                  {sim.name} ({calculateSimilarity(orgSupplier.name, sim.name).toFixed(2)})
                                                </SelectItem>
                                              ))}
                                              {/* 添加所有供應商選項 */}
                                              {suppliers
                                                .filter(s => !similarSuppliers.some(sim => sim.id === s.id))
                                                .map(s => (
                                                  <SelectItem key={`all-${s.id}`} value={s.id}>
                                                    {s.name}
                                                  </SelectItem>
                                                ))
                                              }
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </ScrollArea>
                        </div>
                        
                        {/* 右側：批次操作區 (佔3份) */}
                        <div className="md:col-span-3">
                          <div className="border rounded-md h-full">
                            <div className="bg-slate-50 p-3 border-b">
                              <h4 className="font-medium">批次操作區</h4>
                            </div>
                            
                            <div className="p-4">
                              {selectedSuppliersForBatch.length > 0 ? (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-500">
                                      已選擇 {selectedSuppliersForBatch.length} 個供應商
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      ({((selectedSuppliersForBatch.length / selectedOrgSuppliers.length) * 100).toFixed(0)}%)
                                    </span>
                                  </div>
                                  
                                  <div className="border-t border-b py-4 my-4">
                                    <h5 className="font-medium text-sm mb-3">批次設置</h5>
                                    <div className="space-y-3">
                                      <div>
                                        <Select 
                                          value={batchMergeTarget} 
                                          onValueChange={setBatchMergeTarget}
                                        >
                                          <SelectTrigger id="batch-merge-target" className="w-full">
                                            <SelectValue placeholder="選擇合併目標" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="new">創建為新供應商</SelectItem>
                                            <SelectGroup>
                                              <SelectLabel>合併到現有供應商</SelectLabel>
                                              {suppliers.map(supplier => (
                                                <SelectItem key={supplier.id} value={supplier.id}>
                                                  {supplier.name} ({supplier.companyId})
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end">
                                    <Button 
                                      onClick={applyBatchMerge} 
                                      disabled={!batchMergeTarget}
                                      variant="default"
                                      className="w-full"
                                    >
                                      應用批次操作
                    </Button>
                  </div>
                                  
                                  <div className="mt-4 pt-4 border-t">
                                    <h5 className="font-medium text-sm mb-2">操作結果</h5>
                                    <div className="text-sm space-y-2">
                                      {batchMergeTarget && (
                                        <>
                                          {batchMergeTarget === "new" ? (
                                            <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                                              <p>將創建 <strong>{selectedSuppliersForBatch.length}</strong> 個新供應商</p>
                </div>
                                          ) : (
                                            <div className="p-3 bg-amber-50 rounded-md border border-amber-100">
                                              <p>將合併至：</p>
                                              <p className="font-medium mt-1">{suppliers.find(s => s.id === batchMergeTarget)?.name}</p>
                                              <p className="text-xs text-muted-foreground mt-1">{suppliers.find(s => s.id === batchMergeTarget)?.companyId}</p>
              </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                  </div>
                                  <h5 className="font-medium">尚未選擇供應商</h5>
                                  <p className="text-sm text-muted-foreground mt-1 max-w-[220px]">
                                    請在左側清單選擇供應商
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </ScrollArea>

                <DialogFooter className="mt-4">
                  {importStep === 1 ? (
                    <>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  取消
                </Button>
                      <Button onClick={handleNextStep} disabled={selectedOrgSuppliers.length === 0}>
                        下一步: 整併供應商
                </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={handlePreviousStep}>
                        返回上一步
                      </Button>
                      <Button onClick={handleNextStep}>
                        完成導入
                      </Button>
                    </>
                  )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加供應商
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>添加新供應商</DialogTitle>
                <DialogDescription>填寫以下信息以添加新供應商</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">公司名稱</Label>
                  <Input
                    id="name"
                    value={newSupplier.name}
                    onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  />
                </div>
                  <div className="grid gap-2">
                    <Label htmlFor="companyId">公司ID</Label>
                    <Input
                      id="companyId"
                      value={newSupplier.companyId}
                      onChange={(e) => setNewSupplier({ ...newSupplier, companyId: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">國家</Label>
                    <Input
                      id="country"
                      value={newSupplier.country}
                      onChange={(e) => setNewSupplier({ ...newSupplier, country: e.target.value })}
                    />
                  </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact">聯絡人</Label>
                  <Input
                    id="contact"
                    value={newSupplier.contact}
                    onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">電子郵件</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">電話</Label>
                  <Input
                    id="phone"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">地址</Label>
                  <Input
                    id="address"
                    value={newSupplier.address}
                    onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  取消
                </Button>
                <Button onClick={handleAddSupplier}>保存</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        {/* <CardHeader>
          <CardTitle>供應商列表</CardTitle>
          <CardDescription>查看和管理您的所有供應商</CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className="m-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索供應商..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>公司名稱</TableHead>
                  <TableHead>國家</TableHead>
                <TableHead>聯絡人</TableHead>
                <TableHead>電子郵件</TableHead>
                <TableHead>電話</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    沒有找到供應商
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                          <Dialog>
                          <DialogTrigger asChild>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
                                    <Search className="h-4 w-4 text-blue-500" />
                                    <span className="sr-only">查看</span>
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

                          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                            <DialogTrigger asChild>
                              <Tooltip>
                                <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setEditingSupplier(supplier)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">編輯</span>
                            </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>編輯</p>
                                </TooltipContent>
                              </Tooltip>
                          </DialogTrigger>
                          {editingSupplier && (
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
                                    value={editingSupplier.name}
                                    onChange={(e) =>
                                      setEditingSupplier({
                                        ...editingSupplier,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-companyId">公司ID</Label>
                                    <Input
                                      id="edit-companyId"
                                      value={editingSupplier.companyId}
                                      onChange={(e) =>
                                        setEditingSupplier({
                                          ...editingSupplier,
                                          companyId: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-country">國家</Label>
                                    <Input
                                      id="edit-country"
                                      value={editingSupplier.country}
                                      onChange={(e) =>
                                        setEditingSupplier({
                                          ...editingSupplier,
                                          country: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-contact">聯絡人</Label>
                                  <Input
                                    id="edit-contact"
                                    value={editingSupplier.contact}
                                    onChange={(e) =>
                                      setEditingSupplier({
                                        ...editingSupplier,
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
                                    value={editingSupplier.email}
                                    onChange={(e) =>
                                      setEditingSupplier({
                                        ...editingSupplier,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-phone">電話</Label>
                                  <Input
                                    id="edit-phone"
                                    value={editingSupplier.phone}
                                    onChange={(e) =>
                                      setEditingSupplier({
                                        ...editingSupplier,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-address">地址</Label>
                                  <Input
                                    id="edit-address"
                                    value={editingSupplier.address}
                                    onChange={(e) =>
                                      setEditingSupplier({
                                        ...editingSupplier,
                                        address: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
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
                            <Button variant="outline" size="icon">
                              <Trash2 className="h-4 w-4" />
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
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  )
}
