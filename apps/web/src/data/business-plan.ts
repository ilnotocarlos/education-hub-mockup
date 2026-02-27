export const companyInfo = {
  name: "Education Innovation Hub",
  tagline: "Not a school, a transformation engine",
  vision: "Essere il catalizzatore della rinascita educativa italiana, dove apprendimento e lavoro si fondono in un ecosistema continuo di crescita, innovazione e realizzazione umana.",
  mission: "Progettiamo esperienze trasformative che fondono tecnologia, umanità e business, creando professionisti che non solo risolvono problemi, ma immaginano futuri.",
  purpose: "Colmare il gap tra potenziale umano e opportunità professionali, trasformando l'educazione da trasferimento di nozioni a liberazione di talenti.",
  timeline: "5 anni (2026-2030)",
  breakeven: "Mese 28-32",
}

export const coreValues = [
  { name: "Radical Learning", desc: "Crescita attraverso la sfida" },
  { name: "Purposeful Technology", desc: "Tech come mezzo, umanità come fine" },
  { name: "Collaborative Excellence", desc: "Successo condiviso e peer learning" },
  { name: "Antifragile Mindset", desc: "Celebrazione del fallimento e iterazione" },
  { name: "Real Impact", desc: "Creazione di valore misurabile sul mercato" },
]

// ═══════════════════════════════════════════════
// DATI DI MERCATO — Con fonti verificate
// Appendice fonti: vedi slide-sources.tsx
// ═══════════════════════════════════════════════

export const marketData = {
  currentSize: 2_500_000_000, // Stima aggregata formazione professionale Italia (INAPP/ISTAT)
  projectedSize: 3_400_000_000,
  cagr: "6-8%",
  skillGapCost: 44_000_000_000, // Fonte: Rapporto Formazione e Lavoro 2025, Unioncamere-Excelsior (dato 2023: €43,9 mld)
  skillGapGdpNote: "3,4% del PIL dei settori analizzati", // Fonte: Unioncamere-Excelsior — NB: non 2,5% del PIL totale
  vacancies: 3_500_000, // Fonte: Unioncamere-Excelsior, fabbisogno totale lavoratori 2025-2029 (3,3-3,7M)
  obsoleteSkills: "39%", // Fonte: WEF "Future of Jobs Report 2025", Cap. 3 Skills Outlook
  publicFunding: 730_000_000, // Fonte: Ministero del Lavoro, FNC3 "Competenze per le Innovazioni" (2025)
  companiesIncreasingBudget: "64%", // Fonte: LinkedIn "The Future of Recruiting 2025" — edizione Italia (vs 55% globale)
  sectors: [
    { name: "AI & Data Science", growth: 70, jobs: 250_000 }, // Fonte: LinkedIn/OECD.AI (~70% annuo crescita domanda competenze AI)
    { name: "Green Economy", growth: 72, jobs: 1_500_000 }, // Fonte: Symbola/Unioncamere "GreenItaly 2025"
    { name: "Cybersecurity", growth: 68, jobs: 180_000 }, // Fonte: ISC2 Cybersecurity Workforce Study
    { name: "HealthTech", growth: 62, jobs: 320_000 },
    { name: "Digital Marketing", growth: 58, jobs: 200_000 },
  ],
}

// Fonti complete in appendice — vedi /presentation slide "Fonti e Riferimenti"

// ═══════════════════════════════════════════════
// REVENUE — Proiezioni consolidate 5 anni
// Studenti: 75 → 150 → 250 → 500 → 800
// Clienti B2B: 3 → 10 → 20 → 30 → 50
// ═══════════════════════════════════════════════

export const revenueProjections = [
  { year: "Anno 1", platform: 10, services: 765, total: 775, growth: null },
  { year: "Anno 2", platform: 50, services: 2040, total: 2090, growth: 170 },
  { year: "Anno 3", platform: 120, services: 3834, total: 3954, growth: 89 },
  { year: "Anno 4", platform: 250, services: 6398, total: 6648, growth: 68 },
  { year: "Anno 5", platform: 450, services: 10528, total: 10978, growth: 65 },
]

