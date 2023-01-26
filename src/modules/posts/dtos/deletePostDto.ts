import { string, z } from 'zod';

export const deletePostSchema = z.object({
  post_id: string(),
  user_id: string(),
});

export type DeletePostDto = z.infer<typeof deletePostSchema>;
