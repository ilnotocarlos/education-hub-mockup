# Superdesign Init Files - Education Hub

Documentazione completa del design system Education Hub per l'inizializzazione Superdesign.

## File Creati

### 1. **components.md** (1014 linee)
Tutti i componenti UI con codice sorgente completo:
- Alert, AnimatedCounter, Avatar, Badge, Button, Card
- Dialog, DropdownMenu, FormError, Input, Label
- Progress, RadioGroup, ScrollArea, Select, Separator
- Slider, Switch, Tabs, Textarea, Tooltip
- Ogni componente include: file path, nome, descrizione, props chiave, **codice completo**

### 2. **layouts.md** (491 linee)
Layout e navigation components con codice completo:
- Root Layout (fonts: Cormorant + Inter, providers)
- Marketing Layout (MarketingNav + Footer)
- Platform Layout (PlatformNav + Footer)
- MarketingNav (scroll-aware navigation)
- PlatformNav (active state detection)
- Footer (condiviso tra layouts)

### 3. **routes.md** (189 linee)
Mappa completa delle route Next.js App Router:
- Marketing routes: `/`, `/discover`, `/courses/:slug`, `/apply`, `/about`, `/method`
- Platform routes: `/dashboard`, `/lessons/:id`, `/community`, `/placement`, `/profile`, `/settings`
- Auth routes: `/login`, `/signup`, `/forgot-password`
- Error pages e route groups

### 4. **theme.md** (329 linee)
Design system theme configuration:
- **Contenuto completo** di `globals.css` (187 righe)
- Font configuration (Cormorant display + Inter body)
- Color palette HSL (indigo, amber, sage, gold)
- Custom utilities: `.grain-texture`, `.glass-effect`, `.editorial-grid`
- Typography scale, border radius, accessibility

### 5. **pages.md** (407 linee)
Dependency trees delle 10 pagine principali:
- Homepage, Discover, Product, Apply, Dashboard
- Lessons, Community, Placement, Profile, Onboarding
- Import ricorsivi tracciati per ogni pagina
- Shared dependencies e pattern comuni

## Totale

- **2430 righe** di documentazione
- **28KB** components.md (codice completo UI)
- **15KB** layouts.md (codice completo navigation)
- **11KB** pages.md (dependency analysis)
- **5.5KB** routes.md (route mapping)
- **7.6KB** theme.md (CSS completo + config)

## Stack Tecnologico

- **Framework**: Next.js 16.1.6 (App Router) + React 19
- **Styling**: Tailwind CSS v4 (inline config, no tailwind.config)
- **Components**: shadcn/ui + Radix UI primitives
- **Fonts**: Cormorant (display) + Inter (body) via next/font
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Utilities**: clsx + tailwind-merge (cn helper)

## Design System

**Neo-Academic Luxury Palette** (HSL):
- Primary (Indigo): `238 45% 28%`
- Secondary (Amber): `38 92% 58%`
- Accent (Sage): `145 25% 45%`
- Accent Alt (Gold): `43 96% 56%`

**Usage**:
```tsx
className="bg-[hsl(var(--indigo))]"
className="text-[hsl(var(--amber)_/_0.1)]"  // 10% opacity
```

## Note

- Tutti i file path sono **assoluti** (es. `/apps/web/src/...`)
- Il codice sorgente incluso è **completo e funzionante**
- NO summaries in components.md/layouts.md (codice full)
- FULL file content in theme.md (globals.css completo)
- Dependency trees in pages.md tracciano import ricorsivamente

Creato: 07 Febbraio 2026
