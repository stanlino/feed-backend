import { z, string } from "zod";

export const refreshTokenSchema = z.object({
  token: string()
})

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>