export const profitability = [
  { year: "Anno 1", grossMargin: 47, ebitda: -269, ebitdaMargin: -35, netIncome: -299 },
  { year: "Anno 2", grossMargin: 50, ebitda: -78, ebitdaMargin: -4, netIncome: -128 },
  { year: "Anno 3", grossMargin: 53, ebitda: 250, ebitdaMargin: 6, netIncome: 180 },
  { year: "Anno 4", grossMargin: 54, ebitda: 739, ebitdaMargin: 11, netIncome: 553 },
  { year: "Anno 5", grossMargin: 56, ebitda: 1880, ebitdaMargin: 17, netIncome: 1345 },
]

export const cashFlow = [
  { year: "Anno 1", ebitda: -269, capex: -150, nwc: -80, fcf: -499, cumulative: -499 },
  { year: "Anno 2", ebitda: -78, capex: -100, nwc: -120, fcf: -298, cumulative: -797 },
  { year: "Anno 3", ebitda: 250, capex: -120, nwc: -180, fcf: -50, cumulative: -847 },
  { year: "Anno 4", ebitda: 739, capex: -150, nwc: -250, fcf: 243, cumulative: -604 },
  { year: "Anno 5", ebitda: 1880, capex: -170, nwc: -300, fcf: 985, cumulative: 381 },
]

export const b2cProducts = [
  { format: "Masterclass", duration: "1-2 giorni", price: 2000, y1Students: 30, y5Students: 320, y5Revenue: 640 },
  { format: "Bootcamp", duration: "2-4 settimane", price: 2500, y1Students: 20, y5Students: 216, y5Revenue: 540 },
  { format: "Master", duration: "12 settimane", price: 8000, y1Students: 15, y5Students: 160, y5Revenue: 1280 },
  { format: "Full-time", duration: "12-18 mesi", price: 12000, y1Students: 10, y5Students: 104, y5Revenue: 1248 },
]

export const b2bServices = [
  { service: "Corporate Academy", acv: 250000, y1Clients: 1, y5Clients: 15, y5Revenue: 3750 },
  { service: "Upskilling Programs", acv: 100000, y1Clients: 1, y5Clients: 20, y5Revenue: 2000 },
  { service: "Innovation Lab", acv: 50000, y1Clients: 1, y5Clients: 15, y5Revenue: 750 },
]

export const platformRevenue = [
  { stream: "Licensing Scuole Gruppo", pricePerUser: "€30-50/utente/anno", y5Revenue: 120 },
  { stream: "Partner Esterni B2B", pricePerUser: "€80-120/utente/anno", y5Revenue: 130 },
  { stream: "White-Label Enterprise", pricePerUser: "€200-500k/deal", y5Revenue: 200 },
]

export const unitEconomics = {
  b2c: {
    cac: { y1: 200, y5: 120 },
    ltv: { y1: 1500, y5: 2800 },
    ltvCac: { y1: 7.5, y5: 23.3 },
    payback: "5.1 mesi",
  },
  b2b: {
    cac: { y1: 8000, y5: 4000 },
    ltv: { y1: 175000, y5: 260000 },
    ltvCac: { y1: 21.9, y5: 65 },
    payback: "8.5 mesi",
  },
  platform: {
    grossMargin: "75-80%",
    ltvCac: 80,
    cac: 3500,
  },
}

export const useOfFunds = [
  { category: "Tecnologia & Piattaforma", amount: 1800000, percent: 40, detail: "MVP + V2, AI/ML, infrastruttura" },
  { category: "Sales & Marketing", amount: 1350000, percent: 30, detail: "Team sales, campagne digital" },
  { category: "Operations & Delivery", amount: 900000, percent: 20, detail: "Faculty, contenuti, student success" },
  { category: "Working Capital", amount: 300000, percent: 7, detail: "Buffer runway (6 mesi)" },
  { category: "Contingency", amount: 150000, percent: 3, detail: "Spese impreviste" },
]

export const returnMetrics = {
  enterpriseValue: 11_280_000,
  roiMultiple: 2.5,
  irr: 20,
  paybackMonths: "36-42",
  cumulativeCash: 381_000,
}

