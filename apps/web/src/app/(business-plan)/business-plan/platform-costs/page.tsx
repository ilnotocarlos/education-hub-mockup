"use client"
import dynamic from "next/dynamic"
const PlatformCosts = dynamic(() => import("@/components/business-plan/platform-costs").then(m => ({ default: m.PlatformCosts })), { ssr: false })
export default function PlatformCostsPage() { return <PlatformCosts /> }
