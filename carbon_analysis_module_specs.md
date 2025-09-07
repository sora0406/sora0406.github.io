# 碳排放分析模組開發規格書

## 1. 核心元件架構

### 1.1 前端UI元件清單

#### A. 儀表板元件 (Dashboard Components)
```javascript
// 主要儀表板元件
1. CarbonOverviewDashboard
   - 供應鏈碳排放總覽
   - KPI指標卡片組
   - 快速篩選器

2. ParetoAnalysisWidget
   - 20/80法則視覺化
   - 關鍵供應商列表
   - 排名變化趨勢

3. HotspotMapComponent
   - 地理熱點地圖
   - 區域排放統計
   - 互動式縮放功能

4. TrendAnalysisPanel
   - 時間序列趨勢圖
   - 同期比較分析
   - 預測曲線展示
```

#### B. 分析工具元件 (Analysis Tools)
```javascript
5. ScenarioSimulator
   - 情境參數設定面板
   - 模擬結果比較表
   - 敏感性分析圖表

6. BenchmarkingModule
   - 同業基準比較
   - 相對表現雷達圖
   - 改善空間識別

7. DrillDownAnalyzer
   - 多維度鑽取分析
   - 動態篩選組合
   - 詳細資料展示

8. AlertManagementPanel
   - 異常警示列表
   - 警示規則設定
   - 處理狀態追蹤
```

#### C. 報表元件 (Reporting Components)
```javascript
9. ReportBuilder
   - 拖拉式報表設計器
   - 模板管理功能
   - 自動化報表排程

10. ExportManager
    - 多格式匯出功能
    - 批量匯出管理
    - 匯出歷史記錄

11. PrintPreviewModule
    - 列印版面預覽
    - 頁面設定選項
    - 浮水印管理
```

### 1.2 後端服務元件清單

#### A. 資料處理服務 (Data Processing Services)
```java
1. EmissionDataProcessor
   - 原始資料清理
   - 資料格式標準化
   - 計算邏輯執行

2. ParetoAnalysisEngine
   - 帕雷托分析算法
   - 排名計算邏輯
   - 動態閾值調整

3. AnomalyDetectionService
   - 統計異常檢測
   - 機器學習異常識別
   - 異常成因分析

4. TrendAnalysisEngine
   - 時間序列分析
   - 趨勢預測模型
   - 季節性調整算法
```

#### B. 模擬分析服務 (Simulation Services)
```java
5. ScenarioEngine
   - 基準情境建模
   - 減碳情境模擬
   - 政策影響評估

6. OptimizationService
   - 線性規劃求解器
   - 多目標最佳化
   - 約束條件管理

7. MonteCarloSimulator
   - 風險機率模擬
   - 不確定性分析
   - 信心區間計算
```

#### C. 外部整合服務 (Integration Services)
```java
8. BenchmarkDataService
   - 行業基準資料更新
   - 外部資料源串接
   - 資料品質驗證

9. GeospatialService
   - 地理資訊處理
   - 空間分析計算
   - 地圖圖層管理
```

## 2. 圖表元件規格

### 2.1 帕雷托分析圖表

#### A. 帕雷托柱狀圖 (Pareto Chart)
```javascript
// ECharts 配置範例
const paretoChartConfig = {
  title: '供應商碳排放帕雷托分析',
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {
    data: ['碳排放量', '累積百分比']
  },
  xAxis: {
    type: 'category',
    data: [], // 供應商名稱
    axisLabel: { rotate: 45 }
  },
  yAxis: [
    {
      type: 'value',
      name: '碳排放量 (tCO2e)',
      position: 'left'
    },
    {
      type: 'value',
      name: '累積百分比 (%)',
      position: 'right',
      max: 100
    }
  ],
  series: [
    {
      name: '碳排放量',
      type: 'bar',
      data: [], // 排放量數據
      itemStyle: {
        color: '#FF6B6B'
      }
    },
    {
      name: '累積百分比',
      type: 'line',
      yAxisIndex: 1,
      data: [], // 累積百分比數據
      itemStyle: {
        color: '#4ECDC4'
      },
      markLine: {
        data: [{ yAxis: 80, label: { formatter: '80% 線' } }]
      }
    }
  ]
};
```

