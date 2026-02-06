"use client"

import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface NotificationsState {
  email: boolean
  push: boolean
  lessonReminders: boolean
  communityActivity: boolean
  placementUpdates: boolean
  newsletter: boolean
}

interface NotificationsTabProps {
  notifications: NotificationsState
  setNotifications: Dispatch<SetStateAction<NotificationsState>>
}

export function NotificationsTab({ notifications, setNotifications }: NotificationsTabProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl font-display">
          Preferenze Notifiche
        </CardTitle>
        <CardDescription>
          Scegli come e quando vuoi ricevere aggiornamenti
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Notifiche Email</p>
              <p className="text-sm text-muted-foreground">
                Ricevi aggiornamenti via email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Notifiche Push</p>
              <p className="text-sm text-muted-foreground">
                Notifiche nel browser
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Reminder Lezioni</p>
              <p className="text-sm text-muted-foreground">
                Promemoria per live sessions e deadline
              </p>
            </div>
            <Switch
              checked={notifications.lessonReminders}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, lessonReminders: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Attività Community</p>
              <p className="text-sm text-muted-foreground">
                Risposte ai tuoi post e menzioni
              </p>
            </div>
            <Switch
              checked={notifications.communityActivity}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, communityActivity: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Placement Updates</p>
              <p className="text-sm text-muted-foreground">
                Nuove opportunità di lavoro e interview
              </p>
            </div>
            <Switch
              checked={notifications.placementUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, placementUpdates: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Newsletter</p>
              <p className="text-sm text-muted-foreground">
                Tips, risorse e novità dal team
              </p>
            </div>
            <Switch
              checked={notifications.newsletter}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newsletter: checked })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
