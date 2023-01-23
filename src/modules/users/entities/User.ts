import { z } from "zod";
import { string } from "zod/lib";

export const UserSchema = z.object({
  id: string(),
  username: string().min(2).max(24),
  password: string().min(8)
});

export type User = z.infer<typeof UserSchema> 