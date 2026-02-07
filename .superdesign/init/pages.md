# Pages - Education Hub

Dependency trees delle 10 pagine principali del progetto Education Hub.

---

## 1. Homepage (`/`)

**File**: `/apps/web/src/app/page.tsx`

### Dependency Tree
```
page.tsx
├── next/link
├── framer-motion (motion, useScroll, useTransform)
├── @/components/ui/button → Button
├── @/components/ui/badge → Badge
├── @/components/ui/animated-counter → AnimatedCounter
├── @/components/shared/navigation → Navigation
│   ├── next/link
│   ├── @/lib/utils (cn)
│   ├── @/components/shared/nav-logo → NavLogo
│   └── @/components/shared/mobile-menu → MobileMenu
├── @/components/shared/footer → Footer
│   ├── next/link
│   └── lucide-react (GraduationCap, Github, Linkedin, Twitter, Mail)
├── @/components/shared/cta-section → CTASection
│   ├── @/lib/utils (cn)
│   └── ReactNode
├── @/components/marketing/course-showcase → CourseShowcase
│   ├── @/components/ui/card
│   ├── @/components/ui/badge
│   ├── @/components/ui/button
│   └── framer-motion
├── @/components/marketing/method-section → MethodSection
│   ├── @/components/ui/card
│   ├── framer-motion
│   └── lucide-react icons
├── @/components/marketing/areas-section → AreasSection
│   ├── @/components/ui/card
│   ├── @/components/ui/badge
│   └── framer-motion
├── @/hooks/use-page-transition → usePageTransition
│   └── framer-motion (variants)
└── lucide-react (ArrowRight, Users, Sparkles, TrendingUp, Shield)
```

**Key Features**:
- Hero section with parallax effects
- Animated counter for stats
- Course showcase carousel
- Method/Areas sections
- CTA with dual buttons

---

## 2. Discover (`/discover`)

**File**: `/apps/web/src/app/(marketing)/discover/page.tsx`

### Dependency Tree
```
page.tsx
├── react (useState)
├── framer-motion (motion, AnimatePresence)
├── @/components/ui/button → Button
├── @/components/ui/card → Card, CardContent
├── @/components/ui/progress → Progress
├── @/components/ui/radio-group → RadioGroup, RadioGroupItem
├── @/components/ui/label → Label
├── @/components/ui/badge → Badge
├── @/components/ui/textarea → Textarea
├── @/components/shared/navigation → Navigation
├── lucide-react (ArrowLeft, ArrowRight, Sparkles, Clock, Shield, Target, CheckCircle2)
└── next/link
```

**Key Features**:
- 6-step wizard questionnaire
- Tarocchi card metaphor
- Dynamic result recommendations
- Progressive disclosure pattern
- ResultsPage component inline

---

## 3. Product Page (`/courses/:slug`)

**File**: `/apps/web/src/app/(marketing)/courses/[slug]/page.tsx`

### Dependency Tree
```
page.tsx
├── react (use from React.use(params))
├── next/link
├── next/navigation (notFound)
├── framer-motion (motion)
├── @/components/ui/card → Card
├── @/components/ui/badge → Badge
├── @/components/ui/button → Button
├── @/lib/data/courses-mock → MOCK_COURSES
├── @/hooks/use-page-transition → usePageTransition
├── @/components/shared/cta-section → CTASection
└── lucide-react (ArrowLeft, Clock, Users, Star, CheckCircle2, BookOpen, Award, TrendingUp, ArrowRight)
```

**Data**:
- `MOCK_CURRICULUM` object with course modules/lessons
- Dynamic curriculum rendering

**Key Features**:
- Dynamic slug routing
- Curriculum module cards
- Instructor profile card
- Pricing sidebar
- Outcomes section

---

## 4. Apply (`/apply`)

**File**: `/apps/web/src/app/(marketing)/apply/page.tsx`

### Dependency Tree
```
page.tsx
├── react (useState)
├── framer-motion (motion)
├── @/components/shared/navigation → Navigation
├── @/components/ui/card → Card, CardContent, CardDescription, CardHeader, CardTitle
├── @/components/ui/button → Button
├── @/components/ui/input → Input
├── @/components/ui/label → Label
├── @/components/ui/textarea → Textarea
├── @/components/ui/badge → Badge
├── @/components/ui/progress → Progress
├── @/components/ui/select → Select, SelectContent, SelectItem, SelectTrigger, SelectValue
├── @/hooks/useZodValidation → useZodValidation
│   ├── react (useState)
│   └── zod (ZodSchema)
├── @/components/ui/form-error → FormError
│   ├── lucide-react (AlertCircle)
│   └── @/lib/utils (cn)
├── @/lib/validations/application → applicationStepXSchema (5 schemas)
│   └── zod
├── @/lib/utils → cn
└── lucide-react (User, Mail, Phone, GraduationCap, Briefcase, Target, Upload, Calendar, CheckCircle2, ArrowRight, Sparkles)
```

**Data**:
- `experienceLevels` array
- `cohortDates` array with availability

**Key Features**:
- 5-step wizard with validation
- Zod schema validation per step
- Success screen with timeline
- Cohort selection with availability badges

---

## 5. Dashboard (`/(platform)/dashboard`)

**File**: `/apps/web/src/app/(platform)/dashboard/page.tsx`

