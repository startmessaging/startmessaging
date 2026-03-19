import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/types/blog';
import { CategoryBadge } from './category-badge';
import { ReadingTime } from './reading-time';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full gap-4 py-4 transition-colors hover:bg-muted/50 sm:gap-6 sm:py-6">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <CategoryBadge category={post.category} />
          </div>
          <CardTitle className="mt-2 text-base sm:text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{post.author.name}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {date}
            </span>
            <ReadingTime minutes={post.readingTime} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
