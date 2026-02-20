"use client"
import dynamic from "next/dynamic"
const UnitEconomics = dynamic(() => import("@/components/business-plan/unit-economics").then(m => ({ default: m.UnitEconomics })), { ssr: false })
export default function UnitEconomicsPage() { return <UnitEconomics /> }
