"use client"
import dynamic from "next/dynamic"
const Costs = dynamic(() => import("@/components/business-plan/costs").then(m => ({ default: m.Costs })), { ssr: false })
export default function CostsPage() { return <Costs /> }
