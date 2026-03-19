import type { Metadata } from 'next';

const SITE_URL = 'https://startmessaging.com';
const SITE_NAME = 'StartMessaging';

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? `${title} | ${SITE_NAME}` : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'OTP API',
      'DLT free OTP',
      'send OTP without DLT',
      'SMS OTP India',
      ...keywords,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`/api/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description)}`],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

export { SITE_URL, SITE_NAME };
