"use client"
import dynamic from "next/dynamic"
const Financials = dynamic(() => import("@/components/business-plan/financials").then(m => ({ default: m.Financials })), { ssr: false })
export default function FinancialsPage() { return <Financials /> }
