"use client"

import { useState } from "react"
import { useBusinessPlanStore } from "@/stores/use-business-plan-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Save, History, RotateCcw, Download, X } from "lucide-react"
import { get, set, del, keys } from "idb-keyval"

interface Snapshot {
  id: string
  label: string
  created_at: string
  data: Record<string, unknown>
}

export function BPHeader() {
  const isDirty = useBusinessPlanStore((s) => s.isDirty)
  const lastSaved = useBusinessPlanStore((s) => s.lastSaved)
  const resetAll = useBusinessPlanStore((s) => s.resetAll)
  const [showSnapshots, setShowSnapshots] = useState(false)
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [snapshotLabel, setSnapshotLabel] = useState("")

  const handleSave = () => {
    useBusinessPlanStore.setState({ isDirty: false, lastSaved: new Date().toISOString() })
  }

  const loadSnapshots = async () => {
    const allKeys = await keys()
    const snapshotKeys = allKeys.filter((k) => String(k).startsWith("bp-snapshot-"))
    const loaded: Snapshot[] = []
    for (const key of snapshotKeys) {
      const snap = await get(key)
      if (snap) loaded.push(snap as Snapshot)
    }
    loaded.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    setSnapshots(loaded)
  }

  const createSnapshot = async () => {
    if (!snapshotLabel.trim()) return
    const state = useBusinessPlanStore.getState()
    const { isDirty: _d, lastSaved: _l, ...data } = state
    const snap: Snapshot = {
      id: `bp-snapshot-${Date.now()}`,
      label: snapshotLabel.trim(),
      created_at: new Date().toISOString(),
      data: data as unknown as Record<string, unknown>,
    }
    await set(snap.id, snap)
    setSnapshotLabel("")
    await loadSnapshots()
  }

  const restoreSnapshot = async (snap: Snapshot) => {
    const actions = useBusinessPlanStore.getState()
    const dataKeys = Object.keys(snap.data)
    const newState: Record<string, unknown> = {}
    for (const key of dataKeys) {
      if (typeof actions[key as keyof typeof actions] !== "function") {
        newState[key] = snap.data[key]
      }
    }
    useBusinessPlanStore.setState({ ...newState, isDirty: true } as Partial<typeof actions>)
  }

  const deleteSnapshot = async (id: string) => {
    await del(id)
    await loadSnapshots()
  }

  const handleExport = async () => {
    const { utils, writeFile } = await import("xlsx")
    const state = useBusinessPlanStore.getState()
    const wb = utils.book_new()
    utils.book_append_sheet(wb, utils.json_to_sheet(state.revenueProjections), "Revenue")
    utils.book_append_sheet(wb, utils.json_to_sheet(state.profitability), "P&L")
    utils.book_append_sheet(wb, utils.json_to_sheet(state.cashFlow), "Cash Flow")
    utils.book_append_sheet(wb, utils.json_to_sheet(state.b2cProducts), "B2C")
    utils.book_append_sheet(wb, utils.json_to_sheet(state.b2bServices), "B2B")
    utils.book_append_sheet(wb, utils.json_to_sheet(state.scenarios), "Scenari")
    writeFile(wb, "education-hub-business-plan.xlsx")
  }

  return (
    <div className="sticky top-8 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Business Plan Dashboard</h1>
          {isDirty && <Badge variant="secondary" className="text-xs">Modificato</Badge>}
          {lastSaved && (
            <span className="text-xs text-muted-foreground">
              Salvato: {new Date(lastSaved).toLocaleTimeString("it-IT")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSave} disabled={!isDirty}>
            <Save className="h-4 w-4 mr-1" /> Salva
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => { setShowSnapshots(!showSnapshots); if (!showSnapshots) loadSnapshots() }}
          >
            <History className="h-4 w-4 mr-1" /> Snapshot
          </Button>
          {isDirty && (
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw className="h-4 w-4 mr-1" /> Ripristina
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" /> Excel
          </Button>
        </div>
      </div>

      {showSnapshots && (
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={snapshotLabel}
              onChange={(e) => setSnapshotLabel(e.target.value)}
              placeholder="Nome snapshot..."
              className="flex-1 px-3 py-1.5 text-sm border border-border rounded-md bg-background"
              onKeyDown={(e) => e.key === "Enter" && createSnapshot()}
            />
            <Button size="sm" onClick={createSnapshot} disabled={!snapshotLabel.trim()}>
              Crea Snapshot
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowSnapshots(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {snapshots.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {snapshots.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-2 rounded bg-background border border-border">
                  <div>
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(s.created_at).toLocaleString("it-IT")}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => restoreSnapshot(s)}>
                      Ripristina
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-destructive" onClick={() => deleteSnapshot(s.id)}>
                      Elimina
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nessun snapshot salvato.</p>
          )}
        </div>
      )}
    </div>
  )
}
