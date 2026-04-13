import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-government-citizen-services-india',
  title: 'OTP for Government & Citizen Services Apps in India',
  description:
    'How to add phone OTP to government, civic, and citizen-services apps in India: accessibility, multilingual support, audit trail, and procurement notes.',
  category: 'use-cases',
  keywords: [
    'government otp india',
    'citizen services otp',
    'civic app phone verification',
    'sarkari app otp',
    'g2c sms otp',
    'multilingual otp government',
    'aadhaar otp alternative',
    'accessibility otp india',
    'public sector sms api india',
    'government sms api',
  ],
  publishedAt: '2026-05-11',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Product' },
  tableOfContents: [
    { id: 'why-otp', title: 'Why OTP for Government Apps' },
    { id: 'accessibility', title: 'Accessibility Requirements' },
    { id: 'multilingual', title: 'Multilingual SMS' },
    { id: 'audit-trail', title: 'Audit Trail and Retention' },
    { id: 'procurement', title: 'Procurement Notes' },
    { id: 'integration', title: 'Integration Patterns' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['unicode-regional-language-sms-india', 'otp-data-privacy-india', 'otp-edtech-student-verification'],
  faq: [
    {
      question: 'Can I use OTP instead of Aadhaar OTP?',
      answer:
        'For most non-statutory services, yes — a plain phone OTP is sufficient and cheaper. Aadhaar OTP is only required when you specifically need Aadhaar e-KYC under the Aadhaar Act and you are an authorized AUA/KUA.',
    },
    {
      question: 'Do government apps need DLT registration for SMS?',
      answer:
        'Yes, government entities must register with TRAI and complete the principal entity flow. Many central and state agencies use the GoI category which has its own template approval lane. StartMessaging\'s standard route is faster but check your procurement rules.',
    },
    {
      question: 'How do I support feature phones for senior citizens?',
      answer:
        'SMS OTP is the universal fallback — every feature phone supports it. Pair with voice OTP as a secondary channel for users with reading difficulty. See our linked voice OTP article.',
    },
  ],
  content: (
    <>
      <p>
        Government and citizen-services apps reach the broadest possible
        audience: multiple languages, multiple device classes, multiple
        accessibility needs. Phone OTP is the most universal verification
        method available because every Indian phone &mdash; smartphone or
        feature phone &mdash; supports SMS.
      </p>

      <h2 id="why-otp">Why OTP for Government Apps</h2>
      <ul>
        <li>Universal device support including KaiOS and feature phones.</li>
        <li>No app install required for verification.</li>
        <li>Works in low-bandwidth and offline-after-receipt scenarios.</li>
        <li>Provides a tamper-evident audit trail for grievance redressal.</li>
      </ul>

      <h2 id="accessibility">Accessibility Requirements</h2>
      <p>
        Government digital services in India must comply with GIGW
        (Guidelines for Indian Government Websites) and the Rights of
        Persons with Disabilities Act. SMS OTP is screen-reader friendly
        and works for users with low vision, motor difficulties, and
        cognitive load.
      </p>
      <p>
        For visually impaired users, supplement SMS with voice OTP &mdash;
        see our deep dive on{' '}
        <Link href="/blog/voice-otp-vs-sms-otp-india">
          voice OTP vs SMS OTP
        </Link>
        .
      </p>

      <h2 id="multilingual">Multilingual SMS</h2>
      <p>
        A pan-India service must support at least Hindi and the relevant
        regional languages of every operating state. Detect the
        user&rsquo;s preferred language from their profile and pick the
        right{' '}
        <Link href="/blog/unicode-regional-language-sms-india">
          Unicode SMS template
        </Link>{' '}
        at runtime.
      </p>

      <h2 id="audit-trail">Audit Trail and Retention</h2>
      <p>
        Government applications often face RTI queries and grievance
        redressal cases. Persist:
      </p>
      <ul>
        <li>Phone number (encrypted at rest).</li>
        <li>OTP request ID and timestamp.</li>
        <li>Verification timestamp and outcome.</li>
        <li>IP address and user agent.</li>
        <li>Action that triggered the OTP (login, application, status check).</li>
      </ul>
      <p>
        Retain for the period mandated by the relevant department &mdash;
        often 7 years for civic services.
      </p>

      <h2 id="procurement">Procurement Notes</h2>
      <p>
        Public-sector procurement typically requires:
      </p>
      <ul>
        <li>Indian-incorporated vendor with local data residency.</li>
        <li>GST-compliant invoicing in INR.</li>
        <li>SLA with named uptime and response targets.</li>
        <li>Empanelment with one of the Indian operators or aggregators.</li>
      </ul>
      <p>
        StartMessaging meets the first two out of the box; for empanelment
        questions on a specific tender, contact us through the{' '}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2 id="integration">Integration Patterns</h2>
      <ol>
        <li>Single OTP send endpoint behind your departmental WAF.</li>
        <li>
          Server-side language selection from the user&rsquo;s profile,
          falling back to English.
        </li>
        <li>
          Generous OTP expiry (15 minutes) since government users often
          switch SIMs in their device.
        </li>
        <li>
          Voice OTP fallback after one failed SMS delivery for accessibility.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/otp-data-privacy-india">
          OTP data privacy article
        </Link>{' '}
        for the DPDP Act perspective on storing phone numbers.
      </p>
    </>
  ),
};
