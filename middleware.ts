import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n';

export default createMiddleware({
  // 支援的語言列表
  locales,
  
  // 默認語言
  defaultLocale,
  
  // 使用請求的語言作為首選語言
  localePrefix: 'as-needed',
  
  // 移除這些路徑映射，因為它們導致重定向循環
  // pathnames: {
  //   '/': `/dashboard/survey-results`,
  //   '/dashboard': `/dashboard/survey-results`
  // }
});

// 配置中間件匹配的路由
export const config = {
  // 匹配所有頁面，除了 api 路由和靜態文件
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}; 