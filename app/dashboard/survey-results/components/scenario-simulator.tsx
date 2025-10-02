"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Settings, TrendingDown, Target, Calculator } from "lucide-react"
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ScenarioSimulatorProps {
  t?: (key: string, params?: Record<string, string | number>) => string;
}

export default function ScenarioSimulator({ t }: ScenarioSimulatorProps) {
  // 提供默認的翻譯函數，避免 undefined 錯誤
  const translate = t || ((key: string) => key);
  
  const [scenarioType, setScenarioType] = useState<string>("aggressive_reduction");
  const [targetYear, setTargetYear] = useState<number>(2030);
  const [reductionTarget, setReductionTarget] = useState<number[]>([50]);
  const [renewableAdoption, setRenewableAdoption] = useState<number[]>([80]);
  const [efficiencyImprovement, setEfficiencyImprovement] = useState<number[]>([30]);
  const [carbonPrice, setCarbonPrice] = useState<number[]>([150]);
  const [simulationResults, setSimulationResults] = useState<any>(null);

    // 情境類型選項
    const scenarioTypes = [
      { value: "baseline", label: translate('scenarioSimulator.basicSettings.scenarioTypes.baseline.label'), description: translate('scenarioSimulator.basicSettings.scenarioTypes.baseline.description') },
      { value: "aggressive_reduction", label: translate('scenarioSimulator.basicSettings.scenarioTypes.aggressiveReduction.label'), description: translate('scenarioSimulator.basicSettings.scenarioTypes.aggressiveReduction.description') },
      { value: "technology_breakthrough", label: translate('scenarioSimulator.basicSettings.scenarioTypes.technologyBreakthrough.label'), description: translate('scenarioSimulator.basicSettings.scenarioTypes.technologyBreakthrough.description') },
      { value: "policy_impact", label: translate('scenarioSimulator.basicSettings.scenarioTypes.policyImpact.label'), description: translate('scenarioSimulator.basicSettings.scenarioTypes.policyImpact.description') }
    ];

  // 即時執行模擬
  const runSimulation = () => {
    // 生成模擬結果
    const baselineEmission = 45000; // 基準排放量
    const reduction = (reductionTarget[0] / 100) * baselineEmission;
    const cost = reduction * 120; // 每噸120美元減排成本
    const roi = (reduction * 50) / cost; // 假設每噸減排價值50美元
    
    const results = {
      totalReduction: reduction,
      reductionPercentage: reductionTarget[0],
      costEstimate: cost,
      roi: roi,
      paybackPeriod: 1 / roi,
      yearlyProjections: generateYearlyProjections(baselineEmission, targetYear, reductionTarget[0]),
      riskAnalysis: {
        implementationProbability: 0.75,
        keyRiskFactors: [
          translate('scenarioSimulator.results.riskFactors.technologyMaturity'),
          translate('scenarioSimulator.results.riskFactors.capitalInvestment'),
          translate('scenarioSimulator.results.riskFactors.supplierCooperation')
        ]
      }
    };
    
    setSimulationResults(results);
  };

  // 當參數改變時自動執行模擬
  useEffect(() => {
    runSimulation();
  }, [scenarioType, targetYear, reductionTarget, renewableAdoption, efficiencyImprovement, carbonPrice]);

  // 生成年度預測數據
  const generateYearlyProjections = (baseline: number, targetYear: number, targetReduction: number) => {
    const years = targetYear - 2024 + 1;
    const annualReduction = targetReduction / years;
    
    return Array.from({ length: years }, (_, i) => {
      const year = 2024 + i;
      const cumulativeReduction = annualReduction * (i + 1);
      const emission = baseline * (1 - cumulativeReduction / 100);
      const cost = emission * 0.02 * (i + 1); // 遞增投資成本
      
      return {
        year,
        baselineEmission: baseline,
        projectedEmission: emission,
        reduction: baseline - emission,
        cost
      };
    });
  };

  // 圖表配置
  const chartOptions: ApexOptions = useMemo(() => ({
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
      categories: simulationResults?.yearlyProjections?.map((p: any) => p.year) || []
    },
    yaxis: {
      title: {
        text: translate('scenarioSimulator.chart.yAxisTitle')
      }
    },
    title: {
      text: translate('scenarioSimulator.chart.title'),
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
  }), [simulationResults]);

  const chartSeries = useMemo(() => {
    if (!simulationResults?.yearlyProjections) return [];
    
    return [
      {
        name: translate('scenarioSimulator.chart.baselineScenario'),
        data: simulationResults.yearlyProjections.map((p: any) => p.baselineEmission)
      },
      {
        name: translate('scenarioSimulator.chart.reductionScenario'),
        data: simulationResults.yearlyProjections.map((p: any) => p.projectedEmission)
      },
      {
        name: translate('scenarioSimulator.chart.targetPath'),
        data: simulationResults.yearlyProjections.map((p: any) => p.baselineEmission * (1 - (reductionTarget[0] / 100)))
      }
    ];
  }, [simulationResults, reductionTarget]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="h-5 w-5 text-blue-600" />
            {translate('scenarioSimulator.title')}
          </CardTitle>
          <CardDescription>
            {translate('scenarioSimulator.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左側：參數設定 */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">{translate('scenarioSimulator.tabs.parameters')}</h3>
              </div>
              
              {/* 基本參數 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{translate('scenarioSimulator.basicSettings.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="scenario-type">{translate('scenarioSimulator.basicSettings.scenarioType')}</Label>
                    <Select value={scenarioType} onValueChange={setScenarioType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {scenarioTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex flex-col text-left">
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-year">{translate('scenarioSimulator.basicSettings.targetYear.label')}</Label>
                    <Select value={targetYear.toString()} onValueChange={(value) => setTargetYear(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2027">{translate('scenarioSimulator.basicSettings.targetYear.2027')}</SelectItem>
                        <SelectItem value="2030">{translate('scenarioSimulator.basicSettings.targetYear.2030')}</SelectItem>
                        <SelectItem value="2035">{translate('scenarioSimulator.basicSettings.targetYear.2035')}</SelectItem>
                        <SelectItem value="2050">{translate('scenarioSimulator.basicSettings.targetYear.2050')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{translate('scenarioSimulator.basicSettings.reductionTarget')}: {reductionTarget[0]}%</Label>
                    <Slider
                      value={reductionTarget}
                      onValueChange={setReductionTarget}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 技術參數 */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{translate('scenarioSimulator.technicalParameters.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{translate('scenarioSimulator.technicalParameters.renewableAdoption')}: {renewableAdoption[0]}%</Label>
                    <Slider
                      value={renewableAdoption}
                      onValueChange={setRenewableAdoption}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{translate('scenarioSimulator.technicalParameters.efficiencyImprovement')}: {efficiencyImprovement[0]}%</Label>
                    <Slider
                      value={efficiencyImprovement}
                      onValueChange={setEfficiencyImprovement}
                      max={50}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{translate('scenarioSimulator.technicalParameters.carbonPrice')}: ${carbonPrice[0]}/tCO2e</Label>
                    <Slider
                      value={carbonPrice}
                      onValueChange={setCarbonPrice}
                      max={300}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右側：模擬結果 */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">{translate('scenarioSimulator.tabs.results')}</h3>
              </div>

              {simulationResults ? (
                <div className="space-y-6">
                  {/* 關鍵結果指標 */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-blue-700">
                          {(simulationResults.totalReduction / 1000).toFixed(1)}k
                        </div>
                        <div className="text-xs text-blue-600">{translate('scenarioSimulator.results.reductionAmount')}</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-green-700">
                          {simulationResults.reductionPercentage}%
                        </div>
                        <div className="text-xs text-green-600">{translate('scenarioSimulator.results.reductionPercentage')}</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-orange-700">
                          ${(simulationResults.costEstimate / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-orange-600">{translate('scenarioSimulator.results.investmentCost')}</div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-xl font-bold text-purple-700">
                          {simulationResults.paybackPeriod.toFixed(1)}
                        </div>
                        <div className="text-xs text-purple-600">{translate('scenarioSimulator.results.paybackPeriod')}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 趨勢圖表 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{translate('scenarioSimulator.results.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        {typeof window !== 'undefined' && chartSeries.length > 0 && (
                          <ReactApexChart 
                            options={chartOptions} 
                            series={chartSeries} 
                            type="line" 
                            height={250} 
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 風險評估 */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{translate('scenarioSimulator.results.riskAssessment')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{translate('scenarioSimulator.results.implementationProbability')}</span>
                          <span className="text-sm">{(simulationResults.riskAnalysis.implementationProbability * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${simulationResults.riskAnalysis.implementationProbability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">{translate('scenarioSimulator.results.keyRiskFactors')}</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {simulationResults.riskAnalysis.keyRiskFactors.map((factor: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">{factor}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{translate('scenarioSimulator.actions.pleaseSetParameters')}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}