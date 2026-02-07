import Link from "next/link"
import { GraduationCap, Github, Linkedin, Twitter, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Corsi", href: "/discover" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Community", href: "/community" },
    { label: "Placement", href: "/placement" },
  ],
  company: [
    { label: "Chi Siamo", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Carriere", href: "/careers" },
    { label: "Contatti", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/education-hub", icon: Linkedin },
    { label: "Twitter", href: "https://twitter.com/educationhub", icon: Twitter },
    { label: "GitHub", href: "https://github.com/educationhub", icon: Github },
    { label: "Email", href: "mailto:info@educationhub.com", icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="editorial-grid py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] rounded-xl opacity-75 blur-sm group-hover:blur-md transition-all" />
                <div className="relative bg-gradient-to-br from-[hsl(var(--indigo))] to-[hsl(var(--amber))] p-2 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-bold">
                  Education Hub
                </span>
                <p className="text-xs text-muted-foreground">
                  Il Futuro dell'Apprendimento
                </p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Trasformiamo la formazione professionale attraverso AI, blockchain
              e un approccio human-centered. Colmiamo il gap di competenze con
              percorsi personalizzati e certificazioni verificabili.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-[hsl(var(--indigo)_/_0.1)] border border-border hover:border-[hsl(var(--indigo)_/_0.3)] flex items-center justify-center transition-all group"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--indigo))]" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Prodotto</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Azienda</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Legale</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2026 Education Hub. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Powered by AI & Blockchain · Next.js 16 · React 19 · TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
