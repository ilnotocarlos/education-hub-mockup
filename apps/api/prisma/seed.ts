import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // ─── User: Filippo Rossi ───
  const filippo = await prisma.user.upsert({
    where: { email: "filippo.rossi@example.com" },
    update: {},
    create: {
      email: "filippo.rossi@example.com",
      name: "Filippo Rossi",
      password: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // "password123" hashed with bcrypt
      image: "/avatars/filippo.svg",
      role: "student",
      bio: "UX/UI Designer in formazione. Appassionato di design systems e accessibilità.",
      location: "Milano, Italia",
      website: "filippor.design",
      github: "filipporossi",
      linkedin: "filippo-rossi-ux",
    },
  })

  // ─── Course: UX/UI Design Master ───
  const course = await prisma.course.upsert({
    where: { slug: "ux-ui-design-master" },
    update: {},
    create: {
      slug: "ux-ui-design-master",
      title: "UX/UI Design Master",
      description:
        "Diventa un UX/UI Designer professionista in 12 settimane. Dalla user research al visual design, con portfolio e placement garantito.",
      category: "Design",
      level: "beginner",
      duration: "12 settimane",
      price: 4900,
      maxStudents: 20,
      published: true,
    },
  })

  // ─── Modules ───
  const modulesData = [
    { title: "Design Foundations", weeks: "1-3", order: 1, color: "indigo" },
    { title: "UX Core", weeks: "4-6", order: 2, color: "amber" },
    { title: "UI Design", weeks: "7-9", order: 3, color: "sage" },
    { title: "Portfolio & Career", weeks: "10-12", order: 4, color: "gold" },
  ]

  const modules = []
  for (const m of modulesData) {
    const mod = await prisma.module.upsert({
      where: { id: `module-${m.order}` },
      update: {},
      create: {
        id: `module-${m.order}`,
        courseId: course.id,
        ...m,
      },
    })
    modules.push(mod)
  }

  // ─── Lessons ───
  const lessonsData = [
    // Module 1
    { moduleIdx: 0, title: "Introduzione al Design Thinking", type: "video", duration: "45 min", order: 1, instructor: "Dr. Maria Conte" },
    { moduleIdx: 0, title: "User Research Workshop", type: "live", duration: "90 min", order: 2, instructor: "Dr. Maria Conte" },
    { moduleIdx: 0, title: "Figma Fundamentals", type: "video", duration: "60 min", order: 3, instructor: "Luca Verdi" },
    { moduleIdx: 0, title: "Visual Design Principles", type: "video", duration: "50 min", order: 4, instructor: "Dr. Maria Conte" },
    // Module 2
    { moduleIdx: 1, title: "Condurre User Interviews", type: "live", duration: "90 min", order: 1, instructor: "Anna Bianchi" },
    { moduleIdx: 1, title: "Information Architecture", type: "video", duration: "55 min", order: 2, instructor: "Anna Bianchi" },
    { moduleIdx: 1, title: "Wireframing con Figma", type: "exercise", duration: "120 min", order: 3, instructor: "Luca Verdi" },
    { moduleIdx: 1, title: "Prototyping Interattivo", type: "exercise", duration: "90 min", order: 4, instructor: "Luca Verdi" },
    // Module 3
    { moduleIdx: 2, title: "Color Theory e Tipografia", type: "video", duration: "50 min", order: 1, instructor: "Giulia Rossi" },
    { moduleIdx: 2, title: "Design Systems", type: "live", duration: "90 min", order: 2, instructor: "Giulia Rossi" },
    { moduleIdx: 2, title: "Responsive Design", type: "exercise", duration: "120 min", order: 3, instructor: "Luca Verdi" },
    { moduleIdx: 2, title: "Accessibility & Inclusive Design", type: "video", duration: "60 min", order: 4, instructor: "Dr. Maria Conte" },
    // Module 4
    { moduleIdx: 3, title: "Portfolio Case Study", type: "exercise", duration: "180 min", order: 1, instructor: "Anna Bianchi" },
    { moduleIdx: 3, title: "Personal Branding", type: "video", duration: "45 min", order: 2, instructor: "Marco Neri" },
    { moduleIdx: 3, title: "Mock Interview Workshop", type: "live", duration: "90 min", order: 3, instructor: "Marco Neri" },
    { moduleIdx: 3, title: "Presentazione Portfolio Finale", type: "live", duration: "120 min", order: 4, instructor: "Dr. Maria Conte" },
  ]

  for (const l of lessonsData) {
    await prisma.lesson.upsert({
      where: { id: `lesson-${modules[l.moduleIdx].id}-${l.order}` },
      update: {},
      create: {
        id: `lesson-${modules[l.moduleIdx].id}-${l.order}`,
        moduleId: modules[l.moduleIdx].id,
        title: l.title,
        type: l.type,
        duration: l.duration,
        order: l.order,
        instructor: l.instructor,
      },
    })
  }

  // ─── Enrollment ───
  const enrollment = await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: filippo.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      userId: filippo.id,
      courseId: course.id,
      status: "active",
    },
  })

  // ─── Progress (first 2 lessons completed) ───
  const firstTwoLessons = await prisma.lesson.findMany({
    where: { moduleId: modules[0].id },
    orderBy: { order: "asc" },
    take: 2,
  })

  for (const lesson of firstTwoLessons) {
    await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: filippo.id,
          lessonId: lesson.id,
        },
      },
      update: {},
      create: {
        userId: filippo.id,
        enrollmentId: enrollment.id,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date(),
        timeSpentMinutes: 75,
      },
    })
  }

  console.log("Seed completed!")
  console.log(`  User: ${filippo.name} (${filippo.email})`)
  console.log(`  Course: ${course.title}`)
  console.log(`  Modules: ${modules.length}`)
  console.log(`  Lessons: ${lessonsData.length}`)
  console.log(`  Enrollment: active`)
  console.log(`  Progress: 2/${lessonsData.length} lessons completed`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
