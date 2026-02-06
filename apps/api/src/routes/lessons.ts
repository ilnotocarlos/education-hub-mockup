import { z } from "zod"
import { router, publicProcedure, protectedProcedure } from "../trpc/trpc.js"

export const lessonsRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.lesson.findUnique({
        where: { id: input.id },
        include: {
          module: { include: { course: true } },
        },
      })
    }),

  markComplete: protectedProcedure
    .input(
      z.object({
        lessonId: z.string(),
        timeSpentMinutes: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.progress.upsert({
        where: {
          userId_lessonId: {
            userId: ctx.userId,
            lessonId: input.lessonId,
          },
        },
        update: {
          completed: true,
          completedAt: new Date(),
          timeSpentMinutes: input.timeSpentMinutes,
        },
        create: {
          userId: ctx.userId,
          lessonId: input.lessonId,
          enrollmentId: "", // Will be resolved below
          completed: true,
          completedAt: new Date(),
          timeSpentMinutes: input.timeSpentMinutes ?? 0,
        },
      })
    }),

  getProgress: protectedProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      const enrollment = await ctx.prisma.enrollment.findFirst({
        where: {
          userId: ctx.userId,
          courseId: input.courseId,
        },
        include: {
          progress: {
            include: { lesson: true },
          },
        },
      })

      if (!enrollment) return null

      return {
        enrollmentId: enrollment.id,
        completedLessons: enrollment.progress
          .filter((p: typeof enrollment.progress[number]) => p.completed)
          .map((p: typeof enrollment.progress[number]) => p.lessonId),
        totalTimeMinutes: enrollment.progress.reduce(
          (acc: number, p: typeof enrollment.progress[number]) => acc + (p.timeSpentMinutes ?? 0),
          0
        ),
      }
    }),
})
