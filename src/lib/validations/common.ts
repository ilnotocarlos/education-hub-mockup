import { z } from 'zod'

// Reusable field validators

export const emailSchema = z
  .string()
  .min(1, "L'email è obbligatoria")
  .email("Inserisci un'email valida (es: nome@dominio.com)")

export const phoneSchema = z
  .string()
  .min(1, "Il telefono è obbligatorio")
  .regex(
    /^(\+39)?[\s]?[0-9]{3}[\s]?[0-9]{3,4}[\s]?[0-9]{3,4}$/,
    "Formato non valido. Usa: +39 333 1234567"
  )

export const nameSchema = z
  .string()
  .min(2, "Il nome deve contenere almeno 2 caratteri")
  .max(50, "Il nome è troppo lungo (max 50 caratteri)")
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Il nome può contenere solo lettere")

export const passwordSchema = z
  .string()
  .min(8, "La password deve contenere almeno 8 caratteri")
  .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
  .regex(/[a-z]/, "Deve contenere almeno una lettera minuscola")
  .regex(/[0-9]/, "Deve contenere almeno un numero")