export const kpis = {
  students: [
    { metric: "Studenti Totali", y1: "75", y5: "800" },
    { metric: "Retention Annuale", y1: "68%", y5: "75%" },
    { metric: "Placement Rate", y1: "82%", y5: "86%" },
    { metric: "Completion Rate", y1: "85%", y5: "89%" },
    { metric: "NPS", y1: "65", y5: "72" },
  ],
  corporate: [
    { metric: "Clienti B2B", y1: "3", y5: "50" },
    { metric: "ACV Medio", y1: "€133k", y5: "€130k" },
    { metric: "Retention Rate", y1: "65%", y5: "78%" },
    { metric: "NRR", y1: "105%", y5: "125%" },
  ],
  technology: [
    { metric: "Utenti Piattaforma", y1: "200", y5: "4.000" },
    { metric: "Uptime", y1: ">99.5%", y5: ">99.9%" },
    { metric: "Costo/Studente/Mese", y1: "€23", y5: "<€18" },
  ],
}

export const scenarios = [
  { name: "Pessimistico", probability: 25, revenueY5: 8000, ebitdaY5: 800, margin: 10, roi: 1.8 },
  { name: "Base Case", probability: 55, revenueY5: 10978, ebitdaY5: 1880, margin: 17, roi: 2.5 },
  { name: "Ottimistico", probability: 15, revenueY5: 15000, ebitdaY5: 3500, margin: 23, roi: 4.7 },
  { name: "Aggressivo", probability: 5, revenueY5: 22000, ebitdaY5: 5500, margin: 25, roi: 7.3 },
]

export const roadmap = [
  {
    phase: "Foundation & MVP",
    period: "Q1-Q2 2026",
    items: [
      "Core team hiring (7 FTE)",
      "Platform MVP development",
      "2 master curricula design",
      "3 aziende partner pilot",
      "75 studenti iscritti",
    ],
  },
  {
    phase: "Platform Launch",
    period: "Q3-Q4 2026",
    items: [
      "Platform V1 launch",
      "2 corsi attivi",
      "Revenue run-rate avviato",
      "Primi feedback studenti",
    ],
  },
  {
    phase: "Growth",
    period: "2027",
    items: [
      "150 studenti B2C",
      "10 clienti B2B",
      "€2.1M revenue",
      "Team scala a 12 FTE",
      "Near break-even EBITDA",
    ],
  },
  {
    phase: "AI Enhancement & Scale",
    period: "2028",
    items: [
      "250 studenti B2C",
      "20 clienti B2B",
      "AI tutoring avanzato",
      "€4M revenue",
      "EBITDA positivo",
    ],
  },
  {
    phase: "Consolidamento",
    period: "2029-2030",
    items: [
      "500→800 studenti B2C",
      "30→50 clienti B2B",
      "White-label primi deal",
      "€7-11M revenue",
      "17% EBITDA margin",
    ],
  },
]

export const competitors = [
  { name: "Business Schools", example: "Bocconi, LUISS", price: "€16-18k", weakness: "Troppo teoriche, lente ad adattarsi" },
  { name: "Bootcamp", example: "Ironhack, Le Wagon", price: "€8-12k", weakness: "Solo tech skills, no soft skills" },
  { name: "MOOC", example: "Coursera, Udemy", price: "€0-500", weakness: "2% retention, nessuna personalizzazione" },
  { name: "Corporate Training", example: "Consulenze tradizionali", price: "€50-200k", weakness: "Non scalabile, content generico" },
]

export const differentiators = [
  "Piattaforma AI proprietaria con personalizzazione",
  "Contenuti editoriali esclusivi (500+ autori)",
  "86% placement rate (top quartile)",
  "Modello dual: B2C + B2B per revenue diversificata",
  "Blockchain certificazioni (Polygon L2)",
  "50% meno costoso delle business school",
]

export const synergies = [
  { area: "Contenuti Editoriali", value: "Back catalog → materiale didattico interattivo", impact: "Costo contenuti -60%" },
  { area: "Network Autori", value: "500+ scrittori → faculty keynote speakers", impact: "€5k/sessione" },
  { area: "Cross-Selling", value: "800 studenti = audience premium", impact: "€50-200k/anno" },
  { area: "Credibilità", value: "Brand editoriale → trust nella formazione", impact: "CAC -20-30%" },
  { area: "Corporate Network", value: "C-level → warm intro clienti corporate", impact: "Sales cycle -30%" },
]

