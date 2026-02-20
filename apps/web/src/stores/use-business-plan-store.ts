"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  revenueProjections as defaultRevenue,
  profitability as defaultProfit,
  cashFlow as defaultCashFlow,
  b2cProducts as defaultB2C,
  b2bServices as defaultB2B,
  platformRevenue as defaultPlatform,
  useOfFunds as defaultFunds,
  scenarios as defaultScenarios,
  kpis as defaultKpis,
  marketData as defaultMarket,
  unitEconomics as defaultUnit,
  companyInfo as defaultCompany,
  synergies as defaultSynergies,
  riskFlags as defaultRisks,
  revenueMixY5 as defaultMix,
} from '@/data/business-plan'

// Types
type DeepMutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? DeepMutable<U>[] : T[P] extends object ? DeepMutable<T[P]> : T[P] }

type RevenueRow = DeepMutable<typeof defaultRevenue[number]>
type ProfitRow = DeepMutable<typeof defaultProfit[number]>
type CashFlowRow = DeepMutable<typeof defaultCashFlow[number]>
type B2CProduct = DeepMutable<typeof defaultB2C[number]>
type B2BService = DeepMutable<typeof defaultB2B[number]>
type PlatformRow = DeepMutable<typeof defaultPlatform[number]>
type FundRow = DeepMutable<typeof defaultFunds[number]>
type ScenarioRow = DeepMutable<typeof defaultScenarios[number]>
type MarketDataType = DeepMutable<typeof defaultMarket>
type UnitEconType = DeepMutable<typeof defaultUnit>
type CompanyInfoType = DeepMutable<typeof defaultCompany>
type SynergyRow = DeepMutable<typeof defaultSynergies[number]>
type RiskRow = DeepMutable<typeof defaultRisks[number]>
type RevenueMixRow = DeepMutable<typeof defaultMix[number]>

export type KpisData = {
  students: { metric: string; y1: string; y5: string }[]
  corporate: { metric: string; y1: string; y5: string }[]
  technology: { metric: string; y1: string; y5: string }[]
}

interface BusinessPlanState {
  revenueProjections: RevenueRow[]
  profitability: ProfitRow[]
  cashFlow: CashFlowRow[]
  b2cProducts: B2CProduct[]
  b2bServices: B2BService[]
  platformRevenue: PlatformRow[]
  useOfFunds: FundRow[]
  scenarios: ScenarioRow[]
  kpis: KpisData
  marketData: MarketDataType
  unitEconomics: UnitEconType
  companyInfo: CompanyInfoType
  synergies: SynergyRow[]
  riskFlags: RiskRow[]
  revenueMixY5: RevenueMixRow[]
  isDirty: boolean
  lastSaved: string | null

  updateRevenueRow: (index: number, field: string, value: number) => void
  updateProfitRow: (index: number, field: string, value: number) => void
  updateCashFlowRow: (index: number, field: string, value: number) => void
  updateB2CProduct: (index: number, field: string, value: number) => void
  updateB2BService: (index: number, field: string, value: number) => void
  updatePlatformRow: (index: number, field: string, value: number) => void
  updateFundRow: (index: number, field: string, value: number) => void
  updateScenarioRow: (index: number, field: string, value: number) => void
  updateKpi: (category: keyof KpisData, index: number, field: string, value: string) => void
  updateRevenueMix: (index: number, field: string, value: number) => void
  resetAll: () => void
}

const initialState = {
  revenueProjections: structuredClone(defaultRevenue) as RevenueRow[],
  profitability: structuredClone(defaultProfit) as ProfitRow[],
  cashFlow: structuredClone(defaultCashFlow) as CashFlowRow[],
  b2cProducts: structuredClone(defaultB2C) as B2CProduct[],
  b2bServices: structuredClone(defaultB2B) as B2BService[],
  platformRevenue: structuredClone(defaultPlatform) as PlatformRow[],
  useOfFunds: structuredClone(defaultFunds) as FundRow[],
  scenarios: structuredClone(defaultScenarios) as ScenarioRow[],
  kpis: structuredClone(defaultKpis) as KpisData,
  marketData: structuredClone(defaultMarket) as MarketDataType,
  unitEconomics: structuredClone(defaultUnit) as UnitEconType,
  companyInfo: structuredClone(defaultCompany) as CompanyInfoType,
  synergies: structuredClone(defaultSynergies) as SynergyRow[],
  riskFlags: structuredClone(defaultRisks) as RiskRow[],
  revenueMixY5: structuredClone(defaultMix) as RevenueMixRow[],
  isDirty: false,
  lastSaved: null as string | null,
}

function updateRow<T extends Record<string, unknown>>(arr: T[], index: number, field: string, value: unknown): T[] {
  const copy = [...arr]
  copy[index] = { ...copy[index], [field]: value }
  return copy
}

export const useBusinessPlanStore = create<BusinessPlanState>()(
  persist(
    (set) => ({
      ...initialState,

      updateRevenueRow: (index, field, value) =>
        set((s) => ({ revenueProjections: updateRow(s.revenueProjections, index, field, value), isDirty: true })),
      updateProfitRow: (index, field, value) =>
        set((s) => ({ profitability: updateRow(s.profitability, index, field, value), isDirty: true })),
      updateCashFlowRow: (index, field, value) =>
        set((s) => ({ cashFlow: updateRow(s.cashFlow, index, field, value), isDirty: true })),
      updateB2CProduct: (index, field, value) =>
        set((s) => ({ b2cProducts: updateRow(s.b2cProducts, index, field, value), isDirty: true })),
      updateB2BService: (index, field, value) =>
        set((s) => ({ b2bServices: updateRow(s.b2bServices, index, field, value), isDirty: true })),
      updatePlatformRow: (index, field, value) =>
        set((s) => ({ platformRevenue: updateRow(s.platformRevenue, index, field, value), isDirty: true })),
      updateFundRow: (index, field, value) =>
        set((s) => ({ useOfFunds: updateRow(s.useOfFunds, index, field, value), isDirty: true })),
      updateScenarioRow: (index, field, value) =>
        set((s) => ({ scenarios: updateRow(s.scenarios, index, field, value), isDirty: true })),
      updateKpi: (category, index, field, value) =>
        set((s) => {
          const kpis = { ...s.kpis }
          const arr = [...kpis[category]]
          arr[index] = { ...arr[index], [field]: value }
          kpis[category] = arr
          return { kpis, isDirty: true }
        }),
      updateRevenueMix: (index, field, value) =>
        set((s) => ({ revenueMixY5: updateRow(s.revenueMixY5, index, field, value), isDirty: true })),
      resetAll: () => set({ ...structuredClone(initialState), isDirty: false, lastSaved: new Date().toISOString() }),
    }),
    {
      name: 'education-hub-business-plan',
      version: 1,
    }
  )
)
