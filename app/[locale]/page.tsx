import { redirect } from "next/navigation"

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  // 確保我們正確等待 params
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;
  
  redirect(`/${locale}/dashboard/survey-results`)
} 