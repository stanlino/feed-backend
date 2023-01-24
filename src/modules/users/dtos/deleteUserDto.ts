import { z, string } from "zod";

export const deleteUserSchema = z.object({
  username: string().min(2).max(24),
})

export type DeleteUserDto = z.infer<typeof deleteUserSchema>