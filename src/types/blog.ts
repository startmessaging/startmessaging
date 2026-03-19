import type { ReactNode } from 'react';

export type BlogCategory =
  | 'tutorials'
  | 'security'
  | 'comparisons'
  | 'compliance'
  | 'use-cases'
  | 'business';

export const BLOG_CATEGORIES: Record<
  BlogCategory,
  { label: string; color: string }
> = {
  tutorials: { label: 'Developer Tutorials', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  security: { label: 'OTP & SMS Security', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
  comparisons: { label: 'SMS API Comparisons', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  compliance: { label: 'Industry & Compliance', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' },
  'use-cases': { label: 'Use Cases', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  business: { label: 'SMS Business', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400' },
};

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  keywords: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  author: {
    name: string;
    role: string;
  };
  tableOfContents: { id: string; title: string }[];
  content: ReactNode;
  relatedSlugs: string[];
  faq?: { question: string; answer: string }[];
}
