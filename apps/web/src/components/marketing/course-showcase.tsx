"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Users, Star, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_COURSES } from "@/lib/data/courses-mock"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export function CourseShowcase() {
  // Show first 3 courses
  const featuredCourses = MOCK_COURSES.slice(0, 3)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 px-4 py-1.5 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              I Nostri Corsi
            </Badge>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="mb-4">
            Trasforma la Tua Carriera
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Percorsi intensivi da 10-16 settimane con placement garantito e portfolio reale
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="group overflow-hidden border-2 hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-xl transition-all h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl font-bold text-white opacity-50">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Category & Level */}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-[hsl(var(--indigo))] transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground">A partire da</div>
                      <div className="font-bold text-xl">€{course.price.toLocaleString()}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group-hover:bg-[hsl(var(--indigo))] group-hover:text-white transition-colors"
                      asChild
                    >
                      <Link href={`/(marketing)/courses/${course.slug}`}>
                        Scopri
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Courses CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/(marketing)/courses">
              Vedi Tutti i Corsi
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