#### B. 供應商分布散點圖 (Scatter Plot)
```javascript
const scatterChartConfig = {
  title: '供應商排放量 vs 成本分析',
  xAxis: {
    type: 'value',
    name: '採購金額 (萬元)',
    scale: true
  },
  yAxis: {
    type: 'value',
    name: '碳排放量 (tCO2e)',
    scale: true
  },
  visualMap: {
    dimension: 2,
    min: 0,
    max: 100,
    text: ['高風險', '低風險'],
    calculable: true
  },
  series: [{
    type: 'scatter',
    symbolSize: function(data) {
      return Math.sqrt(data[2]) * 2; // 依風險分數調整點大小
    },
    data: [], // [採購金額, 碳排放量, 風險分數, 供應商ID]
    emphasis: {
      label: {
        show: true,
        formatter: function(param) {
          return param.data[3]; // 顯示供應商名稱
        },
        position: 'top'
      }
    }
  }]
};
```

### 2.2 地理熱點地圖

#### A. 熱點地圖 (Heatmap)
```javascript
// 使用 Mapbox GL JS 或高德地圖
const heatmapConfig = {
  type: 'heatmap',
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [] // GeoJSON 格式的供應商位置和排放量
    }
  },
  paint: {
    'heatmap-weight': {
      property: 'emission_intensity',
      type: 'exponential',
      stops: [
        [0, 0],
        [1000, 1]
      ]
    },
    'heatmap-intensity': {
      stops: [
        [0, 1],
        [9, 3]
      ]
    },
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(0,0,255,0)',
      0.2, 'rgb(0,0,255)',
      0.4, 'rgb(0,255,255)',
      0.6, 'rgb(0,255,0)',
      0.8, 'rgb(255,255,0)',
      1, 'rgb(255,0,0)'
    ]
  }
};
```

#### B. 區域統計圖表 (Regional Statistics)
```javascript
const regionalChartConfig = {
  title: '各地區碳排放統計',
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} tCO2e ({d}%)'
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    data: [], // 各地區排放量數據
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    labelLine: {
      show: true
    },
    label: {
      show: true,
      formatter: '{b}\n{c} tCO2e'
    }
  }]
};
```

### 2.3 趨勢分析圖表

#### A. 時間序列線圖 (Time Series Chart)
```javascript
const trendChartConfig = {
  title: '供應鏈碳排放趋勢分析',
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['實際排放', '預測排放', '目標路徑']
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 100
  }],
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    name: '碳排放量 (tCO2e)'
  },
  series: [
    {
      name: '實際排放',
      type: 'line',
      data: [], // 歷史實際數據
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        }
      }
    },
    {
      name: '預測排放',
      type: 'line',
      lineStyle: {
        type: 'dashed'
      },
      data: [] // 預測數據
    },
    {
      name: '目標路徑',
      type: 'line',
      lineStyle: {
        color: '#2ECC71',
        width: 3
      },
      data: [] // 目標軌跡
    }
  ]
};
```

### 2.4 情境模擬圖表

#### A. 情境比較圖 (Scenario Comparison)
```javascript
const scenarioComparisonConfig = {
  title: '減碳情境比較分析',
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['基準情境', '積極減碳', '技術突破']
  },
  xAxis: {
    type: 'category',
    data: ['2024', '2025', '2026', '2027', '2028', '2030']
  },
  yAxis: {
    type: 'value',
    name: '累積減排量 (萬tCO2e)'
  },
  series: [
    {
      name: '基準情境',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: []
    },
    {
      name: '積極減碳',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: []
    },
    {
      name: '技術突破',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: []
    }
  ]
};
```

#### B. 成本效益氣泡圖 (Cost-Benefit Bubble Chart)
```javascript
const costBenefitBubbleConfig = {
  title: '減碳措施成本效益分析',
  xAxis: {
    type: 'value',
    name: '投資成本 (萬元)',
    scale: true
  },
  yAxis: {
    type: 'value',
    name: '年減排量 (tCO2e)',
    scale: true
  },
  series: [{
    type: 'scatter',
    symbolSize: function(data) {
      return data[2]; // 回收期決定氣泡大小
    },
    data: [], // [成本, 減排量, 回收期, 措施名稱]
    label: {
      show: true,
      formatter: function(param) {
        return param.data[3];
      }
    }
  }]
};
```

## 3. 資料庫欄位設計

