import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/og',
          '/feed.xml',
          '/atom.xml',
          '/llms.txt',
          '/manifest.webmanifest',
        ],
        disallow: '/api/',
      },
    ],
    sitemap: 'https://startmessaging.com/sitemap.xml',
    host: 'https://startmessaging.com',
  };
}
