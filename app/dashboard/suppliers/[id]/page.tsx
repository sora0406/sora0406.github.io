import { ArrowLeft, Building, Mail, MapPin, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 添加介面定義
interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  carbonData: {
    organizational: number;
    product: number;
  };
}

// 模擬供應商數據
const initialSuppliers = [
  {
    id: "1",
    name: "新竹物流",
    contact: "張小明",
    email: "contact@hct.com.tw",
    phone: "02-2216-5589",
    address: "新北市新莊區新北大道三段7號",
    description: "提供全台灣快速貨物配送服務，專攻電子商務與B2C的物流解決方案。",
    carbonData: {
      organizational: 1250,
      product: 85,
    },
  },
  {
    id: "2",
    name: "統一速達",
    contact: "李大華",
    email: "info@t-cat.com.tw",
    phone: "02-2552-5525",
    address: "台北市大同區承德路三段210號",
    description: "提供全台物流整合服務，包括貨件收寄、倉儲與配送等一條龍服務。",
    carbonData: {
      organizational: 980,
      product: 45,
    },
  },
  {
    id: "3",
    name: "宅配通",
    contact: "王美麗",
    email: "contact@pelican.com.tw",
    phone: "02-2659-5511",
    address: "台北市南港區三重路66號",
    description: "專注於最後一哩路的宅配服務，提供台灣本島及離島的運送服務。",
    carbonData: {
      organizational: 1100,
      product: 60,
    },
  },
]

// 新增靜態路徑參數生成
export function generateStaticParams() {
  return initialSuppliers.map((supplier) => ({
    id: supplier.id,
  }))
}

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  // 直接從模擬資料中取得供應商資料，不使用 React hooks
  const supplier = initialSuppliers.find((s) => s.id === params.id) as Supplier

  if (!supplier) {
    return <div className="flex items-center justify-center h-full">找不到供應商</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href="/dashboard/suppliers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">返回</span>
          </a>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{supplier.name}</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">基本信息</TabsTrigger>
          <TabsTrigger value="carbon">碳排放數據</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>供應商詳情</CardTitle>
              <CardDescription>查看供應商的詳細信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">公司名稱</p>
                      <p className="text-sm text-muted-foreground">{supplier.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">聯絡人</p>
                      <p className="text-sm text-muted-foreground">{supplier.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">電子郵件</p>
                      <p className="text-sm text-muted-foreground">{supplier.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">電話</p>
                      <p className="text-sm text-muted-foreground">{supplier.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">地址</p>
                      <p className="text-sm text-muted-foreground">{supplier.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">公司簡介</p>
                <p className="text-sm text-muted-foreground">{supplier.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="carbon" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>碳排放數據</CardTitle>
              <CardDescription>供應商的碳排放相關數據</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">組織碳排放</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {supplier.carbonData.organizational}{" "}
                      <span className="text-sm font-normal text-muted-foreground">噸 CO₂e/年</span>
                    </div>
                    <p className="text-xs text-muted-foreground">組織範圍內的總碳排放量</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">產品碳排放</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {supplier.carbonData.product}{" "}
                      <span className="text-sm font-normal text-muted-foreground">噸 CO₂e/單位</span>
                    </div>
                    <p className="text-xs text-muted-foreground">每單位產品的碳排放量</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