### 3.1 供應商排放數據表 (supplier_emissions)
```sql
CREATE TABLE supplier_emissions (
    -- 主鍵與關聯
    emission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    supplier_id BIGINT NOT NULL,
    reporting_period DATE NOT NULL, -- 報告期間 (年-月)
    
    -- 基本排放數據
    scope1_emission DECIMAL(15,3), -- 範疇一排放 (tCO2e)
    scope2_emission DECIMAL(15,3), -- 範疇二排放 (tCO2e)  
    scope3_emission DECIMAL(15,3), -- 範疇三排放 (tCO2e)
    total_emission DECIMAL(15,3) GENERATED ALWAYS AS 
        (scope1_emission + scope2_emission + scope3_emission) STORED,
    
    -- 活動數據
    energy_consumption DECIMAL(15,3), -- 能源消耗 (MWh)
    renewable_energy_ratio DECIMAL(5,2), -- 再生能源比例 (%)
    production_volume DECIMAL(15,3), -- 生產量
    revenue DECIMAL(15,2), -- 營收 (萬元)
    
    -- 排放強度
    emission_intensity_revenue DECIMAL(10,4) GENERATED ALWAYS AS 
        (total_emission / NULLIF(revenue, 0)) STORED, -- tCO2e/萬元
    emission_intensity_production DECIMAL(10,4), -- tCO2e/生產單位
    
    -- 資料品質指標
    data_completeness_score DECIMAL(3,1), -- 完整度評分 (0-10)
    data_accuracy_score DECIMAL(3,1), -- 準確度評分 (0-10)
    verification_status ENUM('unverified', 'internal_verified', 'third_party_verified'),
    data_source ENUM('questionnaire', 'api', 'estimation', 'public_data'),
    
    -- 地理與分類資訊
    country_code VARCHAR(3),
    region VARCHAR(50),
    industry_code VARCHAR(10), -- 產業代碼
    supplier_tier ENUM('tier1', 'tier2', 'tier3'),
    
    -- 時間戳記
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- 索引
    INDEX idx_supplier_period (supplier_id, reporting_period),
    INDEX idx_total_emission (total_emission DESC),
    INDEX idx_region_industry (region, industry_code)
);
```

### 3.2 帕雷托分析結果表 (pareto_analysis_results)
```sql
CREATE TABLE pareto_analysis_results (
    analysis_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    analysis_date DATE NOT NULL,
    analysis_scope VARCHAR(100), -- 分析範疇 (如: 全球/特定地區/特定產業)
    
    -- 分析參數
    total_suppliers INT,
    total_emission DECIMAL(15,3),
    analysis_dimension ENUM('emission_absolute', 'emission_intensity', 'cost_weighted'),
    
    -- 帕雷托結果
    pareto_suppliers_count INT, -- 關鍵供應商數量 (通常為20%)
    pareto_emission_contribution DECIMAL(5,2), -- 關鍵供應商排放貢獻度 (%)
    
    -- 閾值設定
    key_supplier_threshold DECIMAL(5,2) DEFAULT 80.0, -- 累積排放閾值
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_analysis_date (analysis_date),
    INDEX idx_analysis_scope (analysis_scope)
);
```

### 3.3 帕雷托供應商詳情表 (pareto_supplier_details)
```sql
CREATE TABLE pareto_supplier_details (
    detail_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    analysis_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    
    -- 排名資訊
    emission_rank INT, -- 排放量排名
    emission_value DECIMAL(15,3), -- 排放量
    individual_contribution DECIMAL(5,2), -- 個別貢獻度 (%)
    cumulative_contribution DECIMAL(5,2), -- 累積貢獻度 (%)
    
    -- 分類標記
    is_key_supplier BOOLEAN, -- 是否為關鍵供應商
    supplier_category ENUM('key_20', 'important_60', 'standard_20'),
    
    -- 變化趨勢
    rank_change_vs_previous INT, -- 與上期排名變化
    emission_change_vs_previous DECIMAL(15,3), -- 與上期排放變化
    
    FOREIGN KEY (analysis_id) REFERENCES pareto_analysis_results(analysis_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    
    INDEX idx_analysis_rank (analysis_id, emission_rank),
    INDEX idx_supplier_contribution (supplier_id, cumulative_contribution)
);
```

