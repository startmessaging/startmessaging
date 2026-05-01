import { getAllPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { BLOG_CATEGORIES } from "@/types/blog";
import { escapeXml } from "@/lib/xml";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  const channelTitle = `${SITE_NAME} Blog`;
  const channelLink = `${SITE_URL}/blog`;
  const channelDesc =
    "Guides, tutorials, and updates about OTP APIs, SMS delivery, DLT compliance, and phone verification for Indian developers.";
  const lastBuildDate =
    posts.length > 0
      ? new Date(posts[0].updatedAt || posts[0].publishedAt).toUTCString()
      : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const categoryLabel =
        BLOG_CATEGORIES[post.category]?.label ?? post.category;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(categoryLabel)}</category>
      <author>noreply@startmessaging.com (${escapeXml(post.author.name)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
