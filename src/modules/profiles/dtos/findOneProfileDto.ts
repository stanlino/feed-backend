import { string, z } from 'zod';

export const findOneProfileSchema = z.object({
  user_id: string(),
});

export type FindOneProfileDto = z.infer<typeof findOneProfileSchema>;