export const revenueMixY5 = [
  { area: "B2B Corporate Academy", revenue: 3750, percent: 34, type: "B2B" as const },
  { area: "B2B Upskilling", revenue: 2000, percent: 18, type: "B2B" as const },
  { area: "B2B Innovation Lab", revenue: 750, percent: 7, type: "B2B" as const },
  { area: "B2C Master", revenue: 1280, percent: 12, type: "B2C" as const },
  { area: "B2C Full-time", revenue: 1248, percent: 11, type: "B2C" as const },
  { area: "B2C Masterclass", revenue: 640, percent: 6, type: "B2C" as const },
  { area: "B2C Bootcamp", revenue: 540, percent: 5, type: "B2C" as const },
  { area: "Platform", revenue: 450, percent: 4, type: "Platform" as const },
  { area: "Talent Placement", revenue: 320, percent: 3, type: "B2C" as const },
]

export const validationScore = {
  overall: 78,
  categories: [
    { name: "Dati di Mercato", score: 95, status: "excellent" as const },
    { name: "Proiezioni Finanziarie", score: 72, status: "good" as const },
    { name: "Unit Economics", score: 80, status: "excellent" as const },
    { name: "Metriche Operative", score: 68, status: "good" as const },
    { name: "Analisi Competitiva", score: 80, status: "excellent" as const },
  ],
}

export const riskFlags = [
  { risk: "Retention >68%", benchmark: "EdTech benchmark 30%", severity: "high" as const, mitigation: "Community eccezionale + personalizzazione AI" },
  { risk: "Consegna piattaforma Q4 2026", benchmark: "Deadline critica", severity: "high" as const, mitigation: "MVP approach, sprint iterativi" },
  { risk: "Sales cycle B2B 6-9 mesi", benchmark: "Può rallentare crescita", severity: "medium" as const, mitigation: "Pipeline building anticipata, pilot gratuiti" },
  { risk: "Qualità faculty", benchmark: "Dipende da network autori", severity: "medium" as const, mitigation: "Contratti esclusivi, formazione docenti" },
  { risk: "Scala limitata Y5 (800 studenti)", benchmark: "Servono economie di scala", severity: "medium" as const, mitigation: "Focus qualità, premium pricing, B2B revenue" },
]

export const futureBusinessAreas = [
  {
    name: "Market Fit Validation",
    description: "Servizio di consulenza per startup e aziende che vogliono validare il proprio product-market fit.",
    status: "Pianificato",
    timeline: "2028+",
    potential: "€500k-1.5M/anno",
    details: [
      "Customer discovery interviews con AI analysis",
      "Competitor landscape mapping automatizzato",
      "Prototype testing con panel studenti/alumni",
      "Go-to-market strategy framework",
    ],
  },
  {
    name: "Startup Factory",
    description: "Programma di incubazione per trasformare i migliori progetti degli studenti in startup reali.",
    status: "Pianificato",
    timeline: "2029+",
    potential: "€1-3M/anno (equity + servizi)",
    details: [
      "Incubatore 6 mesi per top 10% progetti studenti",
      "Seed funding €50-200k per startup selezionate",
      "Mentoring da network C-level corporate",
      "Demo day con investor network",
    ],
  },
]

// ═══════════════════════════════════════════════
// STRUTTURA COSTI — Breakdown operativo per anno
// ═══════════════════════════════════════════════

export const costStructure = [
  {
    year: "Anno 1", team: 7, cogs: 414,
    personnel: 385, marketing: 100, technology: 70, content: 40, gAndA: 35,
    totalOpex: 630, totalCosts: 1044, capex: 150,
  },
  {
    year: "Anno 2", team: 12, cogs: 1048,
    personnel: 660, marketing: 200, technology: 120, content: 80, gAndA: 60,
    totalOpex: 1120, totalCosts: 2168, capex: 100,
  },
  {
    year: "Anno 3", team: 18, cogs: 1878,
    personnel: 1026, marketing: 350, technology: 200, content: 150, gAndA: 100,
    totalOpex: 1826, totalCosts: 3704, capex: 120,
  },
  {
    year: "Anno 4", team: 28, cogs: 3055,
    personnel: 1624, marketing: 500, technology: 320, content: 250, gAndA: 160,
    totalOpex: 2854, totalCosts: 5909, capex: 150,
  },
  {
    year: "Anno 5", team: 40, cogs: 4818,
    personnel: 2400, marketing: 800, technology: 480, content: 350, gAndA: 250,
    totalOpex: 4280, totalCosts: 9098, capex: 170,
  },
]

