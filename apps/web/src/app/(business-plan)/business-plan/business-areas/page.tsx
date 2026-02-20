"use client"
import dynamic from "next/dynamic"
const BusinessAreas = dynamic(() => import("@/components/business-plan/business-areas").then(m => ({ default: m.BusinessAreas })), { ssr: false })
export default function BusinessAreasPage() { return <BusinessAreas /> }
