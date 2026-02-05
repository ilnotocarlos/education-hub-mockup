import { z } from 'zod'
import { emailSchema, nameSchema, passwordSchema } from './common'

// Profile Update
export const profileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  bio: z
    .string()
    .max(500, "La bio è troppo lunga (max 500 caratteri)")
    .optional()
})

// Password Change
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Inserisci la password attuale"),
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Le password non coincidono",
    path: ["confirmPassword"]
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: "La nuova password deve essere diversa da quella attuale",
    path: ["newPassword"]
  }
)

// Notification Settings (simple booleans, no complex validation needed)
export const notificationSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  sms: z.boolean(),
  weeklyDigest: z.boolean(),
  productUpdates: z.boolean()
})

// Privacy Settings
export const privacySchema = z.object({
  profileVisibility: z.enum(["public", "private", "connections"]),
  showProgress: z.boolean(),
  showCertificates: z.boolean(),
  allowMessages: z.boolean()
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>
export type NotificationData = z.infer<typeof notificationSchema>
export type PrivacyData = z.infer<typeof privacySchema>
