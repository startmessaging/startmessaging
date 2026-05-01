import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface GuideLink {
  href: string;
  title: string;
  description: string;
}

const GUIDES: GuideLink[] = [
  {
    href: "/blog/send-otp-nodejs",
    title: "Send OTP in Node.js",
    description: "Step-by-step Node.js + Express OTP integration.",
  },
  {
    href: "/blog/send-otp-python",
    title: "Send OTP in Python",
    description: "Send and verify OTPs from Python and Django.",
  },
  {
    href: "/blog/send-otp-nextjs-app-router",
    title: "Send OTP in Next.js (App Router)",
    description: "Server Actions guide for Next.js 15/16.",
  },
  {
    href: "/blog/what-is-dlt-registration-india",
    title: "What is DLT Registration?",
    description: "Plain-English DLT explainer for Indian devs.",
  },
  {
    href: "/blog/twilio-vs-startmessaging",
    title: "Twilio vs StartMessaging",
    description: "Pricing, latency and DLT compliance compared.",
  },
  {
    href: "/blog/best-otp-api-india",
    title: "Best OTP API for India (2026)",
    description: "Side-by-side review of the major Indian OTP providers.",
  },
];

export function PopularGuides() {
  return (
    <section className="border-y bg-muted/30 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              <BookOpen className="h-6 w-6 text-primary" />
              Popular Guides
            </h2>
            <p className="mt-2 text-muted-foreground">
              Hand-picked tutorials and explainers from our blog.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Browse all 170+ articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="block rounded-lg border bg-background p-5 transition-colors hover:bg-muted/50"
              >
                <h3 className="font-semibold leading-snug">{g.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {g.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
