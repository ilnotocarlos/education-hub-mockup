"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  Heart,
  MessageCircle,
  Eye,
  Plus,
  Search,
  Filter,
  Pin,
  Award,
  Sparkles,
  BookOpen,
  Code,
  Lightbulb,
  HelpCircle,
  CheckCircle2
} from "lucide-react"

const categories = [
  { id: "all", label: "Tutti", icon: MessageSquare, count: 245 },
  { id: "questions", label: "Domande", icon: HelpCircle, count: 89 },
  { id: "projects", label: "Progetti", icon: Lightbulb, count: 67 },
  { id: "resources", label: "Risorse", icon: BookOpen, count: 45 },
  { id: "code", label: "Codice", icon: Code, count: 44 }
]

const discussions = [
  {
    id: "1",
    title: "Come condurre user interview efficaci?",
    author: "Marco Bianchi",
    authorAvatar: "MB",
    authorRole: "UX Designer @ Spotify",
    category: "questions",
    tags: ["User Research", "Interviste", "Best Practices"],
    content: "Sto per condurre le mie prime user interview per un progetto e-commerce. Quali domande dovrei fare? Come evito bias?",
    likes: 24,
    replies: 18,
    views: 156,
    isPinned: true,
    hasAcceptedAnswer: true,
    createdAt: "2 ore fa",
    lastActivity: "15 min fa"
  },
  {
    id: "2",
    title: "Feedback sul mio primo case study portfolio",
    author: "Sofia Romano",
    authorAvatar: "SR",
    authorRole: "Studente - Modulo 3",
    category: "projects",
    tags: ["Portfolio", "Feedback", "UX Design"],
    content: "Ho appena finito il mio primo case study completo. Accetto feedback costruttivo!",
    likes: 18,
    replies: 12,
    views: 89,
    isPinned: false,
    hasAcceptedAnswer: false,
    createdAt: "4 ore fa",
    lastActivity: "1 ora fa"
  },
  {
    id: "3",
    title: "Design System: Figma best practices 2026",
    author: "Luca Ferrari",
    authorAvatar: "LF",
    authorRole: "Senior Designer @ Miro",
    category: "resources",
    tags: ["Design Systems", "Figma", "Componenti"],
    content: "Ho raccolto le migliori pratiche per strutturare design systems in Figma. Condivido qui i miei learnings.",
    likes: 42,
    replies: 25,
    views: 234,
    isPinned: true,
    hasAcceptedAnswer: false,
    createdAt: "1 giorno fa",
    lastActivity: "3 ore fa"
  },
  {
    id: "4",
    title: "Preparazione colloquio Product Designer @Bending Spoons",
    author: "Elena Greco",
    authorAvatar: "EG",
    authorRole: "Alumni 2025",
    category: "questions",
    tags: ["Carriera", "Interview", "Bending Spoons"],
    content: "Ho un colloquio la prossima settimana. Qualcuno ha esperienza con il loro processo di selezione?",
    likes: 15,
    replies: 8,
    views: 67,
    isPinned: false,
    hasAcceptedAnswer: false,
    createdAt: "5 ore fa",
    lastActivity: "2 ore fa"
  },
  {
    id: "5",
    title: "Auto Layout Figma: quando usarlo vs quando no",
    author: "Andrea Conti",
    authorAvatar: "AC",
    authorRole: "Studente - Modulo 2",
    category: "code",
    tags: ["Figma", "Auto Layout", "Tutorial"],
    content: "Spiegazione step-by-step di Auto Layout con esempi pratici e casi d'uso reali.",
    likes: 38,
    replies: 14,
    views: 178,
    isPinned: false,
    hasAcceptedAnswer: false,
    createdAt: "2 giorni fa",
    lastActivity: "6 ore fa"
  },
  {
    id: "6",
    title: "Risorse gratuite: icon sets, illustrations, mockups",
    author: "Chiara Martini",
    authorAvatar: "CM",
    authorRole: "Product Designer @ YOOX",
    category: "resources",
    tags: ["Risorse", "Freebie", "Design Assets"],
    content: "Lista curata di risorse gratuite di qualità per designer. Update settimanale!",
    likes: 56,
    replies: 22,
    views: 312,
    isPinned: true,
    hasAcceptedAnswer: false,
    createdAt: "3 giorni fa",
    lastActivity: "1 giorno fa"
  }
]

const trending = [
  { topic: "Figma variables", posts: 34 },
  { topic: "Portfolio tips", posts: 28 },
  { topic: "Accessibility", posts: 22 },
  { topic: "Design tokens", posts: 19 },
  { topic: "User testing", posts: 17 }
]

