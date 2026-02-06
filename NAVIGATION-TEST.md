# Navigation Test Checklist

Test completo della navigazione dell'app Education Hub Mockup.

**Data test**: 6 Febbraio 2026
**Tester**: Da completare
**Branch**: main
**Deploy**: https://education-hub-mockup.vercel.app

---

## 🏠 Homepage → Marketing

- [ ] **Homepage** `/`
  - [ ] Link "Scopri il Tuo Percorso" → `/discover`
  - [ ] Link "Vedi Dashboard Demo" → `/dashboard`
  - [ ] Link "Inizia Assessment Gratuito" → `/discover`
  - [ ] Link "Esplora la Piattaforma" → `/dashboard`
  - [ ] Footer: link About, Method funzionanti

---

## 📄 Marketing Pages

### About Page `/about`
- [ ] Navbar: link a tutte le sezioni funzionanti
- [ ] Partners: link esterni (se presenti)
- [ ] Footer navigation

### Method Page `/method`
- [ ] Link "Inizia Gratis" → `/discover`
- [ ] CTA "Inizia il Tuo Trial" → `/discover`

### Courses Catalog `/courses`
- [ ] Tabs: Design, Tech, Business funzionanti
- [ ] Course card "Scopri di Più" → `/courses/[slug]`
- [ ] CTA "Fai l'Assessment" → `/discover`

### Course Detail `/courses/ux-ui-design-master`
- [ ] Tab navigation (Overview, Curriculum, Instructor, Reviews)
- [ ] CTA "Candidati Ora" → `/apply`
- [ ] Link "Vedi tutti i corsi" → `/courses`

### Discover (Assessment) `/discover`
- [ ] Quiz completabile
- [ ] Navigazione step-by-step
- [ ] Submit finale → risultati mostrati

### Apply (Application Form) `/apply`
- [ ] Form multi-step funzionante
- [ ] Validazione campi
- [ ] Submit finale

---

## 🔐 Auth Flow

### Login `/login`
- [ ] Form login visibile
- [ ] Link "Non hai un account?" → `/signup`
- [ ] Link "Password dimenticata?" → `/forgot-password`
- [ ] Social login buttons (Google, LinkedIn) visibili
- [ ] Submit (mock, non fa login reale) → `/dashboard`

### Signup `/signup`
- [ ] Form signup visibile
- [ ] Link "Hai già un account?" → `/login`
- [ ] Submit → `/onboarding` o `/dashboard`

### Forgot Password `/forgot-password`
- [ ] Form password reset visibile
- [ ] Link "Torna al Login" → `/login`

---

## 🎓 Platform - Dashboard & Overview

### Dashboard `/dashboard`
- [ ] Navigation visible con user menu
- [ ] Sidebar links:
  - [ ] Dashboard → `/dashboard`
  - [ ] I Miei Corsi → `/my-courses`
  - [ ] Community → `/community`
  - [ ] Placement → `/placement`
  - [ ] Certificati → `/certificates`
  - [ ] Profilo → `/profile`
  - [ ] Impostazioni → `/settings`
- [ ] Course progress card → link a lezioni
- [ ] "Continua" button → `/lessons/[id]`
- [ ] "Vai al Corso" → `/courses/[slug]`

### My Courses `/my-courses`
- [ ] Tabs: Tutti, In Corso, Completati, Prossimi funzionanti
- [ ] Course card "Continua" (attivi) → `/lessons/[id]`
- [ ] Course card "Vedi Certificato" (completati) → `/certificates`
- [ ] Course card "Dettagli Corso" (upcoming) → `/courses/[slug]`
- [ ] CTA "Esplora Corsi" → `/courses`
- [ ] CTA "Assessment Gratuito" → `/discover`

---

## 📚 Platform - Learning

### Lessons `/lessons/1` o `/lessons/[id]`
- [ ] Video player visibile
- [ ] Tabs: Video, Transcript, Resources, Notes
- [ ] Sidebar: lista lezioni del modulo
- [ ] "Prossima Lezione" button → `/lessons/[id+1]`
- [ ] "Segna come Completa" button
- [ ] Link "Torna al Dashboard" → `/dashboard`

### Onboarding `/onboarding`
- [ ] Multi-step form funzionante
- [ ] Progress bar aggiornata
- [ ] Submit finale → `/pre-assessment` o `/dashboard`

### Pre-Assessment `/pre-assessment`
- [ ] Quiz funzionante
- [ ] Navigazione domande
- [ ] Submit → risultati + redirect `/dashboard`

---

## 🤖 Platform - AI & Community

### AI Tutor `/ai-tutor`
- [ ] Chat interface visibile
- [ ] Suggested prompts cliccabili
- [ ] Input message funzionante
- [ ] Mock responses mostrate

### Community `/community`
- [ ] Tabs: Feed, Discussioni, Alumni funzionanti
- [ ] Search bar visibile
- [ ] Discussion cards cliccabili → dettaglio (se implementato)
- [ ] "Nuova Discussione" button

---

## 💼 Platform - Career & Profile

### Placement `/placement`
- [ ] Tabs: Jobs, CV, Interviews, Resources
- [ ] Job cards "Candidati" button (mock)
- [ ] CV score visibile
- [ ] Interview prep materiali visibili

### Certificates `/certificates`
- [ ] Lista certificati visibile
- [ ] Tabs: Tutti, NFT, Moduli
- [ ] "Download" button per certificati
- [ ] "Share" button funzionante
- [ ] Polygon/NFT links visibili

### Profile `/profile`
- [ ] Tabs: Overview, Portfolio, Achievements
- [ ] Stats visibili
- [ ] Bio e informazioni personali
- [ ] Social links (GitHub, LinkedIn) visibili
- [ ] "Modifica Profilo" → `/settings`

### Settings `/settings`
- [ ] Form settings visibili
- [ ] Tabs: Account, Notifiche, Privacy
- [ ] Save buttons funzionanti (mock)

---

## 🔄 Cross-Navigation Paths

### From Marketing to Platform
- [ ] Homepage → Discover → Apply → (Login) → Dashboard
- [ ] Courses → Course Detail → Apply → (Login) → Dashboard

### Platform Internal Navigation
- [ ] Dashboard → My Courses → Lessons → Dashboard (ciclo completo)
- [ ] Dashboard → Community → AI Tutor → Dashboard
- [ ] Dashboard → Placement → Profile → Settings → Dashboard

### Auth to Platform
- [ ] Login → Dashboard → full navigation
- [ ] Signup → Onboarding → Pre-Assessment → Dashboard

---

## 🧪 Edge Cases

- [ ] **404 Not Found**: route inesistente mostra pagina 404
- [ ] **Responsive**: mobile navigation (hamburger menu) funzionante
- [ ] **Back button**: navigazione browser funziona correttamente
- [ ] **Direct URL access**: ogni route accessibile direttamente via URL

---

## 📱 Responsive Testing

- [ ] **Mobile** (320px - 640px): tutte le pagine visualizzabili
- [ ] **Tablet** (641px - 1024px): layout corretto
- [ ] **Desktop** (1025px+): full layout

---

## ⚡ Performance

- [ ] **Page load**: tutte le pagine caricano in < 3s
- [ ] **Animations**: smooth e senza lag
- [ ] **Images**: ottimizzate e caricano velocemente

---

## 🐛 Known Issues

_Inserire qui eventuali bug trovati durante il test:_

1.
2.
3.

---

## ✅ Test Completion

**Totale items**: 100+
**Items testati**: ___
**Items passed**: ___
**Items failed**: ___

**Note finali**:


**Approvato per deploy**: ☐ SI  ☐ NO
