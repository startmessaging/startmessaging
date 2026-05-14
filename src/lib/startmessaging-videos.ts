/**
 * Official StartMessaging YouTube tutorials embedded on /videos.
 * uploadDate and duration match YouTube metadata (ISO 8601 / ISO 8601 duration).
 */
export const STARTMESSAGING_VIDEO_GUIDES = [
  {
    slug: "registration",
    youtubeId: "yafofDkYzXA",
    title: "Register in Start Messaging Tutorial | Send OTPs without DLT Registration",
    shortTitle: "Account registration walkthrough",
    description:
      "Step-by-step guide to creating your StartMessaging account, verifying your email, and getting ready to send OTPs without personal DLT registration. Covers signup flow and what to expect before your first API call.",
    thumbnailUrl: "https://i.ytimg.com/vi/yafofDkYzXA/hqdefault.jpg",
    thumbnailUrlMax: "https://i.ytimg.com/vi/yafofDkYzXA/maxresdefault.jpg",
    uploadDate: "2026-05-02T23:43:27-07:00",
    durationSeconds: 157,
    highlights: [
      "Create and verify your developer account",
      "Understand wallet and API access after signup",
      "Move from registration to sending your first OTP",
    ],
  },
  {
    slug: "dashboard",
    youtubeId: "fXDInhle9Z0",
    title: "Dashboard of StartMessaging Tutorial | Learn how to use",
    shortTitle: "Dashboard tour",
    description:
      "Tour of the StartMessaging dashboard: navigating projects, API keys, templates, delivery logs, and wallet balance. Intended for developers who want to operate day-to-day tasks from the console without digging only into raw API docs.",
    thumbnailUrl: "https://i.ytimg.com/vi/fXDInhle9Z0/hqdefault.jpg",
    thumbnailUrlMax: "https://i.ytimg.com/vi/fXDInhle9Z0/maxresdefault.jpg",
    uploadDate: "2026-05-04T05:07:19-07:00",
    durationSeconds: 149,
    highlights: [
      "Projects, keys, and safe handling of credentials",
      "Templates and variables for OTP SMS content",
      "Monitoring sends and account usage",
    ],
  },
] as const;

export type StartMessagingVideoGuide =
  (typeof STARTMESSAGING_VIDEO_GUIDES)[number];

export function secondsToIso8601Duration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `PT${h}H${m}M${s}S`;
  if (m > 0) return `PT${m}M${s}S`;
  return `PT${s}S`;
}
