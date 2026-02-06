import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormErrorProps {
  message?: string
  className?: string
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <p
      className={cn(
        "text-sm text-destructive flex items-center gap-2 mt-1 animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </p>
  )
}
