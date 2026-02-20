"use client"
import dynamic from "next/dynamic"
const Scenarios = dynamic(() => import("@/components/business-plan/scenarios").then(m => ({ default: m.Scenarios })), { ssr: false })
export default function ScenariosPage() { return <Scenarios /> }