### 3.4 異常檢測結果表 (anomaly_detection_results)
```sql
CREATE TABLE anomaly_detection_results (
    anomaly_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    supplier_id BIGINT NOT NULL,
    detection_date DATE NOT NULL,
    
    -- 異常檢測結果
    is_anomaly BOOLEAN,
    anomaly_type ENUM('statistical', 'trend_break', 'ml_detected'),
    anomaly_score DECIMAL(5,3), -- 異常分數 (0-1)
    confidence_level DECIMAL(3,1), -- 信心水準 (%)
    
    -- 異常值資訊
    current_value DECIMAL(15,3),
    expected_value DECIMAL(15,3),
    expected_range_lower DECIMAL(15,3),
    expected_range_upper DECIMAL(15,3),
    deviation_percentage DECIMAL(5,2),
    
    -- 統計指標
    z_score DECIMAL(5,3),
    isolation_score DECIMAL(5,3), -- 孤立森林分數
    
    -- 異常成因分析
    potential_causes JSON, -- 可能原因列表
    recommended_actions JSON, -- 建議行動
    
    -- 處理狀態
    alert_status ENUM('new', 'investigating', 'confirmed', 'false_positive', 'resolved'),
    assigned_to VARCHAR(100), -- 負責處理人員
    resolution_notes TEXT,
    resolved_at TIMESTAMP NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    
    INDEX idx_supplier_date (supplier_id, detection_date),
    INDEX idx_anomaly_status (alert_status),
    INDEX idx_anomaly_score (anomaly_score DESC)
);
```

### 3.5 情境模擬參數表 (scenario_parameters)
```sql
CREATE TABLE scenario_parameters (
    scenario_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    scenario_name VARCHAR(100) NOT NULL,
    scenario_type ENUM('baseline', 'aggressive_reduction', 'technology_breakthrough', 'policy_impact'),
    description TEXT,
    
    -- 模擬時間範圍
    start_year YEAR,
    end_year YEAR,
    
    -- 基本參數
    global_reduction_target DECIMAL(5,2), -- 全球減排目標 (%)
    annual_reduction_rate DECIMAL(5,2), -- 年減排率 (%)
    carbon_price_trajectory JSON, -- 碳價格軌跡
    
    -- 技術參數
    renewable_adoption_curve JSON, -- 再生能源採用曲線
    energy_efficiency_improvement JSON, -- 能效改善參數
    breakthrough_technologies JSON, -- 突破性技術參數
    
    -- 政策參數  
    carbon_tax_rates JSON, -- 碳稅率設定
    cbam_implementation JSON, -- CBAM實施參數
    subsidy_programs JSON, -- 補助方案參數
    
    -- 經濟參數
    discount_rate DECIMAL(5,3), -- 折現率
    inflation_rate DECIMAL(5,3), -- 通膨率
    gdp_growth_assumptions JSON, -- GDP成長假設
    
    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_scenario_type (scenario_type),
    INDEX idx_time_range (start_year, end_year)
);
```

### 3.6 情境模擬結果表 (scenario_simulation_results)
```sql
CREATE TABLE scenario_simulation_results (
    result_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    scenario_id BIGINT NOT NULL,
    supplier_id BIGINT,
    simulation_year YEAR,
    
    -- 模擬結果
    projected_emission DECIMAL(15,3), -- 預測排放量
    baseline_emission DECIMAL(15,3), -- 基準排放量
    emission_reduction DECIMAL(15,3), -- 減排量
    reduction_percentage DECIMAL(5,2), -- 減排比例
    
    -- 成本效益分析
    reduction_cost DECIMAL(15,2), -- 減排成本 (萬元)
    cost_per_ton DECIMAL(10,2), -- 每噸減排成本 (元/tCO2e)
    cumulative_cost DECIMAL(15,2), -- 累積成本
    net_present_value DECIMAL(15,2), -- 淨現值
    
    -- 風險評估
    implementation_probability DECIMAL(3,2), -- 實施機率 (0-1)
    risk_factors JSON, -- 風險因子
    sensitivity_analysis JSON, -- 敏感性分析結果
    
    -- 不確定性區間
    projection_lower_bound DECIMAL(15,3), -- 預測下界
    projection_upper_bound DECIMAL(15,3), -- 預測上界
    confidence_interval DECIMAL(3,1), -- 信心區間 (%)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (scenario_id) REFERENCES scenario_parameters(scenario_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    
    INDEX idx_scenario_year (scenario_id, simulation_year),
    INDEX idx_supplier_scenario (supplier_id, scenario_id)
);
```

