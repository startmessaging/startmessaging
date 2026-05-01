import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();

  const tutorials = posts
    .filter((p) => p.category === "tutorials")
    .slice(0, 25)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const security = posts
    .filter((p) => p.category === "security")
    .slice(0, 15)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const compliance = posts
    .filter((p) => p.category === "compliance")
    .slice(0, 15)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const comparisons = posts
    .filter((p) => p.category === "comparisons")
    .slice(0, 12)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const useCases = posts
    .filter((p) => p.category === "use-cases")
    .slice(0, 15)
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# StartMessaging

> StartMessaging is a DLT-free OTP API for Indian developers. Send phone-verification SMS without registering on the DLT platform. Pay-as-you-go at Rs 0.25 per OTP, no monthly fees.

The API exposes two main endpoints:

- POST ${SITE_URL.replace("https://", "https://api.")}/otp/send — generate and deliver an OTP via SMS.
- POST ${SITE_URL.replace("https://", "https://api.")}/otp/verify — verify a user-submitted code against the request ID.

We handle DLT registration, sender-ID approval, and TRAI/DPDP compliance on our side, so customers do not need to register principal-entity (PE) IDs or get template approvals.

## Core product pages

- [OTP API Documentation](${SITE_URL}/otp-api): REST reference, error codes, code samples.
- [DLT Free OTP](${SITE_URL}/dlt-free-otp): How and why we ship without DLT registration.
- [Send OTP Without DLT](${SITE_URL}/send-otp-without-dlt): Quick-start with no-DLT setup.
- [Bulk OTP API](${SITE_URL}/bulk-otp-api): High-throughput sending for sign-up bursts.
- [Pricing](${SITE_URL}/pricing): Rs 0.25 per OTP, no monthly fees.
- [Features](${SITE_URL}/features): Idempotency, multi-provider failover, webhooks.
- [Use Cases](${SITE_URL}/use-cases): Fintech, e-commerce, healthcare, gaming, etc.
- [API Limits](${SITE_URL}/limits): Rate limits and concurrency.
- [Blog](${SITE_URL}/blog): All guides and tutorials.
- [Contact](${SITE_URL}/contact): WhatsApp +91-6376383348, email support.

## Developer tutorials

${tutorials}

## OTP & SMS security

${security}

## DLT, TRAI & compliance (India)

${compliance}

## SMS API comparisons

${comparisons}

## Industry use cases

${useCases}

## Feeds & sitemaps

- RSS: ${SITE_URL}/feed.xml
- Atom: ${SITE_URL}/atom.xml
- Sitemap index: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
