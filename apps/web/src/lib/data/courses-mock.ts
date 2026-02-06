export const MOCK_COURSES = [
  {
    id: "ux-ui-design-master",
    slug: "ux-ui-design-master",
    title: "UX/UI Design Master",
    description: "Diventa un UX/UI Designer professionista in 12 settimane. Dalla user research al visual design, con portfolio e placement garantito.",
    category: "Design",
    level: "Beginner",
    duration: "12 settimane",
    price: 4900,
    image: "/courses/ux-ui-design.jpg",
    instructor: "Dr. Maria Conte",
    students: 248,
    rating: 4.9,
    highlights: [
      "Design Thinking & User Research",
      "Figma & Design Systems",
      "Portfolio Professionale",
      "Placement Garantito"
    ]
  },
  {
    id: "full-stack-development",
    slug: "full-stack-development",
    title: "Full-Stack Development",
    description: "Sviluppa applicazioni web moderne con React, Node.js, TypeScript e database. Da zero a developer professionista.",
    category: "Tech",
    level: "Intermediate",
    duration: "16 settimane",
    price: 5900,
    image: "/courses/full-stack.jpg",
    instructor: "Luca Verdi",
    students: 312,
    rating: 4.8,
    highlights: [
      "React & Next.js",
      "Node.js & Express",
      "PostgreSQL & Prisma",
      "Deploy & DevOps"
    ]
  },
  {
    id: "product-management",
    slug: "product-management",
    title: "Product Management",
    description: "Impara a gestire prodotti digitali dall'idea al lancio. Strategie, roadmap, metriche e stakeholder management.",
    category: "Business",
    level: "Advanced",
    duration: "10 settimane",
    price: 4500,
    image: "/courses/product-management.jpg",
    instructor: "Anna Bianchi",
    students: 156,
    rating: 4.9,
    highlights: [
      "Product Strategy",
      "Roadmap & Prioritization",
      "Analytics & Metriche",
      "Stakeholder Management"
    ]
  },
  {
    id: "data-science-ai",
    slug: "data-science-ai",
    title: "Data Science & AI",
    description: "Machine Learning, analisi dati e AI. Python, TensorFlow e progetti reali con dataset aziendali.",
    category: "Tech",
    level: "Advanced",
    duration: "14 settimane",
    price: 6200,
    image: "/courses/data-science.jpg",
    instructor: "Marco Neri",
    students: 89,
    rating: 4.7,
    highlights: [
      "Python & Pandas",
      "Machine Learning",
      "TensorFlow & PyTorch",
      "Real-World Projects"
    ]
  }
] as const

export const AREAS = [
  {
    id: "design",
    title: "Design",
    icon: "Palette",
    description: "UX/UI Design, Product Design, Design Systems e Visual Design per creare esperienze digitali memorabili.",
    courses: ["UX/UI Design", "Visual Design", "Product Design"],
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "tech",
    title: "Tech",
    icon: "Code",
    description: "Full-Stack Development, DevOps, Data Science e AI per costruire il futuro digitale.",
    courses: ["Full-Stack", "DevOps", "Data Science", "AI/ML"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "business",
    title: "Business",
    icon: "TrendingUp",
    description: "Product Management, Growth Marketing e Business Strategy per guidare prodotti di successo.",
    courses: ["Product Management", "Growth Marketing", "Business Strategy"],
    color: "from-amber-500 to-orange-600"
  }
] as const
