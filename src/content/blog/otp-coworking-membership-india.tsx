import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-coworking-membership-india',
  title: 'OTP for Coworking and Membership Apps in India',
  description:
    'OTP design for coworking spaces, members clubs and co-living apps in India: door-unlock OTP, guest pass, meeting-room booking and member onboarding.',
  category: 'use-cases',
  keywords: [
    'coworking otp',
    'membership app otp',
    'door unlock otp',
    'guest pass sms',
    'meeting room booking otp',
    'co living otp india',
  ],
  publishedAt: '2026-05-01',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Coworking Apps Use OTP' },
    { id: 'flows', title: 'OTP Flows' },
    { id: 'door-unlock', title: 'Door-Unlock OTP' },
    { id: 'guest-pass', title: 'Guest-Pass OTP' },
    { id: 'meeting', title: 'Meeting-Room Booking' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-gym-fitness-apps-india',
    'otp-salon-spa-booking-india',
    'otp-hyperlocal-services-india',
  ],
  faq: [
    {
      question: 'Should the door-unlock OTP be reused or fresh each time?',
      answer:
        'Always fresh. Door OTPs should expire within 60 seconds of issue. Reusing one creates a replay window that an unhappy ex-member could exploit.',
    },
    {
      question: 'Do we send OTPs to both the host and the guest?',
      answer:
        'For guest passes — yes. The host OTP authorises the invite; the guest OTP is the access credential. Tie both to the same time-windowed access pass.',
    },
    {
      question: 'How do we handle visitors without smartphones?',
      answer:
        'Voice OTP fallback. Reception calls the visitor; the IVR reads the access code aloud.',
    },
  ],
  content: (
    <>
      <p>
        Coworking, members clubs and co-living all share a common challenge:
        physical space access for a high-churn user base. OTP is the
        Authentication-as-a-keychain that ties digital booking to physical
        entry.
      </p>

      <h2 id="context">Why Coworking Apps Use OTP</h2>
      <ul>
        <li>Member onboarding without a separate IT account.</li>
        <li>Door-unlock without distributing key cards.</li>
        <li>Guest-pass issuance.</li>
        <li>Meeting-room booking confirmation.</li>
      </ul>

      <h2 id="flows">OTP Flows</h2>
      <ol>
        <li>Member sign-up OTP.</li>
        <li>Door-unlock OTP per session.</li>
        <li>Guest-pass dual OTP (host + guest).</li>
        <li>Meeting-room confirmation OTP.</li>
        <li>Membership renewal SMS.</li>
      </ol>

      <h2 id="door-unlock">Door-Unlock OTP</h2>
      <p>
        Tap &ldquo;Open door&rdquo; in the app, system emits 60-second OTP to
        the member&rsquo;s phone, the door panel scans the code or accepts
        manual entry. Logged for compliance + member analytics.
      </p>

      <h2 id="guest-pass">Guest-Pass OTP</h2>
      <ol>
        <li>Member taps &ldquo;Invite guest&rdquo;, enters guest phone.</li>
        <li>System generates a time-windowed access pass.</li>
        <li>Host OTP authorises; guest OTP grants access.</li>
        <li>Both OTPs reference the same accessPassId.</li>
      </ol>

      <h2 id="meeting">Meeting-Room Booking</h2>
      <p>
        Confirmation SMS at booking; reminder OTP 15 minutes before; door
        unlock OTP at start. Three OTPs that chain to the same booking ID.
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> ships sub-second
        SMS — essential for door-unlock UX where 5-second latency means
        embarrassed members at the entrance.
      </p>
    </>
  ),
};
