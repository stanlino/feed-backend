import { number, z } from 'zod';

export const findManyPostsSchema = z.object({
  page: number().min(1),
});

export type FindManyPostsDto = z.infer<typeof findManyPostsSchema>;
