"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Download, FileText, Table, BarChart3, Calendar, Settings, 
  CheckCircle, Clock, FileSpreadsheet, FileImage 
} from "lucide-react"

interface ExportManagerProps {
  tWarRoom?: any;
}

export default function ExportManager({ tWarRoom }: ExportManagerProps) {
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [selectedCharts, setSelectedCharts] = useState<string[]>(["pareto", "trend", "geography"]);
  const [includeSummary, setIncludeSummary] = useState<boolean>(true);
  const [includeRawData, setIncludeRawData] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>("current_year");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportHistory, setExportHistory] = useState<any[]>([
    {
      id: 1,
      name: "碳排放戰情室報告_2024Q1",
      format: "PDF",
      size: "2.3 MB",
      date: new Date("2024-01-15T14:30:00"),
      status: "completed"
    },
    {
      id: 2,
      name: "供應商排放數據_完整版",
      format: "Excel",
      size: "5.7 MB", 
      date: new Date("2024-01-10T09:20:00"),
      status: "completed"
    },
    {
      id: 3,
      name: "帕雷托分析報告",
      format: "PowerPoint",
      size: "8.1 MB",
      date: new Date("2024-01-08T16:45:00"),
      status: "processing"
    }
  ]);

  // 可選擇的圖表
  const availableCharts = [
    { id: "pareto", name: "帕雷托分析圖", description: "20/80法則分析" },
    { id: "trend", name: "趨勢分析圖", description: "時間序列趨勢" },
    { id: "geography", name: "地理分布圖", description: "供應商分布熱點" },
    { id: "scope_distribution", name: "範疇分布圖", description: "排放類別分布" },
    { id: "top_emitters", name: "排放排行榜", description: "前十大排放源" },
    { id: "benchmarking", name: "基準比較圖", description: "行業基準對比" }
  ];

  // 匯出格式選項
  const formatOptions = [
    { value: "pdf", label: "PDF報告", icon: FileText, description: "適合分享與呈報" },
    { value: "excel", label: "Excel檔案", icon: FileSpreadsheet, description: "詳細數據分析" },
    { value: "powerpoint", label: "PowerPoint", icon: FileImage, description: "簡報展示" },
    { value: "csv", label: "CSV數據", icon: Table, description: "原始資料匯出" }
  ];

  // 處理圖表選擇
  const handleChartToggle = (chartId: string) => {
    setSelectedCharts(prev => 
      prev.includes(chartId) 
        ? prev.filter(id => id !== chartId)
        : [...prev, chartId]
    );
  };

  // 執行匯出
  const handleExport = async () => {
    setIsExporting(true);
    
    // 模擬匯出處理
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 新增匯出記錄
    const newExport = {
      id: exportHistory.length + 1,
      name: `戰情室報告_${new Date().toISOString().split('T')[0]}`,
      format: exportFormat.toUpperCase(),
      size: "3.2 MB",
      date: new Date(),
      status: "completed"
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    setIsExporting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            數據匯出管理
          </CardTitle>
          <CardDescription>
            匯出戰情室報告、圖表與數據，支援多種格式
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export">
            <TabsList>
              <TabsTrigger value="export">建立匯出</TabsTrigger>
              <TabsTrigger value="history">匯出歷史</TabsTrigger>
              <TabsTrigger value="templates">報告模板</TabsTrigger>
            </TabsList>

            <TabsContent value="export" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 匯出設定 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">匯出設定</h3>
                  
                  {/* 格式選擇 */}
                  <div className="space-y-2">
                    <Label>匯出格式</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {formatOptions.map((format) => (
                        <div
                          key={format.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            exportFormat === format.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setExportFormat(format.value)}
                        >
                          <div className="flex items-center gap-2">
                            <format.icon className="h-4 w-4" />
                            <span className="font-medium">{format.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 時間範圍 */}
                  <div className="space-y-2">
                    <Label>資料時間範圍</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current_year">當前年度</SelectItem>
                        <SelectItem value="last_year">去年度</SelectItem>
                        <SelectItem value="all_time">所有時間</SelectItem>
                        <SelectItem value="custom">自訂範圍</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 內容選項 */}
                  <div className="space-y-3">
                    <Label>包含內容</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="summary" 
                          checked={includeSummary}
                          onCheckedChange={setIncludeSummary}
                        />
                        <Label htmlFor="summary" className="text-sm">
                          執行摘要與關鍵指標
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="rawdata" 
                          checked={includeRawData}
                          onCheckedChange={setIncludeRawData}
                        />
                        <Label htmlFor="rawdata" className="text-sm">
                          原始數據表格
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 圖表選擇 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">選擇圖表</h3>
                  <div className="space-y-3">
                    {availableCharts.map((chart) => (
                      <div key={chart.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={chart.id}
                          checked={selectedCharts.includes(chart.id)}
                          onCheckedChange={() => handleChartToggle(chart.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={chart.id} className="font-medium">
                            {chart.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {chart.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Alert>
                    <BarChart3 className="h-4 w-4" />
                    <AlertDescription>
                      已選擇 {selectedCharts.length} 個圖表。建議選擇 3-6 個圖表以獲得最佳報告效果。
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* 匯出按鈕 */}
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting || selectedCharts.length === 0}
                  className="flex items-center gap-2"
                  size="lg"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? "匯出中..." : "開始匯出"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">匯出歷史</h3>
                
                <div className="space-y-3">
                  {exportHistory.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{item.name}</span>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status === 'completed' ? '完成' : '處理中'}
                            </Badge>
                            <Badge variant="outline">{item.format}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{item.size}</span>
                            <span>{new Date(item.date).toLocaleString('zh-TW')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          {item.status === 'completed' && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">報告模板</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">管理層簡報</CardTitle>
                      <CardDescription>高階主管用簡潔報告</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        包含：KPI儀表板、關鍵趨勢、行動建議
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">技術分析報告</CardTitle>
                      <CardDescription>詳細技術分析與數據</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        包含：所有圖表、原始數據、統計分析
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">合規報告</CardTitle>
                      <CardDescription>符合法規要求的標準報告</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        包含：數據驗證、基準比較、合規聲明
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">供應商溝通</CardTitle>
                      <CardDescription>供應商專用分析報告</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        包含：個別表現、改善建議、行業基準
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}