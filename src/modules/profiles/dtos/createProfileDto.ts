import { string, z } from 'zod';

export const createProfileSchema = z.object({
  user_id: string(),
  name: string().min(1).max(255).optional().nullable(),
  avatar: string().optional().nullable(),
  bio: string().min(1).max(255).optional().nullable(),
  link: string().min(1).max(255).optional().nullable(),
});

export type CreateProfileDto = z.infer<typeof createProfileSchema>;
