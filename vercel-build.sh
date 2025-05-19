#!/bin/bash

# 刪除pnpm鎖文件以確保使用npm
rm -f pnpm-lock.yaml

# 使用npm安裝依賴項
npm install --legacy-peer-deps

# 運行構建
npm run build 