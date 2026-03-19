import type { BlogPost } from '@/types/blog';
import { getRelatedPosts } from '@/lib/blog';
import { CtaSection } from '@/components/sections';
import { BlogHeader } from './blog-header';
import { BlogProse } from './blog-prose';
import { TableOfContents } from './table-of-contents';
import { RelatedPosts } from './related-posts';

interface BlogPostLayoutProps {
  post: BlogPost;
}

export function BlogPostLayout({ post }: BlogPostLayoutProps) {
  const related = getRelatedPosts(post);

  return (
    <article>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogHeader post={post} />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile TOC — collapsible, shown above content on small screens */}
          <div className="mx-auto max-w-3xl lg:hidden">
            <TableOfContents items={post.tableOfContents} variant="mobile" />
          </div>
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_220px]">
            <div className="mx-auto w-full max-w-3xl">
              <BlogProse>{post.content}</BlogProse>
            </div>
            {/* Desktop TOC — sticky sidebar */}
            <div className="hidden lg:block">
              <TableOfContents items={post.tableOfContents} variant="desktop" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pb-20">
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <RelatedPosts posts={related} />
        </div>
      </section>

      <CtaSection
        title="Ready to Send OTPs?"
        description="Integrate StartMessaging in 5 minutes. No DLT registration required."
        secondaryLabel="Read API Docs"
        secondaryHref="/otp-api"
      />
    </article>
  );
}
