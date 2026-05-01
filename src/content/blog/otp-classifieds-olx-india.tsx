import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-classifieds-olx-india',
  title: 'OTP for Classifieds Apps in India (OLX-Style Marketplaces)',
  description:
    'How OLX-style classifieds apps in India use OTP for listings, contact unlock and meetup verification. Anti-fraud patterns, listing limits, and reference flow.',
  category: 'use-cases',
  keywords: [
    'classifieds otp',
    'olx otp',
    'marketplace otp india',
    'listing verification otp',
    'meetup otp',
    'second hand sales otp',
  ],
  publishedAt: '2026-04-30',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Classifieds Need OTP' },
    { id: 'flows', title: 'OTP Flows in Classifieds Apps' },
    { id: 'fraud', title: 'Listing Fraud and Mitigations' },
    { id: 'meetup', title: 'Meetup OTPs (Trust at Pickup)' },
    { id: 'compliance', title: 'Compliance Notes' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-matrimony-apps-india',
    'otp-bot-attacks-traffic-pumping',
    'otp-fintech-india',
    'otp-rate-limiting-guide',
  ],
  faq: [
    {
      question: 'How do we stop spam listings without losing legitimate sellers?',
      answer:
        'Tier the OTP step — first listing is free, second listing in the same week requires fresh OTP, third triggers human-review hold. Combine with image-similarity checks on photos.',
    },
    {
      question: 'Should the seller’s phone be hidden from the buyer?',
      answer:
        'Yes — use number-masking. Buyer rings a temporary alias; system bridges to the seller. The seller’s real number stays private until they choose to reveal it.',
    },
    {
      question: 'Do we need separate OTPs for buying and selling?',
      answer:
        'Same OTP API, separate request flows. Sellers have stricter rate limits than buyers because spam-listing economics differ from spam-buying economics.',
    },
  ],
  content: (
    <>
      <p>
        Classifieds apps face two-sided fraud and have made OTP one of the
        most heavily-used tools in their stack. Sign-up OTPs gate listing
        creation; meetup OTPs build trust at handover; account-recovery OTPs
        protect listings against takeover.
      </p>

      <h2 id="context">Why Classifieds Need OTP</h2>
      <ul>
        <li>Listings monetise spam.</li>
        <li>Buyer-seller trust is fragile.</li>
        <li>Number-masking requires verified primary numbers.</li>
        <li>High-value categories (cars, real estate) attract organised fraud.</li>
      </ul>

      <h2 id="flows">OTP Flows in Classifieds Apps</h2>
      <ol>
        <li>Sign-up OTP.</li>
        <li>Listing-creation OTP (or rate-limited CAPTCHA).</li>
        <li>Buyer contact-unlock OTP.</li>
        <li>Meetup OTP at handover.</li>
        <li>Listing-edit OTP for high-value categories.</li>
      </ol>

      <h2 id="fraud">Listing Fraud and Mitigations</h2>
      <ul>
        <li>Disposable-number sign-ups → per-device fingerprint limits.</li>
        <li>Cross-listed photos → reverse image search.</li>
        <li>Fake car listings with stolen photos → human review on cars above Rs 5 lakh.</li>
        <li>Hijack of high-traffic listings via account takeover → OTP step-up on edit.</li>
      </ul>

      <h2 id="meetup">Meetup OTPs (Trust at Pickup)</h2>
      <p>Pattern used by car-buying and large-item handovers:</p>
      <ol>
        <li>At deal-confirmed, system issues a 6-digit meetup OTP to seller only.</li>
        <li>Buyer asks seller for the OTP at pickup.</li>
        <li>Buyer enters it in the app; both sides confirmed in person.</li>
      </ol>
      <p>
        See similar mechanics in our{' '}
        <Link href="/blog/otp-food-delivery-logistics">food-delivery handover guide</Link>.
      </p>

      <h2 id="compliance">Compliance Notes</h2>
      <ul>
        <li>OTP SMS — service-implicit.</li>
        <li>Listing notifications — service-explicit, opt-in.</li>
        <li>DPDP — number-masking is the privacy default.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles the
        primary-account OTP, listing-edit OTP and meetup OTP layers cleanly —
        same API, different request flows.
      </p>
    </>
  ),
};
