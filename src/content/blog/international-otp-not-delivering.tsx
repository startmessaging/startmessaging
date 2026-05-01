import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'international-otp-not-delivering',
  title: 'International OTP Not Delivering? Diagnose and Fix',
  description:
    'OTPs failing to deliver outside India: per-country routing, GCC / SE Asia / US / EU specifics, voice fallback, and provider configuration that fixes most issues.',
  category: 'security',
  keywords: [
    'international otp not delivered',
    'overseas sms otp issue',
    'nri otp not received',
    'gcc otp india',
    'us sms otp',
  ],
  publishedAt: '2026-05-15',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why International is Different' },
    { id: 'gcc', title: 'GCC (UAE, Saudi, Oman)' },
    { id: 'sea', title: 'SE Asia' },
    { id: 'us', title: 'US' },
    { id: 'eu', title: 'EU' },
    { id: 'fixes', title: 'Common Fixes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-not-received-india',
    'voice-otp-vs-sms-otp-india',
    'otp-delivery-rates-india',
  ],
  faq: [
    {
      question: 'Can my Indian OTP API send to international numbers?',
      answer:
        'Most can but the rate is much higher and route quality varies. Verify your provider&rsquo;s international destination matrix and test before launch.',
    },
  ],
  content: (
    <>
      <p>
        Indian OTP providers cover international destinations unevenly.
        Different countries have different regulatory and routing quirks.
        This guide covers the regions where Indian apps most often see
        delivery problems.
      </p>

      <h2 id="context">Why International is Different</h2>
      <ul>
        <li>Each country has its own SMS regulator.</li>
        <li>Per-destination pricing is 5–20× domestic rates.</li>
        <li>Sender ID requirements differ.</li>
        <li>Some destinations require local registration.</li>
      </ul>

      <h2 id="gcc">GCC (UAE, Saudi, Oman)</h2>
      <ul>
        <li>UAE/TRA strict on registered sender IDs.</li>
        <li>Saudi CITC requires alphanumeric sender pre-registration.</li>
        <li>Voice OTP fallback is reliable.</li>
      </ul>

      <h2 id="sea">SE Asia</h2>
      <p>
        Singapore, Indonesia, Philippines have variable carrier-side
        scrubbing. Test each operator.
      </p>

      <h2 id="us">US</h2>
      <p>
        US carriers strictly classify long-code vs short-code traffic.
        Toll-free numbers (TFN) work for OTP. 10DLC registration may be
        required.
      </p>

      <h2 id="eu">EU</h2>
      <p>
        GDPR applies. Sender IDs accepted but vary by country. Voice OTP
        often the safer fallback.
      </p>

      <h2 id="fixes">Common Fixes</h2>
      <ul>
        <li>Provider with international footprint.</li>
        <li>Voice OTP fallback after 30s.</li>
        <li>Pre-registered sender IDs per destination.</li>
        <li>Check provider DLR for failed-route errors.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For India + international,{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> supports the major
        corridors with voice fallback included.
      </p>
    </>
  ),
};
