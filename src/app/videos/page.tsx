import type { Metadata } from "next";
import Link from "next/link";
import { PageStructuredData } from "@/components/structured-data";
import { YouTubeEmbed } from "@/components/youtube-embed";
import { CtaSection } from "@/components/sections";
import { createMetadata, SITE_URL } from "@/lib/metadata";
import {
  itemListJsonLd,
  videoGuidesWebPageJsonLd,
  youtubeVideoObjectJsonLd,
} from "@/lib/jsonld";
import {
  STARTMESSAGING_VIDEO_GUIDES,
  secondsToIso8601Duration,
} from "@/lib/startmessaging-videos";
import { DASHBOARD_URL } from "@/lib/constants";

const path = "/videos";
const pageTitle = "Video guides — registration and dashboard";
const pageDescription =
  "Watch official StartMessaging tutorials: create your account without DLT paperwork, then learn the dashboard for API keys, templates, logs, and wallet.";

const baseMetadata = createMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    "StartMessaging tutorial",
    "StartMessaging registration",
    "StartMessaging dashboard",
    "OTP API tutorial",
    "DLT free OTP signup",
  ],
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    type: "website",
    videos: [
      {
        url: "https://www.youtube.com/embed/yafofDkYzXA",
        secureUrl: "https://www.youtube.com/embed/yafofDkYzXA",
        type: "text/html",
        width: 1280,
        height: 720,
      },
      {
        url: "https://www.youtube.com/embed/fXDInhle9Z0",
        secureUrl: "https://www.youtube.com/embed/fXDInhle9Z0",
        type: "text/html",
        width: 1280,
        height: 720,
      },
    ],
  },
};

const faq = [
  {
    question: "Where can I watch how to register for StartMessaging?",
    answer:
      "Use the registration tutorial on this page (embedded from the official StartMessaging YouTube channel). It walks through signup and what you need before sending your first OTP.",
  },
  {
    question: "Is there a video that explains the StartMessaging dashboard?",
    answer:
      "Yes. The dashboard tutorial on this page covers projects, API keys, templates, delivery visibility, and wallet usage from the web console.",
  },
  {
    question: "Do I need DLT registration to use StartMessaging?",
    answer:
      "StartMessaging is built so developers can send OTPs without completing personal DLT registration. The registration video explains how account setup works alongside our DLT-registered delivery.",
  },
  {
    question: "Can I watch these videos on YouTube directly?",
    answer:
      "Both guides are public on YouTube. You can open the same players in a new tab from the link under each embedded video.",
  },
];

export default function VideosPage() {
  const videoSchemas = STARTMESSAGING_VIDEO_GUIDES.map((v) =>
    youtubeVideoObjectJsonLd({
      youtubeId: v.youtubeId,
      name: v.title,
      description: v.description,
      thumbnailUrls: [v.thumbnailUrl, v.thumbnailUrlMax],
      uploadDate: v.uploadDate,
      durationIso8601: secondsToIso8601Duration(v.durationSeconds),
      embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
      watchUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
      idFragment: v.slug,
    }),
  );

  const videoObjectIds = STARTMESSAGING_VIDEO_GUIDES.map(
    (v) => `${SITE_URL}/videos#${v.slug}`,
  );

  const tutorialList = itemListJsonLd(
    STARTMESSAGING_VIDEO_GUIDES.map((v) => ({
      name: v.shortTitle,
      url: `${SITE_URL}/videos#${v.slug}`,
    })),
  );

  const webPageLd = videoGuidesWebPageJsonLd({
    name: `${pageTitle} | StartMessaging`,
    description: pageDescription,
    videoObjectIds,
  });

  return (
    <article>
      <PageStructuredData
        path={path}
        faq={faq}
        schemas={[webPageLd, tutorialList, ...videoSchemas]}
      />

      <section className="border-b bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Video guides
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Official walkthroughs from the StartMessaging team. These videos are
            the main content on this page so you can register with confidence
            and use the dashboard without guessing where each setting lives.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer the live app?{" "}
            <a
              href={`${DASHBOARD_URL}/register`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Open registration
            </a>{" "}
            or{" "}
            <a
              href={DASHBOARD_URL}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              the dashboard
            </a>{" "}
            while you follow along.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {STARTMESSAGING_VIDEO_GUIDES.map((v, index) => (
          <section
            key={v.youtubeId}
            id={v.slug}
            aria-labelledby={`heading-${v.slug}`}
            className="scroll-mt-24"
          >
            <div className="mb-6">
              <p className="text-sm font-medium text-primary">
                Part {index + 1} of {STARTMESSAGING_VIDEO_GUIDES.length}
              </p>
              <h2
                id={`heading-${v.slug}`}
                className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                {v.shortTitle}
              </h2>
              <p className="mt-3 text-muted-foreground">{v.description}</p>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {v.highlights.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <YouTubeEmbed videoId={v.youtubeId} title={v.title} />

            <p className="mt-4 text-center text-sm text-muted-foreground">
              <a
                href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                className="text-primary underline-offset-4 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>{" "}
              — same title and channel as in search results.
            </p>
          </section>
        ))}
      </div>

      <section className="border-t bg-muted/20 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold">After the videos</h2>
          <p className="mt-3 text-muted-foreground">
            When you are ready to integrate, read the{" "}
            <Link href="/otp-api" className="text-primary hover:underline">
              OTP API overview
            </Link>{" "}
            and{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              pricing
            </Link>
            . For deeper written guides, see the{" "}
            <Link href="/blog" className="text-primary hover:underline">
              blog
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaSection
        title="Start sending OTPs"
        description="Create an account and follow the registration video, then plug in our REST API."
        secondaryLabel="DLT-free OTP"
        secondaryHref="/dlt-free-otp"
      />
    </article>
  );
}
