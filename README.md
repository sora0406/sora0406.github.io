# Supply Chain Management 專案

這是一個使用Next.js、React 19和TypeScript構建的供應鏈管理系統。

## 專案結構

### 主要路由

- `/dashboard/supply-chain` - 供應鏈管理模組主頁
  - `/dashboard/suppliers` - 供應商管理
  - `/dashboard/requests` - 數據要求
  - `/dashboard/projects/questionnaires` - 問卷追蹤
  - `/dashboard/survey-results` - 碳排放戰情室

- `/dashboard/projects/progress` - 組織計畫

## 部署前檢查

部署前請確保執行以下步驟：

1. 確保所有依賴項都已正確安裝
   ```bash
   npm install --legacy-peer-deps
   ```

2. 確保本地構建可以通過
   ```bash
   npm run build
   ```

3. 確保沒有關鍵的代碼問題
   ```bash
   npm run lint
   ```

## 部署到Vercel

### 方法一：通過GitHub部署（推薦）

1. 確保您的專案已推送到GitHub存儲庫
   ```bash
   git add .
   git commit -m "準備部署到Vercel"
   git push
   ```

2. 訪問 [Vercel官網](https://vercel.com/) 並使用GitHub帳戶登錄

3. 點擊 "Import Project" 按鈕

4. 選擇 "Import Git Repository" 並選擇您的GitHub存儲庫

5. 在專案設置中，確保覆蓋默認設置：
   - 在"Build & Development Settings"中，將"Install Command"設置為：
     ```
     npm install --legacy-peer-deps
     ```
   - 將"Build Command"設置為：
     ```
     ./vercel-build.sh
     ```

6. 點擊 "Deploy" 按鈕

7. 等待部署完成，然後您將獲得一個生產環境URL

### 方法二：使用Vercel CLI部署

1. 全局安裝Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. 在專案根目錄運行部署命令
   ```bash
   vercel
   ```

3. 如果是首次使用Vercel CLI，您將需要登錄並回答一些配置問題
   - 當詢問構建命令時，輸入 `./vercel-build.sh`
   - 當詢問安裝命令時，輸入 `npm install --legacy-peer-deps`

4. 部署完成後，您將獲得一個生產環境URL

### 環境變數

如果您的專案需要環境變數，可以在Vercel部署設置中添加它們：

1. 在Vercel項目設置中，點擊 "Settings" 選項卡
2. 選擇 "Environment Variables" 
3. 添加您的環境變數

### 自定義域名

部署成功後，您可以設置自定義域名：

1. 在Vercel項目設置中，點擊 "Domains" 選項卡
2. 添加您的自定義域名
3. 按照指引完成DNS設置 

## 故障排除

### 解決pnpm相關的構建錯誤

如果您在Vercel上遇到以下錯誤：
```
Command "pnpm install" exited with 1
```

可能的解決方案：

1. 確保專案根目錄中有 `.npmrc` 文件，內容如下：
   ```
   legacy-peer-deps=true
   auto-install-peers=true
   strict-peer-dependencies=false
   resolution-mode=highest
   ```

2. 使用提供的 `vercel-build.sh` 腳本作為構建命令，該腳本會：
   - 刪除pnpm鎖文件
   - 使用npm安裝依賴項
   - 運行標準構建過程

3. 在Vercel項目設置中，確保將"Install Command"手動設置為 `npm install --legacy-peer-deps`

### React 19兼容性問題

本專案使用React 19，這可能與某些依賴項不兼容。如果遇到相關錯誤，可以：

1. 始終使用 `--legacy-peer-deps` 標誌安裝依賴項
2. 如有必要，考慮降級到React 18
3. 或使用特定版本的問題依賴項：
   ```bash
   npm install react-specific-package@compatible-version --legacy-peer-deps
   ``` 