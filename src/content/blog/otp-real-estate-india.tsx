import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-real-estate-india',
  title: 'OTP Verification for Real Estate Apps in India',
  description:
    'Why real estate platforms in India use phone OTP for buyer verification, broker authentication, site visit scheduling, and lead quality. Patterns and pitfalls.',
  category: 'use-cases',
  keywords: [
    'real estate app otp',
    'broker verification india',
    'site visit otp',
    'real estate lead verification',
    'property app phone otp',
    'real estate sms india',
    'verified buyer real estate',
    'real estate lead quality otp',
    'property booking otp',
    'real estate app india',
  ],
  publishedAt: '2026-05-08',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Product' },
  tableOfContents: [
    { id: 'why-otp', title: 'Why OTP for Real Estate' },
    { id: 'lead-quality', title: 'Lead Quality Improvement' },
    { id: 'site-visit', title: 'Site Visit Scheduling' },
    { id: 'broker-verification', title: 'Broker Verification' },
    { id: 'buyer-verification', title: 'Buyer Verification at Booking' },
    { id: 'integration', title: 'Integration Notes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-verification-flow', 'phone-verification-at-scale-best-practices', 'otp-fintech-india'],
  faq: [
    {
      question: 'Do real estate apps need DLT registration?',
      answer:
        'For self-managed SMS gateways, yes. With StartMessaging\'s standard route, no — we hold the principal entity registration and pre-approved templates so real estate teams can focus on lead capture, not paperwork.',
    },
    {
      question: 'How does OTP help with broker spam?',
      answer:
        'A verified phone is the cheapest way to filter brokers from genuine buyers. Combine OTP with a CAPTCHA on the form and a 24-hour cooling period before re-enquiry to drop broker spam by 70%+.',
    },
    {
      question: 'Should the OTP go to the buyer or to the broker?',
      answer:
        'Both, in different flows. The buyer verifies their phone before they see contact info; the broker verifies their phone (and license) before listing a property.',
    },
  ],
  content: (
    <>
      <p>
        Real estate marketplaces in India live and die on lead quality. The
        single highest-leverage signal is a verified phone number &mdash; it
        filters brokers from buyers, prevents fake site-visit bookings, and
        gives sales teams a callable number. Phone OTP is the cheapest and
        fastest way to add this layer.
      </p>

      <h2 id="why-otp">Why OTP for Real Estate</h2>
      <ul>
        <li>Filters bot signups and broker spam from buyer leads.</li>
        <li>Confirms intent before site visit slots are reserved.</li>
        <li>Builds a callable phone book for the inside-sales team.</li>
        <li>Satisfies RERA disclosure requirements for verified buyers.</li>
      </ul>

      <h2 id="lead-quality">Lead Quality Improvement</h2>
      <p>
        Most property portals lose 60&ndash;80% of inbound leads to wrong or
        garbage phone numbers. Adding a phone OTP step at form submission
        drops the garbage rate to near zero. The cost (Rs 0.25 per OTP)
        pays for itself the first time a sales rep doesn&rsquo;t waste 10
        minutes calling a wrong number.
      </p>

      <h2 id="site-visit">Site Visit Scheduling</h2>
      <p>
        Site visits are expensive: a sales rep, fuel, an hour of time, and a
        slot in the developer&rsquo;s diary. Require an OTP before
        confirming the slot, and send a reminder OTP 24 hours before the
        visit. No-show rates drop sharply.
      </p>

      <h2 id="broker-verification">Broker Verification</h2>
      <p>
        Brokers need a stronger check than buyers: phone OTP plus
        document verification (RERA registration number, PAN). Use OTP as
        the gate to start the document upload flow, then mark the broker
        verified after manual review.
      </p>

      <h2 id="buyer-verification">Buyer Verification at Booking</h2>
      <p>
        For online booking of units (especially in launches and
        pre-launches), pair OTP with the EMD payment. The OTP confirms the
        buyer is real; the payment confirms intent. Re-OTP at the
        sale-agreement step.
      </p>

      <h2 id="integration">Integration Notes</h2>
      <ol>
        <li>
          Place the OTP step right after the phone field, not at the end of
          a long form. Conversion is best when verification feels
          immediate.
        </li>
        <li>
          Pre-fill the country code (+91) but allow international numbers
          for NRI buyers.
        </li>
        <li>
          Send a confirmation SMS with the slot details after a successful
          site-visit booking.
        </li>
        <li>
          Use idempotency keys on send so a flaky network doesn&rsquo;t
          burn two OTPs.
        </li>
      </ol>

      <h2 id="faq">FAQ</h2>
      <p>
        See our{' '}
        <Link href="/blog/phone-verification-at-scale-best-practices">
          phone verification at scale guide
        </Link>{' '}
        for the architectural picture, or{' '}
        <Link href="/pricing">check pricing</Link>.
      </p>
    </>
  ),
};
