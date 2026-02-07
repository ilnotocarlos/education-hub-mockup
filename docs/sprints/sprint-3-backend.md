# Sprint 3: Backend Core

**Status:** ✅ COMPLETATO
**Periodo:** 06/02/2026
**PR Principale:** [#42](https://github.com/ilnotocarlos/education-hub-mockup/pull/42)

---

## 🎯 Obiettivi

Setup backend API completo con Fastify, tRPC, Prisma e PostgreSQL. Creazione schema database e seed dati iniziali.

---

## ✅ Task Completati

### 1. Backend Infrastructure
- ✅ Setup Fastify + tRPC in `apps/api/` (Issue #17)
- ✅ Setup PostgreSQL + Prisma schema (Issue #18)
- ✅ Configurato environment variables + `.env.example` (Issue #22)

### 2. API Routers
- ✅ Router tRPC per Users (Issue #19)
- ✅ Router tRPC per Courses e Lessons (Issue #20)

### 3. Frontend Integration
- ✅ Configurato tRPC client nel frontend (Issue #21)
- ✅ Setup TRPCProvider in `apps/web/src/lib/trpc/`

---

## 📊 Metriche

- **Files touched:** ~50
- **LOC changed:** ~2,000
- **Database models:** 8 (User, Course, Module, Lesson, Enrollment, Progress, Certificate, Application)
- **API routes:** 15+ procedures (queries + mutations)
- **Seed data:** 1 utente (Filippo Rossi) + 1 corso (UX/UI Design Master, 4 moduli, 16 lezioni)
- **PRs merged:** 1 (#42)

---

## 🗄️ Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  enrollments Enrollment[]
  progress    Progress[]
  certificates Certificate[]
  applications Application[]
}

model Course {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String?
  modules     Module[]
  enrollments Enrollment[]
}

// + Module, Lesson, Enrollment, Progress, Certificate, Application
```

---

## 🔧 Stack Tecnologico

- **Runtime:** Node.js 20 LTS
- **Framework:** Fastify v5
- **API Layer:** tRPC v11 (adapter: `@trpc/server/adapters/fastify`)
- **ORM:** Prisma v6
- **Database:** PostgreSQL (Supabase)
- **Validation:** Zod v4 (condiviso con frontend)
- **Transformer:** superjson (per Date, Map, Set serialization)

---

## 🔍 Lessons Learned

1. **Adapter tRPC:** `@trpc/server/adapters/fastify` è built-in, NON esiste pacchetto `trpc-fastify-adapter` su npm
2. **Prisma generate:** necessario eseguire prima di type-check (genera tipi PrismaClient)
3. **superjson transformer:** essenziale per serializzare Date/Map/Set tra client/server
4. **protectedProcedure:** middleware placeholder creato, da collegare con NextAuth in Sprint 4

---

## 📋 Issue GitHub

- #17: Setup Fastify + tRPC in apps/api ✅
- #18: Setup PostgreSQL + Prisma schema ✅
- #19: Router tRPC per Users ✅
- #20: Router tRPC per Courses e Lessons ✅
- #21: Configurare tRPC client nel frontend ✅
- #22: Environment variables + .env.example ✅

---

## ⏭️ Next Sprint

Sprint 4: Autenticazione — NextAuth.js v5 + Prisma adapter
