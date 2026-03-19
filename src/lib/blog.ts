import type { BlogCategory, BlogPost } from '@/types/blog';
import { allPosts } from '@/content/blog';

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return allPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const related: BlogPost[] = [];

  // First add explicitly related posts
  for (const slug of post.relatedSlugs) {
    const found = allPosts.find((p) => p.slug === slug);
    if (found && found.slug !== post.slug) {
      related.push(found);
    }
  }

  // Fill remaining with same-category posts
  if (related.length < limit) {
    const sameCat = allPosts.filter(
      (p) =>
        p.category === post.category &&
        p.slug !== post.slug &&
        !related.some((r) => r.slug === p.slug),
    );
    related.push(...sameCat.slice(0, limit - related.length));
  }

  return related.slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allPosts.map((p) => p.slug);
}

export function getAllCategories(): BlogCategory[] {
  return [...new Set(allPosts.map((p) => p.category))];
}
