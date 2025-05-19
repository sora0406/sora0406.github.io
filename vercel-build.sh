#!/bin/bash

# 輸出環境信息以進行調試
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "PNPM version: $(pnpm -v)"
echo "Current directory: $(pwd)"

# 確認環境變量
export NPM_FLAGS="--legacy-peer-deps"

# 更新.npmrc配置
if [ -f ".npmrc" ]; then
  echo "Updating .npmrc"
  cat > .npmrc << EOL
use-node-version=18.20.3
node-linker=hoisted
prefer-frozen-lockfile=false
strict-peer-dependencies=false
auto-install-peers=true
shamefully-hoist=true
EOL
fi

# 使用pnpm安裝依賴項
echo "Installing dependencies with pnpm"
pnpm install --no-frozen-lockfile

# 運行構建
echo "Running build"
pnpm build 