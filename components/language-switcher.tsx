"use client"

import { useTransition } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import { locales, getLanguageName } from "@/lib/i18n"
import { useLocale } from "next-intl"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() 
  const [isPending, startTransition] = useTransition()

  // 切換語言
  const handleSwitchLanguage = (locale: string) => {
    startTransition(() => {
      // 移除當前語言前綴
      let cleanPath = pathname;
      const locales = ['zh-TW', 'en', 'zh-CN'];
      
      for (const loc of locales) {
        if (cleanPath.startsWith(`/${loc}/`)) {
          cleanPath = cleanPath.replace(`/${loc}`, '');
          break;
        }
      }
      
      // 確保路徑以 / 開頭
      if (!cleanPath.startsWith('/')) {
        cleanPath = '/' + cleanPath;
      }
      
      // 添加新的語言前綴
      const newPath = `/${locale}${cleanPath}`;
      router.replace(newPath);
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="切換語言" disabled={isPending}>
          <Languages className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleSwitchLanguage(locale)}
            className={locale === currentLocale ? "bg-muted font-medium" : ""}
          >
            {getLanguageName(locale)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 