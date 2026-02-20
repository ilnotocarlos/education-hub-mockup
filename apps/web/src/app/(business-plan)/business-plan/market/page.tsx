"use client"
import dynamic from "next/dynamic"
const Market = dynamic(() => import("@/components/business-plan/market").then(m => ({ default: m.Market })), { ssr: false })
export default function MarketPage() { return <Market /> }
