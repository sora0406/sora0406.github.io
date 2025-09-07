# 碳排放戰情室 (Carbon War Room)

基於[碳排放分析模組規格書](../../../carbon_analysis_module_specs.md)實現的綜合性碳排放監控與分析平台。

## 功能特色

### 🎯 核心元件 (根據規格書第1節)

#### A. 儀表板元件
- **CarbonOverviewDashboard**: 供應鏈碳排放總覽與KPI指標卡片組
- **ParetoAnalysisWidget**: 20/80法則視覺化與關鍵供應商識別
- **HotspotMapComponent**: 地理熱點地圖與區域排放統計
- **TrendAnalysisPanel**: 時間序列趨勢與預測分析

#### B. 分析工具元件
- **ScenarioSimulator**: 情境參數設定與減碳模擬分析
- **BenchmarkingModule**: 同業基準比較與改善空間識別
- **AlertManagementPanel**: 異常警示與處理狀態追蹤

#### C. 報表元件
- **ExportManager**: 多格式報表匯出與模板管理

### 📊 圖表元件 (根據規格書第2節)

#### 帕雷托分析圖表
- 帕雷托柱狀圖：供應商排放量與累積百分比
- 供應商分布散點圖：排放量 vs 成本分析

#### 地理熱點地圖
- 台灣地區熱點分析
- 區域統計圓餅圖

#### 趨勢分析圖表
- 時間序列線圖：實際 vs 預測 vs 目標
- 情境比較圖：多種減碳策略比較

#### 情境模擬圖表
- 成本效益氣泡圖：投資成本 vs 減排效果

### 🗄️ 資料結構 (根據規格書第3節)

支援以下資料表結構：
- `supplier_emissions`: 供應商排放數據
- `pareto_analysis_results`: 帕雷托分析結果
- `anomaly_detection_results`: 異常檢測結果
- `scenario_parameters`: 情境模擬參數
- `benchmark_data`: 基準數據

### 🔌 API接口 (根據規格書第4節)

- 帕雷托分析API：`/api/carbon-analysis/pareto`
- 情境模擬API：`/api/carbon-analysis/scenario-simulation`

## 頁面結構

```
app/dashboard/survey-results/
├── page.tsx                    # 主要頁面入口
├── carbon-war-room.tsx         # 完整War room實現
├── components/
│   ├── scenario-simulator.tsx  # 情境模擬器
│   ├── benchmarking-module.tsx # 基準比較模組
│   └── export-manager.tsx      # 匯出管理器
└── README.md                   # 此文件
```

## 使用方式

### 1. 總覽儀表板
- 查看核心KPI：總排放量、關鍵供應商、排放強度、數據覆蓋率
- 監控異常警示與處理狀態
- 追蹤減排趨勢與目標達成率

### 2. 帕雷托分析
- 識別20%的關鍵供應商（貢獻80%排放量）
- 視覺化排放量分布與累積貢獻度
- 分析供應商排名變化趨勢

### 3. 地理分析
- 台灣地區供應商分布熱點圖
- 各區域排放量統計與風險評估
- 地理位置與排放強度相關性分析

### 4. 趨勢分析
- 月度/年度排放趨勢追蹤
- 實際 vs 目標軌跡比較
- 預測模型與信心區間展示

### 5. 情境模擬
- 設定減碳目標與技術參數
- 比較不同減碳策略的成本效益
- 風險評估與實施可能性分析

### 6. 基準比較
- 與同業基準數據比較
- 多維度表現雷達圖
- 改善機會識別與優先級排序

## 國際化支援

所有介面文字均支援多語言，目前支援：
- 繁體中文 (zh-TW)
- 簡體中文 (zh-CN) 
- 英文 (en)

## 技術特色

- **React 18** + **TypeScript** 現代化前端架構
- **Tailwind CSS** + **shadcn/ui** 一致的設計系統
- **ApexCharts** 專業圖表視覺化
- **Next.js 14** App Router 架構
- **next-intl** 國際化支援
- 響應式設計，支援桌面與行動裝置

## 效能最佳化

- 動態載入圖表組件避免SSR問題
- 使用 `useMemo` 最佳化計算密集型操作
- 組件化設計提高重用性與維護性
- 懶載入大型資料集

## 資料安全

- 客戶端資料驗證
- 敏感資料遮罩顯示
- 匯出權限控制
- 審計日誌追蹤