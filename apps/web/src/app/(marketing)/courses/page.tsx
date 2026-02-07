"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ArrowRight, Clock, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MOCK_COURSES } from "@/lib/data/courses-mock"
import { CourseCard, createCourseStats } from "@/components/shared/course-card"
import { CTASection } from "@/components/shared/cta-section"
import { usePageTransition } from "@/hooks/use-page-transition"

type AreaFilter = "all" | "Design" | "Tech" | "Business"
type LevelFilter = "all" | "Beginner" | "Intermediate" | "Advanced"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [areaFilter, setAreaFilter] = React.useState<AreaFilter>("all")
  const [levelFilter, setLevelFilter] = React.useState<LevelFilter>("all")
  const { variants } = usePageTransition()

  // Filter courses based on search and filters
  const filteredCourses = React.useMemo(() => {
    return MOCK_COURSES.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesArea = areaFilter === "all" || course.category === areaFilter
      const matchesLevel = levelFilter === "all" || course.level === levelFilter

      return matchesSearch && matchesArea && matchesLevel
    })
  }, [searchQuery, areaFilter, levelFilter])

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-[hsl(var(--indigo)_/_0.1)] to-[hsl(var(--amber)_/_0.05)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="show"
            variants={variants.fadeInUpLarge}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 px-4 py-1.5 bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.2)] text-[hsl(var(--indigo))]">
              Catalogo Completo
            </Badge>
            <h1 className="mb-4">
              Tutti i Nostri Corsi
            </h1>
            <p className="text-xl text-muted-foreground">
              Percorsi intensivi con placement garantito e portfolio reale
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cerca corsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtra:</span>
            </div>

            {/* Area Filter */}
            <div className="flex gap-2">
              {(["all", "Design", "Tech", "Business"] as const).map((area) => (
                <Button
                  key={area}
                  variant={areaFilter === area ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAreaFilter(area)}
                  className={areaFilter === area ? "bg-[hsl(var(--indigo))]" : ""}
                >
                  {area === "all" ? "Tutte le Aree" : area}
                </Button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex gap-2">
              {(["all", "Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <Button
                  key={level}
                  variant={levelFilter === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLevelFilter(level)}
                  className={levelFilter === level ? "bg-[hsl(var(--amber))]" : ""}
                >
                  {level === "all" ? "Tutti i Livelli" : level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredCourses.length} {filteredCourses.length === 1 ? "corso trovato" : "corsi trovati"}
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <CourseCard
                  title={course.title}
                  description={course.description}
                  href={`/courses/${course.slug}`}
                  category={course.category}
                  level={course.level}
                  price={course.price}
                  stats={[
                    createCourseStats.duration(course.duration),
                    createCourseStats.students(course.students),
                    createCourseStats.rating(course.rating)
                  ]}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Nessun corso trovato con i filtri selezionati
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setAreaFilter("all")
                setLevelFilter("all")
              }}
            >
              Rimuovi Filtri
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <CTASection
            title="Non Sai Quale Corso Scegliere?"
            description="Fai il nostro assessment gratuito e ti consiglieremo il percorso più adatto a te"
            variant="gradient"
            actions={
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]"
              >
                <Link href="/discover">
                  Inizia Assessment Gratuito
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            }
          />
        </motion.div>
      </div>
    </div>
  )
}
