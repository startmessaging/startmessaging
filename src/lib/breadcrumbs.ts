/**
 * Static labels for URL segments used in BreadcrumbList JSON-LD and UI.
 * Last segment can be overridden with `lastSegmentLabel` (e.g. blog post title).
 */
export const ROUTE_LABELS: Record<string, string> = {
  '/about': 'About Us',
  '/contact': 'Contact',
  '/features': 'Features',
  '/pricing': 'Pricing',
  '/otp-api': 'OTP API Documentation',
  '/dlt-free-otp': 'DLT Free OTP',
  '/send-otp-without-dlt': 'Send OTP Without DLT',
  '/bulk-otp-api': 'Bulk OTP API',
  '/use-cases': 'Use Cases',
  '/limits': 'API Limits',
  '/blog': 'Blog',
  '/refund-policy': 'Refund Policy',
};

function humanizeSegment(segment: string): string {
  return segment
    .split('-')
    .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Build breadcrumb trail for structured data. Always starts with Home.
 * Pass `lastSegmentLabel` for dynamic routes (e.g. blog post title for `/blog/slug`).
 */
export function getBreadcrumbItems(
  pathname: string,
  lastSegmentLabel?: string,
): BreadcrumbItem[] {
  const normalized =
    pathname === '' || pathname === '/'
      ? '/'
      : pathname.startsWith('/')
        ? pathname
        : `/${pathname}`;

  const items: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  if (normalized === '/') {
    return items;
  }

  const segments = normalized.split('/').filter(Boolean);
  let acc = '';

  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    let name: string;
    if (isLast && lastSegmentLabel) {
      name = lastSegmentLabel;
    } else if (ROUTE_LABELS[acc]) {
      name = ROUTE_LABELS[acc];
    } else {
      name = humanizeSegment(segments[i]);
    }
    items.push({ name, path: acc });
  }

  return items;
}
