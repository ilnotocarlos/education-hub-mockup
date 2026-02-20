"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

interface EditableCellProps {
  value: string | number
  onSave: (value: string | number) => void
  type?: "text" | "number" | "currency" | "percent"
  className?: string
  prefix?: string
  suffix?: string
}

export function EditableCell({
  value,
  onSave,
  type = "text",
  className,
  prefix = "",
  suffix = "",
}: EditableCellProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  useEffect(() => {
    setEditValue(String(value))
  }, [value])

  const handleSave = () => {
    setEditing(false)
    const trimmed = editValue.trim()
    if (trimmed === String(value)) return

    if (type === "number" || type === "currency" || type === "percent") {
      const num = parseFloat(trimmed.replace(/[€%,.\s]/g, '').replace(',', '.'))
      if (!isNaN(num)) {
        onSave(num)
      }
    } else {
      onSave(trimmed)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setEditValue(String(value))
      setEditing(false)
    }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full bg-primary/5 border border-primary/30 rounded px-2 py-1 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30",
          className
        )}
      />
    )
  }

  return (
    <span
      onClick={() => setEditing(true)}
      className={cn(
        "group inline-flex items-center gap-1 cursor-pointer rounded px-1 -mx-1 py-0.5 hover:bg-primary/5 transition-colors",
        className
      )}
      title="Clicca per modificare"
    >
      <span>{prefix}{typeof value === 'number' ? value.toLocaleString('it-IT') : value}{suffix}</span>
      <Pencil className="h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground/60 transition-colors shrink-0" />
    </span>
  )
}
