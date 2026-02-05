"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Home,
  BookOpen,
  LayoutDashboard,
  ArrowLeft,
  Search,
  Sparkles
} from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen grain-texture flex items-center justify-center p-4">
      <div className="editorial-grid py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 max-w-2xl mx-auto"
        >
          {/* 404 Large Number */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-full blur-3xl opacity-20" />
            </div>
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="relative font-display text-[180px] md:text-[240px] font-bold leading-none bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] bg-clip-text text-transparent"
            >
              404
            </motion.h1>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-display font-bold"
            >
              Pagina Non Trovata
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-md mx-auto"
            >
              Oops! La pagina che stai cercando non esiste o è stata spostata.
              Torniamo in un luogo familiare.
            </motion.p>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] hover:shadow-xl transition-all group"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Torna alla Home
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Vai alla Dashboard
              </Link>
            </Button>
          </motion.div>

          {/* Suggested Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">Oppure prova una di queste pagine:</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/discover">
                <Card className="p-4 hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[hsl(var(--indigo)_/_0.1)] group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6 text-[hsl(var(--indigo))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Scopri Corsi</h3>
                      <p className="text-xs text-muted-foreground">Assessment gratuito</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/lessons/1">
                <Card className="p-4 hover:border-[hsl(var(--amber)_/_0.3)] hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[hsl(var(--amber)_/_0.1)] group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-[hsl(var(--amber))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Lezioni</h3>
                      <p className="text-xs text-muted-foreground">Continua a imparare</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/ai-tutor">
                <Card className="p-4 hover:border-[hsl(var(--sage)_/_0.3)] hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[hsl(var(--sage)_/_0.1)] group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-[hsl(var(--sage))]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">AI Tutor</h3>
                      <p className="text-xs text-muted-foreground">Chiedi aiuto 24/7</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna indietro
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
