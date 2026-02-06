import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validation
    if (!email) {
      return NextResponse.json(
        { error: "Email obbligatoria" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      console.log(`Password reset requested for non-existent email: ${email}`)
      return NextResponse.json({
        message: "Se l'email esiste, riceverai le istruzioni per il reset",
      })
    }

    // TODO: Generate reset token and send email
    // For now, just log to console (development only)
    console.log(`Password reset requested for: ${email}`)
    console.log(`User ID: ${user.id}`)
    console.log("TODO: Send password reset email with token")

    // In production, this would:
    // 1. Generate a unique reset token
    // 2. Store it in VerificationToken model with expiration
    // 3. Send email with reset link containing the token
    // 4. User clicks link -> redirect to /reset-password?token=xxx
    // 5. Verify token and allow password reset

    return NextResponse.json({
      message: "Se l'email esiste, riceverai le istruzioni per il reset",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { error: "Si è verificato un errore" },
      { status: 500 }
    )
  }
}
