"use client"

import { useState, useMemo } from "react"
import { 
  BarChart3, Database, Download, FileDown, FileType, Save, Settings, Table as TableIcon 
} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

// 模擬問卷數據
const surveyTemplates = [
  { id: "1", title: "企業碳排放評估問卷" },
  { id: "2", title: "供應鏈風險評估問卷" },
  { id: "3", title: "2023年度供應商ESG評估" },
  { id: "4", title: "供應商能源使用調查" },
  { id: "5", title: "產品碳足跡資訊收集" }
];

const supplierCategories = [
  { id: "1", name: "電子製造" },
  { id: "2", name: "原材料供應" },
  { id: "3", name: "組裝代工" },
  { id: "4", name: "物流服務" },
  { id: "5", name: "包裝材料" }
];

export default function SurveyExportPage() {
  // 狀態管理
  const [selectedSurveyId, setSelectedSurveyId] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("csv");
  const [includeHeader, setIncludeHeader] = useState<boolean>(true);
  const [includeTimestamp, setIncludeTimestamp] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  
  // 問卷模板選擇
  const selectedSurvey = useMemo(() => {
    return surveyTemplates.find(template => template.id === selectedSurveyId);
  }, [selectedSurveyId]);
  
  // 檔案名稱建議
  useMemo(() => {
    if (selectedSurvey) {
      setFileName(`${selectedSurvey.title}_結果_${format(new Date(), "yyyyMMdd")}`);
    } else {
      setFileName(`問卷結果匯出_${format(new Date(), "yyyyMMdd")}`);
    }
  }, [selectedSurvey]);
  
  // 處理類別選擇
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // 匯出功能
  const handleExport = () => {
    // 實作匯出功能
    console.log("匯出", {
      surveyId: selectedSurveyId,
      format: selectedFormat,
      includeHeader,
      includeTimestamp,
      dateRange,
      selectedCategories,
      fileName
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">問卷數據匯出</h1>
        <p className="text-sm text-muted-foreground">
          匯出問卷回覆數據以進行進階分析或報告製作
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>匯出設定</CardTitle>
              <CardDescription>
                選擇要匯出的問卷和自訂匯出選項
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 問卷選擇 */}
              <div className="space-y-2">
                <Label htmlFor="survey-select">問卷模板</Label>
                <Select value={selectedSurveyId} onValueChange={setSelectedSurveyId}>
                  <SelectTrigger id="survey-select">
                    <SelectValue placeholder="選擇要匯出的問卷" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">所有問卷</SelectItem>
                    {surveyTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* 日期範圍 */}
              <div className="space-y-2">
                <Label>回覆日期範圍</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "yyyy-MM-dd")
                          ) : (
                            <span>開始日期</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "yyyy-MM-dd")
                          ) : (
                            <span>結束日期</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              
              {/* 供應商類別過濾 */}
              <div className="space-y-2">
                <Label>供應商類別</Label>
                <div className="grid grid-cols-2 gap-4">
                  {supplierCategories.map(category => (
                    <div key={category.id} className="flex items-center gap-2">
                      <Checkbox 
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* 匯出格式 */}
              <div className="space-y-2">
                <Label>匯出格式</Label>
                <RadioGroup value={selectedFormat} onValueChange={setSelectedFormat} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="csv" id="format-csv" />
                    <Label htmlFor="format-csv" className="flex items-center gap-2">
                      <FileType className="h-4 w-4" />
                      CSV
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="excel" id="format-excel" />
                    <Label htmlFor="format-excel" className="flex items-center gap-2">
                      <TableIcon className="h-4 w-4" />
                      Excel
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="json" id="format-json" />
                    <Label htmlFor="format-json" className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      JSON
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 其他選項 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="include-header" 
                      checked={includeHeader}
                      onCheckedChange={(checked) => setIncludeHeader(!!checked)}
                    />
                    <Label htmlFor="include-header">包含欄位標題</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="include-timestamp" 
                      checked={includeTimestamp}
                      onCheckedChange={(checked) => setIncludeTimestamp(!!checked)}
                    />
                    <Label htmlFor="include-timestamp">包含匯出時間戳記</Label>
                  </div>
                </div>
                
                {/* 檔名設定 */}
                <div className="space-y-2">
                  <Label htmlFor="file-name">檔案名稱</Label>
                  <Input 
                    id="file-name" 
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>匯出摘要</CardTitle>
              <CardDescription>
                當前選擇的匯出設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">問卷</div>
                <div className="font-medium">{selectedSurvey?.title || "所有問卷"}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">日期範圍</div>
                <div className="font-medium">
                  {dateRange.from && dateRange.to 
                    ? `${format(dateRange.from, "yyyy-MM-dd")} 至 ${format(dateRange.to, "yyyy-MM-dd")}`
                    : "全部日期"}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">供應商類別</div>
                <div className="font-medium">
                  {selectedCategories.length > 0 
                    ? supplierCategories
                        .filter(c => selectedCategories.includes(c.id))
                        .map(c => c.name)
                        .join(", ")
                    : "全部類別"}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">匯出格式</div>
                <div className="font-medium">{selectedFormat.toUpperCase()}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">檔案名稱</div>
                <div className="font-medium">{fileName}.{selectedFormat}</div>
              </div>
              
              <Button className="w-full mt-4" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                開始匯出
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>最近匯出紀錄</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { date: "2023-11-05", name: "企業碳排放評估問卷_結果_20231105.csv" },
                  { date: "2023-10-22", name: "ESG評估_結果_20231022.excel" },
                  { date: "2023-10-15", name: "供應商能源使用調查_20231015.json" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm font-medium">{record.name}</div>
                      <div className="text-xs text-muted-foreground">{record.date}</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 