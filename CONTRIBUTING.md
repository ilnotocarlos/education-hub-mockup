# Contributing to Education Hub 🤝

Grazie per il tuo interesse nel contribuire! Questa guida ti aiuterà a iniziare.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

Questo progetto segue il [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). Partecipando, ti aspetti di rispettare questo codice.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm o yarn
- Git
- Code editor (VS Code consigliato)

### Setup Local Environment

```bash
# Fork il repository su GitHub
# Clone il tuo fork
git clone https://github.com/YOUR_USERNAME/education-hub-mockup.git
cd education-hub-mockup

# Add upstream remote
git remote add upstream https://github.com/ilnotocarlos/education-hub-mockup.git

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Run development server
npm run dev
```

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

## 💻 Development Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### Branch Naming Convention

- `feature/` - Nuove funzionalità
- `fix/` - Bug fixes
- `docs/` - Documentazione
- `refactor/` - Refactoring codice
- `test/` - Test aggiuntivi
- `chore/` - Task maintenance

**Examples:**
- `feature/ai-tutor-integration`
- `fix/123-navigation-scroll-bug`
- `docs/update-readme`
- `refactor/dashboard-components`

### 2. Make Changes

```bash
# Make your changes
# Test locally
npm run dev

# Run type checking
npm run type-check

# Run linter
npm run lint

# Build test
npm run build
```

### 3. Commit Changes

Seguire [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat(dashboard): add student progress chart"
git commit -m "fix(lessons): resolve video player bug #123"
git commit -m "docs(readme): update installation steps"
```

**Types:**
- `feat`: Nuova feature
- `fix`: Bug fix
- `docs`: Solo documentazione
- `style`: Formatting, no code change
- `refactor`: Refactoring
- `perf`: Performance improvement
- `test`: Test aggiuntivi
- `chore`: Build, config, dependencies

### 4. Push & Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request su GitHub
# Fill PR template
# Wait for review
```

## 🎨 Code Style

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface StudentProfile {
  id: string
  name: string
  email: string
  enrolledAt: Date
}

// ❌ DON'T: Use 'any'
const processData = (data: any) => { ... }  // ❌
const processData = (data: StudentProfile) => { ... }  // ✅

// ✅ DO: Use const assertions
const COURSE_TYPES = ['ux-ui', 'fullstack', 'data'] as const

// ✅ DO: Destructure props
export function StudentCard({ name, progress, avatar }: StudentCardProps) {
  return ...
}
```

### React Components

```typescript
// ✅ DO: Functional components with TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button
      className={cn('btn', `btn-${variant}`)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ❌ DON'T: Class components (avoid unless necessary)
class Button extends React.Component { ... }
```

### Styling con Tailwind

```tsx
// ✅ DO: Use Tailwind utilities
<div className="flex items-center gap-4 rounded-lg border-2 p-6">

// ❌ DON'T: Inline styles (avoid unless dynamic)
<div style={{ display: 'flex', gap: '1rem' }}>

// ✅ DO: Use cn() for conditional classes
<button className={cn(
  'btn',
  isActive && 'btn-active',
  isDisabled && 'btn-disabled'
)}>

// ✅ DO: Extract repeated utilities to component
const Card = ({ children }) => (
  <div className="rounded-xl border-2 bg-card p-6 shadow-lg">
    {children}
  </div>
)
```

### File Organization

```typescript
// Component file structure
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface DashboardProps {
  userId: string
}

// 3. Constants
const TABS = ['overview', 'lessons', 'community'] as const

// 4. Helper functions (outside component)
function calculateProgress(completed: number, total: number) {
  return Math.round((completed / total) * 100)
}

// 5. Component
export function Dashboard({ userId }: DashboardProps) {
  // Hooks
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('overview')

  // Handlers
  const handleTabChange = (tab: typeof TABS[number]) => {
    setActiveTab(tab)
  }

  // Render
  return (
    <div>...</div>
  )
}
```

## 📝 Commit Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Example

```
feat(ai-tutor): implement Claude API integration

- Add API client for Claude
- Implement message streaming
- Add error handling and retries
- Update UI to show typing indicator

Closes #234
```

### Rules

1. **Subject line:**
   - Max 72 characters
   - Lowercase
   - No period at end
   - Imperative mood ("add" not "added")

2. **Body:**
   - Wrap at 72 characters
   - Explain WHAT and WHY, not HOW
   - Separate from subject with blank line

3. **Footer:**
   - Reference issues: `Closes #123`, `Fixes #456`
   - Breaking changes: `BREAKING CHANGE: <description>`

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code builds without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested responsive (mobile, tablet, desktop)
- [ ] Screenshots added for UI changes
- [ ] Documentation updated if needed

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots
(if applicable)

## Checklist
- [ ] Code builds successfully
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Tested on multiple browsers
- [ ] Responsive tested
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks:** CI runs tests, linting, build
2. **Code Review:** Maintainer reviews code
3. **Changes Requested:** Address feedback
4. **Approval:** PR approved by maintainer
5. **Merge:** Maintainer merges PR

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** - Check if already reported
2. **Update to latest** - Bug may be fixed
3. **Reproduce** - Can you consistently reproduce it?

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen

**Screenshots**
Add screenshots if applicable

**Environment:**
- OS: [e.g., macOS 13.0]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]
- Version: [e.g., commit hash]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

### Before Requesting

1. **Search existing issues** - May already be planned
2. **Consider alternatives** - Is there another way?
3. **Think about scope** - Is it in scope for this project?

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions or features you've considered

**Additional context**
Mockups, examples, or other context
```

## 🧪 Testing Guidelines

### Unit Tests (TODO)

```typescript
// Use Vitest for unit tests
import { describe, it, expect } from 'vitest'
import { calculateProgress } from './utils'

describe('calculateProgress', () => {
  it('should calculate percentage correctly', () => {
    expect(calculateProgress(3, 10)).toBe(30)
  })

  it('should handle zero total', () => {
    expect(calculateProgress(0, 0)).toBe(0)
  })
})
```

### Integration Tests (TODO)

```typescript
// Use Testing Library for component tests
import { render, screen, fireEvent } from '@testing-library/react'
import { Dashboard } from './Dashboard'

describe('Dashboard', () => {
  it('should render user name', () => {
    render(<Dashboard userId="123" />)
    expect(screen.getByText('Ciao, Filippo!')).toBeInTheDocument()
  })
})
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🙏 Recognition

Contributors will be added to:
- README Contributors section
- GitHub Contributors graph
- Release notes for significant contributions

## 📞 Questions?

- **GitHub Discussions**: [Ask a question](https://github.com/ilnotocarlos/education-hub-mockup/discussions)
- **Discord**: [Join community](https://discord.gg/educationhub)
- **Email**: dev@educationhub.it

---

**Thank you for contributing! 🎉**

Your time and effort help make Education Hub better for everyone.