export const teamComposition = [
  { role: "Engineering & Product", y1: 3, y5: 15, avgCost: 65 },
  { role: "Sales & Marketing", y1: 1, y5: 10, avgCost: 55 },
  { role: "Content & Faculty", y1: 1, y5: 8, avgCost: 50 },
  { role: "Operations & Support", y1: 1, y5: 5, avgCost: 45 },
  { role: "Leadership & Admin", y1: 1, y5: 2, avgCost: 85 },
]

// ═══════════════════════════════════════════════
// PIATTAFORMA — Costi operativi dettagliati
// ═══════════════════════════════════════════════

export const platformCosts = {
  monthly: [
    {
      year: "Anno 1", students: 75,
      aiMl: 850, blockchain: 60, infrastructure: 550, services: 280,
      total: 1740, annual: 20880, costPerUser: 23.2,
    },
    {
      year: "Anno 2", students: 150,
      aiMl: 1700, blockchain: 100, infrastructure: 850, services: 380,
      total: 3030, annual: 36360, costPerUser: 20.2,
    },
    {
      year: "Anno 3", students: 250,
      aiMl: 2790, blockchain: 164, infrastructure: 1200, services: 500,
      total: 4654, annual: 55848, costPerUser: 18.6,
    },
    {
      year: "Anno 4", students: 500,
      aiMl: 5580, blockchain: 329, infrastructure: 2400, services: 900,
      total: 9209, annual: 110508, costPerUser: 18.4,
    },
    {
      year: "Anno 5", students: 800,
      aiMl: 8900, blockchain: 520, infrastructure: 3800, services: 1400,
      total: 14620, annual: 175440, costPerUser: 18.3,
    },
  ],
  development: {
    items: [
      { name: "Platform MVP & V2", cost: 100000 },
      { name: "AI/ML Features", cost: 80000 },
      { name: "UI/UX Design", cost: 15000 },
      { name: "Smart Contract Audit", cost: 20000 },
      { name: "Setup & Configurazione", cost: 8000 },
    ],
    total: 223000,
  },
  aiBreakdown: [
    { service: "OpenAI GPT-4 Turbo", desc: "LLM primario — AI Tutor, assessment, personalizzazione", tokens: "51M/mese", costMonth: 730 },
    { service: "Anthropic Claude 3.5", desc: "Fallback 20% traffico", tokens: "10M/mese", costMonth: 150 },
    { service: "Pinecone Vector DB", desc: "RAG — 600k query/mese per materiali didattici", tokens: "600k query", costMonth: 70 },
    { service: "ElevenLabs TTS", desc: "Text-to-speech per audio lezioni", tokens: "50h/mese", costMonth: 99 },
    { service: "OpenAI Whisper STT", desc: "Speech-to-text per trascrizioni", tokens: "200h/mese", costMonth: 72 },
  ],
  infraBreakdown: [
    { service: "EC2/ECS Compute", desc: "2× t3.large instances", costMonth: 165 },
    { service: "RDS PostgreSQL", desc: "Database relazionale principale", costMonth: 145 },
    { service: "CloudFront CDN", desc: "Content delivery (2 TB/mese)", costMonth: 180 },
    { service: "Redis ElastiCache", desc: "Caching e sessioni", costMonth: 50 },
    { service: "S3 Storage", desc: "Storage file (500 GB)", costMonth: 12 },
  ],
  blockchainBreakdown: [
    { service: "Alchemy RPC", desc: "50k request/mese — Polygon", costMonth: 49 },
    { service: "Pinata IPFS", desc: "10 GB storage certificati", costMonth: 20 },
    { service: "Polygon Gas", desc: "410 mint/mese (€0.02/mint)", costMonth: 10 },
  ],
  servicesBreakdown: [
    { service: "Auth0", desc: "Autenticazione & SSO", costMonth: 240 },
    { service: "Sentry", desc: "Error tracking & monitoring", costMonth: 26 },
    { service: "SendGrid", desc: "Email transazionali", costMonth: 15 },
  ],
  optimizations: [
    { strategy: "Caching risposte AI", saving: "30-40%", area: "AI/ML", desc: "Cache intelligente per domande ripetute" },
    { strategy: "Modelli ibridi GPT-4/3.5", saving: "60-70%", area: "AI/ML", desc: "GPT-3.5 per task semplici, GPT-4 per complessi" },
    { strategy: "Fine-tuning modelli custom", saving: "50-70%", area: "AI/ML", desc: "Riduce dipendenza da API esterne" },
    { strategy: "Batch minting certificati", saving: "60-80%", area: "Blockchain", desc: "Raggruppa mint per ridurre gas" },
    { strategy: "Reserved Instances AWS", saving: "30-70%", area: "Infrastruttura", desc: "Commitment 1-3 anni per risparmi" },
    { strategy: "Auto-scaling", saving: "30-50%", area: "Infrastruttura", desc: "Scale up/down automatico su traffico" },
  ],
  techKpis: {
    uptime: ">99.9%",
    apiResponseTime: "<200ms (p95)",
    aiResponseTime: "<3 secondi",
    errorRate: "<0.1%",
    pageLoadTime: "<2 secondi",
    costPerAiInteraction: "<€0.05",
    costPerCertificate: "<€0.10",
  },
}

