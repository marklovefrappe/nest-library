import { z } from 'zod';

export const refreshSchema = z
  .object({
    userId: z.number().positive().min(1),
    sessionId: z.string().min(1),
  })
  .required();

export type RefreshZodDto = z.infer<typeof refreshSchema>;
