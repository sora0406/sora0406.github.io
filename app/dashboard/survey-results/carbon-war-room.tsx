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
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// 動態載入 ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// 導入數據源Hook
import { useSurveyData } from "@/hooks/useSurveyData"

// 導入i18n翻譯Hook
// import { useTranslations } from "@/lib/i18n/use-translations"

// 導入分析工具元件
import ScenarioSimulator from "./components/scenario-simulator"
import BenchmarkingModule from "./components/benchmarking-module"

// 篩選器介面定義
interface FilterState {
  isoStatus: 'all' | 'certified' | 'non-certified'; // {t('compliance.isoCertification')}狀態
  spendingRange: [number, number]; // {t('filters.spendingRange')}
  emissionRange: [number, number]; // {t('filters.emissionRange')} (tCO2e)
  carbonAction: 'all' | 'implemented' | 'planning' | 'not-implemented'; // {t('filters.carbonAction')}
  supplierType: 'all' | 'large-enterprise' | 'sme' | 'agent'; // {t('filters.supplierType')}
}

interface CarbonOverviewProps {
  stats: any;
  selectedYear: string | null;
  tWarRoom: any;
}

// 1. 碳排放{t('tabs.overview')}元件
const CarbonOverviewDashboard = ({ stats, selectedYear, t }: { stats: any; selectedYear: string | null; t: any }) => {
  // {t('tabs.simulationShort')}{t('overview.scope1')}-3排放量數據（實際應從stats中計算）
  const scopeEmissions = useMemo(() => {
    const totalEmission = parseFloat(stats.orgTotalEmission) || 0;
    return {
      scope1: (totalEmission * 0.35).toFixed(1), // {t('overview.scope1')}約35%
      scope2: (totalEmission * 0.45).toFixed(1), // {t('overview.scope2')}約45%
      scope3: (totalEmission * 0.20).toFixed(1)  // {t('overview.scope3')}約20%
    };
  }, [stats.orgTotalEmission]);

  return (
    <div className="space-y-3 mb-3">
      {/* 整合的核心指標區塊 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* 整合的{t('overview.scope1')}-3排放量 */}
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
            <CardTitle className="text-xs font-medium text-foreground">
              {t('overview.carbonAnalysis')}
          </CardTitle>
            <Factory className="h-3 w-3 text-red-600" />
        </CardHeader>
          <CardContent className="px-3 pb-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">{scopeEmissions.scope1}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.scope1')}<br/>(tCO2e)</div>
          </div>
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">{scopeEmissions.scope2}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.scope2')}<br/>(tCO2e)</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">{scopeEmissions.scope3}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.scope3')}<br/>(tCO2e)</div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground">{t('overview.totalEmissions')}</span>
                <span className="text-xs font-medium text-foreground">{stats.orgTotalEmission} tCO2e</span>
              </div>
            </div>
        </CardContent>
      </Card>

        {/* 整合的{t('overview.keySuppliers')}與數據{t('overview.coverage')} */}
        {/* <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
            <CardTitle className="text-xs font-medium text-foreground">
              {t('overview.supplierOverview')}
          </CardTitle>
            <Users className="h-3 w-3 text-green-600" />
        </CardHeader>
          <CardContent className="px-3 pb-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-center">11111
                <div className="text-sm font-bold text-foreground">{Math.round(stats.orgCount * 0.2)}</div>
                <div className="text-[10px] text-muted-foreground">{t('overview.keySuppliers')}</div>
          </div>
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">{stats.orgCount}</div>
                <div className="text-[10px] text-muted-foreground">{t('overview.totalSuppliers')}</div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground">{t('overview.coverage')}</span>
                <span className="text-xs font-medium text-foreground">
                  {((stats.totalResponses / (stats.totalResponses + 5)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
        </CardContent>
      </Card> */}

        {/* {t('overview.performanceMetrics')} */}
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
            <CardTitle className="text-xs font-medium text-foreground">
              {t('overview.performanceMetrics')}
          </CardTitle>
            <TrendingUp className="h-3 w-3 text-blue-600" />
        </CardHeader>
          <CardContent className="px-3 pb-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">
            {stats.orgCount > 0 ? (parseFloat(stats.orgTotalEmission) / stats.orgCount).toFixed(1) : '0'} 
          </div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.avgIntensity')}<br/>(tCO2e/{t('overview.suppliers')})</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-foreground">
                  {((parseFloat(stats.orgTotalEmission) / parseFloat(scopeEmissions.scope2)) * 100).toFixed(1)}%
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.scope2')}<br/>{t('overview.percentage')}(%)</div>
              </div>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-muted-foreground">{t('overview.reductionTarget')}</span>
                <span className="text-xs font-medium text-foreground">-10%</span>
              </div>
            </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

interface ParetoAnalysisProps {
  organizationResponses: any[];
  selectedYear: string | null;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// 2. 帕雷托分析元件
const ParetoAnalysisWidget = ({ organizationResponses, selectedYear, t }: ParetoAnalysisProps) => {
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
          text: t('overview.totalEmissions') + ' (tCO2e)'
        }
      },
      {
        opposite: true,
        title: {
          text: t('overview.percentage') + ' (%)'
        },
        max: 100
      }
    ],
    title: {
      text: t('tabs.hotspot'),
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
    <Card className="border border-border bg-card">
      <CardHeader className="pb-1 px-3 pt-2">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-3 w-3 text-primary" />
          <div>
            <h3 className="text-xs font-medium">{t('tabs.hotspot')}</h3>
            <p className="text-[10px] text-muted-foreground">20/80法則識別{t('overview.keySuppliers')}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2">
          {/* 關鍵指標 */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="bg-blue-50 border-l-2 border-blue-500 p-1 text-center">
            <div className="text-sm font-bold text-foreground">{keySuppliers.length}</div>
            <div className="text-[9px] text-muted-foreground">{t('overview.keySuppliers')}</div>
            </div>
          <div className="bg-orange-50 border-l-2 border-orange-500 p-1 text-center">
            <div className="text-sm font-bold text-foreground">{keyEmissionPercentage.toFixed(1)}%</div>
            <div className="text-[9px] text-muted-foreground">排放貢獻度</div>
            </div>
          <div className="bg-green-50 border-l-2 border-green-500 p-1 text-center">
            <div className="text-sm font-bold text-foreground">
                {paretoData.length > 0 ? ((keySuppliers.length / paretoData.length) * 100).toFixed(1) : 0}%
              </div>
            <div className="text-[9px] text-muted-foreground">供應商比例</div>
            </div>
          </div>

          {/* 帕雷托圖表 */}
        <div className="h-48 mb-2">
              {typeof window !== 'undefined' && paretoData.length > 0 && (
                <ReactApexChart 
                  options={chartOptions} 
                  series={series} 
                  type="line" 
              height={180} 
                />
              )}
            </div>

        {/* 前5名供應商列表 */}
        <div className="space-y-1">
          <h4 className="text-[10px] font-medium text-foreground mb-1">排放量前5名供應商</h4>
          {paretoData.slice(0, 5).map((supplier, index) => (
            <div key={supplier.name} className="flex justify-between items-center py-1 px-2 bg-muted/30">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-medium text-muted-foreground w-3">#{index + 1}</span>
                <span className="text-[10px] text-foreground">{supplier.name}</span>
          </div>
              <div className="text-right">
                <div className="text-[10px] font-medium text-foreground">{supplier.emission.toFixed(1)} tCO2e</div>
                <div className="text-[9px] text-muted-foreground">{supplier.individualPercentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 3. {t('tabs.hotspotShort')}地圖元件 (簡化版)
const HotspotMapComponent = ({ supplierData, t }: { supplierData: any[], t: (key: string, params?: Record<string, string | number>) => string }) => {
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
    <Card className="border border-border bg-card">
      <CardHeader className="pb-1 px-3 pt-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-green-600" />
          <div>
            <h3 className="text-xs font-medium">地理{t('tabs.hotspot')}</h3>
            <p className="text-[10px] text-muted-foreground">供應商地理分布與排放量{t('tabs.hotspotShort')}識別</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2">
        {/* 簡化的台灣地圖視覺化 */}
        <div className="relative w-full h-[200px] bg-gradient-to-b from-blue-50 to-green-50 overflow-hidden mb-2">
          <div className="absolute inset-0 p-2 flex items-center justify-center">
            <svg viewBox="0 0 400 500" className="w-full h-full max-w-32">
              {/* 台灣輪廓 */}
              <path
                d="M200,80 C280,100 320,180 310,260 C300,340 250,420 200,460 C150,420 100,340 90,260 C80,180 120,100 200,80"
                fill="#e2e8f0"
                stroke="#64748b"
                strokeWidth="1"
              />
              
              {/* 區域{t('tabs.hotspotShort')}標記 */}
              {regionData.map((region, index) => {
                const positions = [
                  { x: 180, y: 130 }, // 北部
                  { x: 170, y: 230 }, // 中部
                  { x: 160, y: 330 }, // 南部
                  { x: 240, y: 230 }, // 東部
                  { x: 280, y: 80 }   // 國際
                ];
                
                const pos = positions[index];
                const size = Math.max(15, Math.min(35, region.count * 3));
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
                      strokeWidth="1"
                    />
                    <text
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {region.count}
                    </text>
                    <text
                      x={pos.x}
                      y={pos.y + size + 10}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#1e293b"
                      fontSize="8"
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
          {regionData.map((region) => (
            <div key={region.name} className="bg-muted/30 p-1 text-center">
              <div className="text-[10px] font-medium text-foreground">{region.name}</div>
              <div className="text-[9px] text-muted-foreground">{region.count} {t('overview.suppliers')}</div>
              <div className="text-[8px] text-muted-foreground">{region.emission.toFixed(0)} tCO2e</div>
              <div className={`text-[8px] px-1 mt-1 inline-block ${
                region.risk === 'high' ? 'bg-red-100 text-red-800' : 
                region.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {region.risk === 'high' ? '高風險' : region.risk === 'medium' ? '中風險' : '低風險'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 4. {t('tabs.trend')}面板
const TrendAnalysisPanel = ({ data, t }: { data: any[], t: (key: string, params?: Record<string, string | number>) => string }) => {
  const trendData = useMemo(() => {
    // {t('tabs.simulationShort')}月度{t('tabs.trendShort')}數據
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const currentYear = [5200, 5100, 4900, 4800, 4750, 4600, 4500, 4400, 4300, 4200, 4100, 4000];
    const previousYear = [5500, 5400, 5300, 5200, 5100, 5000, 4900, 4800, 4700, 4600, 4500, 4400];
    const target = [5000, 4850, 4700, 4550, 4400, 4250, 4100, 3950, 3800, 3650, 3500, 3350];

    return {
      categories: months,
      series: [
        { name: '2023年實際', data: currentYear },
        { name: '2022年', data: previousYear },
        { name: t('overview.reductionTarget'), data: target }
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
        text: t('overview.totalEmissions') + ' (tCO2e)'
      }
    },
    title: {
      text: 'Supply Chain Carbon Emissions ' + t('tabs.trend'),
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
    <Card className="border border-border bg-card">
      <CardHeader className="pb-1 px-3 pt-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-3 w-3 text-green-600" />
          <div>
            <h3 className="text-xs font-medium">{t('tabs.trend')}</h3>
            {/* <p className="text-[10px] text-muted-foreground">時間序列分析、同期比較與減排進度追蹤</p> */}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
          {/* 關鍵指標 */}
          <div className="space-y-1">
            <div className="bg-green-50 border-l-2 border-green-500 p-1 text-center">
              <div className="text-sm font-bold text-foreground">-8.5%</div>
              <div className="text-[9px] text-muted-foreground">年度減排率</div>
            </div>
            <div className="bg-blue-50 border-l-2 border-blue-500 p-1 text-center">
              <div className="text-sm font-bold text-foreground">76%</div>
              <div className="text-[9px] text-muted-foreground">目標達成率</div>
            </div>
            <div className="bg-orange-50 border-l-2 border-orange-500 p-1 text-center">
              <div className="text-sm font-bold text-foreground">-15%</div>
              <div className="text-[9px] text-muted-foreground">預計年底減排</div>
            </div>
          </div>

          {/* {t('tabs.trendShort')}圖表 */}
          <div className="lg:col-span-3">
            <div className="h-48">
              {typeof window !== 'undefined' && (
                <ReactApexChart 
                  options={chartOptions} 
                  series={trendData.series} 
                  type="line" 
                  height={180} 
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 5. 合規與評比分析面板
const CompliancePanel = ({ t }: { t: any }) => {
  const complianceData = {
    isoTotal: 20,
    isoCompliant: 14,
    esgTotal: 20,
    esgGood: 8,
    esgFair: 7,
    esgPoor: 5
  };

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
        <CardTitle className="text-xs font-medium text-foreground">
          {t('compliance.title')}
        </CardTitle>
        <Shield className="h-3 w-3 text-blue-600" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{complianceData.isoCompliant}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('compliance.isoCertification')}<br/>({complianceData.isoTotal}{t('overview.suppliers')})</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{((complianceData.isoCompliant/complianceData.isoTotal)*100).toFixed(0)}%</div>
            <div className="text-[10px] text-muted-foreground">{t('compliance.certificationRate')}</div>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="text-[10px] text-muted-foreground mb-1">{t('compliance.esgRating')}</div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-green-50 border-l-2 border-green-500 p-1">
              <div className="text-xs font-bold text-foreground">{complianceData.esgGood}</div>
              <div className="text-[9px] text-muted-foreground">{t('compliance.excellent')}</div>
            </div>
            <div className="bg-yellow-50 border-l-2 border-yellow-500 p-1">
              <div className="text-xs font-bold text-foreground">{complianceData.esgFair}</div>
              <div className="text-[9px] text-muted-foreground">{t('compliance.average')}</div>
            </div>
            <div className="bg-red-50 border-l-2 border-red-500 p-1">
              <div className="text-xs font-bold text-foreground">{complianceData.esgPoor}</div>
              <div className="text-[9px] text-muted-foreground">{t('compliance.needsImprovement')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 6. 數據與{t('overview.coverage')}分析面板
const DataCoveragePanel = ({ stats, t }: { stats: any, t: any }) => {
  const coverageData = {
    emissionCoverage: 85.3,
    financialCoverage: 78.2,
    completedTasks: 156,
    totalTasks: 200,
    pendingTasks: 44
  };

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
        <CardTitle className="text-xs font-medium text-foreground">
          {t('dataCoverage.title')}
        </CardTitle>
        <BarChart2 className="h-3 w-3 text-green-600" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{coverageData.emissionCoverage}%</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('dataCoverage.emissionData')}<br/>{t('overview.coverage')}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{coverageData.financialCoverage}%</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('dataCoverage.financialData')}<br/>{t('overview.coverage')}</div>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted-foreground">{t('dataCoverage.completeness')}</span>
            <span className="text-xs font-medium text-foreground">
              {coverageData.completedTasks}/{coverageData.totalTasks}
            </span>
          </div>
          <div className="w-full bg-muted h-1 mb-1">
            <div 
              className="bg-green-500 h-1" 
              style={{ width: `${(coverageData.completedTasks/coverageData.totalTasks)*100}%` }}
            ></div>
          </div>
          <div className="text-[9px] text-muted-foreground">
            {t('dataCoverage.pending')}: {coverageData.pendingTasks} 項目
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 7. {t('overview.keySuppliers')}與結構分析面板
const KeySupplierStructurePanel = ({ stats, t }: { stats: any, t: (key: string, params?: Record<string, string | number>) => string }) => {
  const structureData = {
    keySuppliers: Math.round(stats.orgCount * 0.2),
    keyEmission: parseFloat(stats.orgTotalEmission) * 0.8,
    smeCount: Math.round(stats.orgCount * 0.6),
    agentCount: Math.round(stats.orgCount * 0.25),
    directCount: Math.round(stats.orgCount * 0.15)
  };

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
        <CardTitle className="text-xs font-medium text-foreground">
          {t('overview.keySuppliers')}
        </CardTitle>
        <Users className="h-3 w-3 text-purple-600" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{structureData.keySuppliers}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.keySuppliers')}</div>
                  </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">        {((stats.totalResponses / (stats.totalResponses + 5)) * 100).toFixed(1)}%</div>
          
            <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.coverage')}</div>
                </div>
              </div>
        <div className="pt-2 border-t border-border">
          <div className="text-[10px] text-muted-foreground mb-1">結構分布</div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-blue-50 border-l-2 border-blue-500 p-1">
              <div className="text-xs font-bold text-foreground">{structureData.smeCount}</div>
              <div className="text-[9px] text-muted-foreground">{t('filters.sme')}</div>
            </div>
            <div className="bg-orange-50 border-l-2 border-orange-500 p-1">
              <div className="text-xs font-bold text-foreground">{structureData.agentCount}</div>
              <div className="text-[9px] text-muted-foreground">{t('filters.agent')}</div>
        </div>
            <div className="bg-green-50 border-l-2 border-green-500 p-1">
              <div className="text-xs font-bold text-foreground">{structureData.directCount}</div>
              <div className="text-[9px] text-muted-foreground">Direct Procurement</div>
            </div>
          </div>
        </div>
      
      </CardContent>
    </Card>
  );
};

// 8. 能源使用與細節分析面板
const EnergyUsagePanel = ({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) => {
  const energyData = {
    renewableRate: 42.6,
    totalEnergy: 1247,
    renewableEnergy: 530,
    gridEnergy: 717
  };

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
        <CardTitle className="text-xs font-medium text-foreground">
          {t('overview.energyUsageStatus')}
        </CardTitle>
        <Zap className="h-3 w-3 text-yellow-600" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{energyData.renewableRate}%</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.renewableRate')}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{energyData.totalEnergy}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{t('overview.totalElectricityConsumption')}<br/>(MWh)</div>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted-foreground">{t('overview.electricityStructure')}</span>   
            <button className="text-[9px] text-blue-600 hover:text-blue-800">{t('overview.viewDetails')}</button>
          </div>
          <div className="grid grid-cols-2 gap-1 text-center">
            <div className="bg-green-50 border-l-2 border-green-500 p-1">
              <div className="text-xs font-bold text-foreground">{energyData.renewableEnergy}</div>
              <div className="text-[9px] text-muted-foreground">{t('overview.renewableEnergy')}</div>
            </div>
            <div className="bg-gray-50 border-l-2 border-gray-500 p-1">
              <div className="text-xs font-bold text-foreground">{energyData.gridEnergy}</div>
              <div className="text-[9px] text-muted-foreground">{t('overview.gridEnergy')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 篩選器元件
const FilterPanel = ({ 
  filters, 
  onFiltersChange,
  t 
}: { 
  filters: FilterState; 
  onFiltersChange: (filters: FilterState) => void;
  t: any;
}) => {
  return (
    <Card className="border border-border bg-card">
      <CardHeader className="pb-1 px-3 pt-2">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">{t('filters.title')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          
          {/* 1. {t('compliance.isoCertification')}狀態 */}
          <div className="space-y-1 ">
            <Label className="text-[10px] text-muted-foreground">{t('compliance.isoCertification')}狀態</Label>
            <Select 
              value={filters.isoStatus} 
              onValueChange={(value: any) => onFiltersChange({...filters, isoStatus: value})}
            >
              <SelectTrigger className="h-7 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all')}</SelectItem>
                <SelectItem value="certified">{t('filters.certified')}</SelectItem>
                <SelectItem value="non-certified">{t('filters.nonCertified')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 2. {t('filters.spendingRange')} */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">
              {t('filters.spendingRange')} ({filters.spendingRange[0]}-{filters.spendingRange[1]}M)
            </Label>
            <Slider
              value={filters.spendingRange}
              onValueChange={(value: any) => onFiltersChange({...filters, spendingRange: value})}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          {/* 3. {t('filters.emissionRange')} */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">
              {t('filters.emissionRange')} ({filters.emissionRange[0]}-{filters.emissionRange[1]} tCO2e)
            </Label>
            <Slider
              value={filters.emissionRange}
              onValueChange={(value: any) => onFiltersChange({...filters, emissionRange: value})}
              max={5000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>

          {/* 4. {t('filters.carbonAction')} */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">{t('filters.carbonAction')}</Label>
            <Select 
              value={filters.carbonAction} 
              onValueChange={(value: any) => onFiltersChange({...filters, carbonAction: value})}
            >
              <SelectTrigger className="h-7 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all')}</SelectItem>
                <SelectItem value="implemented">{t('filters.implemented')}</SelectItem>
                <SelectItem value="planning">{t('filters.planning')}</SelectItem>
                <SelectItem value="not-implemented">{t('filters.notImplemented')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 5. {t('filters.supplierType')} */}
          <div className="space-y-1">
            <Label className="text-[10px] text-muted-foreground">{t('filters.supplierType')}</Label>
            <Select 
              value={filters.supplierType} 
              onValueChange={(value: any) => onFiltersChange({...filters, supplierType: value})}
            >
              <SelectTrigger className="h-7 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('filters.all')}</SelectItem>
                <SelectItem value="large-enterprise">{t('filters.largeEnterprise')}</SelectItem>
                <SelectItem value="sme">{t('filters.sme')}</SelectItem>
                <SelectItem value="agent">{t('filters.agent')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 重置按鈕 */}
        <div className="mt-2 pt-2 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-6 text-[10px] px-2"
            onClick={() => onFiltersChange({
              isoStatus: 'all',
              spendingRange: [0, 10],
              emissionRange: [0, 50],
              carbonAction: 'all',
              supplierType: 'all'
            })}
          >
            {t('filters.reset')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// 9. {t('filters.carbonAction')}與成效分析面板
const CarbonReductionPanel = ({ t }: { t: (key: string, params?: Record<string, string | number>) => string }) => {
  const reductionData = {
    hasActionPlan: 12,
    totalSuppliers: 20,
    reductionTarget: -8.5,
    actualReduction: -6.2,
    estimatedSaving: 456.8
  };

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
        <CardTitle className="text-xs font-medium text-foreground">
          {t('filters.carbonAction')}
        </CardTitle>
        <TrendingDown className="h-3 w-3 text-green-600" />
      </CardHeader>
      <CardContent className="px-3 pb-2">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{reductionData.hasActionPlan}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">有計畫<br/>供應商</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{((reductionData.hasActionPlan/reductionData.totalSuppliers)*100).toFixed(0)}%</div>
            <div className="text-[10px] text-muted-foreground">計畫{t('overview.coverage')}</div>
          </div>
        </div>
        <div className="pt-2 border-t border-border">
          <div className="text-[10px] text-muted-foreground mb-1">成效追蹤</div>
          <div className="grid grid-cols-2 gap-1 text-center">
            <div className="bg-orange-50 border-l-2 border-orange-500 p-1">
              <div className="text-xs font-bold text-foreground">{reductionData.reductionTarget}%</div>
              <div className="text-[9px] text-muted-foreground">目標減排</div>
            </div>
            <div className="bg-blue-50 border-l-2 border-blue-500 p-1">
              <div className="text-xs font-bold text-foreground">{reductionData.actualReduction}%</div>
              <div className="text-[9px] text-muted-foreground">實際減排</div>
            </div>
          </div>
          <div className="text-[9px] text-muted-foreground mt-1">
            節省: {reductionData.estimatedSaving} tCO2e
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 主要War Room頁面元件
interface CarbonWarRoomPageProps {
  tDashboard?: any;
  tWarRoom?: any;
  tCommon?: any;
  getYearTranslation?: (year: number) => string;
}

export default function CarbonWarRoomPage({ 
  tDashboard, 
  tWarRoom, 
  tCommon,
  getYearTranslation
}: CarbonWarRoomPageProps = {}) {
  // 翻譯函數 - 使用傳入的 tWarRoom 或提供預設值
  const t = (key: string, params?: Record<string, string | number>) => {
    if (tWarRoom) {
      try {
        return tWarRoom(key, params);
      } catch (error) {
        console.warn(`Missing translation for warRoom.${key}`);
        return key;
      }
    }
    // 如果沒有傳入翻譯函數，返回預設值
    return key;
  };
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
  
  // 篩選器狀態
  const [filters, setFilters] = useState<FilterState>({
    isoStatus: 'all',
    spendingRange: [0, 1000],
    emissionRange: [0, 5000],
    carbonAction: 'all',
    supplierType: 'all'
  });

  // 從surveyData分離組織和產品數據
  const organizationResponses = useMemo(() => 
    surveyData.filter(response => response.type === "organization"), 
    [surveyData]
  );

  // 篩選邏輯
  const filteredOrganizationResponses = useMemo(() => {
    return organizationResponses.filter(response => {
      // {t('tabs.simulationShort')}供應商數據（實際應從response中獲取）
      const mockSupplierData = {
        isoStatus: Math.random() > 0.3 ? 'certified' : 'non-certified',
        spending: Math.floor(Math.random() * 1000),
        emission: parseFloat(response.answers["排放量資料"]?.["{t('overview.totalEmissions')}"]?.split(" ")[0] || "0"),
        carbonAction: ['implemented', 'planning', 'not-implemented'][Math.floor(Math.random() * 3)],
        supplierType: ['large-enterprise', 'sme', 'agent'][Math.floor(Math.random() * 3)]
      };

      // 應用{t('filters.title')}
      if (filters.isoStatus !== 'all' && mockSupplierData.isoStatus !== filters.isoStatus) return false;
      if (mockSupplierData.spending < filters.spendingRange[0] || mockSupplierData.spending > filters.spendingRange[1]) return false;
      if (mockSupplierData.emission < filters.emissionRange[0] || mockSupplierData.emission > filters.emissionRange[1]) return false;
      if (filters.carbonAction !== 'all' && mockSupplierData.carbonAction !== filters.carbonAction) return false;
      if (filters.supplierType !== 'all' && mockSupplierData.supplierType !== filters.supplierType) return false;

      return true;
    });
  }, [organizationResponses, filters]);

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

    return calculateStats(filteredOrganizationResponses, selectedYear);
  }, [filteredOrganizationResponses, selectedYear]);

  // 處理數據刷新
  const handleRefresh = async () => {
    setRefreshing(true);
    // {t('tabs.simulationShort')}API調用
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  // 可用年份
  const availableYears = ["2023", "2022", "2021"];

  return (
    <div className="min-h-screen bg-background">
      <div className="compact-container max-w-7xl mx-auto">
        {/* 頁面標題與控制項 */}
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 mb-5">
          <div className="flex items-center ">
      
            <div>
              {/* <h5 className="  text-md  tracking-tight">Carbon War Room</h5> */}
              {/* <p className="text-sm text-muted-foreground">
                實時監控供應鏈碳排放狀況，智能分析減碳機會與風險
              </p> */}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 數據源選擇 */}
            {/* <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-muted-foreground">數據源</label>
              <Select value={dataSource} onValueChange={switchDataSource}>
                <SelectTrigger className="w-[140px] h-9 modern-input">
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
            </div> */}

            {/* 年份選擇 */}
            <div className="flex items-center gap-2">
              {/* <label className="text-sm font-medium text-muted-foreground">年度</label> */}
              <Select value={selectedYear || "all"} onValueChange={(value) => setSelectedYear(value === "all" ? null : value)}>
                <SelectTrigger className="w-[120px] h-9 modern-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 刷新按鈕 */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="compact-button"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
               
            </Button>
          </div>
        </div>

        {/* 頁籤導航 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="modern-tabs h-auto p-1 grid w-full grid-cols-3 lg:grid-cols-5 gap-1">
            <TabsTrigger value="overview" className="modern-tab">
              <span className="hidden sm:inline">{t('tabs.overview')}</span>
              <span className="sm:hidden">{t('tabs.overviewShort')}</span>
            </TabsTrigger>
            <TabsTrigger value="hotspot" className="modern-tab">
              <span className="hidden sm:inline">{t('tabs.hotspot')}</span>
              <span className="sm:hidden">{t('tabs.hotspotShort')}</span>
            </TabsTrigger>
            <TabsTrigger value="trend" className="modern-tab">
              <span className="hidden sm:inline">{t('tabs.trend')}</span>
              <span className="sm:hidden">{t('tabs.trendShort')}</span>
            </TabsTrigger>
            <TabsTrigger value="simulation" className="modern-tab">
              <span className="hidden sm:inline">{t('tabs.simulation')}</span>
              <span className="sm:hidden">{t('tabs.simulationShort')}</span>
            </TabsTrigger>
            <TabsTrigger value="benchmarking" className="modern-tab">
              <span className="hidden sm:inline">{t('tabs.benchmarking')}</span>
              <span className="sm:hidden">{t('tabs.benchmarkingShort')}</span>
            </TabsTrigger>

            
          </TabsList>

          {/* {t('tabs.overviewShort')}頁籤 */}
          <TabsContent value="overview" className="mt-2 space-y-2">
            {/* 篩選器 */}
            <FilterPanel filters={filters} onFiltersChange={setFilters} t={t} />
            
            {/* 核心KPI儀表板 */}
            <CarbonOverviewDashboard 
              stats={stats} 
              selectedYear={selectedYear} 
              t={t} 
            />

            {/* 新的分析維度區塊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <CompliancePanel t={t} />
              <DataCoveragePanel stats={stats} t={t} />
              <KeySupplierStructurePanel stats={stats} t={t} />
              <EnergyUsagePanel t={t} />
              <CarbonReductionPanel t={t} />
              <Card className="border border-border bg-card">
                <CardHeader className="flex flex-row items-center justify-between pb-1 px-3 pt-2">
                  <CardTitle className="text-xs font-medium text-foreground">
                    {t('overview.expenditureAndEmissionAnalysis')}
                  </CardTitle>
                  <Globe className="h-3 w-3 text-indigo-600" />
                </CardHeader>
                <CardContent className="px-3 pb-2">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="text-center">
                      <div className="text-sm font-bold text-foreground">456.8K</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">Total Spending<br/>(M)</div>
              </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-foreground">892</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">Estimated Emissions<br/>(tCO2e)</div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-muted-foreground">Cat 1-8</span>
                      <button className="text-[9px] text-blue-600 hover:text-blue-800">View Categories</button>
                    </div>
                    <div className="text-[9px] text-muted-foreground">
                    Classified: 85% | Unclassified: 15%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* {t('tabs.trend')}區塊 */}
            <div className="mt-3">
              <TrendAnalysisPanel data={filteredOrganizationResponses} t={t} />
            </div>
          </TabsContent>

          {/* {t('tabs.hotspot')}頁籤 */}
          <TabsContent value="hotspot" className="mt-2 space-y-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* 帕雷托分析 */}
            <ParetoAnalysisWidget 
                organizationResponses={filteredOrganizationResponses}
              selectedYear={selectedYear}
              t={t}
            />
              {/* 地理{t('tabs.hotspot')} */}
            <HotspotMapComponent 
                supplierData={filteredOrganizationResponses}
              t={t}
            />
            </div>
          </TabsContent>

          {/* {t('tabs.trend')}頁籤 */}
          <TabsContent value="trend" className="mt-2 space-y-2">
            <TrendAnalysisPanel data={filteredOrganizationResponses} t={t} />
          </TabsContent>

          {/* {t('tabs.simulation')}頁籤 */}
          <TabsContent value="simulation" className="mt-2 space-y-2">
            <ScenarioSimulator t={t} />
          </TabsContent>

          {/* {t('tabs.benchmarking')}頁籤 */}
          <TabsContent value="benchmarking" className="mt-2 space-y-2">
            <BenchmarkingModule t={t} />
          </TabsContent>
        </Tabs>

        {/* 狀態列 */}
        <div className="border-t border-border mt-6 pt-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-3">
              <span>更新時間: {format(new Date(), 'MM-dd HH:mm')}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('status.filterResults')}: {filteredOrganizationResponses.length}/{organizationResponses.length}{t('overview.suppliers')}</span>
              <span className="hidden sm:inline">•</span>
              <span>{t('overview.coverage')}: {((stats.totalResponses / (stats.totalResponses + 5)) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>系統正常</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}