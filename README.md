# Supply Chain Management 專案

這是一個使用Next.js、React 19和TypeScript構建的供應鏈管理系統。

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

5. 保持默認設置，點擊 "Deploy" 按鈕

6. 等待部署完成，然後您將獲得一個生產環境URL

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