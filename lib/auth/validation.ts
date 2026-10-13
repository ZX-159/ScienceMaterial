import { z } from "zod"

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.coerce.number().int().min(13, "You must be at least 13 years old (COPPA/GDPR-K compliance)").max(120, "Invalid age"),
  displayName: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>

export function validateAge(age: number): { valid: boolean; error?: string } {
  if (!Number.isInteger(age)) return { valid: false, error: "Age must be an integer" }
  if (age < 13) return { valid: false, error: "Must be 13+ to comply with COPPA regulations" }
  if (age > 120) return { valid: false, error: "Invalid age" }
  return { valid: true }
}
