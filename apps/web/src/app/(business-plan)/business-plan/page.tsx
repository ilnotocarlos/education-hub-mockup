"use client"
import dynamic from "next/dynamic"
const Overview = dynamic(() => import("@/components/business-plan/overview").then(m => ({ default: m.Overview })), { ssr: false })
export default function BusinessPlanPage() { return <Overview /> }
