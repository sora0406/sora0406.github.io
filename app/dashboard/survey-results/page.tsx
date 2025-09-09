"use client"

import CarbonWarRoomPage from './carbon-war-room'

export default function WarRoomPage({ 
  tDashboard, 
  tWarRoom, 
  tCommon 
}: { 
  tDashboard?: any, 
  tWarRoom?: any, 
  tCommon?: any 
}) {
  // 使用新的War Room頁面
  return (
<<<<<<< HEAD
    <CarbonWarRoomPage 
      tDashboard={tDashboard}
      tWarRoom={tWarRoom}
      tCommon={tCommon}
    />
  );
}
=======
    <div className="compact-layout">
      <div className="compact-header -mx-4 -mt-6 px-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{tWarRoom?.('title') || '戰情室'}</h1>
            <p className="text-sm text-slate-600 mt-1">
              {tWarRoom?.('subtitle') || '監控供應鏈碳排放狀況，追蹤減碳進度'}
            </p>
          </div>
        
        {/* 數據源和年份選擇 */}
        <div className="flex items-center gap-4">
          {/* 數據源選擇器 */}
          <div className="flex items-center gap-2">
            <Select value={dataSource} onValueChange={switchDataSource}>
              <SelectTrigger className="h-6 px-4 py-3 text-xs text-gray-300 bg-white border-none rounded-md hover:bg-accent focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-w-[120px] w-auto">
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
          </div>

          {/* 年份選擇 */}
          <div className="flex items-center gap-2">
            <Label htmlFor="year-select" className="text-sm font-medium">年度:</Label>
            <Select 
              value={selectedYear || "all"}
              onValueChange={handleYearChange}
            >
              <SelectTrigger id="year-select" >
                <SelectValue placeholder="選擇年份" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tWarRoom?.('tags.all_years') || '所有年份'}</SelectItem>
                {availableYears.map(year => (
                  <SelectItem key={year} value={year}>{year}年</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* 數據儀表板 */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="ultra-compact-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600">
                {tWarRoom?.('statistics.total_responses') || '總回覆數'}
              </p>
              <p className="text-xl font-semibold text-slate-900">{stats.totalResponses}</p>
              <p className="text-xs text-slate-500">
                {selectedYear ? `${selectedYear}年度數據` : '所有年度'}
              </p>
            </div>
            <div className="p-2 bg-slate-100 rounded-md">
              <BarChart3 className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </div>
        <div className="ultra-compact-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600">
                {tWarRoom?.('statistics.carbon_footprint') || '產品總碳足跡'}
              </p>
              <p className="text-xl font-semibold text-slate-900">
                {stats.productTotalFootprint} <span className="text-sm font-normal text-slate-500">kgCO2e</span>
              </p>
              <p className="text-xs text-slate-500">
                產品碳足跡: {stats.productCount}家
              </p>
            </div>
            <div className="p-2 bg-slate-100 rounded-md">
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </div>
        
        <div className="ultra-compact-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600">
                {tWarRoom?.('statistics.total_emission') || '組織總排放量'}
              </p>
              <p className="text-xl font-semibold text-slate-900">
                {stats.orgTotalEmission} <span className="text-sm font-normal text-slate-500">tCO2e</span>
              </p>
              <p className="text-xs text-slate-500">
                組織排放: {stats.orgCount}家
              </p>
            </div>
            <div className="p-2 bg-slate-100 rounded-md">
              <Target className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </div>
        
        <div className="ultra-compact-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-600">
                {tWarRoom?.('scope_distribution') || '排放類別分佈'}
              </p>
              <div className="space-y-1 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs text-slate-600">範疇 1</span>
                  </div>
                  <span className="text-xs font-medium">{scopePercentages.scope1.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-1"></div>
                    <span className="text-xs text-slate-600">範疇 2</span>
                  </div>
                  <span className="text-xs font-medium">{scopePercentages.scope2.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-500 mr-1"></div>
                    <span className="text-xs text-slate-600">範疇 3</span>
                  </div>
                  <span className="text-xs font-medium">{scopePercentages.scope3.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="p-2 bg-slate-100 rounded-md">
              <PieChart className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
                    
      {/* 數據可視化圖表 */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle>{tWarRoom?.('supplier_carbon_data') || '供應商碳排放視覺化'}</CardTitle>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
                          <Button 
                variant={activeChart === "suppliers" ? "default" : "outline"} 
                            size="sm" 
                onClick={() => setActiveChart("suppliers")}
                className="flex items-center gap-1"
                          >
                <BarChart2 className="h-4 w-4" />
                {tWarRoom?.('chart_options.suppliers') || '排放量排名'}
                          </Button>
                          <Button 
                variant={activeChart === "map" ? "default" : "outline"} 
                            size="sm" 
                onClick={() => setActiveChart("map")}
                className="flex items-center gap-1"
                          >
                <MapPin className="h-4 w-4" />
                {tWarRoom?.('chart_options.map') || '供應商分佈'}
                          </Button>
                        </div>
                      </div>
        </CardHeader>
        <CardContent>
          {activeChart === "suppliers" ? (
            <div className="space-y-8">
              {/* 兩個圖表並排顯示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 使用 ApexCharts 的組織溫盤排放量排名 */}
                <div className="space-y-3">
                  <div className="h-80">
                    {typeof window !== 'undefined' && topEmitters.organization.length > 0 ? (
                      <ReactApexChart 
                        options={organizationChartOptions} 
                        series={[{ 
                          name: '排放量', 
                          data: topEmitters.organization.map(item => item.value) 
                        }]} 
                        type="bar" 
                        height={300} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">沒有可用數據</p>
                                  </div>
                    )}
                            </div>
                  
                  {/* 前五大組織排放量列表 */}
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{tWarRoom?.('top_emitters.organization_title') || '前五大組織碳排放供應商'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">{tWarRoom?.('top_emitters.rank') || '排名'}</TableHead>
                            <TableHead>{tWarRoom?.('top_emitters.supplier_name') || '供應商名稱'}</TableHead>
                            <TableHead className="text-right">{tWarRoom?.('top_emitters.emission') || '排放量'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topEmitters.organization.map((item, index) => (
                            <TableRow key={`org-${index}`}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.value.toFixed(2)} {item.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
              </div>
                
                {/* 使用 ApexCharts 的產品碳足跡排名 */}
                <div className="space-y-3">
                  <div className="h-80">
                    {typeof window !== 'undefined' && topEmitters.product.length > 0 ? (
                      <ReactApexChart 
                        options={productChartOptions} 
                        series={[{ 
                          name: '碳足跡', 
                          data: topEmitters.product.map(item => item.value) 
                        }]} 
                        type="bar" 
                        height={300} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">沒有可用數據</p>
                        </div>
                    )}
                  </div>
            
                  {/* 前五大產品碳足跡列表 */}
                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{tWarRoom?.('top_emitters.product_title') || '前五大產品碳足跡供應商'}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[50px]">{tWarRoom?.('top_emitters.rank') || '排名'}</TableHead>
                            <TableHead>{tWarRoom?.('top_emitters.supplier_name') || '供應商名稱'}</TableHead>
                            <TableHead className="text-right">{tWarRoom?.('top_emitters.carbon_footprint') || '碳足跡'}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topEmitters.product.map((item, index) => (
                            <TableRow key={`prod-${index}`}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="text-right">{item.value.toFixed(2)} {item.unit}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <MapPin className="h-5 w-5 text-green-500 mr-2" />
                {tWarRoom?.('regional_distribution.title') || '供應商區域分佈'}
              </h3>
              
              {/* 台灣地圖模擬 */}
              <div className="relative w-full h-[400px] bg-slate-100 rounded-lg overflow-hidden">
                {/* 模擬台灣地圖背景 - 在實際實現時可替換為真實的地圖組件 */}
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                  <svg viewBox="0 0 400 600" className="w-full h-full max-w-md max-h-[400px]">
                    {/* 簡化的台灣輪廓 */}
                    <path
                      d="M200,100 C300,120 350,200 340,300 C330,400 270,500 200,550 C130,500 70,400 60,300 C50,200 100,120 200,100"
                      fill="#e2e8f0"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    
                    {/* 區域標記點 */}
                    {supplierRegionDistribution.map((region) => {
                      const x = ((region.id === "north" ? 180 : 
                                 region.id === "central" ? 170 : 
                                 region.id === "south" ? 160 : 
                                 region.id === "east" ? 240 :
                                 300));
                      
                      const y = ((region.id === "north" ? 150 : 
                                 region.id === "central" ? 280 : 
                                 region.id === "south" ? 410 : 
                                 region.id === "east" ? 280 :
                                 100));
                      
                      // 根據供應商數量和排放量決定圓圈大小
                      const size = region.count > 0 ? Math.max(10, Math.min(40, region.count * 10)) : 0;
                      
                      return region.count > 0 ? (
                        <g key={region.id}>
                          <circle
                            cx={x}
                            cy={y}
                            r={size}
                            fill={region.id === "international" ? "rgba(236, 72, 153, 0.6)" : "rgba(59, 130, 246, 0.6)"}
                            stroke={region.id === "international" ? "#ec4899" : "#3b82f6"}
                            strokeWidth="2"
                          />
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                          >
                            {region.count}
                          </text>
                          <text
                            x={x}
                            y={y + size + 15}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#1e293b"
                            fontSize="12"
                            fontWeight="medium"
                          >
                            {region.name}
                          </text>
                        </g>
                      ) : null;
                    })}
                  </svg>
                        </div>
                      </div>
              
              {/* 區域詳情列表 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {supplierRegionDistribution
                  .filter(region => region.count > 0)
                  .map(region => (
                    <Card key={region.id} className="bg-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{region.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{tWarRoom?.('regional_distribution.supplier_count') || '供應商數量'}:</span>
                            <span className="font-medium">{region.count}</span>
                                  </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{tWarRoom?.('regional_distribution.total_emission') || '排放總量'}:</span>
                            <span className="font-medium">{region.totalEmission}</span>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                      ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
    </div>
  </div>
  );
}
>>>>>>> 064f4cc (新增專業級樣式和佈局，包含緊湊佈局、專業級陰影、現代化邊框及按鈕設計，並更新儀表板和數據要求頁面以使用新樣式，改善用戶界面和可讀性。)
