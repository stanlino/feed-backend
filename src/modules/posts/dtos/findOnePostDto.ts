import { string, z } from 'zod';

export const findOnePostSchema = z.object({
  post_id: string(),
});

export type FindOnePostDto = z.infer<typeof findOnePostSchema>;