### 3.7 基準數據表 (benchmark_data)
```sql
CREATE TABLE benchmark_data (
    benchmark_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    -- 基準分類
    benchmark_type ENUM('industry', 'region', 'size', 'best_practice'),
    industry_code VARCHAR(10),
    region VARCHAR(50),
    company_size_category ENUM('small', 'medium', 'large'),
    
    -- 基準指標
    metric_name VARCHAR(100), -- 指標名稱
    metric_unit VARCHAR(20), -- 單位
    
    -- 統計值
    sample_size INT, -- 樣本數
    mean_value DECIMAL(15,4), -- 平均值
    median_value DECIMAL(15,4), -- 中位數
    percentile_25 DECIMAL(15,4), -- 25百分位數
    percentile_75 DECIMAL(15,4), -- 75百分位數
    percentile_90 DECIMAL(15,4), -- 90百分位數 (優秀水準)
    percentile_10 DECIMAL(15,4), -- 10百分位數 (落後水準)
    
    -- 資料來源與品質
    data_source VARCHAR(200), -- 資料來源
    data_year YEAR, -- 資料年度
    update_frequency ENUM('annual', 'semi_annual', 'quarterly'),
    confidence_score DECIMAL(3,1), -- 資料可信度 (0-10)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_benchmark_classification (benchmark_type, industry_code, region),
    INDEX idx_metric_year (metric_name, data_year)
);
```

## 4. API接口設計

### 4.1 帕雷托分析API
```javascript
// GET /api/carbon-analysis/pareto
{
  "analysisScope": "global|region|industry",
  "timeRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-12-31"
  },
  "filters": {
    "regions": ["Asia", "Europe"],
    "industries": ["Manufacturing", "Energy"],
    "supplierTiers": ["tier1", "tier2"]
  },
  "dimension": "emission_absolute|emission_intensity|cost_weighted"
}

// Response
{
  "analysisId": "PA20241201001",
  "summary": {
    "totalSuppliers": 1250,
    "keySuppliers": 250,
    "keySupplierPercentage": 20.0,
    "emissionContribution": 82.5,
    "totalEmission": 125000.5
  },
  "paretoData": [
    {
      "supplierId": "SUP001",
      "supplierName": "ABC Manufacturing",
      "rank": 1,
      "emission": 5200.3,
      "individualContribution": 4.16,
      "cumulativeContribution": 4.16,
      "isKeySupplier": true
    }
  ],
  "chartData": {
    "categories": ["SUP001", "SUP002", "..."],
    "emissions": [5200.3, 4800.7, "..."],
    "cumulativePercentages": [4.16, 8.00, "..."]
  }
}
```

### 4.2 情境模擬API
```javascript
// POST /api/carbon-analysis/scenario-simulation
{
  "scenarioName": "積極減碳情境2030",
  "scenarioType": "aggressive_reduction",
  "parameters": {
    "targetYear": 2030,
    "globalReductionTarget": 50.0,
    "annualReductionRate": 7.2,
    "technologyUpgrade": {
      "renewableEnergyAdoption": 80.0,
      "energyEfficiencyImprovement": 30.0
    },
    "policyAssumptions": {
      "carbonPrice": [
        {"year": 2024, "price": 50},
        {"year": 2030, "price": 150}
      ]
    }
  },
  "supplierScope": {
    "includeAll": false,
    "keySuppliers": ["SUP001", "SUP002"],
    "regions": ["Asia"]
  }
}

// Response  
{
  "simulationId": "SIM20241201001",
  "status": "completed",
  "results": {
    "totalReduction": 45600.8,
    "reductionPercentage": 36.5,
    "costEstimate": 125000000,
    "roi": 2.8,
    "paybackPeriod": 4.2
  },
  "yearlyProjections": [
    {
      "year": 2024,
      "baselineEmission": 125000,
      "projectedEmission": 119000,
      "reduction": 6000,
      "cost": 25000000
    }
  ],
  "riskAnalysis": {
    "implementationProbability": 0.75,
    "keyRiskFactors": ["技術成熟度", "資本投入", "供應商配合度"]
  }
}
```

這個完整的開發規格書為碳排放分析模組提供了詳細的技術實現指引，涵蓋了前後端元件、圖表設計、資料庫結構和API接口，確保開發團隊能夠按照規格進行高效的系統開發。