import { z, string } from 'zod';

export const deleteUserSchema = z.object({
  id: string(),
});

export type DeleteUserDto = z.infer<typeof deleteUserSchema>;