// ═══════════════════════════════════════════════
// DATI PER ANNO — Snapshot completo anno per anno
// ═══════════════════════════════════════════════

export interface YearlySnapshot {
  year: number
  label: string
  period: string
  b2cStudents: {
    masterclass: number
    bootcamp: number
    master: number
    fulltime: number
    total: number
  }
  b2bClients: {
    corporateAcademy: number
    upskilling: number
    innovationLab: number
    total: number
  }
  revenue: {
    b2cMasterclass: number
    b2cBootcamp: number
    b2cMaster: number
    b2cFulltime: number
    totalB2C: number
    b2bCorporateAcademy: number
    b2bUpskilling: number
    b2bInnovationLab: number
    totalB2B: number
    platform: number
    placement: number
    licensing: number
    totalRevenue: number
  }
  financials: {
    grossMargin: number
    ebitda: number
    ebitdaMargin: number
    netIncome: number
  }
  cashflow: {
    ebitda: number
    capex: number
    nwc: number
    fcf: number
    cumulative: number
  }
  team: number
  platformUsers: number
  kpis: {
    retention: number
    placement: number
    completion: number
    nps: number
    b2bRetention: number
    nrr: number
  }
  milestones: string[]
}

export const yearlySnapshots: YearlySnapshot[] = [
  {
    year: 1,
    label: "Anno 1",
    period: "2026",
    b2cStudents: { masterclass: 30, bootcamp: 20, master: 15, fulltime: 10, total: 75 },
    b2bClients: { corporateAcademy: 1, upskilling: 1, innovationLab: 1, total: 3 },
    revenue: {
      b2cMasterclass: 60, b2cBootcamp: 50, b2cMaster: 120, b2cFulltime: 120, totalB2C: 350,
      b2bCorporateAcademy: 250, b2bUpskilling: 100, b2bInnovationLab: 50, totalB2B: 400,
      platform: 10, placement: 15, licensing: 0, totalRevenue: 775,
    },
    financials: { grossMargin: 47, ebitda: -269, ebitdaMargin: -35, netIncome: -299 },
    cashflow: { ebitda: -269, capex: -150, nwc: -80, fcf: -499, cumulative: -499 },
    team: 7,
    platformUsers: 200,
    kpis: { retention: 68, placement: 82, completion: 85, nps: 65, b2bRetention: 65, nrr: 105 },
    milestones: [
      "Core team 7 FTE",
      "Platform MVP",
      "2 corsi attivi",
      "75 studenti iscritti",
      "3 aziende partner",
    ],
  },
  {
    year: 2,
    label: "Anno 2",
    period: "2027",
    b2cStudents: { masterclass: 60, bootcamp: 40, master: 30, fulltime: 20, total: 150 },
    b2bClients: { corporateAcademy: 3, upskilling: 4, innovationLab: 3, total: 10 },
    revenue: {
      b2cMasterclass: 120, b2cBootcamp: 100, b2cMaster: 240, b2cFulltime: 240, totalB2C: 700,
      b2bCorporateAcademy: 750, b2bUpskilling: 400, b2bInnovationLab: 150, totalB2B: 1300,
      platform: 50, placement: 40, licensing: 0, totalRevenue: 2090,
    },
    financials: { grossMargin: 50, ebitda: -78, ebitdaMargin: -4, netIncome: -128 },
    cashflow: { ebitda: -78, capex: -100, nwc: -120, fcf: -298, cumulative: -797 },
    team: 12,
    platformUsers: 600,
    kpis: { retention: 70, placement: 83, completion: 86, nps: 66, b2bRetention: 68, nrr: 108 },
    milestones: [
      "Platform V1 lancio",
      "150 studenti B2C",
      "10 clienti B2B",
      "€2.1M revenue",
      "Near break-even EBITDA",
    ],
  },
  {
    year: 3,
    label: "Anno 3",
    period: "2028",
    b2cStudents: { masterclass: 100, bootcamp: 68, master: 50, fulltime: 32, total: 250 },
    b2bClients: { corporateAcademy: 6, upskilling: 8, innovationLab: 6, total: 20 },
    revenue: {
      b2cMasterclass: 200, b2cBootcamp: 170, b2cMaster: 400, b2cFulltime: 384, totalB2C: 1154,
      b2bCorporateAcademy: 1500, b2bUpskilling: 800, b2bInnovationLab: 300, totalB2B: 2600,
      platform: 120, placement: 80, licensing: 0, totalRevenue: 3954,
    },
    financials: { grossMargin: 53, ebitda: 250, ebitdaMargin: 6, netIncome: 180 },
    cashflow: { ebitda: 250, capex: -120, nwc: -180, fcf: -50, cumulative: -847 },
    team: 18,
    platformUsers: 1200,
    kpis: { retention: 72, placement: 84, completion: 87, nps: 68, b2bRetention: 72, nrr: 112 },
    milestones: [
      "AI Enhancement completato",
      "250 studenti B2C",
      "20 clienti B2B",
      "EBITDA positivo",
      "Smart contracts Polygon",
    ],
  },
  {
    year: 4,
    label: "Anno 4",
    period: "2029",
    b2cStudents: { masterclass: 200, bootcamp: 135, master: 100, fulltime: 65, total: 500 },
    b2bClients: { corporateAcademy: 9, upskilling: 12, innovationLab: 9, total: 30 },
    revenue: {
      b2cMasterclass: 400, b2cBootcamp: 338, b2cMaster: 800, b2cFulltime: 780, totalB2C: 2318,
      b2bCorporateAcademy: 2250, b2bUpskilling: 1200, b2bInnovationLab: 450, totalB2B: 3900,
      platform: 250, placement: 180, licensing: 0, totalRevenue: 6648,
    },
    financials: { grossMargin: 54, ebitda: 739, ebitdaMargin: 11, netIncome: 553 },
    cashflow: { ebitda: 739, capex: -150, nwc: -250, fcf: 243, cumulative: -604 },
    team: 28,
    platformUsers: 2500,
    kpis: { retention: 73, placement: 85, completion: 88, nps: 70, b2bRetention: 75, nrr: 118 },
    milestones: [
      "500 studenti B2C",
      "30 clienti B2B",
      "White-label primi deal",
      "FCF positivo",
    ],
  },
  {
    year: 5,
    label: "Anno 5",
    period: "2030",
    b2cStudents: { masterclass: 320, bootcamp: 216, master: 160, fulltime: 104, total: 800 },
    b2bClients: { corporateAcademy: 15, upskilling: 20, innovationLab: 15, total: 50 },
    revenue: {
      b2cMasterclass: 640, b2cBootcamp: 540, b2cMaster: 1280, b2cFulltime: 1248, totalB2C: 3708,
      b2bCorporateAcademy: 3750, b2bUpskilling: 2000, b2bInnovationLab: 750, totalB2B: 6500,
      platform: 450, placement: 320, licensing: 0, totalRevenue: 10978,
    },
    financials: { grossMargin: 56, ebitda: 1880, ebitdaMargin: 17, netIncome: 1345 },
    cashflow: { ebitda: 1880, capex: -170, nwc: -300, fcf: 985, cumulative: 381 },
    team: 40,
    platformUsers: 4000,
    kpis: { retention: 75, placement: 86, completion: 89, nps: 72, b2bRetention: 78, nrr: 125 },
    milestones: [
      "800 studenti B2C",
      "50 clienti B2B",
      "€11M revenue",
      "17% EBITDA margin",
      "Cumulativo FCF positivo",
    ],
  },
]
