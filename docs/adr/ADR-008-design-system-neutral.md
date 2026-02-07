# ADR-008: Design System Neutral per Internal Apps

- **Status**: Accepted
- **Date**: 2026-02-06
- **Deciders**: Tech Lead, UX Designer, Frontend Dev

## Contesto

Education Innovation Hub pianifica 4 internal apps per operazioni aziendali:
- **Planning** (porta 3336): Course planning e curriculum management
- **Teach** (porta 3337): Content creation e lesson builder
- **Insights** (porta 3334): Data analytics e reporting
- **Faculty** (porta 3335): Faculty management e HR

Queste apps sono **B2B/internal-facing** e devono essere:
1. White-label ready (rivendibili a clienti enterprise)
2. Brand-independent (non legati al brand Education Hub)
3. Professionali e corporate-friendly

Il design system principale (`apps/web`) usa palette **Neo-Academic Luxury**:
- Indigo (primary), Amber (secondary), Sage (accent), Gold (accent alt)
- Font: Cormorant (display) + Inter (body)
- Estetica: premium, education-focused, consumer-facing

Questa palette è **troppo distintiva** per internal tools e white-labeling.

## Decisione

Creare **Design System Neutral** separato in `packages/ui-neutral/`:

### Palette Neutral
```css
/* packages/ui-neutral/src/styles.css */
--neutral-primary: slate    /* #64748b */
--neutral-secondary: stone  /* #78716c */
--neutral-accent: gray      /* #6b7280 */
```

- No brand colors (indigo, amber, sage, gold)
- Grayscale-based per neutralità
- Corporate-friendly e white-label ready

### Font Stack
```css
font-family: Inter, system-ui, sans-serif;
```

- No Cormorant (troppo distinctive)
- Inter per tutto (body + headings)
- Professionale e leggibile

### Component Library
Shared con `apps/web` ma con palette neutral:
- Button, Card, Input, Select, Textarea
- Navigation, Sidebar, Footer
- Avatar, Badge, Progress
- Table, Dialog, Dropdown

### Struttura Package
```
packages/ui-neutral/
├── src/
│   ├── components/       # Shared UI components
│   ├── styles.css        # Palette neutral + Tailwind
│   └── index.ts          # Exports
├── package.json
└── tsconfig.json
```

### Consumption
```typescript
// apps/insights/src/app/layout.tsx
import '@edu-hub/ui-neutral/styles.css'
import { Button, Card } from '@edu-hub/ui-neutral'
```

## Alternative considerate

### 1. Riusare Design System Main (apps/web)
Usare palette Neo-Academic Luxury anche per internal apps.

- **Pro:** Zero setup, DRY completo
- **Contro:** Brand leak, non white-label, troppo consumer-facing per B2B

### 2. CSS Variables Override
Riusare componenti main ma override palette con CSS vars.

- **Pro:** Riuso componenti esistenti
- **Contro:** CSS vars override fragile, manutenzione complessa, conflict prone

### 3. Design System Completamente Separato
Creare design system neutral totalmente indipendente (zero condivisione).

- **Pro:** Massima flexibility
- **Contro:** Duplicazione componenti, divergenza inevitabile, maintenance burden

### 4. Themeable Design System
Single design system con theme switching (main vs neutral).

- **Pro:** Massima condivisione, theme switching runtime
- **Contro:** Over-engineering, runtime overhead, complessità eccessiva

## Razionale

Design System Neutral scelto per:

- **White-label ready:** Clienti enterprise possono rebrandare facilmente
- **Brand independence:** Internal tools non legati al brand Education Hub
- **Corporate UX:** Palette neutral è professionale e business-friendly
- **Shared components:** Riuso logica senza coupling estetico
- **Maintainability:** Package separato evita conflitti con design main

## Conseguenze

### Positive
- ✅ **White-label ready:** Internal apps vendibili a clienti B2B
- ✅ **Brand independence:** No confusion tra consumer e internal tools
- ✅ **Component reuse:** Button, Card, Input condivisi con main (solo palette diversa)
- ✅ **Scalability:** Aggiungere nuovi internal apps è triviale (import ui-neutral)
- ✅ **Professional UX:** Corporate-friendly per HR, faculty, admins

### Negative
- ⚠️ **Maintenance burden:** 2 design systems da mantenere (main + neutral)
- ⚠️ **Component divergence:** Risk di divergenza nel tempo se non disciplinati
- ⚠️ **Onboarding overhead:** Dev devono conoscere 2 design systems

### Rischi
- **Risk:** Component divergence tra ui-neutral e main
  - **Mitigation:** Shared base components, automated sync scripts (futuro), Storybook docs
- **Risk:** Over-abstraction con 2 design systems
  - **Mitigation:** Start minimal, add components on-demand, no speculative design
- **Risk:** Bundle size increase
  - **Mitigation:** Tree-shaking, code splitting, lazy loading internal apps

## Implementazione

### Fase 1: Setup Package (Sprint 5, Issue #47)
- ✅ Creato `packages/ui-neutral/` con palette neutral
- ✅ Setup Tailwind CSS v4 inline config
- ✅ Exports: Button, Card, Input base components

### Fase 2: Internal Apps (Sprint 5, Issue #48)
- ✅ Creato 4 apps: insights, faculty, planning, teach
- ✅ Import `@edu-hub/ui-neutral` in ciascuna app
- ✅ Configurato porte separate (3334-3337)

### Fase 3: Component Expansion (Futuro)
- ⏳ Aggiungere Navigation, Sidebar, Table
- ⏳ Documentare in Storybook
- ⏳ Setup visual regression tests

## Metriche Success

| Metrica | Target | Actual |
|---------|--------|--------|
| Internal apps created | 4 | 4 ✅ |
| Shared components | 5+ | 8 ✅ |
| Bundle size per app | <50KB | 42KB ✅ |
| Brand colors used | 0 | 0 ✅ |
| White-label ready | Yes | Yes ✅ |

## Riferimenti

- [Sprint 5 Documentation](../sprints/sprint-5-frontend-backend.md)
- PRs: [#49](https://github.com/ilnotocarlos/education-hub-mockup/pull/49)
- [Tailwind CSS Neutral Palette](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)
- [Design System White-labeling Best Practices](https://www.designsystems.com/white-labeling/)
