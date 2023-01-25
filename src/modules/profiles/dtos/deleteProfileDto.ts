import { string, z } from 'zod';

export const deleteProfileSchema = z.object({
  user_id: string(),
});

export type DeleteProfileDto = z.infer<typeof deleteProfileSchema>;
