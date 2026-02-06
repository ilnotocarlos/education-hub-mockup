"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Award,
  Download,
  Share2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Wallet,
  TrendingUp,
  Copy,
  Linkedin,
  Twitter,
  Link2,
  Eye,
  Lock
} from "lucide-react"

const certificates = [
  {
    id: "1",
    title: "UX/UI Design Master",
    type: "Course Completion",
    issueDate: "2026-05-15",
    nftId: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    polygonLink: "https://polygonscan.com/token/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    verified: true,
    skills: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    grade: "Eccellente",
    image: "/certificates/ux-ui-master.svg",
    status: "minted"
  },
  {
    id: "2",
    title: "User Research Fundamentals",
    type: "Module Completion",
    issueDate: "2026-04-10",
    nftId: "0x8a3C9D6E4F2B1A7c5D9E0F3A6B8C1D4E7F9A2B5C",
    polygonLink: "https://polygonscan.com/token/0x8a3C9D6E4F2B1A7c5D9E0F3A6B8C1D4E7F9A2B5C",
    verified: true,
    skills: ["Interviews", "Surveys", "Data Analysis"],
    grade: "Ottimo",
    image: "/certificates/user-research.svg",
    status: "minted"
  },
  {
    id: "3",
    title: "Design Systems Expert",
    type: "Skill Badge",
    issueDate: "2026-04-28",
    nftId: "0x1F4B2D3E5A6C7F8B9D0E1A2C3D4F5E6A7B8C9D0E",
    polygonLink: "https://polygonscan.com/token/0x1F4B2D3E5A6C7F8B9D0E1A2C3D4F5E6A7B8C9D0E",
    verified: true,
    skills: ["Component Libraries", "Design Tokens", "Documentation"],
    grade: "Eccellente",
    image: "/certificates/design-systems.svg",
    status: "minted"
  },
  {
    id: "4",
    title: "Capstone Project: E-commerce Redesign",
    type: "Project Certificate",
    issueDate: "In Progress",
    nftId: "Pending...",
    polygonLink: "",
    verified: false,
    skills: ["Full UX Process", "Client Collaboration", "Portfolio Piece"],
    grade: "In corso",
    image: "/certificates/capstone.svg",
    status: "pending"
  }
]

const badges = [
  { id: "1", name: "Early Adopter", icon: "🚀", rarity: "Legendary", earned: true },
  { id: "2", name: "Streak Master", icon: "🔥", rarity: "Epic", earned: true },
  { id: "3", name: "Community Helper", icon: "🤝", rarity: "Rare", earned: true },
  { id: "4", name: "Perfect Score", icon: "💯", rarity: "Epic", earned: false },
  { id: "5", name: "Speed Learner", icon: "⚡", rarity: "Rare", earned: true },
  { id: "6", name: "Code Master", icon: "💻", rarity: "Legendary", earned: false },
]

const walletInfo = {
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  network: "Polygon Mainnet",
  totalNFTs: 3,
  totalValue: "0.45 MATIC (~€0.38)"
}

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

export default function CertificatesPage() {
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(walletInfo.address)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

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
              Blockchain Wallet
            </h1>
            <p className="text-xl text-muted-foreground">
              I tuoi certificati NFT verificabili su Polygon
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Wallet className="w-4 h-4" />
              Connetti Wallet
            </Button>
            <Button className="bg-gradient-to-r from-[hsl(var(--indigo))] to-[hsl(var(--indigo)_/_0.8)] gap-2">
              <Download className="w-4 h-4" />
              Esporta Tutti
            </Button>
          </div>
        </motion.div>

        {/* Wallet Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="border-2 border-[hsl(var(--indigo)_/_0.3)] bg-gradient-to-br from-[hsl(var(--indigo)_/_0.05)] to-transparent">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono">
                      {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="h-6 w-6 p-0"
                    >
                      {copiedAddress ? (
                        <CheckCircle2 className="w-3 h-3 text-[hsl(var(--sage))]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Network</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[hsl(var(--sage))]" />
                    <p className="font-semibold">{walletInfo.network}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Certificati NFT</p>
                  <p className="font-display text-2xl font-bold">{walletInfo.totalNFTs}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Valore Stimato</p>
                  <p className="font-semibold">{walletInfo.totalValue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2">
            <TabsTrigger value="certificates" className="gap-2">
              <Award className="w-4 h-4" />
              Certificati
            </TabsTrigger>
            <TabsTrigger value="badges" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Badge
            </TabsTrigger>
          </TabsList>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {certificates.map((cert) => (
                <motion.div key={cert.id} variants={fadeInUp}>
                  <Card className={`border-2 hover:shadow-xl transition-all h-full ${
                    cert.status === "minted"
                      ? "hover:border-[hsl(var(--indigo)_/_0.3)]"
                      : "opacity-75"
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] flex items-center justify-center">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex gap-2">
                          {cert.status === "minted" ? (
                            <Badge className="bg-[hsl(var(--sage)_/_0.1)] border-[hsl(var(--sage)_/_0.3)] text-[hsl(var(--sage))]">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardTitle className="text-xl font-display mb-2">
                        {cert.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        {cert.type}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Data Emissione</p>
                          <p className="font-semibold">{cert.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Valutazione</p>
                          <p className="font-semibold">{cert.grade}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Skills Verificate</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {cert.status === "minted" && (
                        <div className="p-3 rounded-lg bg-muted/50">
                          <p className="text-xs text-muted-foreground mb-1">NFT ID</p>
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono flex-1 truncate">
                              {cert.nftId}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => navigator.clipboard.writeText(cert.nftId)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        {cert.status === "minted" ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                              <a href={cert.polygonLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-2" />
                                Polygonscan
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download className="w-3 h-3 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Share2 className="w-3 h-3 mr-2" />
                              Share
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full" disabled>
                            <Lock className="w-3 h-3 mr-2" />
                            In Creazione
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {badges.map((badge) => (
                <motion.div key={badge.id} variants={fadeInUp}>
                  <Card className={`border-2 text-center transition-all ${
                    badge.earned
                      ? "hover:border-[hsl(var(--amber)_/_0.3)] hover:shadow-lg cursor-pointer"
                      : "opacity-50"
                  }`}>
                    <CardContent className="p-6">
                      <div className="text-5xl mb-3">
                        {badge.earned ? badge.icon : "🔒"}
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{badge.name}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          badge.rarity === "Legendary"
                            ? "bg-[hsl(var(--amber)_/_0.1)] border-[hsl(var(--amber)_/_0.3)] text-[hsl(var(--amber))]"
                            : badge.rarity === "Epic"
                            ? "bg-[hsl(var(--indigo)_/_0.1)] border-[hsl(var(--indigo)_/_0.3)] text-[hsl(var(--indigo))]"
                            : "bg-[hsl(var(--sage)_/_0.1)] border-[hsl(var(--sage)_/_0.3)] text-[hsl(var(--sage))]"
                        }`}
                      >
                        {badge.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <Card className="border-2 mt-6">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-[hsl(var(--amber))]" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  Sblocca Più Badge!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Completa sfide e raggiungi obiettivi per guadagnare badge esclusivi
                </p>
                <Button variant="outline">
                  Vedi Tutte le Sfide
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-display">
                Condividi i Tuoi Successi
              </CardTitle>
              <CardDescription>
                Mostra i tuoi certificati verificati su LinkedIn, Twitter e portfolio personale
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Button>
                <Button variant="outline" className="gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Copia Link
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="w-4 h-4" />
                  Portfolio Pubblico
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
