import { defaultLocale } from "@/lib/i18n"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 移除重定向邏輯，讓子組件處理路由
  // redirect(`/${defaultLocale}/dashboard/survey-results`);
  
  // 返回包含必需 HTML 和 body 標籤的結構
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
