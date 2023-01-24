import { z, string } from "zod";

export const createRefreshTokenSchema = z.object({
  user_id: string(),
  token: string().uuid()
})

export type CreateRefreshTokenDto = z.infer<typeof createRefreshTokenSchema>