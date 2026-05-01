import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-going-to-spam-fix',
  title: 'Why Are My OTPs Going to Spam? Fix Guide',
  description:
    'Why OTP SMS lands in the spam / promotional folder on Indian phones — sender ID category, template wording, recipient device skin, and how to fix delivery to inbox.',
  category: 'security',
  keywords: [
    'otp going to spam',
    'otp in promotional folder',
    'sms otp spam fix',
    'fix otp inbox',
    'sms category mistake',
  ],
  publishedAt: '2026-05-14',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why OTPs Get Filtered' },
    { id: 'sender-id', title: 'Wrong Sender ID Category' },
    { id: 'wording', title: 'Spam-Triggering Wording' },
    { id: 'device', title: 'Device-Side Filtering' },
    { id: 'fixes', title: 'Fixes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-not-received-india',
    'otp-delivery-rates-india',
    'transactional-vs-promotional-sms-india',
    'what-is-sms-sender-id',
  ],
  faq: [
    {
      question: 'Can OTPs be marked as promotional?',
      answer:
        'They shouldn&rsquo;t be — OTP traffic is service-implicit / transactional. If your provider routes them via a promotional sender ID, the device filters them. Switch to the correct category.',
    },
  ],
  content: (
    <>
      <p>
        OTPs landing in the spam / promotional folder is a frequent
        complaint that almost always traces to mis-categorised routing or
        device-side aggressive filtering.
      </p>

      <h2 id="why">Why OTPs Get Filtered</h2>
      <ul>
        <li>Wrong sender-ID category (AD- prefix instead of TX-/JX-).</li>
        <li>Spam-triggering wording (&ldquo;offer&rdquo;, &ldquo;deal&rdquo;).</li>
        <li>Aggressive Indian Android skin (MIUI, OneUI) filters.</li>
        <li>Truecaller / Hiya marking the sender as commercial.</li>
      </ul>

      <h2 id="sender-id">Wrong Sender ID Category</h2>
      <p>
        Most common fix. Verify your sender ID is registered under the
        transactional / service-implicit category, not promotional. See{' '}
        <Link href="/blog/what-is-sms-sender-id">our sender-ID guide</Link>.
      </p>

      <h2 id="wording">Spam-Triggering Wording</h2>
      <p>
        Avoid words like &ldquo;offer&rdquo;, &ldquo;deal&rdquo;,
        &ldquo;limited&rdquo; in OTP templates. Stick to functional
        language: &ldquo;Your verification code is X. Valid 10 mins.&rdquo;
      </p>

      <h2 id="device">Device-Side Filtering</h2>
      <ul>
        <li>MIUI: Settings → Messages → Block list / Auto-categorise.</li>
        <li>OneUI: Smart organiser feature.</li>
        <li>Truecaller: spam-marking on unknown senders.</li>
      </ul>

      <h2 id="fixes">Fixes</h2>
      <ul>
        <li>Use correct DLT category.</li>
        <li>Use a registered sender ID with brand abbreviation.</li>
        <li>Functional template wording only.</li>
        <li>For users reporting issue, instruct on whitelisting your sender ID.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> routes under
        correctly-categorised sender IDs by default — your OTPs land in the
        primary inbox.
      </p>
    </>
  ),
};
