import { z } from 'zod';

export const chisme = z.object({
  title: z.string(),
  content: z.string(),
  category: z.enum(['basic', 'moderated', 'awful', 'sin']),
});

export type Chisme = z.infer<typeof chisme>;
