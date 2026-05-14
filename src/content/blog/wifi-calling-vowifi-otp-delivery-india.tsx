import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'wifi-calling-vowifi-otp-delivery-india',
  title: 'Wi‑Fi Calling (VoWiFi) and OTP SMS Delivery in India',
  description:
    'How VoWiFi changes IMS registration, SMS routing, and delay symptoms Indian users see on Jio and Airtel — with debugging tips for developers and customer support.',
  category: 'tutorials',
  keywords: [
    'WiFi calling OTP issue India',
    'VoWiFi SMS not received',
    'OTP delayed WiFi calling',
    'Jio WiFi calling OTP',
    'Airtel vowifi SMS problem',
    'VoWiFi IMS SMS India',
    'OTP not received WiFi only phone',
  ],
  publishedAt: '2026-05-10',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'what', title: 'What Changes With VoWiFi' },
    { id: 'symptoms', title: 'User-Visible Symptoms' },
    { id: 'relation', title: 'Relation to RCS and Data-Only Networks' },
    { id: 'mitigation', title: 'Mitigations for Product Teams' },
    { id: 'support', title: 'Support Macros That Actually Help' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'esim-dual-sim-otp-not-delivered-india',
    'otp-not-received-india',
    'otp-delivery-delay-fix',
    'otp-failing-jio-airtel-vi',
  ],
  faq: [
    {
      question: 'Does Wi‑Fi Calling block SMS OTP?',
      answer:
        'It should not block SMS, which still uses the SMSC path. Users sometimes report delays when IMS re-registers between LTE and Wi‑Fi voice, or when airplane mode toggles confuse the default voice line.',
    },
    {
      question: 'Why do delays show up only on home Wi‑Fi?',
      answer:
        'Some routers or DNS filters interfere with IMS keepalives, or the phone prefers a weak LTE signal until it attaches voice over Wi‑Fi. Ask users to temporarily disable VoWiFi to test whether latency normalises.',
    },
    {
      question: 'Is this the same as SMS over Wi‑Fi?',
      answer:
        'Marketing language overlaps. For debugging OTP, treat everything as IMS/SMSC behaviour on the handset — verify signal, VoWiFi toggle, and whether the SMS app shows delayed vs missing messages.',
    },
  ],
  content: (
    <>
      <p>
        <strong>VoWiFi (Wi‑Fi Calling)</strong> routes carrier voice (and some
        IMS services) over broadband while the SIM stays registered. Indian
        users on dense apartment Wi‑Fi sometimes blame apps when OTP SMS
        arrives minutes late. This note separates handset/network effects from
        SMS gateway issues.
      </p>

      <h2 id="what">What Changes With VoWiFi</h2>
      <p>
        With VoWiFi enabled, the device maintains a parallel IMS registration.
        When users move between LTE and Wi‑Fi, the handset can briefly
        renegotiate bearers. SMS is not &ldquo;voice,&rdquo; but the radio
        stack still churns — users perceive it as &ldquo;network
        instability.&rdquo;
      </p>

      <h2 id="symptoms">User-Visible Symptoms</h2>
      <ul>
        <li>OTP arrives after the code expired once, succeeds on resend.</li>
        <li>OTP appears only after disabling Wi‑Fi or VoWiFi.</li>
        <li>
          Duplicate threads if the user switched default SMS apps during the
          session.
        </li>
      </ul>

      <h2 id="relation">Relation to RCS and Data-Only Networks</h2>
      <p>
        Users on Wi‑Fi with poor indoor LTE may still get{' '}
        <Link href="/blog/rcs-rich-messaging-otp-india-developers">
          RCS
        </Link>{' '}
        while SMS is queued on the cellular control channel. Dual-stack
        debugging is messy — capture whether your DLR says delivered during
        the delay window. If DLR is fast but the user sees slow UI, suspect
        device-side queueing.
      </p>

      <h2 id="mitigation">Mitigations for Product Teams</h2>
      <ul>
        <li>
          Extend OTP TTL slightly for cohorts with high late-delivery metrics
          (watch fraud trade-offs).
        </li>
        <li>
          Offer resend with exponential backoff per{' '}
          <Link href="/blog/otp-resend-cooldown-implementation">
            cooldown guidance
          </Link>
          .
        </li>
        <li>
          Surface network hints in support UI (&ldquo;Try toggling airplane
          mode&rdquo;) to cut ticket volume.
        </li>
      </ul>

      <h2 id="support">Support Macros That Actually Help</h2>
      <ol>
        <li>Confirm VoWiFi on/off state and Wi‑Fi vs cellular data.</li>
        <li>Ask for SMS timestamp vs your server send timestamp.</li>
        <li>
          Compare with a test OTP to a known-good single-SIM handset to isolate
          account vs device issues.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        When DLR shows delivered in under a second but the user complains,
        attach{' '}
        <Link href="/blog/esim-dual-sim-otp-not-delivered-india">
          dual-SIM / eSIM
        </Link>{' '}
        and VoWiFi questions before you open a carrier ticket. Most
        &ldquo;late&rdquo; OTPs are access-layer jitter, not template
        scrubbing.
      </p>
    </>
  ),
};
