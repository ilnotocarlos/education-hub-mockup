import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../trpc/trpc.js"

export const usersRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: {
          enrollments: {
            include: { course: true },
          },
        },
      })
    }),

  update: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
        location: z.string().optional(),
        website: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.userId },
        data: input,
      })
    }),

  getProgress: protectedProcedure.query(async ({ ctx }) => {
    const enrollments = await ctx.prisma.enrollment.findMany({
      where: { userId: ctx.userId },
      include: {
        course: true,
        progress: {
          include: { lesson: true },
        },
      },
    })

    return enrollments.map((enrollment: typeof enrollments[number]) => {
      const totalLessons = enrollment.progress.length
      const completedLessons = enrollment.progress.filter(
        (p: typeof enrollment.progress[number]) => p.completed
      ).length
      const totalHours = enrollment.progress.reduce(
        (acc: number, p: typeof enrollment.progress[number]) => acc + (p.timeSpentMinutes ?? 0),
        0
      )

      return {
        courseId: enrollment.courseId,
        courseTitle: enrollment.course.title,
        totalLessons,
        completedLessons,
        percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        totalHoursSpent: Math.round(totalHours / 60 * 10) / 10,
        enrolledAt: enrollment.enrolledAt,
      }
    })
  }),
})
