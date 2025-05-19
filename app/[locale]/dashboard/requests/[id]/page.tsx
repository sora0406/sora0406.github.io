"use client"

import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import RequestDetailPage from "@/app/dashboard/requests/[id]/page"

export default function LocalizedRequestDetailPage() {
  const tRequests = useTranslations("requests")
  
  return <RequestDetailPage t={tRequests} />
} 