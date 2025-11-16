export const CATEGORIES = ['basic', 'moderated', 'awful', 'sin'] as const;
export type Category = (typeof CATEGORIES)[number];

export class Chisme {
  title: string;
  content: string;
  category: Category;
}
