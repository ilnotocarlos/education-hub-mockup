"use client"
import dynamic from "next/dynamic"
const YearView = dynamic(() => import("@/components/business-plan/year-view").then(m => ({ default: m.YearView })), { ssr: false })
export default function YearViewPage() { return <YearView /> }
