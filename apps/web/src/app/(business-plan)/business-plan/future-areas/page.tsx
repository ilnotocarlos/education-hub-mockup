"use client"
import dynamic from "next/dynamic"
const FutureAreas = dynamic(() => import("@/components/business-plan/future-areas").then(m => ({ default: m.FutureAreas })), { ssr: false })
export default function FutureAreasPage() { return <FutureAreas /> }
