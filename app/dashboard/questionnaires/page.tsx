"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function QuestionnairesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/dashboard/projects/questionnaires")
  }, [router])

  return null
} 