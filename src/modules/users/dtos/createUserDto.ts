import { z } from "zod";
import { string } from "zod/lib";

export const createUserSchema = z.object({
  username: string().min(2).max(24),
  password: string().min(8)
})

export type CreateUserDto = z.infer<typeof createUserSchema>