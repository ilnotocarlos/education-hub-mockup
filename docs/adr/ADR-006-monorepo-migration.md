# ADR-006: Migrazione a Monorepo Turborepo + pnpm

- **Status**: Accepted
- **Date**: 2026-02-06
- **Deciders**: Tech Lead, Frontend Dev

## Contesto

Il progetto Education Innovation Hub ha completato Sprint 0 con un mockup standalone Next.js in `5-Piattaforma/mockup/`. La roadmap prevede l'aggiunta di un backend (Fastify + tRPC), pacchetti condivisi (UI, types, utils), e servizi AI. La struttura attuale a singola app non supporta questa crescita.

## Decisione

Migrare il progetto da app standalone Next.js a **monorepo** gestito con **Turborepo + pnpm workspaces**.

### Struttura target

```
education-hub/
├── apps/
│   ├── web/          # Next.js frontend (migrato dal mockup)
│   ├── api/          # Fastify backend + tRPC
│   └── admin/        # Admin dashboard (futuro)
├── packages/
│   ├── ui/           # Componenti condivisi (shadcn/ui)
│   ├── types/        # TypeScript types condivisi
│   ├── config/       # Config ESLint, TS, Tailwind
│   ├── utils/        # Utility condivise
│   └── ai/           # AI utilities (prompts, RAG)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

### Strategia di migrazione

1. Setup infrastruttura monorepo (turbo.json, pnpm-workspace.yaml, tsconfig base)
2. Spostare mockup Next.js in `apps/web/`
3. Estrarre componenti condivisi in `packages/ui/`
4. Estrarre types condivisi in `packages/types/`
5. Configurare build pipeline con Turborepo
6. Verificare deploy Vercel ad ogni step

## Alternative considerate

### 1. Nx
- Pro: Ecosistema maturo, plugin ricchi, computation caching distribuito
- Contro: Configurazione piu complessa, overhead maggiore per un team piccolo, opinato

### 2. Lerna (v7+)
- Pro: Standard storico per monorepo JS
- Contro: Principalmente focalizzato su publishing NPM, meno ottimizzato per app monorepo

### 3. Mantenere app separate
- Pro: Semplicita iniziale
- Contro: Code duplication, nessun type sharing, DX frammentata, divergenza inevitabile

## Razionale

Turborepo e stato scelto per:

- **Semplicita**: configurazione minimale rispetto a Nx
- **Performance**: cache locale e remota, build incrementali, task parallelizzati
- **Compatibilita**: integrazione nativa con Vercel per deploy
- **pnpm**: piu veloce e disk-efficient di npm/yarn, supporto workspaces nativo
- **Scala adeguata**: ottimo per team piccoli-medi che crescono

## Conseguenze

### Positive
- Condivisione codice tra frontend, backend e pacchetti senza pubblicare su NPM
- Type safety end-to-end con types condivisi
- Build incrementali riducono tempi CI/CD
- DX unificata: un solo `pnpm install`, un solo `pnpm turbo run dev`

### Negative
- Curva di apprendimento iniziale per la struttura monorepo
- Configurazione iniziale richiede tempo (path aliases, tsconfig references)
- Deploy Vercel richiede configurazione specifica per monorepo

### Rischi
- La migrazione potrebbe introdurre regressioni nel mockup esistente
- Mitigazione: verificare build e funzionalita dopo ogni step incrementale

## Riferimenti

- [ADR-001: Monorepo Turborepo + pnpm](./ADR-001-monorepo-turborepo.md) (decisione originale)
- [Turborepo Docs](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
