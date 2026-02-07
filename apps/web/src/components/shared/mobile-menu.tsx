"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

interface MobileMenuProps {
  items: readonly NavItem[] | NavItem[]
  bottomSlot?: React.ReactNode
  buttonClassName?: string
  overlayClassName?: string
}

export function MobileMenu({
  items,
  bottomSlot,
  buttonClassName,
  overlayClassName,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("md:hidden p-2", buttonClassName)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className={cn(
            "md:hidden fixed inset-0 top-16 bg-white z-40",
            overlayClassName
          )}
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col gap-6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
                    item.isActive
                      ? "text-[hsl(var(--indigo))]"
                      : "text-[hsl(var(--foreground))] hover:text-[hsl(var(--indigo))]"
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {bottomSlot && (
                <>
                  <hr className="border-t border-border" />
                  <div className="pt-4">{bottomSlot}</div>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
