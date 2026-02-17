import type { Metadata } from 'next';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CtaSection } from '@/components/sections';

export const metadata: Metadata = createMetadata({
  title: 'Blog - OTP API Guides & Updates',
  description:
    'Learn about OTP APIs, DLT registration, SMS delivery, and phone verification. Guides, tutorials, and updates from the StartMessaging team.',
  path: '/blog',
});

const placeholderPosts = [
  {
    title: 'What is DLT Registration and Why Developers Hate It',
    description:
      'A complete guide to TRAI\'s DLT framework, what it requires, and how StartMessaging helps you skip it entirely.',
    href: '/dlt-free-otp',
    date: 'Coming soon',
  },
  {
    title: 'How to Send OTP in Node.js Without DLT',
    description:
      'Step-by-step tutorial for sending OTPs from a Node.js application using the StartMessaging API.',
    href: '/send-otp-without-dlt',
    date: 'Coming soon',
  },
  {
    title: 'OTP Security Best Practices for Indian Developers',
    description:
      'Learn about OTP hashing, rate limiting, expiry times, and other security best practices for your OTP flow.',
    href: '/features',
    date: 'Coming soon',
  },
];

export default function BlogPage() {
  return (
    <article>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Guides, tutorials, and updates from the StartMessaging team.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            {placeholderPosts.map((post) => (
              <Link key={post.title} href={post.href}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="text-xs text-muted-foreground">
                      {post.date}
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Start Building?"
        description="Skip the blog and go straight to sending OTPs. Sign up and integrate in 5 minutes."
        secondaryLabel="View API Docs"
        secondaryHref="/otp-api"
      />
    </article>
  );
}