### Dependency Tree
```
page.tsx
├── @/components/platform/dashboard/DashboardHeader
│   ├── @/components/ui/badge
│   ├── @/components/ui/button
│   └── framer-motion
├── @/components/platform/dashboard/DashboardStats
│   ├── @/components/ui/card
│   ├── framer-motion
│   └── lucide-react icons
├── @/components/platform/dashboard/PreworkSection
│   ├── @/components/ui/card
│   ├── @/components/ui/badge
│   ├── @/components/ui/progress
│   └── lucide-react icons
├── @/components/platform/dashboard/LessonsSection
│   ├── @/components/ui/card
│   ├── @/components/ui/badge
│   ├── @/components/ui/button
│   └── lucide-react icons
├── @/components/platform/dashboard/SkillsProgress
│   ├── @/components/ui/card
│   ├── @/components/ui/progress
│   └── framer-motion
├── @/components/platform/dashboard/CommunitySidebar
│   ├── @/components/ui/card
│   ├── @/components/ui/avatar
│   ├── @/components/ui/button
│   └── lucide-react icons
└── lucide-react (Clock, TrendingUp, Zap, Award, FileText, Video, Headphones, Brain, Briefcase, Download)
```

**Data**:
- `courseProgress` object
- `statsData` array
- `preworkMaterials` array
- `upcomingLessons` array
- `skillsProgress` array
- `communityActivity` array
- `quickActions` array

**Key Features**:
- Modular dashboard sections
- Stats cards grid
- Prework materials tracker
- Upcoming lessons list
- Skills progress bars
- Community sidebar

---

## 6. Lessons (`/(platform)/lessons/:id`)

**File**: `/apps/web/src/app/(platform)/lessons/[id]/page.tsx`

### Dependency Tree
```
page.tsx
├── react (useState)
├── @/components/ui/card → Card, CardContent
├── @/components/ui/button → Button
├── @/components/ui/progress → Progress
├── @/components/ui/tabs → Tabs, TabsContent, TabsList, TabsTrigger
├── @/components/ui/badge → Badge
├── @/components/ui/radio-group → RadioGroup, RadioGroupItem
├── @/components/ui/label → Label
├── @/components/ui/switch → Switch
└── lucide-react (ArrowLeft, Play, Pause, Settings, BookOpen, Headphones, Video, FileText, CheckCircle2, MessageCircle, Bookmark, ChevronRight)
```

**State**:
- `contentMode`: video-text | text | audio | video
- `isPlaying`: boolean
- `accessibilityMode`: boolean
- `progress`: number
- `quizAnswer`: string
- `currentSection`: number

**Key Features**:
- Multi-format content (video/audio/text)
- Accessibility mode toggle
- Inline quizzes with feedback
- Content mashup (book extracts, external resources)
- Speed/font controls
- Section navigation

---

## 7. Community (`/(platform)/community`)

**File**: `/apps/web/src/app/(platform)/community/page.tsx`

### Dependency Tree
```
page.tsx (hypothetical - not provided in initial files)
├── @/components/ui/card
├── @/components/ui/avatar
├── @/components/ui/badge
├── @/components/ui/button
├── @/components/ui/tabs
└── lucide-react icons
```

**Expected Features**:
- Community feed
- Alumni network
- Discussion threads
- Event calendar

---

## 8. Placement (`/(platform)/placement`)

**File**: `/apps/web/src/app/(platform)/placement/page.tsx`

### Dependency Tree
```
page.tsx (hypothetical - not provided in initial files)
├── @/components/ui/card
├── @/components/ui/badge
├── @/components/ui/button
├── @/components/ui/progress
└── lucide-react icons
```

**Expected Features**:
- Job matches
- Application tracker
- Interview prep
- Career resources

---

## 9. Profile (`/(platform)/profile`)

**File**: `/apps/web/src/app/(platform)/profile/page.tsx`

### Dependency Tree
```
page.tsx (hypothetical - not provided in initial files)
├── @/components/ui/card
├── @/components/ui/avatar
├── @/components/ui/button
├── @/components/ui/input
├── @/components/ui/label
└── lucide-react icons
```

**Expected Features**:
- User avatar/bio
- Skills showcase
- Project portfolio
- Social links

---

## 10. Onboarding (`/(platform)/onboarding`)

**File**: `/apps/web/src/app/(platform)/onboarding/page.tsx`

### Dependency Tree
```
page.tsx (hypothetical - not provided in initial files)
├── @/components/shared/form-wizard → FormWizard
│   ├── react (useState)
│   ├── framer-motion (motion, AnimatePresence)
│   ├── @/components/ui/card
│   ├── @/components/ui/button
│   ├── @/components/ui/badge
│   ├── @/components/ui/progress
│   ├── lucide-react (ArrowLeft, ArrowRight)
│   └── @/lib/utils (cn)
├── @/components/ui/input
├── @/components/ui/select
└── lucide-react icons
```

**Expected Features**:
- Multi-step wizard
- Profile setup
- Preferences configuration
- Goal setting

---

## Shared Dependencies (Common Across All Pages)

### Core Utils
- `/apps/web/src/lib/utils.ts`:
  ```tsx
  import { clsx, type ClassValue } from "clsx"
  import { twMerge } from "tailwind-merge"

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  ```

### Hooks
- `usePageTransition`: Framer Motion animation variants
- `useZodValidation`: Form validation with Zod schemas

### UI Components
All pages heavily use the shadcn/ui component library from `/apps/web/src/components/ui/`:
- Button, Badge, Card, Input, Label, Progress, Tabs, Dialog, etc.

### Navigation/Layout
- Marketing pages: `Navigation` + `Footer`
- Platform pages: `PlatformNav` + `Footer`

---

## Import Pattern Examples

### Typical Marketing Page
```tsx
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/shared/navigation"
import { Footer } from "@/components/shared/footer"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
```

### Typical Platform Page
```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlatformNav } from "@/components/platform/platform-nav"
```

### Form Pages
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { useZodValidation } from "@/hooks/useZodValidation"
import { FormError } from "@/components/ui/form-error"
import { z } from "zod"
```
