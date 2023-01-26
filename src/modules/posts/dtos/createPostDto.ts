import { string, z } from 'zod';

export const createPostSchema = z.object({
  user_id: string(),
  text: string().max(255).nullable().optional(),
  image: string().nullable().optional(),
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
