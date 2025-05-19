import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from 'next-intl';
import { locales, defaultLocale } from '@/lib/i18n';
import { Inter } from "next/font/google";
import { getMessages as getLocaleMessages } from '@/lib/i18n/server';

// 使用字體
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarbonM - 碳排放管理系統",
  description: "供應鏈碳排放數據收集與管理的最佳解決方案",
};

// 定義有效的語言
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

// 為了解決 Next.js 15 中 params 的異步特性，定義類型
type Params = { locale: string };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params> | Params;
}) {
  // 確保我們正確等待 params
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
  
  // 驗證語言是否在支援的語言列表中
  if (!locales.includes(locale as any)) {
    notFound();
  }
  
  // 獲取當前語言的翻譯消息
  const messages = await getLocaleMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 