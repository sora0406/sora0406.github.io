import { ArrowLeft, Building, Mail, MapPin, Phone, User, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getSuppliers, type Supplier } from "@/lib/mocks/suppliers"

// 取得所有供應商用於生成靜態路徑
const allSuppliers = [...getSuppliers('default'), ...getSuppliers('tsmc')]

// 新增靜態路徑參數生成
export function generateStaticParams() {
  return allSuppliers.map((supplier) => ({
    id: supplier.id,
  }))
}

export default function SupplierDetailPage({ params }: { params: { id: string } }) {
  
  // 查找供應商資料
  const supplier = allSuppliers.find((s: Supplier) => s.id === params.id)

  if (!supplier) {
    return <div className="flex items-center justify-center h-full">找不到供應商</div>
  }

  // 格式化數字顯示
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-TW').format(num)
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
        <Badge variant="outline">{supplier.country}</Badge>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">基本信息</TabsTrigger>
          <TabsTrigger value="carbon">碳排放</TabsTrigger>
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
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">公司ID</p>
                      <p className="text-sm text-muted-foreground">{supplier.companyId}</p>
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
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">國家</p>
                      <p className="text-sm text-muted-foreground">{supplier.country}</p>
                    </div>
                  </div>
                  {supplier.vehicleCount && (
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">車輛數量</p>
                        <p className="text-sm text-muted-foreground">{formatNumber(supplier.vehicleCount)} 輛</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="carbon" className="space-y-6">
          {supplier.carbonData ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>碳排放資料</CardTitle>
                  <CardDescription>供應商的碳排放相關數據</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">組織溫室氣體排放量</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {formatNumber(supplier.carbonData.organizationalGHG)}{" "}
                          <span className="text-sm font-normal text-muted-foreground">噸CO2e/年</span>
                        </div>
                        <p className="text-xs text-muted-foreground">組織範圍內的總溫室氣體排放量</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">產品碳足跡</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {supplier.carbonData.productCarbonFootprint}{" "}
                          <span className="text-sm font-normal text-muted-foreground">kgCO2e/單位</span>
                        </div>
                        <p className="text-xs text-muted-foreground">每單位產品的碳足跡</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>排放量明細</CardTitle>
                  <CardDescription>按類別劃分的詳細排放量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <p className="text-sm font-medium">範疇1排放量</p>
                      </div>
                      <p className="text-lg font-semibold">{formatNumber(supplier.carbonData.scope1Emissions)} 噸CO2e</p>
                      <p className="text-xs text-muted-foreground">直接排放</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-orange-500"></div>
                        <p className="text-sm font-medium">範疇2排放量</p>
                      </div>
                      <p className="text-lg font-semibold">{formatNumber(supplier.carbonData.scope2Emissions)} 噸CO2e</p>
                      <p className="text-xs text-muted-foreground">間接排放（能源）</p>
                    </div>
                    {supplier.carbonData.scope4Emissions && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-blue-500"></div>
                          <p className="text-sm font-medium">類別4排放量</p>
                        </div>
                        <p className="text-lg font-semibold">{formatNumber(supplier.carbonData.scope4Emissions)} 噸CO2e</p>
                        <p className="text-xs text-muted-foreground">上游運輸配送</p>
                      </div>
                    )}
                    {supplier.carbonData.scope5Emissions && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-green-500"></div>
                          <p className="text-sm font-medium">類別5排放量</p>
                        </div>
                        <p className="text-lg font-semibold">{formatNumber(supplier.carbonData.scope5Emissions)} 噸CO2e</p>
                        <p className="text-xs text-muted-foreground">營運廢棄物處理</p>
                      </div>
                    )}
                    {supplier.carbonData.scope6Emissions && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-purple-500"></div>
                          <p className="text-sm font-medium">類別6排放量</p>
                        </div>
                        <p className="text-lg font-semibold">{formatNumber(supplier.carbonData.scope6Emissions)} 噸CO2e</p>
                        <p className="text-xs text-muted-foreground">商務旅行</p>
                      </div>
                    )}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">總排放量</p>
                    <p className="text-xl font-bold">{formatNumber(supplier.carbonData.organizationalGHG)} 噸CO2e/年</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <p className="text-muted-foreground">暫無碳排放資料</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
