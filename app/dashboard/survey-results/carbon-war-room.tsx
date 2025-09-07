"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  BarChart3, ChevronDown, Download, Filter, Search, PieChart, Clock, Calendar,
  TrendingUp, Target, BarChart, AlertTriangle, Truck, Factory, Shield, Users,
  MapPin, ArrowUpDown, ArrowDown, BarChart2, Eye, Activity, Globe, Zap,
  Settings, Play, Pause, RefreshCw, AlertCircle, TrendingDown
} from "lucide-react"
import { format } from "date-fns"
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { 
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem 
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// 動態載入 ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// 導入數據源Hook
import { useSurveyData } from "@/hooks/useSurveyData"

// 導入分析工具元件
import ScenarioSimulator from "./components/scenario-simulator"
import BenchmarkingModule from "./components/benchmarking-module"

interface CarbonOverviewProps {
  stats: any;
  selectedYear: string | null;
  tWarRoom: any;
}

// 1. 碳排放總覽儀表板元件
const CarbonOverviewDashboard = ({ stats, selectedYear, tWarRoom }: CarbonOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 總排放量 */}
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-700">
            總碳排放量
          </CardTitle>
          <Factory className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-800">{stats.orgTotalEmission} tCO2e</div>
          <p className="text-xs text-red-600">
            {selectedYear ? `${selectedYear}年度` : '所有年度'}
          </p>
        </CardContent>
      </Card>

      {/* 關鍵供應商數量 */}
      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-700">
            關鍵供應商
          </CardTitle>
          <Users className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-800">{Math.round(stats.orgCount * 0.2)}</div>
          <p className="text-xs text-orange-600">
            佔總數20% (帕雷托原則)
          </p>
        </CardContent>
      </Card>

      {/* 排放強度 */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            平均排放強度
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-800">
            {stats.orgCount > 0 ? (parseFloat(stats.orgTotalEmission) / stats.orgCount).toFixed(1) : '0'} 
          </div>
          <p className="text-xs text-blue-600">
            tCO2e/供應商
          </p>
        </CardContent>
      </Card>

      {/* 數據覆蓋率 */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">
            數據覆蓋率
          </CardTitle>
          <Shield className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">
            {((stats.totalResponses / (stats.totalResponses + 5)) * 100).toFixed(1)}%
          </div>
          <p className="text-xs text-green-600">
            {stats.totalResponses} / {stats.totalResponses + 5} 供應商
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

interface ParetoAnalysisProps {
  organizationResponses: any[];
  selectedYear: string | null;
  tWarRoom: any;
}

// 2. 帕雷托分析元件
const ParetoAnalysisWidget = ({ organizationResponses, selectedYear, tWarRoom }: ParetoAnalysisProps) => {
  const paretoData = useMemo(() => {
    const filteredData = selectedYear 
      ? organizationResponses.filter(r => r.answers["基本資訊"]?.["盤查期間"]?.includes(`${selectedYear}年`))
      : organizationResponses;

    const sorted = filteredData
      .map(response => {
        const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
        const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
        return {
          name: response.supplierName,
          emission: emission
        };
      })
      .sort((a, b) => b.emission - a.emission);

    const totalEmission = sorted.reduce((sum, item) => sum + item.emission, 0);
    let cumulativeEmission = 0;
    
    return sorted.map(item => {
      cumulativeEmission += item.emission;
      const cumulativePercentage = (cumulativeEmission / totalEmission) * 100;
      const individualPercentage = (item.emission / totalEmission) * 100;
      return {
        ...item,
        cumulativePercentage,
        individualPercentage,
        isKey: cumulativePercentage <= 80 // 80%法則
      };
    });
  }, [organizationResponses, selectedYear]);

  const keySuppliers = paretoData.filter(item => item.isKey);
  const keyEmissionPercentage = keySuppliers.length > 0 
    ? keySuppliers[keySuppliers.length - 1].cumulativePercentage 
    : 0;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '80%',
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ef4444', '#3b82f6'],
    xaxis: {
      categories: paretoData.slice(0, 10).map(item => item.name),
      labels: {
        rotate: -45,
        style: {
          fontSize: '10px'
        }
      }
    },
    yaxis: [
      {
        title: {
          text: '排放量 (tCO2e)'
        }
      },
      {
        opposite: true,
        title: {
          text: '累積百分比 (%)'
        },
        max: 100
      }
    ],
    title: {
      text: '供應商碳排放帕雷托分析',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 600
      }
    },
    legend: {
      position: 'top'
    }
  };

  const series = [
    {
      name: '排放量',
      type: 'column' as const,
      data: paretoData.slice(0, 10).map(item => item.emission),
      yAxisIndex: 0
    },
    {
      name: '累積百分比',
      type: 'line' as const,
      data: paretoData.slice(0, 10).map(item => item.cumulativePercentage),
      yAxisIndex: 1
    }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          帕雷托分析 (20/80法則)
        </CardTitle>
        <CardDescription>
          識別對總排放量貢獻最大的關鍵供應商
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 關鍵指標 */}
          <div className="space-y-3">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{keySuppliers.length}</div>
              <div className="text-sm text-blue-600">關鍵供應商數量</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">{keyEmissionPercentage.toFixed(1)}%</div>
              <div className="text-sm text-orange-600">排放量貢獻度</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {paretoData.length > 0 ? ((keySuppliers.length / paretoData.length) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-sm text-green-600">供應商比例</div>
            </div>
          </div>

          {/* 帕雷托圖表 */}
          <div className="lg:col-span-2">
            <div className="h-80">
              {typeof window !== 'undefined' && paretoData.length > 0 && (
                <ReactApexChart 
                  options={chartOptions} 
                  series={series} 
                  type="line" 
                  height={300} 
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 3. 熱點地圖元件 (簡化版)
const HotspotMapComponent = ({ supplierData, tWarRoom }: { supplierData: any[], tWarRoom: any }) => {
  const regionData = useMemo(() => {
    const regions = [
      { name: '北部', count: 8, emission: 25600, risk: 'high' },
      { name: '中部', count: 5, emission: 15200, risk: 'medium' },
      { name: '南部', count: 4, emission: 12800, risk: 'medium' },
      { name: '東部', count: 1, emission: 2100, risk: 'low' },
      { name: '國際', count: 2, emission: 8500, risk: 'high' }
    ];
    return regions;
  }, [supplierData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          地理熱點分析
        </CardTitle>
        <CardDescription>
          供應商地理分布與排放量熱點識別
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* 簡化的台灣地圖視覺化 */}
        <div className="relative w-full h-[300px] bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            <svg viewBox="0 0 400 500" className="w-full h-full max-w-sm">
              {/* 台灣輪廓 */}
              <path
                d="M200,80 C280,100 320,180 310,260 C300,340 250,420 200,460 C150,420 100,340 90,260 C80,180 120,100 200,80"
                fill="#e2e8f0"
                stroke="#64748b"
                strokeWidth="2"
              />
              
              {/* 區域熱點標記 */}
              {regionData.map((region, index) => {
                const positions = [
                  { x: 180, y: 130 }, // 北部
                  { x: 170, y: 230 }, // 中部
                  { x: 160, y: 330 }, // 南部
                  { x: 240, y: 230 }, // 東部
                  { x: 280, y: 80 }   // 國際
                ];
                
                const pos = positions[index];
                const size = Math.max(20, Math.min(50, region.count * 5));
                const color = region.risk === 'high' ? '#ef4444' : 
                            region.risk === 'medium' ? '#f59e0b' : '#10b981';

                return (
                  <g key={region.name}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={size}
                      fill={`${color}80`}
                      stroke={color}
                      strokeWidth="2"
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {region.count}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + size + 15}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1e293b"
                      fontSize="11"
                      fontWeight="medium"
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 區域統計 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {regionData.map((region) => (
            <div key={region.name} className="text-center p-3 bg-white border rounded-lg">
              <div className="text-lg font-bold">{region.name}</div>
              <div className="text-sm text-muted-foreground">{region.count} 家</div>
              <div className="text-xs text-muted-foreground">{region.emission.toFixed(0)} tCO2e</div>
              <Badge 
                variant={region.risk === 'high' ? 'destructive' : region.risk === 'medium' ? 'default' : 'secondary'}
                className="text-xs mt-1"
              >
                {region.risk === 'high' ? '高風險' : region.risk === 'medium' ? '中風險' : '低風險'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 4. 趨勢分析面板
const TrendAnalysisPanel = ({ data, tWarRoom }: { data: any[], tWarRoom: any }) => {
  const trendData = useMemo(() => {
    // 模擬月度趨勢數據
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const currentYear = [5200, 5100, 4900, 4800, 4750, 4600, 4500, 4400, 4300, 4200, 4100, 4000];
    const previousYear = [5500, 5400, 5300, 5200, 5100, 5000, 4900, 4800, 4700, 4600, 4500, 4400];
    const target = [5000, 4850, 4700, 4550, 4400, 4250, 4100, 3950, 3800, 3650, 3500, 3350];

    return {
      categories: months,
      series: [
        { name: '2023年實際', data: currentYear },
        { name: '2022年', data: previousYear },
        { name: '減排目標', data: target }
      ]
    };
  }, [data]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    stroke: {
      width: [3, 2, 2],
      curve: 'smooth',
      dashArray: [0, 0, 5]
    },
    colors: ['#3b82f6', '#64748b', '#10b981'],
    xaxis: {
      categories: trendData.categories
    },
    yaxis: {
      title: {
        text: '排放量 (tCO2e)'
      }
    },
    title: {
      text: '供應鏈碳排放趨勢分析',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 600
      }
    },
    legend: {
      position: 'top'
    },
    grid: {
      borderColor: '#f1f5f9'
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          趨勢分析與預測
        </CardTitle>
        <CardDescription>
          時間序列分析、同期比較與減排進度追蹤
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* 關鍵指標 */}
          <div className="space-y-3">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-700">-8.5%</div>
              <div className="text-sm text-green-600">年度減排率</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-700">76%</div>
              <div className="text-sm text-blue-600">目標達成率</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-700">-15%</div>
              <div className="text-sm text-orange-600">預計年底減排</div>
            </div>
          </div>

          {/* 趨勢圖表 */}
          <div className="lg:col-span-3">
            <div className="h-64">
              {typeof window !== 'undefined' && (
                <ReactApexChart 
                  options={chartOptions} 
                  series={trendData.series} 
                  type="line" 
                  height={250} 
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 5. 異常警示管理面板
const AlertManagementPanel = ({ tWarRoom }: { tWarRoom: any }) => {
  const alerts = [
    {
      id: 1,
      supplier: '新竹物流',
      type: 'anomaly',
      severity: 'high',
      message: '排放量較上月增長35%，超出預期範圍',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'new'
    },
    {
      id: 2,
      supplier: '統一速達',
      type: 'threshold',
      severity: 'medium',
      message: '範疇二排放量接近預設閾值',
      timestamp: new Date('2024-01-14T14:22:00'),
      status: 'investigating'
    },
    {
      id: 3,
      supplier: '台塑汽車貨運',
      type: 'data_quality',
      severity: 'low',
      message: '數據完整度低於90%',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          異常警示管理
        </CardTitle>
        <CardDescription>
          自動檢測異常排放模式與數據品質問題
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{alert.supplier}</span>
                    <Badge className={getStatusColor(alert.status)}>
                      {alert.status === 'new' ? '新增' : 
                       alert.status === 'investigating' ? '調查中' : '已處理'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {alert.type === 'anomaly' ? '異常檢測' :
                       alert.type === 'threshold' ? '閾值警告' : '數據品質'}
                    </Badge>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(alert.timestamp, 'yyyy-MM-dd HH:mm')}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>活躍警示: <span className="font-medium text-red-600">2</span></span>
            <span>本週已處理: <span className="font-medium text-green-600">5</span></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 主要War Room頁面元件
export default function CarbonWarRoomPage({ 
  tDashboard, 
  tWarRoom, 
  tCommon 
}: { 
  tDashboard?: any, 
  tWarRoom?: any, 
  tCommon?: any 
}) {
  // 數據源Hook
  const { 
    dataSource, 
    surveyData, 
    isLoading: isDataSourceLoading, 
    switchDataSource, 
    dataSourceOptions 
  } = useSurveyData();

  // 狀態管理
  const [selectedYear, setSelectedYear] = useState<string | null>("2023");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [refreshing, setRefreshing] = useState(false);

  // 從surveyData分離組織和產品數據
  const organizationResponses = useMemo(() => 
    surveyData.filter(response => response.type === "organization"), 
    [surveyData]
  );

  // 計算統計數據
  const stats = useMemo(() => {
    const calculateStats = (responses: any[], year: string | null = null) => {
      const filteredResponses = year 
        ? responses.filter(response => {
            if (response.type === "organization") {
              return response.answers["基本資訊"]?.["盤查期間"]?.includes(`${year}年`);
            }
            return true;
          })
        : responses;

      const orgTotalEmission = filteredResponses
        .filter(response => response.type === "organization")
        .reduce((total, response) => {
          const emissionStr = response.answers["排放量資料"]?.["總排放量"] || "0";
          const emission = parseFloat(emissionStr.split(" ")[0]) || 0;
          return total + emission;
        }, 0);

      const orgCount = new Set(
        filteredResponses
          .filter(response => response.type === "organization")
          .map(response => response.supplierName)
      ).size;

      return {
        orgTotalEmission: orgTotalEmission.toFixed(2),
        orgCount,
        totalResponses: filteredResponses.length
      };
    };

    return calculateStats(surveyData, selectedYear);
  }, [surveyData, selectedYear]);

  // 處理數據刷新
  const handleRefresh = async () => {
    setRefreshing(true);
    // 模擬API調用
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  // 可用年份
  const availableYears = ["2023", "2022", "2021"];

  return (
    <div className="space-y-6 p-6">
      {/* 頁面標題與控制項 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-600" />
            碳排放戰情室
          </h1>
          <p className="text-muted-foreground mt-1">
            實時監控供應鏈碳排放狀況，智能分析減碳機會與風險
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* 數據源選擇 */}
          <Select value={dataSource} onValueChange={switchDataSource}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dataSourceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 年份選擇 */}
          <Select value={selectedYear || "all"} onValueChange={(value) => setSelectedYear(value === "all" ? null : value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有年份</SelectItem>
              {availableYears.map(year => (
                <SelectItem key={year} value={year}>{year}年</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* 刷新按鈕 */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            刷新數據
          </Button>
        </div>
      </div>

      {/* 頁籤導航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">總覽儀表板</TabsTrigger>
          <TabsTrigger value="pareto">帕雷托分析</TabsTrigger>
          <TabsTrigger value="geography">地理分析</TabsTrigger>
          <TabsTrigger value="trend">趨勢分析</TabsTrigger>
          <TabsTrigger value="simulation">情境模擬</TabsTrigger>
          <TabsTrigger value="benchmarking">基準比較</TabsTrigger>
        </TabsList>

        {/* 總覽頁籤 */}
        <TabsContent value="overview" className="space-y-6">
          {/* 核心KPI儀表板 */}
          <CarbonOverviewDashboard 
            stats={stats} 
            selectedYear={selectedYear} 
            tWarRoom={tWarRoom} 
          />

          {/* 關鍵分析區塊 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AlertManagementPanel tWarRoom={tWarRoom} />
            <div className="lg:col-span-2">
              <TrendAnalysisPanel data={organizationResponses} tWarRoom={tWarRoom} />
            </div>
          </div>
        </TabsContent>

        {/* 帕雷托分析頁籤 */}
        <TabsContent value="pareto" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <ParetoAnalysisWidget 
              organizationResponses={organizationResponses}
              selectedYear={selectedYear}
              tWarRoom={tWarRoom}
            />
          </div>
        </TabsContent>

        {/* 地理分析頁籤 */}
        <TabsContent value="geography" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <HotspotMapComponent 
              supplierData={organizationResponses}
              tWarRoom={tWarRoom}
            />
          </div>
        </TabsContent>

        {/* 趨勢分析頁籤 */}
        <TabsContent value="trend" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <TrendAnalysisPanel data={organizationResponses} tWarRoom={tWarRoom} />
          </div>
        </TabsContent>

        {/* 情境模擬頁籤 */}
        <TabsContent value="simulation" className="space-y-6">
          <ScenarioSimulator tWarRoom={tWarRoom} />
        </TabsContent>

        {/* 基準比較頁籤 */}
        <TabsContent value="benchmarking" className="space-y-6">
          <BenchmarkingModule tWarRoom={tWarRoom} />
        </TabsContent>
      </Tabs>

      {/* 狀態列 */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>數據更新時間: {format(new Date(), 'yyyy-MM-dd HH:mm')}</span>
            <span>•</span>
            <span>供應商總數: {stats.orgCount}</span>
            <span>•</span>
            <span>數據覆蓋率: {((stats.totalResponses / (stats.totalResponses + 5)) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span>系統正常</span>
          </div>
        </div>
      </div>
    </div>
  );
}