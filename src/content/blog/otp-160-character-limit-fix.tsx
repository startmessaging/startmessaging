import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-160-character-limit-fix',
  title: 'OTP SMS Going Over 160 Characters? Fix Guide',
  description:
    'When your OTP SMS exceeds 160 characters: GSM-7 vs UCS-2 encoding, multi-part SMS, the cost impact, and template tightening tactics.',
  category: 'security',
  keywords: [
    'otp 160 character limit',
    'sms split fix',
    'multipart sms otp',
    'gsm7 vs ucs2',
    'sms encoding',
  ],
  publishedAt: '2026-05-16',
  readingTime: 6,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'limits', title: 'SMS Character Limits' },
    { id: 'encoding', title: 'GSM-7 vs UCS-2' },
    { id: 'multipart', title: 'Multi-Part SMS' },
    { id: 'cost', title: 'Cost Impact' },
    { id: 'fixes', title: 'Tightening Templates' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'unicode-otp-encoding-issue',
    'dlt-template-approval-guide',
    'reduce-sms-otp-cost-india',
  ],
  faq: [
    {
      question: 'Does a multi-part SMS cost twice as much?',
      answer:
        'Yes — each segment is billed as a separate SMS. A 320-character OTP costs 2× a 160-character one.',
    },
  ],
  content: (
    <>
      <p>
        SMS has hard character limits. OTP templates that go over the
        limit silently fragment into multiple SMS, doubling cost and
        sometimes confusing the user.
      </p>

      <h2 id="limits">SMS Character Limits</h2>
      <ul>
        <li>GSM-7 (English / basic Latin): 160 chars per part.</li>
        <li>UCS-2 (Unicode, Hindi, etc.): 70 chars per part.</li>
        <li>Multi-part overhead: 7 chars per segment for the join header.</li>
      </ul>

      <h2 id="encoding">GSM-7 vs UCS-2</h2>
      <p>
        Stick to GSM-7-safe characters (basic Latin) to keep your OTP at
        160 chars. A single Unicode character pushes the entire SMS to
        UCS-2 — meaning 70-char limit per part.
      </p>

      <h2 id="multipart">Multi-Part SMS</h2>
      <p>
        Carriers reassemble parts on arrival, but DLR is per-part. A
        partial-delivery condition is possible (rare).
      </p>

      <h2 id="cost">Cost Impact</h2>
      <ul>
        <li>1 part: Rs 0.25.</li>
        <li>2 parts: Rs 0.50.</li>
        <li>3 parts: Rs 0.75.</li>
      </ul>

      <h2 id="fixes">Tightening Templates</h2>
      <ul>
        <li>Drop &ldquo;Thank you for using {`{brand}`}&rdquo;.</li>
        <li>Drop apostrophes and curly quotes.</li>
        <li>Use &ldquo;mins&rdquo; not &ldquo;minutes&rdquo;.</li>
        <li>Don&rsquo;t embed support phone in OTP SMS.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> templates are
        defaulted to single-part GSM-7 — you stay at Rs 0.25 / OTP without
        thinking about encoding.
      </p>
    </>
  ),
};
