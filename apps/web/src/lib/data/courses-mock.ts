export const MOCK_COURSES = [
  // --- Corsi originali ---
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
  },
  // --- Nuovi percorsi AI, Robotica & IoT ---
  {
    id: "ai-experience-design",
    slug: "ai-experience-design",
    title: "AI Experience Design",
    description: "Progetta prodotti dove l'AI è il motore invisibile dell'esperienza utente. Conversational UX, Agentic UX, Responsible AI — senza scrivere codice.",
    category: "Design",
    level: "Intermediate",
    duration: "12 settimane",
    price: 6500,
    image: "/courses/ai-experience-design.jpg",
    instructor: "Dr. Elena Rossi",
    students: 64,
    rating: 4.9,
    highlights: [
      "Prompt Design & Conversational UX",
      "Agentic UX & AI Personalization",
      "Responsible AI & Bias Detection",
      "Capstone con Azienda Partner"
    ]
  },
  {
    id: "ai-engineering",
    slug: "ai-engineering",
    title: "AI Engineering & Applied LLM",
    description: "Costruisci sistemi AI in produzione: RAG, fine-tuning, agenti autonomi, MLOps. Il profilo #1 più richiesto in Italia secondo LinkedIn 2026.",
    category: "Tech",
    level: "Advanced",
    duration: "12 settimane",
    price: 7500,
    image: "/courses/ai-engineering.jpg",
    instructor: "Dr. Andrea Ferretti",
    students: 112,
    rating: 4.8,
    highlights: [
      "RAG Systems & LangChain",
      "Fine-Tuning con LoRA/QLoRA",
      "AI Agents & Multi-Agent Systems",
      "MLOps & Production Deploy"
    ]
  },
  {
    id: "ai-strategy-governance",
    slug: "ai-strategy-governance",
    title: "AI Strategy & Governance",
    description: "Decidi se, come e quando adottare l'AI in azienda. ROI, EU AI Act, change management — per chi guida, non per chi costruisce.",
    category: "Business",
    level: "Advanced",
    duration: "2 settimane",
    price: 4000,
    image: "/courses/ai-strategy.jpg",
    instructor: "Prof. Giovanni Moretti",
    students: 87,
    rating: 4.9,
    highlights: [
      "AI Business Case & ROI",
      "EU AI Act & Compliance",
      "Change Management & Governance",
      "Roadmap AI per la Tua Azienda"
    ]
  },
  {
    id: "robotics-hri",
    slug: "robotics-hri",
    title: "Robotics & Human-Machine Interaction",
    description: "Progetta come umani e robot collaborano: HRI Design, cobot programming, safety e digital twin. L'unico percorso in Italia.",
    category: "Design",
    level: "Intermediate",
    duration: "12 settimane",
    price: 8500,
    image: "/courses/robotics-hri.jpg",
    instructor: "Ing. Chiara Lombardi",
    students: 38,
    rating: 4.8,
    highlights: [
      "Human-Robot Interaction Design",
      "Cobot Programming (Universal Robots)",
      "ROS2 & Digital Twin",
      "Safety ISO 10218 & Ergonomia"
    ]
  },
  {
    id: "iot-connected-systems",
    slug: "iot-connected-systems",
    title: "IoT & Connected Systems",
    description: "Progetta e costruisci sistemi connessi end-to-end: sensori, edge computing, cloud IoT, dashboard real-time e digital twin.",
    category: "Tech",
    level: "Intermediate",
    duration: "12 settimane",
    price: 7000,
    image: "/courses/iot-systems.jpg",
    instructor: "Ing. Marco Zanetti",
    students: 56,
    rating: 4.7,
    highlights: [
      "MQTT, LoRaWAN & Protocolli IoT",
      "Edge Computing & TinyML",
      "Cloud IoT (AWS/Azure/GCP)",
      "Digital Twin & Security"
    ]
  },
  {
    id: "smart-business",
    slug: "smart-business",
    title: "Smart Business & Data-Driven Operations",
    description: "Usa dati IoT e automazione per decisioni migliori. Industry 4.0, manutenzione predittiva e Piano Transizione 5.0 — per manager, non tecnici.",
    category: "Business",
    level: "Intermediate",
    duration: "2 settimane",
    price: 3000,
    image: "/courses/smart-business.jpg",
    instructor: "Prof. Laura Martini",
    students: 94,
    rating: 4.8,
    highlights: [
      "IoT & Industry 4.0 per Manager",
      "Data-Driven Decision Making",
      "Predictive Maintenance & Supply Chain",
      "Piano Transizione 5.0 & Fondi Pubblici"
    ]
  }
] as const

export const AREAS = [
  {
    id: "design",
    title: "Design",
    icon: "Palette",
    description: "UX/UI Design, AI Experience Design e Human-Robot Interaction per creare esperienze memorabili tra umani, schermi e macchine.",
    courses: ["UX/UI Design", "AI Experience Design", "Robotics & HRI", "Product Design"],
    color: "from-purple-500 to-pink-600"
  },
  {
    id: "tech",
    title: "Tech",
    icon: "Code",
    description: "Full-Stack Development, AI Engineering, IoT e Data Science per costruire i sistemi intelligenti del futuro.",
    courses: ["Full-Stack Dev", "AI Engineering", "IoT Systems", "Data Science"],
    color: "from-blue-500 to-cyan-600"
  },
  {
    id: "business",
    title: "Business",
    icon: "TrendingUp",
    description: "Product Management, AI Strategy e Smart Operations per guidare la trasformazione digitale nelle aziende.",
    courses: ["Product Management", "AI Strategy", "Smart Business", "Growth Marketing"],
    color: "from-amber-500 to-orange-600"
  }
] as const
