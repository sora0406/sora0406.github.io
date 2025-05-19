import { redirect } from "next/navigation"
import { defaultLocale } from "@/lib/i18n"

export default function RootPage() {
  // 根路徑重定向到預設語言的戰情室
  redirect(`/${defaultLocale}/dashboard/survey-results`);
}
