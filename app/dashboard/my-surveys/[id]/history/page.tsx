import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Info } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// 定義類型
interface SectionData {
  [key: string]: string;
}

interface SurveyData {
  [key: string]: SectionData;
}

interface SurveyRevision {
  version: number;
  date: Date;
  note: string;
  completedSections: string[];
  data: SurveyData;
}

interface SurveyHistoryData {
  id: string;
  title: string;
  description: string;
  sender: string;
  revisions: SurveyRevision[];
}

// 模擬問卷數據
const surveyHistory: SurveyHistoryData = {
  id: "5",
  title: "供應商能源使用調查",
  description: "關於貴公司能源使用效率和再生能源使用情況的調查",
  sender: "綠能科技有限公司",
  revisions: [
    { 
      version: 1,
      date: new Date("2023-09-15"),
      note: "初次提交",
      completedSections: ["basic", "energy"],
      data: {
        basic: {
          company_name: "綠色科技股份有限公司",
          location: "台北市信義區信義路五段7號",
          contact_person: "王小明",
          email: "contact@greentech.com.tw"
        },
        energy: {
          electricity: "800000",
          renewable_energy: "太陽能發電 40000 kWh",
          verified: "Yes"
        }
      }
    },
    { 
      version: 2,
      date: new Date("2023-09-25"),
      note: "更新能源使用數據",
      completedSections: ["basic", "energy"],
      data: {
        basic: {
          company_name: "綠色科技股份有限公司",
          location: "台北市信義區信義路五段7號",
          contact_person: "王小明",
          email: "contact@greentech.com.tw"
        },
        energy: {
          electricity: "850000",
          renewable_energy: "太陽能發電 45000 kWh",
          verified: "Yes"
        }
      }
    }
  ]
}

// 定義差異類型
interface Difference {
  section: string;
  field: string;
  oldValue: string;
  newValue: string;
}

// 靜態匯出所需
export function generateStaticParams() {
  return [{ id: "5" }]  // 問卷歷史目前只有這一個測試ID
}

export default function SurveyHistoryPage({ params }: { params: { id: string } }) {
  // 預設顯示最新版本
  const currentVersion = "2";
  
  // 取得當前的修訂版本
  const revision = surveyHistory.revisions.find(r => r.version.toString() === currentVersion)
  
  if (!revision) {
    return <div>找不到此修訂版本</div>
  }

  // 獲取修訂間的差異
  const getDifferences = (): Difference[] => {
    // 如果是第一個版本，沒有可比較的差異
    if (currentVersion === "1") {
      return []
    }
    
    const previousVersion = surveyHistory.revisions.find(r => r.version === parseInt(currentVersion) - 1)
    if (!previousVersion) {
      return []
    }
    
    const differences: Difference[] = []
    
    // 比較每個部分的數據
    for (const sectionKey in revision.data) {
      const currentSectionData = revision.data[sectionKey]
      const previousSectionData = previousVersion.data[sectionKey] || {}
      
      for (const fieldKey in currentSectionData) {
        const currentValue = currentSectionData[fieldKey]
        const previousValue = previousSectionData[fieldKey]
        
        // 檢查值是否不同
        if (currentValue !== previousValue) {
          differences.push({
            section: sectionKey,
            field: fieldKey,
            oldValue: previousValue || "(無)",
            newValue: currentValue,
          })
        }
      }
      
      // 檢查刪除的欄位
      for (const fieldKey in previousSectionData) {
        if (!(fieldKey in currentSectionData)) {
          differences.push({
            section: sectionKey,
            field: fieldKey,
            oldValue: previousSectionData[fieldKey],
            newValue: "(已刪除)",
          })
        }
      }
    }
    
    // 檢查新增的區段
    for (const sectionKey in revision.data) {
      if (!(sectionKey in previousVersion.data)) {
        differences.push({
          section: sectionKey,
          field: "整個區段",
          oldValue: "(無)",
          newValue: "新增區段",
        })
      }
    }
    
    // 檢查刪除的區段
    for (const sectionKey in previousVersion.data) {
      if (!(sectionKey in revision.data)) {
        differences.push({
          section: sectionKey,
          field: "整個區段",
          oldValue: "有資料",
          newValue: "(已刪除)",
        })
      }
    }
    
    return differences
  }
  
  const differences = getDifferences()
  
  // 格式化區段名稱
  const formatSectionName = (sectionKey: string) => {
    const sectionNames: Record<string, string> = {
      "basic": "供應商基本資訊",
      "energy": "能源消耗資訊",
      "ghg": "組織溫盤資訊",
      "product": "產品碳足跡資訊"
    }
    return sectionNames[sectionKey] || sectionKey
  }
  
  // 格式化欄位名稱
  const formatFieldName = (fieldKey: string) => {
    const fieldNames: Record<string, string> = {
      "company_name": "公司名稱",
      "location": "地點",
      "contact_person": "聯絡窗口",
      "email": "Email",
      "electricity": "電力 (kWh)",
      "renewable_energy": "再生能源",
      "verified": "查證"
    }
    return fieldNames[fieldKey] || fieldKey
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/dashboard/my-surveys/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回問卷
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <CardTitle className="text-2xl">{surveyHistory.title} - 歷史版本</CardTitle>
              <CardDescription className="mt-2">{surveyHistory.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">提交日期: {format(revision.date, "yyyy-MM-dd")}</span>
            </div>
          </div>
          
          {/* 靜態顯示當前版本，沒有互動 */}
          <div className="mt-4 border-b">
            <div className="flex">
              {surveyHistory.revisions.map((rev) => (
                <Button
                  key={rev.version}
                  variant={rev.version.toString() === currentVersion ? "default" : "ghost"}
                  className="rounded-none h-11"
                  disabled={rev.version.toString() !== currentVersion}
                >
                  版本 {rev.version}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">更新時間: {format(revision.date, "yyyy-MM-dd HH:mm")}</span>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1">修訂說明:</h3>
              <p className="text-sm text-muted-foreground">{revision.note}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium mb-2">已完成的區段:</h3>
              <div className="flex flex-wrap gap-2">
                {revision.completedSections.map((section) => (
                  <Badge key={section} variant="outline">{formatSectionName(section)}</Badge>
                ))}
              </div>
            </div>
            
            {differences.length > 0 && (
              <>
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    與上一版本的差異:
                  </h3>
                  
                  {differences.map((diff, index) => (
                    <div key={index} className="mt-2 p-2 border rounded-md">
                      <p className="text-sm font-medium">{formatSectionName(diff.section)} / {formatFieldName(diff.field)}</p>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground">舊值:</p>
                          <p className="text-sm">{diff.oldValue}</p>
                        </div>
                        <div className="p-2 bg-muted rounded-md">
                          <p className="text-xs text-muted-foreground">新值:</p>
                          <p className="text-sm">{diff.newValue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 