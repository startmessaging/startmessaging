import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'unicode-otp-encoding-issue',
  title: 'Unicode OTP Not Sending? Encoding Issue Fix',
  description:
    'Unicode (Hindi, Tamil, etc.) OTPs failing to send: GSM-7 vs UCS-2 encoding, DLT template language registration, and why a single accented character breaks delivery.',
  category: 'security',
  keywords: [
    'unicode otp not working',
    'hindi otp sms issue',
    'regional sms otp india',
    'sms encoding error',
    'ucs2 sms india',
  ],
  publishedAt: '2026-05-16',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'why', title: 'Why Unicode OTPs Fail' },
    { id: 'encoding', title: 'GSM-7 vs UCS-2' },
    { id: 'dlt', title: 'DLT Language Registration' },
    { id: 'invisible', title: 'Invisible Unicode Characters' },
    { id: 'fix', title: 'Fixes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'unicode-regional-language-sms-india',
    'otp-160-character-limit-fix',
    'dlt-template-approval-guide',
  ],
  faq: [
    {
      question: 'Does a curly quote count as Unicode?',
      answer:
        'Yes. Curly quotes (&ldquo; &rdquo;) are not GSM-7. A single curly quote in your template flips the entire SMS to UCS-2 (70-char limit).',
    },
  ],
  content: (
    <>
      <p>
        A single non-GSM-7 character can break your OTP delivery. This
        guide explains the encoding rules and the registration step that
        most teams miss.
      </p>

      <h2 id="why">Why Unicode OTPs Fail</h2>
      <ul>
        <li>Template registered as GSM-7 but body has Unicode chars.</li>
        <li>Operator scrubber rejects on encoding mismatch.</li>
        <li>Multi-part fragmentation drops on some carriers.</li>
      </ul>

      <h2 id="encoding">GSM-7 vs UCS-2</h2>
      <ul>
        <li>GSM-7: 160 chars, basic Latin.</li>
        <li>UCS-2: 70 chars, full Unicode.</li>
        <li>One Unicode char anywhere = whole SMS becomes UCS-2.</li>
      </ul>

      <h2 id="dlt">DLT Language Registration</h2>
      <p>
        Hindi / Tamil / regional templates need a separate DLT registration.
        See <Link href="/blog/unicode-regional-language-sms-india">our
        regional-language SMS guide</Link>.
      </p>

      <h2 id="invisible">Invisible Unicode Characters</h2>
      <ul>
        <li>Curly quotes from copy-paste.</li>
        <li>Em dashes from auto-correct.</li>
        <li>Zero-width joiners.</li>
        <li>Non-breaking spaces.</li>
      </ul>
      <p>Run your template through a GSM-7 validator before submission.</p>

      <h2 id="fix">Fixes</h2>
      <ul>
        <li>Replace curly quotes with straight quotes.</li>
        <li>Use ASCII-only template body if possible.</li>
        <li>For Hindi templates, register them explicitly under regional category.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles encoding
        consistency on the template side; your body stays GSM-7 unless you
        explicitly opt into Unicode.
      </p>
    </>
  ),
};
