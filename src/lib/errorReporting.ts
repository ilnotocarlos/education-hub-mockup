/**
 * Centralized error reporting utility.
 * Currently logs to console; will be replaced with Sentry in Sprint 6.
 */
export function reportError(context: string, error: unknown): void {
  // TODO: Replace with Sentry.captureException(error) in Sprint 6 (Task 6.4)
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context}]`, error)
  }
}
