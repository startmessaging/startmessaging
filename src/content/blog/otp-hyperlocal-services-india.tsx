import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-hyperlocal-services-india',
  title: 'OTP for Hyperlocal Service Apps in India (Salons, Plumbers, Tutors)',
  description:
    'Why hyperlocal service marketplaces — beauty, home services, tuition, repair — use phone OTP for booking confirmation, provider verification, and call masking.',
  category: 'use-cases',
  keywords: [
    'hyperlocal app otp india',
    'salon booking otp',
    'home services otp',
    'tutor app phone verification',
    'urban company otp',
    'hyperlocal sms api india',
    'service provider verification otp',
    'on-demand services otp',
    'home services india phone',
    'hyperlocal marketplace otp',
  ],
  publishedAt: '2026-05-12',
  readingTime: 8,
  author: { name: 'StartMessaging Team', role: 'Product' },
  tableOfContents: [
    { id: 'why-otp', title: 'Why OTP for Hyperlocal' },
    { id: 'booking-flow', title: 'Booking Confirmation Flow' },
    { id: 'provider', title: 'Provider Onboarding' },
    { id: 'job-completion', title: 'Job Completion OTP' },
    { id: 'masking', title: 'OTP and Call Masking' },
    { id: 'integration', title: 'Integration Tips' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-food-delivery-logistics', 'otp-real-estate-india', 'otp-verification-flow'],
  faq: [
    {
      question: 'Should the OTP go to the customer or the provider?',
      answer:
        'Both. The customer verifies their phone at signup; the provider verifies theirs during onboarding. At job completion, the customer shares a code with the provider so the provider can confirm the visit happened.',
    },
    {
      question: 'How does OTP help with no-shows?',
      answer:
        'A confirmed phone is a callable phone. Send a confirmation SMS at booking and a reminder OTP an hour before the slot. No-show rates drop because customers feel commitment after they engage with two SMS touchpoints.',
    },
    {
      question: 'Do I need a different OTP per booking?',
      answer:
        'Yes. Each booking gets a fresh OTP code. Reusing codes across bookings makes the audit trail useless and creates security holes if a code leaks.',
    },
  ],
  content: (
    <>
      <p>
        Hyperlocal services &mdash; salons, plumbers, electricians, tuitions,
        beauty at home, home cleaning &mdash; live on trust. The customer
        invites a stranger into their home; the provider visits an unknown
        address. Phone OTP is the cheapest trust anchor on both sides.
      </p>

      <h2 id="why-otp">Why OTP for Hyperlocal</h2>
      <ul>
        <li>Verifies both customer and provider identity.</li>
        <li>Confirms intent at booking, reducing no-shows.</li>
        <li>
          Powers the &ldquo;job completion&rdquo; OTP so the platform can
          release payment.
        </li>
        <li>
          Anchors the call masking system that protects both parties&rsquo;
          numbers.
        </li>
      </ul>

      <h2 id="booking-flow">Booking Confirmation Flow</h2>
      <ol>
        <li>Customer searches and picks a slot.</li>
        <li>Phone OTP confirms it&rsquo;s a real customer.</li>
        <li>Booking is created and provider is notified.</li>
        <li>One-hour reminder SMS to both parties before the slot.</li>
        <li>Provider checks in at the address.</li>
      </ol>

      <h2 id="provider">Provider Onboarding</h2>
      <p>
        Providers need a stronger gate: phone OTP plus a document upload
        plus a background check. OTP comes first because it&rsquo;s the
        cheapest filter &mdash; an unverified phone number means the
        provider isn&rsquo;t serious.
      </p>

      <h2 id="job-completion">Job Completion OTP</h2>
      <p>
        At the end of the visit, the customer reads out a 4-digit code (or
        the provider scans a QR) to confirm the job was completed. This
        is the trigger for releasing the customer&rsquo;s payment to the
        provider. The OTP message:
      </p>
      <pre>
        <code>{`Job complete? Share code {#var#} with your provider to confirm.
Do not share before the work is done. - YourApp`}</code>
      </pre>

      <h2 id="masking">OTP and Call Masking</h2>
      <p>
        Hyperlocal apps usually mask both phone numbers behind a virtual
        number so neither party sees the other&rsquo;s real number. OTP
        verification establishes the &ldquo;real&rdquo; number on file
        even though the masked number is the only one ever displayed.
      </p>

      <h2 id="integration">Integration Tips</h2>
      <ol>
        <li>
          Use the same StartMessaging account for booking, provider, and
          completion OTPs &mdash; one wallet, one bill.
        </li>
        <li>
          Set OTP expiry to 30 minutes for booking confirmations (users
          often pause mid-flow).
        </li>
        <li>
          Use idempotency keys so a flaky network doesn&rsquo;t double-bill.
        </li>
        <li>
          Send a localised template &mdash; many hyperlocal users prefer
          regional languages.{' '}
          <Link href="/blog/unicode-regional-language-sms-india">
            See our Unicode guide
          </Link>
          .
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/otp-food-delivery-logistics">
          food delivery and logistics OTP guide
        </Link>{' '}
        for related patterns.
      </p>
    </>
  ),
};
