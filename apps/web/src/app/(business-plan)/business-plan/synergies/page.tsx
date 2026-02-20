"use client"
import dynamic from "next/dynamic"
const Synergies = dynamic(() => import("@/components/business-plan/synergies").then(m => ({ default: m.Synergies })), { ssr: false })
export default function SynergiesPage() { return <Synergies /> }
