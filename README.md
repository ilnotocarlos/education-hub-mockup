# 🎓 Education Hub - Mockup Piattaforma Educativa

> Piattaforma educativa innovativa con AI personalizzata, certificazioni blockchain e design system Neo-Academic Luxury.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ilnotocarlos/education-hub-mockup)

## 🚀 Demo Live

**Repository GitHub**: [ilnotocarlos/education-hub-mockup](https://github.com/ilnotocarlos/education-hub-mockup)

**Deployed su Vercel**: [In arrivo dopo il deploy]

## 📋 Overview

Education Hub è un mockup completo di piattaforma educativa che combina:
- ✅ **AI Tutor 24/7** personalizzato con Claude AI
- ✅ **Certificazioni Blockchain** verificabili su Polygon
- ✅ **Content Mashup** (video + audio + testo sincronizzati)
- ✅ **Accessibility Modes** (Standard, Focus ADHD, Dyslexia)
- ✅ **Flipped Classroom** con pre-work materials
- ✅ **Job Placement** tracking e support

## 🚀 Deploy su Vercel

### Option 1: Deploy Automatico (Consigliato)

1. Clicca sul pulsante "Deploy with Vercel" sopra
2. Connetti il tuo account GitHub
3. Seleziona il repository `education-hub-mockup`
4. Clicca "Deploy"
5. Attendi il completamento (~ 2-3 minuti)

### Option 2: Deploy Manuale via CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login a Vercel
vercel login

# Deploy il progetto
vercel

# Deploy in produzione
vercel --prod
```

## 💻 Sviluppo Locale

### Prerequisiti
- Node.js 18+
- npm o yarn

### Setup

```bash
# Clone il repository
git clone https://github.com/ilnotocarlos/education-hub-mockup.git
cd education-hub-mockup

# Installa dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri il browser su http://localhost:3333
```

## 📁 Struttura Progetto

```
mockup/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── discover/          # Landing "Tarocchi" Assessment ✅
│   │   ├── (platform)/
│   │   │   ├── dashboard/         # Dashboard Studente ✅
│   │   │   └── lessons/[id]/      # Lesson View con Accessibility ✅
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx               # Homepage ✅
│   ├── components/
│   │   └── ui/                    # Shadcn/ui components
│   └── lib/
│       └── utils.ts
└── public/
```

## 🎨 Features Implementate

### ✅ Landing Page "Tarocchi" - `/(marketing)/discover`
- Assessment interattivo con 5 domande a tema "carte"
- Animazioni fluide con Framer Motion
- Progress tracking dinamico
- Risultati personalizzati basati sulle risposte
- Raccomandazioni corso intelligenti (Design, Tech, Business, Creative)

### ✅ Dashboard Studente - `/(platform)/dashboard`
- Overview corso con progresso complessivo
- Stats personali (ore studio, moduli, badge, ranking)
- Prossima sessione live con CTA calendario
- Tabs: Lezioni, Community, Achievements
- Upcoming lessons con status (available/locked)
- Community activity feed
- Badge e achievements con gamification

### ✅ Lesson View con Content Mashup - `/(platform)/lessons/[id]`
**Content Mashup**: Video + Testo + Audio sincronizzati su singola pagina

**Modalità Accessibilità** per neurodivergenti:
- ♿ Font leggibile aumentato
- 📏 Spaziatura 2x tra righe
- 🎨 Alto contrasto
- 🚫 No animazioni
- 🎯 Focus indicators visibili
- 📝 Sottotitoli video sincronizzati

**Content Modes:**
- 🎥 Video + Testo (default)
- 📝 Solo Testo
- 🎧 Solo Audio
- 🎬 Solo Video

**Elementi Didattici:**
- Video player con controls
- Book extracts (contenuti casa editrice)
- Quiz interattivi con feedback immediato
- Risorse esterne linkate
- Navigazione tra sezioni

### ✅ Homepage - `/`
- Hero section con value proposition
- Features grid (AI, Content Mashup, Placement)
- Cards navigazione ai mockup
- Stats piattaforma

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📱 Pagine Implementate (8 Totali)

### Marketing (Public Routes)
1. **Homepage** (`/`) - Hero, features, stats, CTAs
2. **Landing "Tarocchi"** (`/discover`) - Assessment personalizzato in 6 step
3. **Product Page** (`/courses/ux-ui-design-master`) - Dettagli corso completi
4. **Application Form** (`/apply`) - Candidatura multi-step con success screen

### Platform (Authenticated Routes)
5. **Dashboard** (`/dashboard`) - Pre-work, skills tracking, job readiness, community
6. **Lesson View** (`/lessons/1`) - Content mashup con 3 accessibility modes
7. **Onboarding** (`/onboarding`) - Setup profilo in 5 step
8. **Pre-Assessment** (`/pre-assessment`) - Quiz iniziale con personalizzazione percorso

## 🌟 Highlights Implementazione

### Content Mashup Innovativo
**Stesso contenuto fruibile in 4 modalità diverse**:
1. Video + Testo sincronizzati
2. Solo Testo con embedded audio
3. Solo Audio per ascolto background
4. Solo Video senza distrazioni

### Accessibilità Neurodivergenti
Un solo switch attiva:
- Font leggibile (tipo OpenDyslexic)
- Spaziatura aumentata 2x
- Alto contrasto colori
- Rimozione animazioni
- Focus visibile aumentato

### Design Inclusivo
- **Dislessia**: Font e spaziatura ottimizzati
- **ADHD**: No animazioni, focus chiaro
- **Daltonismo**: Nessuna dipendenza da colore
- **Ipovedenti**: Scalabile e zoom-friendly

## 📚 Documentazione di Riferimento

Documenti completi in `/Users/cbarrera/Documents/School/`:

```
├── 1-Ricerca/          → Journey, Personas
├── 2-Financial/         → Costi, ROI, Formule API
├── 3-Brand/            → Purpose, Vision, Mission
├── 4-Pitch/            → Investor Deck, OnePager
└── 5-Piattaforma/
    ├── Documentazione-Tecnica/  → Stack, Architecture, React Code
    └── mockup/                  → QUESTO PROGETTO
```

## 🎨 Design System

**Colori Primari:**
- Purple 600 → Pink 600 (gradient)
- Blue 500 → Purple 500 (secondary)
- Green 500 (success)

**Typography:**
- Headings: Bold, 2xl-6xl
- Body: Regular, base-lg
- Accessibility: +4pt, 2x line-height

## 📱 Responsive Design

Completamente responsive con breakpoints:
- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px

## 🚧 Da Implementare (Prossimi Step)

- [ ] Product Page (`/courses/[id]`)
- [ ] Community & Alumni (`/(platform)/community`)
- [ ] Placement Portal (`/(platform)/placement`)
- [ ] Profile Settings (`/(platform)/profile`)
- [ ] AI Tutor Component (floating chat)
- [ ] Navigation Layout (navbar, sidebar)

## 📝 Scripts Disponibili

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

## 💡 Note Tecniche

**Dati Mock**: Attualmente hardcoded, per production integrare:
- Backend API (Node.js/Python)
- Database (PostgreSQL/MongoDB)
- Auth0 (authentication)
- OpenAI GPT-4 (AI Tutor)
- Polygon (blockchain certificates)

**Performance**:
- Lazy loading automatico (Next.js)
- Server components dove possibile
- Client components solo per interattività

---

**Status**: ✅ Core Mockup Completato

**Prossimo**: Product Page, Community, Placement

**Docs**: `/Users/cbarrera/Documents/School/`
