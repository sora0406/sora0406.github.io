"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { Download, FileText, Plus, Upload, Users, ClipboardList } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect, usePathname } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

// 模擬供應商數據
const initialSuppliers = [
  {
    id: "1",
    name: "新竹物流",
    contact: "張小明",
    email: "contact@hct.com.tw",
    phone: "02-2216-5589",
    address: "新北市新莊區新北大道三段7號",
  },
  {
    id: "2",
    name: "統一速達",
    contact: "李大華",
    email: "info@t-cat.com.tw",
    phone: "02-2552-5525",
    address: "台北市大同區承德路三段210號",
  },
  {
    id: "3",
    name: "宅配通",
    contact: "王美麗",
    email: "contact@pelican.com.tw",
    phone: "02-2659-5511",
    address: "台北市南港區三重路66號",
  },
]

// 模擬外部供應商數據庫
const externalSuppliers = [
  {
    id: "ext1",
    name: "高科技電子有限公司",
    contact: "陳志明",
    email: "contact@hitechelectronics.com",
    phone: "02-8765-4321",
    address: "台北市內湖區內湖路一段123號",
    category: "電子製造",
  },
  {
    id: "ext2",
    name: "環保材料股份有限公司",
    contact: "林小華",
    email: "info@ecomaterials.com",
    phone: "03-5555-6666",
    address: "桃園市中壢區中央西路300號",
    category: "材料製造",
  },
  {
    id: "ext3",
    name: "智慧科技工業有限公司",
    contact: "黃大明",
    email: "contact@smarttechindustry.com",
    phone: "04-7777-8888",
    address: "台中市南屯區工業區二路456號",
    category: "智慧製造",
  },
  {
    id: "ext4",
    name: "新創能源科技股份有限公司",
    contact: "吳小芳",
    email: "info@newenergytech.com",
    phone: "07-9999-0000",
    address: "高雄市前鎮區前鎮路789號",
    category: "能源科技",
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

// 添加類型定義
type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category?: string;
};

export default function DashboardPage() {
  // 檢查當前路徑，如果是根路徑 /dashboard，則重定向到 /dashboard/survey-results
  const pathname = usePathname();
  if (pathname === '/dashboard' || pathname.endsWith('/dashboard')) {
    redirect('/dashboard/survey-results');
  }

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    id: "",
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
  })
  const [externalSearchTerm, setExternalSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedExternalSuppliers, setSelectedExternalSuppliers] = useState<Supplier[]>([])

  // 過濾外部供應商
  const filteredExternalSuppliers = externalSuppliers.filter(
    (supplier) =>
      (supplier.name.toLowerCase().includes(externalSearchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(externalSearchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(externalSearchTerm.toLowerCase())) &&
      (selectedCategory === "全部" || supplier.category === selectedCategory),
  )

  // 添加供應商
  const handleAddSupplier = () => {
    // 在實際應用中，這裡會將數據發送到API
    console.log("添加供應商:", newSupplier)

    toast({
      title: "成功",
      description: `已添加供應商: ${newSupplier.name}`,
    })

    setNewSupplier({
      id: "",
      name: "",
      contact: "",
      email: "",
      phone: "",
      address: "",
    })
    setIsAddDialogOpen(false)
  }

  // 選擇或取消選擇外部供應商
  const toggleExternalSupplier = (supplier: Supplier) => {
    const isSelected = selectedExternalSuppliers.some((s) => s.id === supplier.id)
    if (isSelected) {
      setSelectedExternalSuppliers(selectedExternalSuppliers.filter((s) => s.id !== supplier.id))
    } else {
      setSelectedExternalSuppliers([...selectedExternalSuppliers, supplier])
    }
  }

  // 導入選定的供應商
  const importSelectedSuppliers = () => {
    // 在實際應用中，這裡會將數據發送到API
    console.log("導入供應商:", selectedExternalSuppliers)

    toast({
      title: "成功",
      description: `已導入 ${selectedExternalSuppliers.length} 個供應商`,
    })

    setSelectedExternalSuppliers([])
    setIsImportDialogOpen(false)
  }

  // 添加 handleNavigate 函數
  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    window.location.href = path;
  };

  return (
    <div className="space-y-6">
      {/* 快捷功能卡片 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:bg-muted/50 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">快捷功能</CardTitle>
            <CardDescription>常用操作的快速訪問</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* 導入供應商 */}
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button  variant="css-secondary" asChild>
                  <div className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    導入供應商
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>導入供應商</DialogTitle>
                  <DialogDescription>搜尋並選擇要導入的供應商</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="搜尋供應商..."
                      value={externalSearchTerm}
                      onChange={(e) => setExternalSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <Tabs defaultValue="全部" className="w-full" onValueChange={setSelectedCategory}>
                    <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
                      {supplierCategories.map((category) => (
                        <TabsTrigger key={category} value={category}>
                          {category}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>

                  <div className="border rounded-md max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]"></TableHead>
                          <TableHead>公司名稱</TableHead>
                          <TableHead>聯絡人</TableHead>
                          <TableHead>電子郵件</TableHead>
                          <TableHead>類別</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredExternalSuppliers.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center">
                              沒有找到供應商
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredExternalSuppliers.map((supplier) => (
                            <TableRow
                              key={supplier.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => toggleExternalSupplier(supplier)}
                            >
                              <TableCell>
                                <Checkbox
                                  checked={selectedExternalSuppliers.some((s) => s.id === supplier.id)}
                                  onCheckedChange={() => toggleExternalSupplier(supplier)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{supplier.name}</TableCell>
                              <TableCell>{supplier.contact}</TableCell>
                              <TableCell>{supplier.email}</TableCell>
                              <TableCell>{supplier.category}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">已選擇 {selectedExternalSuppliers.length} 個供應商</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedExternalSuppliers([])
                          setExternalSearchTerm("")
                          setSelectedCategory("全部")
                        }}
                      >
                        清除選擇
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedExternalSuppliers(filteredExternalSuppliers)}>
                        全選
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={importSelectedSuppliers} disabled={selectedExternalSuppliers.length === 0}>
                    導入選定的供應商
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* 添加供應商 */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="css-primary" className="w-full justify-start">
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
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddSupplier}>保存</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* 創建要求 */}
            <Button variant="css-primary" className="w-full justify-start" onClick={() => handleNavigate("/dashboard/requests/new")}>
              <div className="flex items-center w-full">
                <FileText className="mr-2 h-4 w-4" />
                創建要求
              </div>
            </Button>
            
            {/* 創建問卷 */}
            <Button variant="css-secondary" className="w-full justify-start" onClick={() => handleNavigate("/dashboard/surveys/new")}>
              <div className="flex items-center w-full">
                <ClipboardList className="mr-2 h-4 w-4" />
                創建問卷
              </div>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">供應商</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialSuppliers.length}</div>
            <p className="text-xs text-muted-foreground">管理您的供應商信息</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => handleNavigate("/dashboard/suppliers")}>
                查看所有供應商
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">數據要求</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">查看活躍的數據要求</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => handleNavigate("/dashboard/requests")}>
                查看所有要求
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">問卷模板</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">查看已建立的問卷</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => handleNavigate("/dashboard/surveys")}>
                查看所有問卷
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>最近活動</CardTitle>
            <CardDescription>系統中的最新活動</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">新增供應商</p>
                  <p className="text-xs text-muted-foreground">2023-04-30 09:15</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">創建數據要求</p>
                  <p className="text-xs text-muted-foreground">2023-04-29 14:30</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Download className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">導入供應商</p>
                  <p className="text-xs text-muted-foreground">2023-04-28 11:45</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>待處理事項</CardTitle>
            <CardDescription>需要您關注的事項</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-500/10 p-2">
                  <FileText className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">3個數據要求即將到期</p>
                  <p className="text-xs text-muted-foreground">需要在5天內完成</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">2個供應商信息不完整</p>
                  <p className="text-xs text-muted-foreground">需要補充聯絡信息</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-500/10 p-2">
                  <Upload className="h-4 w-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">5個供應商已提交數據</p>
                  <p className="text-xs text-muted-foreground">等待您的審核</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
