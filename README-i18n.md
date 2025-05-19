# 多語系功能 (i18n) 使用文檔

本專案實現了完整的多語系功能，使用 `next-intl` 作為主要的國際化解決方案。

## 支援的語言

目前支援以下語言：

- 繁體中文 (zh-TW) - 預設語言
- 英文 (en)
- 簡體中文 (zh-CN)

## 文件結構

多語系功能相關的文件結構如下：

```
/
├── app/
│   ├── [locale]/             # 多語系路由
│   │   ├── layout.tsx        # 多語系佈局
│   │   └── ...其他頁面
├── components/
│   ├── language-switcher.tsx # 語言切換器組件
│   └── i18n-message.tsx      # 國際化訊息顯示組件
├── lib/
│   ├── i18n/
│   │   ├── index.ts          # i18n 輔助函數
│   │   └── use-translations.ts # 自定義翻譯 hooks
├── messages/
│   ├── zh-TW.json            # 繁體中文翻譯文件
│   ├── en.json               # 英文翻譯文件
│   └── zh-CN.json            # 簡體中文翻譯文件
├── middleware.ts             # 語言路由中間件
```

## 如何使用

### 1. 在元件中使用翻譯

使用 `next-intl` 提供的 `useTranslations` hook：

```tsx
"use client"
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("namespace");
  
  return <div>{t("key")}</div>;
}
```

或使用專案自定義的 `useTranslations` hook：

```tsx
"use client"
import { useTranslations } from "@/lib/i18n/use-translations";

export function MyComponent() {
  const { t } = useTranslations("namespace");
  
  return <div>{t("key", { param: "value" })}</div>;
}
```

### 2. 使用 `Message` 組件

為了更方便地在各處使用翻譯，我們提供了 `Message` 組件：

```tsx
import { Message } from "@/components/i18n-message";

export function MyComponent() {
  return (
    <div>
      <Message namespace="buttons" id="save" />
      <Message namespace="pagination" id="page" params={{ page: 1 }} />
    </div>
  );
}
```

### 3. 添加語言切換器

在您的佈局中添加語言切換器：

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  return (
    <header>
      <nav>
        {/* 其他導航元素 */}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
```

### 4. 添加新的翻譯

在對應的 `messages/{locale}.json` 文件中添加新的翻譯：

```json
{
  "namespace": {
    "key": "翻譯文本"
  }
}
```

### 5. 日期格式化

使用自定義的 `useDateTranslations` hook 格式化日期：

```tsx
"use client"
import { useDateTranslations } from "@/lib/i18n/use-translations";

export function DateDisplay({ date }: { date: Date }) {
  const { formatDate } = useDateTranslations();
  
  return <div>{formatDate(date, "medium")}</div>;
}
```

## 翻譯文件結構

翻譯文件使用 JSON 格式，結構如下：

```json
{
  "app": {
    "name": "應用名稱",
    "dashboard": "儀表板"
  },
  "nav": {
    "organization": "組織架構管理",
    "roles": "角色",
    "projects": "組織計畫"
  },
  "buttons": {
    "create": "創建",
    "edit": "編輯",
    "delete": "刪除"
  }
}
```

## 擴展支援的語言

要添加新的語言支援，請執行以下步驟：

1. 在 `lib/i18n/index.ts` 中的 `locales` 陣列中添加新的語言代碼
2. 在 `getLanguageName` 函數中添加新語言的顯示名稱
3. 創建新的翻譯文件 `messages/{新語言代碼}.json`

## 最佳實踐

1. 使用有意義的命名空間和鍵名，例如 `buttons.save`、`nav.home`
2. 保持所有語言的翻譯文件結構一致
3. 對於動態內容，使用參數: `"hello": "你好，{name}"`
4. 在添加新功能時，同時更新所有語言的翻譯文件 