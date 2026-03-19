import { getAllPosts } from '@/lib/blog';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://startmessaging.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMajorUpdate = new Date('2026-03-15'); 
   const posts = getAllPosts();

  const blogPostUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: lastMajorUpdate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/dlt-free-otp`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/send-otp-without-dlt`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/otp-api`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/features`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bulk-otp-api`,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/use-cases`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...blogPostUrls,
  ];
}
