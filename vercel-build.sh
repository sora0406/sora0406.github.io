#!/bin/bash

# 輸出環境信息以進行調試
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Current directory: $(pwd)"

# 確認環境變量
export SKIP_PNPM=1
export NPM_FLAGS="--legacy-peer-deps"

# 檢查並刪除pnpm相關文件
if [ -f "pnpm-lock.yaml" ]; then
  echo "Removing pnpm-lock.yaml"
  rm -f pnpm-lock.yaml
fi

# 強制使用npm而非pnpm
if [ -f ".npmrc" ]; then
  echo "Updating .npmrc"
  echo "use-node-version=18.20.3" >> .npmrc
  echo "node-linker=hoisted" >> .npmrc
  echo "prefer-frozen-lockfile=false" >> .npmrc
  echo "ignore-pnpmfile=true" >> .npmrc
fi

# 重新生成package-lock.json
echo "Generating package-lock.json"
npm install --package-lock-only --no-audit --no-fund

# 使用npm安裝依賴項
echo "Installing dependencies with npm"
npm install --legacy-peer-deps --no-audit --no-fund

# 運行構建
echo "Running build"
npm run build 