import { z, string } from "zod";

export const authenticateUserSchema = z.object({
  username: string().min(2).max(24),
  password: string().min(8)
})

export type AuthenticateUserDto = z.infer<typeof authenticateUserSchema>