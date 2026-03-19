import { CalendarDays } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import { CategoryBadge } from './category-badge';
import { ReadingTime } from './reading-time';
import { AuthorCard } from './author-card';

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mx-auto max-w-3xl text-center">
      <CategoryBadge category={post.category} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">{post.description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {date}
        </span>
        <span className="hidden sm:inline">|</span>
        <ReadingTime minutes={post.readingTime} />
      </div>
      <div className="mt-6 flex justify-center">
        <AuthorCard name={post.author.name} role={post.author.role} />
      </div>
    </header>
  );
}
