'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  variant?: 'mobile' | 'desktop';
}

export function TableOfContents({
  items,
  variant = 'desktop',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const tocList = (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'block py-0.5 text-muted-foreground transition-colors hover:text-foreground',
              activeId === item.id && 'font-medium text-primary',
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === 'mobile') {
    return (
      <nav className="mb-8 rounded-lg border bg-card p-4">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between text-sm font-semibold"
        >
          On this page
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              mobileOpen && 'rotate-180',
            )}
          />
        </button>
        {mobileOpen && <div className="mt-3">{tocList}</div>}
      </nav>
    );
  }

  return (
    <nav>
      <div className="sticky top-24">
        <p className="mb-3 text-sm font-semibold">On this page</p>
        {tocList}
      </div>
    </nav>
  );
}