const topContributors = [
  { name: "Luca Ferrari", avatar: "LF", posts: 89, likes: 456 },
  { name: "Chiara Martini", avatar: "CM", posts: 67, likes: 389 },
  { name: "Marco Bianchi", avatar: "MB", posts: 54, likes: 312 }
]

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
}

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedPosts, setLikedPosts] = useState<string[]>([])

  const toggleLike = (postId: string) => {
    setLikedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const filteredDiscussions = discussions.filter(d =>
    (activeCategory === "all" || d.category === activeCategory) &&
    (searchQuery === "" || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div>
            <h1 className="mb-2">
              Community
            </h1>
            <p className="text-xl text-muted-foreground">
              Connettiti con 5.000+ studenti e alumni
            </p>
          </div>

          <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] gap-2">
            <Plus className="w-4 h-4" />
            Nuova Discussione
          </Button>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cerca discussioni, tag, utenti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtri
          </Button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Discussions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      activeCategory === cat.id
                        ? "border-[hsl(var(--indigo)_/_0.5)] bg-[hsl(var(--indigo)_/_0.05)]"
                        : "border-border hover:border-[hsl(var(--indigo)_/_0.2)]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{cat.label}</span>
                    <Badge variant="outline" className="text-xs">
                      {cat.count}
                    </Badge>
                  </button>
                )
              })}
            </div>

            {/* Discussions List */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="space-y-4"
            >
              {filteredDiscussions.map((discussion) => (
                <motion.div key={discussion.id} variants={fadeInUp}>
                  <Card className={`border-2 hover:border-[hsl(var(--indigo)_/_0.3)] hover:shadow-lg transition-all ${
                    discussion.isPinned ? "border-[hsl(var(--amber)_/_0.3)] bg-[hsl(var(--amber)_/_0.02)]" : ""
                  }`}>
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold">
                            {discussion.authorAvatar}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex-1">
                              <h3 className="font-display text-lg font-semibold mb-1 flex items-center gap-2">
                                {discussion.isPinned && <Pin className="w-4 h-4 text-[hsl(var(--amber))]" />}
                                {discussion.title}
                                {discussion.hasAcceptedAnswer && (
                                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--sage))]" />
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {discussion.author} • {discussion.authorRole}
                              </p>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">{discussion.content}</p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {discussion.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Stats & Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <button
                                onClick={() => toggleLike(discussion.id)}
                                className={`flex items-center gap-1 hover:text-[hsl(var(--indigo))] transition-colors ${
                                  likedPosts.includes(discussion.id) ? "text-red-500" : ""
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${likedPosts.includes(discussion.id) ? "fill-current" : ""}`} />
                                {discussion.likes + (likedPosts.includes(discussion.id) ? 1 : 0)}
                              </button>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {discussion.replies}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {discussion.views}
                              </div>
                            </div>

                            <div className="text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {discussion.lastActivity}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar - Stats & Trending */}
          <div className="space-y-6">
            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Users className="w-5 h-5 text-[hsl(var(--indigo))]" />
                    Community Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-display text-3xl font-bold mb-1">5.2k</div>
                      <div className="text-xs text-muted-foreground">Membri</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl font-bold mb-1">245</div>
                      <div className="text-xs text-muted-foreground">Discussioni</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl font-bold mb-1">1.8k</div>
                      <div className="text-xs text-muted-foreground">Risposte</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl font-bold mb-1">89%</div>
                      <div className="text-xs text-muted-foreground">Active Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[hsl(var(--amber))]" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trending.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--amber))] to-[hsl(var(--amber)_/_0.8)] text-white text-xs flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <span className="font-medium">#{item.topic}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.posts}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg font-display flex items-center gap-2">
                    <Award className="w-5 h-5 text-[hsl(var(--sage))]" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topContributors.map((user, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-[hsl(var(--indigo)_/_0.2)]">
                          <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] text-white font-semibold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.posts} posts • {user.likes} likes
                          </p>
                        </div>
                        {index === 0 && <span className="text-xl">🥇</span>}
                        {index === 1 && <span className="text-xl">🥈</span>}
                        {index === 2 && <span className="text-xl">🥉</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-10 h-10 mx-auto mb-3 text-[hsl(var(--indigo))]" />
                  <h3 className="font-display text-lg font-semibold mb-2">
                    Condividi la Tua Esperienza
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Aiuta altri studenti condividendo progetti, risorse e consigli
                  </p>
                  <Button className="w-full bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)]">
                    Crea Post
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
