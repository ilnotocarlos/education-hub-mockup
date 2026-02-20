"use client"
import dynamic from "next/dynamic"
const Roadmap = dynamic(() => import("@/components/business-plan/roadmap").then(m => ({ default: m.Roadmap })), { ssr: false })
export default function RoadmapPage() { return <Roadmap /> }
