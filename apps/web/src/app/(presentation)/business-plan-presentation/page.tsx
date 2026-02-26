"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BusinessPlanPresentationPage() {
  return (
    <div className="relative w-screen h-screen">
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm text-white/70 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Hub
      </Link>
      <iframe
        src="/presentazione-business-plan.html"
        className="w-full h-full border-0"
        title="Il Business Plan Spiegato"
      />
    </div>
  )
}
