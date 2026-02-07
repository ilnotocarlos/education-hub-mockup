# Sprint 2: Monorepo Setup

**Status:** ✅ COMPLETATO
**Periodo:** 06/02/2026
**PRs:** [#1](https://github.com/ilnotocarlos/education-hub-mockup/pull/1), [#41](https://github.com/ilnotocarlos/education-hub-mockup/pull/41)

---

## 🎯 Obiettivi

Migrare da repo singolo Next.js a monorepo Turborepo + pnpm, preparando infrastruttura per backend e shared packages.

---

## ✅ Task Completati

### 1. Infrastruttura Monorepo
- ✅ Inizializzato Turborepo + pnpm workspace (Issue #11)
- ✅ Spostato mockup in `apps/web/` (Issue #12)
- ✅ Configurato CI/CD GitHub Actions (Issue #15)
- ✅ Aggiornato config Vercel per monorepo (Issue #16)

### 2. Shared Packages
- ✅ Creato `packages/config/` (tsconfig, eslint base) (Issue #13)
- ✅ Creato `packages/types/` con 8 moduli TypeScript (Issue #14)

---

## 📊 Metriche

- **Files touched:** ~200
- **LOC changed:** ~1,500
- **New packages:** 2 (config, types)
- **New apps:** 1 (web)
- **PRs merged:** 2 (#1, #41)
- **Build time:** 9.7s (web + api)

---

## 🏗️ Struttura Finale

```
education-hub/
├── apps/
│   └── web/              # Next.js frontend (ex mockup)
├── packages/
│   ├── config/           # Shared configs (tsconfig, eslint)
│   └── types/            # Shared TypeScript types (8 modules)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 🔍 Lessons Learned

1. **pnpm v10**: `onlyBuiltDependencies` va in `pnpm-workspace.yaml`, non in package.json
2. **Turborepo caching** riduce dramatically build time (9.7s vs ~30s pre-monorepo)
3. **Shared types** eliminano duplicazione ma richiedono disciplina (single source of truth)
4. **Vercel monorepo** richiede config esplicita `vercel.json` con `buildCommand` custom

---

## 📋 Issue GitHub

- #11: Inizializzare monorepo Turborepo + pnpm ✅
- #12: Spostare mockup in apps/web/ ✅
- #13: Creare packages/config ✅
- #14: Creare packages/types ✅
- #15: Configurare CI/CD GitHub Actions ✅
- #16: Aggiornare config Vercel per monorepo ✅

---

## ⏭️ Next Sprint

Sprint 3: Backend Core — Fastify + tRPC + Prisma
