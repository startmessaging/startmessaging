import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { blogPostJsonLd } from '@/lib/jsonld';
import { BlogPostLayout } from '@/components/blog';
import { PageStructuredData } from '@/components/structured-data';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleLd = blogPostJsonLd({
    title: post.title,
    description: post.description,
    slug: post.slug,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    authorName: post.author.name,
    category: post.category,
    keywords: post.keywords,
    readingTime: post.readingTime,
  });

  return (
    <>
      <PageStructuredData
        path={`/blog/${post.slug}`}
        lastSegmentLabel={post.title}
        faq={post.faq}
        schemas={[articleLd]}
      />
      <BlogPostLayout post={post} />
    </>
  );
}
