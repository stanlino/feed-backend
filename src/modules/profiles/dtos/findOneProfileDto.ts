import { string, z } from 'zod';

export const findOneProfileSchema = z.object({
  username: string(),
});

export type FindOneProfileDto = z.infer<typeof findOneProfileSchema>;
