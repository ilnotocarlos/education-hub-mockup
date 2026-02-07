# Sprint 5: Frontend ↔ Backend

**Status:** ⚡ PARZIALMENTE COMPLETATO (4/10 task)
**Periodo:** 06-07/02/2026
**PRs:** [#49](https://github.com/ilnotocarlos/education-hub-mockup/pull/49), [#50](https://github.com/ilnotocarlos/education-hub-mockup/pull/50), [#51](https://github.com/ilnotocarlos/education-hub-mockup/pull/51)

---

## 🎯 Obiettivi

Collegare tutte le pagine frontend con API backend reali, implementare design system neutral per internal apps, separare navigation marketing/platform.

---

## ✅ Task Completati (4/10)

### 1. Design System & Infrastructure
- ✅ Setup Design System Neutral + Package `ui-neutral` (Issue #47, PR #49)
- ✅ Setup Monorepo per 4 Internal Apps (Planning, Teach, Insights, Faculty) (Issue #48, PR #49)
- ✅ Separare Navigation Marketing vs Platform (Issue #46, PR #50)
- ✅ Ristrutturare Homepage Marketing con Value Proposition (Issue #45, PR #51)

---

## 🚧 Task In Progress (6/10)

### 2. Data Integration
- ⏳ Collegare Dashboard a dati reali (tRPC) (Issue #29)
  - **Blocker:** Richiede auth middleware completo (#25)

- ⏳ Collegare Lesson View + progress tracking (Issue #30)
  - **Blocker:** Dipende da Dashboard (#29)

- ⏳ Collegare Product Page corso (routing dinamico) (Issue #31)
  - **Status:** Mockup esistente, da collegare a `courses.getBySlug`

- ⏳ Collegare Application Form al backend (Issue #32)
  - **Status:** Form esistente, da collegare a `applications.create`

- ⏳ Collegare Profile/Settings (Issue #33)
  - **Blocker:** Richiede auth context completo

### 3. UX Polish
- ⏳ Loading states, error handling, toast (Issue #34)
  - **Status:** Pattern da definire, implementare globalmente

---

## 📊 Metriche

- **Files touched:** ~80
- **LOC changed:** ~3,000
- **New apps:** 4 (insights, faculty, planning, teach)
- **New packages:** 1 (ui-neutral)
- **PRs merged:** 3 (#49, #50, #51)

---

## 🏗️ Architettura Internal Apps

```
apps/
├── insights/     # Data Analytics (porta 3334)
├── faculty/      # Faculty Management (porta 3335)
├── planning/     # Course Planning (porta 3336)
└── teach/        # Content Creation (porta 3337)

packages/
└── ui-neutral/   # Design system white-label
    ├── components/
    ├── styles.css
    └── palette: neutral (slate, stone, gray)
```

---

## 🎨 Design System Neutral

**Palette:**
- Primary: Slate
- Secondary: Stone
- Accent: Gray
- No brand colors (white-label ready)

**Components:**
- Button, Card, Input, Select, Textarea
- Navigation, Sidebar, Footer
- Avatar, Badge, Progress
- (Shared con `apps/web` ma con palette neutral)

---

## 🔍 Lessons Learned

1. **Navigation split** critica per UX: marketing ha CTA, platform ha user context
2. **Design system neutral** facilita white-labeling per clienti B2B
3. **4 internal apps** in monorepo condividono build config ma rimangono indipendenti
4. **Tailwindcss dependency** deve essere in `ui-neutral` E in ogni app che lo importa

---

## 📋 Issue GitHub

- #29: Collegare Dashboard a dati reali (tRPC) ⏳
- #30: Collegare Lesson View + progress tracking ⏳
- #31: Collegare Product Page corso (routing dinamico) ⏳
- #32: Collegare Application Form al backend ⏳
- #33: Collegare Profile/Settings ⏳
- #34: Loading states, error handling, toast ⏳
- #45: Ristrutturare Homepage Marketing ✅
- #46: Separare Navigation Marketing vs Platform ✅
- #47: Setup Design System Neutral ✅
- #48: Setup 4 Internal Apps ✅

---

## ⏭️ Next Sprint

Sprint 6: Test + Deploy — Vitest, React Testing Library, Sentry, SEO
