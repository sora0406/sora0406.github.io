"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  ClipboardCheck, BarChart3, FileText, Users, 
  ArrowRight, ChevronRight, PieChart, ListChecks, Search, 
  Building, CheckCircle, MailOpen, Globe
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function SupplyChainPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("questionnaire-tracking")

  // 模擬數據
  const mockData = {
    pendingQuestionnaires: 8,
    completedQuestionnaires: 24,
    dataRequests: 12,
    suppliers: 36,
    newSuppliers: 5,
    supplierCategories: ["物流", "製造", "原料", "包裝", "服務"],
    regions: ["北部", "中部", "南部", "東部", "海外"]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">供應鏈管理</h1>
        <p className="text-sm text-muted-foreground">
          集中管理問卷、供應商和數據要求的整合平台
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 h-auto p-1">
          <TabsTrigger value="questionnaire-tracking" className="flex items-center py-2">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            <span>問卷追蹤</span>
            {mockData.pendingQuestionnaires > 0 && (
              <Badge variant="secondary" className="ml-2">{mockData.pendingQuestionnaires}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center py-2">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>問卷分析</span>
          </TabsTrigger>
          <TabsTrigger value="data-requests" className="flex items-center py-2">
            <FileText className="h-4 w-4 mr-2" />
            <span>數據要求</span>
            {mockData.dataRequests > 0 && (
              <Badge variant="secondary" className="ml-2">{mockData.dataRequests}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suppliers" className="flex items-center py-2">
            <Users className="h-4 w-4 mr-2" />
            <span>供應商管理</span>
            {mockData.newSuppliers > 0 && (
              <Badge variant="secondary" className="ml-2">{mockData.newSuppliers}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* 問卷追蹤 */}
        <TabsContent value="questionnaire-tracking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2 text-blue-500" />
                  問卷追蹤總覽
                </CardTitle>
                <CardDescription>追蹤所有問卷的提交和進度</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">待處理</span>
                    <span className="text-3xl font-bold text-blue-500">{mockData.pendingQuestionnaires}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">已完成</span>
                    <span className="text-3xl font-bold text-green-500">{mockData.completedQuestionnaires}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button className="w-full" onClick={() => router.push("/dashboard/projects/questionnaires")}>
                  查看問卷追蹤 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MailOpen className="h-5 w-5 mr-2 text-indigo-500" />
                  最新問卷活動
                </CardTitle>
                <CardDescription>追蹤最近的問卷回應和更新</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">新竹物流已提交問卷</span>
                    </div>
                    <span className="text-xs text-muted-foreground">今天</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">統一速達已提交問卷</span>
                    </div>
                    <span className="text-xs text-muted-foreground">昨天</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">已發送問卷給宅配通</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2天前</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/projects/questionnaires")}>
                  查看所有活動
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ListChecks className="h-5 w-5 mr-2 text-green-500" />
                  問卷完成進度
                </CardTitle>
                <CardDescription>監控問卷填寫和提交進度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>碳排放評估問卷</span>
                      <span className="text-blue-500">75%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>供應鏈風險評估</span>
                      <span className="text-green-500">92%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>永續發展調查</span>
                      <span className="text-amber-500">45%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/projects/questionnaires")}>
                  查看詳細進度
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => router.push("/dashboard/projects/questionnaires")}>
              進入問卷追蹤系統 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </TabsContent>

        {/* 問卷分析 */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  碳排放分析
                </CardTitle>
                <CardDescription>供應商碳排放數據分析</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="h-40 flex items-center justify-center bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                    <p className="text-sm text-muted-foreground">碳排放數據視覺化</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button className="w-full" onClick={() => router.push("/dashboard/survey-results")}>
                  查看數據分析 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Search className="h-5 w-5 mr-2 text-indigo-500" />
                  關鍵洞察
                </CardTitle>
                <CardDescription>從問卷回覆中獲取關鍵洞察</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="p-2 bg-muted/50 rounded-lg text-sm">
                    <span className="font-medium block">碳排放熱點</span>
                    <span className="text-muted-foreground">物流供應商的範疇一排放是主要來源</span>
                  </li>
                  <li className="p-2 bg-muted/50 rounded-lg text-sm">
                    <span className="font-medium block">區域差異</span>
                    <span className="text-muted-foreground">北部供應商的平均排放量高於其他地區</span>
                  </li>
                  <li className="p-2 bg-muted/50 rounded-lg text-sm">
                    <span className="font-medium block">改進機會</span>
                    <span className="text-muted-foreground">35%的供應商有減碳計畫但缺乏執行策略</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/survey-results")}>
                  查看所有洞察
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  永續發展目標
                </CardTitle>
                <CardDescription>監控供應鏈永續發展進度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>碳排放減少</span>
                      <span className="text-green-500">65%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>供應商認證</span>
                      <span className="text-blue-500">48%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "48%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>水資源管理</span>
                      <span className="text-indigo-500">72%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/survey-results")}>
                  查看永續目標進度
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => router.push("/dashboard/survey-results")}>
              進入問卷分析系統 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </TabsContent>

        {/* 數據要求 */}
        <TabsContent value="data-requests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  數據要求總覽
                </CardTitle>
                <CardDescription>追蹤所有數據要求的狀態</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">等待回應</span>
                    <span className="text-3xl font-bold text-amber-500">{mockData.dataRequests}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">已收集</span>
                    <span className="text-3xl font-bold text-green-500">28</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button className="w-full" onClick={() => router.push("/dashboard/requests")}>
                  查看數據要求 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2 text-indigo-500" />
                  數據收集進度
                </CardTitle>
                <CardDescription>監控各類數據的收集進度</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>碳排放數據</span>
                      <span className="text-blue-500">82%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>能源使用數據</span>
                      <span className="text-green-500">68%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>ESG評分數據</span>
                      <span className="text-amber-500">54%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "54%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/requests")}>
                  查看詳細進度
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <MailOpen className="h-5 w-5 mr-2 text-green-500" />
                  最新數據提交
                </CardTitle>
                <CardDescription>查看最近提交的數據</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-sm">長榮國際儲運 - 碳排放數據</span>
                    </div>
                    <span className="text-xs text-muted-foreground">今天</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">台塑汽車貨運 - 能源使用數據</span>
                    </div>
                    <span className="text-xs text-muted-foreground">昨天</span>
                  </li>
                  <li className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-sm">中國貨櫃運輸 - ESG評分</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2天前</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/requests")}>
                  查看所有提交
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => router.push("/dashboard/requests")}>
              進入數據要求系統 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </TabsContent>

        {/* 供應商管理 */}
        <TabsContent value="suppliers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" />
                  供應商總覽
                </CardTitle>
                <CardDescription>管理所有供應商資訊和關係</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">總供應商</span>
                    <span className="text-3xl font-bold text-blue-500">{mockData.suppliers}</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="text-sm text-muted-foreground">新增供應商</span>
                    <span className="text-3xl font-bold text-green-500">{mockData.newSuppliers}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-1">
                <Button className="w-full" onClick={() => router.push("/dashboard/suppliers")}>
                  查看供應商管理 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Building className="h-5 w-5 mr-2 text-indigo-500" />
                  供應商分類
                </CardTitle>
                <CardDescription>按類別查看供應商分佈</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockData.supplierCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <span className="text-sm">{category}</span>
                      <Badge variant="outline">{Math.floor(Math.random() * 10) + 2}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/suppliers")}>
                  查看供應商類別
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-500" />
                  供應商區域分佈
                </CardTitle>
                <CardDescription>按地區查看供應商分佈</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockData.regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <span className="text-sm">{region}</span>
                      <Badge variant="outline">{Math.floor(Math.random() * 10) + 2}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/suppliers")}>
                  查看地區分佈
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => router.push("/dashboard/suppliers")}>
              進入供應商管理系統 <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 