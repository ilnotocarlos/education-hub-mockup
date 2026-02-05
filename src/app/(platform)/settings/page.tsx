"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/shared/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ProfileTab,
  NotificationsTab,
  AccessibilityTab,
  PrivacyTab,
  ConnectionsTab,
  BillingTab
} from "@/components/platform/settings"
import {
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  CreditCard
} from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    lessonReminders: true,
    communityActivity: false,
    placementUpdates: true,
    newsletter: true
  })

  const [accessibility, setAccessibility] = useState({
    dyslexiaMode: false,
    focusMode: false,
    highContrast: false,
    reducedMotion: false
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showProgress: true,
    showCertificates: true,
    allowMessages: true
  })

  const [profileData, setProfileData] = useState({
    firstName: "Filippo",
    lastName: "Rossi",
    email: "filippo.rossi@email.com",
    bio: "UX/UI Designer in formazione. Appassionato di design systems e accessibilità."
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleProfileSave = () => {
    console.log("Profile saved:", profileData)
    // TODO: API call to save profile
  }

  const handlePasswordSave = () => {
    console.log("Password changed")
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    // TODO: API call to change password
  }

  return (
    <div className="min-h-screen grain-texture">
      <Navigation />

      <div className="editorial-grid py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2">Impostazioni</h1>
          <p className="text-xl text-muted-foreground">
            Gestisci il tuo account e le preferenze
          </p>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profilo
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifiche
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Palette className="w-4 h-4" />
              Accessibilità
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="connections" className="gap-2">
              <Globe className="w-4 h-4" />
              Connessioni
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab
              profileData={profileData}
              setProfileData={setProfileData}
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              onProfileSave={handleProfileSave}
              onPasswordSave={handlePasswordSave}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityTab
              accessibility={accessibility}
              setAccessibility={setAccessibility}
            />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyTab
              privacy={privacy}
              setPrivacy={setPrivacy}
            />
          </TabsContent>

          <TabsContent value="connections">
            <ConnectionsTab />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
