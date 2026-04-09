import { getBreadcrumbItems } from '@/lib/breadcrumbs';
import {
  breadcrumbListJsonLd,
  faqJsonLd,
} from '@/lib/jsonld';
import { JsonLd } from './json-ld';

export interface PageStructuredDataProps {
  /** URL path, e.g. `/pricing` or `/blog/post-slug` */
  path: string;
  /** Override last crumb (e.g. blog post title for `/blog/slug`) */
  lastSegmentLabel?: string;
  /** FAQ rich results when the page exposes an FAQ block */
  faq?: { question: string; answer: string }[];
  /** Extra schemas: Product, SoftwareApplication, Blog, Article, etc. */
  schemas?: Record<string, unknown>[];
}

/**
 * Per-page structured data: BreadcrumbList (always) + optional FAQPage + custom schemas.
 * Organization JSON-LD stays in root layout.
 */
export function PageStructuredData({
  path,
  lastSegmentLabel,
  faq,
  schemas = [],
}: PageStructuredDataProps) {
  const crumbs = getBreadcrumbItems(path, lastSegmentLabel);
  const chunks: Record<string, unknown>[] = [breadcrumbListJsonLd(crumbs)];
  if (faq && faq.length > 0) {
    chunks.push(faqJsonLd(faq));
  }
  chunks.push(...schemas);
  return <JsonLd data={chunks} />;
}
