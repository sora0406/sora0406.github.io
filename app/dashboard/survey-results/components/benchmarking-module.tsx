"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, TrendingUp, TrendingDown, Target, Award, AlertCircle } from "lucide-react"
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface BenchmarkingModuleProps {
  t?: (key: string, params?: Record<string, string | number>) => string;
}

export default function BenchmarkingModule({ t }: BenchmarkingModuleProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("logistics");
  const [selectedRegion, setSelectedRegion] = useState<string>("taiwan");
  const [selectedSize, setSelectedSize] = useState<string>("medium");

  // 基準數據
  const benchmarkData = {
    logistics: {
      taiwan: {
        small: { mean: 2.5, median: 2.3, p90: 1.8, p75: 2.0, p25: 2.8, p10: 3.2 },
        medium: { mean: 4.2, median: 4.0, p90: 3.1, p75: 3.5, p25: 4.8, p10: 5.5 },
        large: { mean: 7.8, median: 7.5, p90: 5.9, p75: 6.8, p25: 8.9, p10: 10.2 }
      }
    }
  };

  // 公司數據（模擬）
  const companyData = {
    currentEmissionIntensity: 3.8, // tCO2e/百萬營收
    industryRanking: 25, // 百分位數排名
    totalSuppliers: 15,
    topPerformers: 3
  };

  // 獲取當前基準數據
  const currentBenchmark = benchmarkData.logistics.taiwan.medium;
  
  // 計算相對表現
  const calculatePerformance = () => {
    const current = companyData.currentEmissionIntensity;
    const median = currentBenchmark.median;
    const p90 = currentBenchmark.p90; // 前10%表現（最佳）
    
    let performance = "average";
    let color = "orange";
    let message = "符合行業平均水準";
    
    if (current <= p90) {
      performance = "excellent";
      color = "green";
      message = "表現優異，位於前10%";
    } else if (current <= currentBenchmark.p75) {
      performance = "good";
      color = "blue";
      message = "表現良好，位於前25%";
    } else if (current >= currentBenchmark.p25) {
      performance = "poor";
      color = "red";
      message = "需要改善，低於行業平均";
    }
    
    return { performance, color, message };
  };

  const performanceResult = calculatePerformance();

  // 雷達圖數據
  const radarChartOptions: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    xaxis: {
      categories: ['排放強度', '能源效率', '再生能源', '數據透明度', '減排目標', '創新投資']
    },
    yaxis: {
      min: 0,
      max: 100
    },
    title: {
      text: '相對表現雷達圖',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 600
      }
    },
    colors: ['#3b82f6', '#64748b', '#10b981'],
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 4
    },
    legend: {
      position: 'bottom'
    }
  };

  const radarSeries = [
    {
      name: '我的表現',
      data: [75, 65, 45, 80, 70, 55] // 各維度得分
    },
    {
      name: '行業平均',
      data: [60, 60, 60, 60, 60, 60] // 基準線
    },
    {
      name: '最佳實踐',
      data: [90, 85, 95, 90, 88, 82] // 前10%表現
    }
  ];

  // 基準比較圖表
  const benchmarkChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    xaxis: {
      categories: ['前10%', '前25%', '中位數', '平均值', '後25%', '後10%'],
      title: {
        text: '排放強度 (tCO2e/百萬營收)'
      }
    },
    colors: ['#10b981', '#3b82f6', '#64748b', '#f59e0b', '#ef4444', '#dc2626'],
    title: {
      text: '行業基準比較',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: 600
      }
    }
  };

  const benchmarkSeries = [{
    name: '排放強度',
    data: [
      currentBenchmark.p90,
      currentBenchmark.p75,
      currentBenchmark.median,
      currentBenchmark.mean,
      currentBenchmark.p25,
      currentBenchmark.p10
    ]
  }];

  // 改善機會識別
  const improvementOpportunities = [
    {
      area: "範疇2排放",
      potential: "30%",
      priority: "high",
      description: "切換至再生能源供應商"
    },
    {
      area: "運輸效率",
      potential: "15%",
      priority: "medium",
      description: "優化路線規劃與車隊管理"
    },
    {
      area: "數據透明度",
      potential: "25%",
      priority: "medium",
      description: "建立完整的數據收集系統"
    },
    {
      area: "供應商合作",
      potential: "20%",
      priority: "high",
      description: "加強供應商減碳培訓"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            基準比較分析
          </CardTitle>
          <CardDescription>
            與同業最佳實踐比較，識別改善機會
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 篩選控制項 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">產業類別</label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistics">物流運輸</SelectItem>
                  <SelectItem value="manufacturing">製造業</SelectItem>
                  <SelectItem value="energy">能源業</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">地區</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="taiwan">台灣</SelectItem>
                  <SelectItem value="asia">亞洲</SelectItem>
                  <SelectItem value="global">全球</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">企業規模</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">小型 (&lt;100人)</SelectItem>
                  <SelectItem value="medium">中型 (100-1000人)</SelectItem>
                  <SelectItem value="large">大型 (&gt;1000人)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 表現概況 */}
          <Alert className={`mb-6 border-${performanceResult.color}-200 bg-${performanceResult.color}-50`}>
            <div className="flex items-center gap-2">
              {performanceResult.performance === 'excellent' && <Award className="h-4 w-4 text-green-600" />}
              {performanceResult.performance === 'good' && <TrendingUp className="h-4 w-4 text-blue-600" />}
              {performanceResult.performance === 'average' && <BarChart className="h-4 w-4 text-orange-600" />}
              {performanceResult.performance === 'poor' && <AlertCircle className="h-4 w-4 text-red-600" />}
              <AlertDescription className={`text-${performanceResult.color}-700 font-medium`}>
                {performanceResult.message}
              </AlertDescription>
            </div>
          </Alert>

          {/* 關鍵指標 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-700">
                  {companyData.currentEmissionIntensity}
                </div>
                <div className="text-sm text-muted-foreground">
                  目前排放強度
                </div>
                <div className="text-xs text-muted-foreground">
                  tCO2e/百萬營收
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-700">
                  {companyData.industryRanking}%
                </div>
                <div className="text-sm text-muted-foreground">
                  行業排名
                </div>
                <div className="text-xs text-muted-foreground">
                  百分位數
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-700">
                  {currentBenchmark.median}
                </div>
                <div className="text-sm text-muted-foreground">
                  行業中位數
                </div>
                <div className="text-xs text-muted-foreground">
                  tCO2e/百萬營收
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-700">
                  {currentBenchmark.p90}
                </div>
                <div className="text-sm text-muted-foreground">
                  最佳實踐
                </div>
                <div className="text-xs text-muted-foreground">
                  前10%表現
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 圖表區域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 基準比較圖 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">基準比較</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {typeof window !== 'undefined' && (
                    <ReactApexChart 
                      options={benchmarkChartOptions} 
                      series={benchmarkSeries} 
                      type="bar" 
                      height={300} 
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 雷達圖 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">多維度表現</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {typeof window !== 'undefined' && (
                    <ReactApexChart 
                      options={radarChartOptions} 
                      series={radarSeries} 
                      type="radar" 
                      height={300} 
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 改善機會 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">改善機會識別</CardTitle>
              <CardDescription>
                基於基準比較分析，為您識別主要改善領域
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementOpportunities.map((opportunity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{opportunity.area}</span>
                        <Badge className={getPriorityColor(opportunity.priority)}>
                          {opportunity.priority === 'high' ? '高優先級' : 
                           opportunity.priority === 'medium' ? '中優先級' : '低優先級'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {opportunity.potential}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          改善潛力
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {opportunity.description}
                    </p>
                    
                    {/* 進度條顯示改善潛力 */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>改善潛力</span>
                        <span>{opportunity.potential}</span>
                      </div>
                      <Progress 
                        value={parseInt(opportunity.potential)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}