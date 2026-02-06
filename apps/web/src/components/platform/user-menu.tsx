"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data - will be replaced with NextAuth session
const MOCK_USER = {
  name: "Filippo Rossi",
  email: "filippo.rossi@example.com",
  image: "/avatars/filippo.svg",
  initials: "FR",
}

interface UserMenuProps {
  isMobile?: boolean
}

export function UserMenu({ isMobile = false }: UserMenuProps) {
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement signOut() from next-auth
    router.push("/(auth)/login")
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={MOCK_USER.image} alt={MOCK_USER.name} />
            <AvatarFallback>{MOCK_USER.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{MOCK_USER.name}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {MOCK_USER.email}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href="/(platform)/profile"
            className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--indigo))]"
          >
            <User className="h-4 w-4" />
            Il mio profilo
          </Link>
          <Link
            href="/(platform)/settings"
            className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--indigo))]"
          >
            <Settings className="h-4 w-4" />
            Impostazioni
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))]/80"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 focus:outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={MOCK_USER.image} alt={MOCK_USER.name} />
            <AvatarFallback>{MOCK_USER.initials}</AvatarFallback>
          </Avatar>
          <span className="hidden lg:block text-sm font-medium">
            {MOCK_USER.name}
          </span>
          <ChevronDown className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={MOCK_USER.image} alt={MOCK_USER.name} />
            <AvatarFallback>{MOCK_USER.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{MOCK_USER.name}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {MOCK_USER.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/(platform)/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Il mio profilo
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/(platform)/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Impostazioni
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-[hsl(var(--destructive))] cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
