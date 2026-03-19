import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, CalendarDays } from "lucide-react";
import { createMetadata } from "@/lib/metadata";
import { blogListJsonLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/blog";
import { BLOG_CATEGORIES, type BlogCategory } from "@/types/blog";
import { BlogCard, CategoryBadge, ReadingTime } from "@/components/blog";
import { Card, CardContent } from "@/components/ui/card";
import { CtaSection } from "@/components/sections";

export const metadata: Metadata = createMetadata({
  title: "Blog - OTP API Guides & Updates",
  description:
    "Learn about OTP APIs, DLT registration, SMS delivery, and phone verification. Guides, tutorials, and updates from the StartMessaging team.",
  path: "/blog",
  keywords: [
    "OTP blog",
    "SMS API tutorials",
    "DLT registration guide",
    "OTP security",
    "SMS India developer",
  ],
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = Object.keys(BLOG_CATEGORIES) as BlogCategory[];

  const filteredPosts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  const [featuredPost, ...remainingPosts] = filteredPosts;

  const featuredDate = featuredPost
    ? new Date(featuredPost.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListJsonLd()),
        }}
      />
      <article>
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="inline-flex items-center gap-3 text-4xl font-bold tracking-tight sm:text-5xl">
                <BookOpen className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
                Blog
              </h1>
              <p className="mt-4 text-lg text-muted-foreground sm:mt-6">
                {allPosts.length}+ guides and tutorials about OTP APIs, SMS
                delivery, and phone verification for Indian developers.
              </p>
            </div>

            <div className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:overflow-visible sm:px-0">
              <div className="mx-auto flex w-max gap-2 sm:max-w-3xl sm:flex-wrap sm:justify-center">
                <Link
                  href="/blog"
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    !category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`/blog?category=${cat}`}
                    className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {BLOG_CATEGORIES[cat].label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredPost && (
          <section className="pb-8 sm:pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Link href={`/blog/${featuredPost.slug}`}>
                <Card className="gap-0 overflow-hidden py-0 transition-colors hover:bg-muted/50">
                  <CardContent className="grid gap-6 p-6 sm:p-8 md:grid-cols-5 md:gap-10 md:p-10">
                    <div className="md:col-span-3">
                      <CategoryBadge category={featuredPost.category} />
                      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-3 text-muted-foreground sm:mt-4 sm:text-lg">
                        {featuredPost.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end md:col-span-2">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {featuredPost.author.name}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {featuredDate}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <ReadingTime minutes={featuredPost.readingTime} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        )}

        <section className="pb-12 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {remainingPosts.length > 0 && (
              <div className="mb-6 flex items-center gap-3 sm:mb-8">
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {category ? "All Articles" : "More Articles"}
                </h2>
                <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {remainingPosts.length}
                </span>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            {filteredPosts.length === 0 && (
              <p className="text-center text-muted-foreground">
                No posts found in this category.
              </p>
            )}
          </div>
        </section>

        <CtaSection
          title="Ready to Start Building?"
          description="Skip the blog and go straight to sending OTPs. Sign up and integrate in 5 minutes."
          secondaryLabel="View API Docs"
          secondaryHref="/otp-api"
        />
      </article>
    </>
  );
}
