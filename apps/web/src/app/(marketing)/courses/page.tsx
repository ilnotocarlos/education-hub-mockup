"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, SlidersHorizontal, ArrowRight, Clock, Users, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MOCK_COURSES } from "@/lib/data/courses-mock"

type AreaFilter = "all" | "Design" | "Tech" | "Business"
type LevelFilter = "all" | "Beginner" | "Intermediate" | "Advanced"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [areaFilter, setAreaFilter] = React.useState<AreaFilter>("all")
  const [levelFilter, setLevelFilter] = React.useState<LevelFilter>("all")

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
            variants={fadeInUp}
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
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
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
                        <Link href={`/courses/${course.slug}`}>
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
          className="mt-16 text-center"
        >
          <Card className="p-8 bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-[hsl(var(--amber)_/_0.05)] border-[hsl(var(--indigo)_/_0.2)]">
            <h3 className="font-display text-2xl font-semibold mb-4">
              Non Sai Quale Corso Scegliere?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Fai il nostro assessment gratuito e ti consiglieremo il percorso più adatto a te
            </p>
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
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
