import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BlogProseProps {
  children: ReactNode;
  className?: string;
}

export function BlogProse({ children, className }: BlogProseProps) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        // Headings
        '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight sm:[&_h2]:text-2xl',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold sm:[&_h3]:text-xl',
        '[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-semibold sm:[&_h4]:text-lg',
        // Paragraphs
        '[&_p]:mb-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted-foreground sm:[&_p]:text-base',
        // Links
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80',
        // Lists
        '[&_ul]:mb-4 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:space-y-2 sm:[&_ul]:ml-6',
        '[&_ol]:mb-4 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:space-y-2 sm:[&_ol]:ml-6',
        '[&_li]:text-sm [&_li]:leading-7 [&_li]:text-muted-foreground sm:[&_li]:text-base',
        // Code
        '[&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:text-xs sm:[&_pre]:p-4 sm:[&_pre]:text-sm',
        '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono sm:[&_code]:px-1.5 sm:[&_code]:text-sm',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        // Blockquote
        '[&_blockquote]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground sm:[&_blockquote]:pl-4',
        // Table wrapper — horizontal scroll on mobile
        '[&_.table-wrapper]:mb-4 [&_.table-wrapper]:-mx-4 [&_.table-wrapper]:overflow-x-auto [&_.table-wrapper]:px-4 sm:[&_.table-wrapper]:mx-0 sm:[&_.table-wrapper]:px-0',
        // Table
        '[&_table]:mb-4 [&_table]:min-w-[500px] [&_table]:w-full [&_table]:border-collapse',
        '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-2 [&_th]:py-1.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold sm:[&_th]:px-4 sm:[&_th]:py-2 sm:[&_th]:text-sm',
        '[&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1.5 [&_td]:text-xs [&_td]:text-muted-foreground sm:[&_td]:px-4 sm:[&_td]:py-2 sm:[&_td]:text-sm',
        // Strong / Em
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_em]:italic',
        // HR
        '[&_hr]:my-8 [&_hr]:border-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
