import { BLOG_CATEGORIES, type BlogCategory } from '@/types/blog';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: BlogCategory;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const cat = BLOG_CATEGORIES[category];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        cat.color,
        className,
      )}
    >
      {cat.label}
    </span>
  );
}
