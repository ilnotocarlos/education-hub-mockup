"use client"
import dynamic from "next/dynamic"
const KPIs = dynamic(() => import("@/components/business-plan/kpis").then(m => ({ default: m.KPIs })), { ssr: false })
export default function KPIsPage() { return <KPIs /> }
