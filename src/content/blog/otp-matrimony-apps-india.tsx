import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'otp-matrimony-apps-india',
  title: 'OTP for Matrimony Apps in India',
  description:
    'How matrimony apps in India use OTP for sign-up, profile verification, contact-unlock and family handover — with specific fraud patterns and DPDP-friendly defaults.',
  category: 'use-cases',
  keywords: [
    'matrimony app otp',
    'shaadi otp',
    'matchmaking otp india',
    'matrimony verification',
    'profile verification otp',
  ],
  publishedAt: '2026-04-29',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'context', title: 'Why Matrimony Sites Need Strong Verification' },
    { id: 'flows', title: 'OTP Flows in Matrimony Apps' },
    { id: 'fraud', title: 'Fraud Patterns and Defences' },
    { id: 'family', title: 'Family Handover and Multi-User Accounts' },
    { id: 'compliance', title: 'DPDP and DLT Compliance' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'otp-dating-apps-india',
    'otp-classifieds-olx-india',
    'otp-data-privacy-india',
    'otp-bot-attacks-traffic-pumping',
  ],
  faq: [
    {
      question: 'Should we OTP-verify both bride and groom phone numbers?',
      answer:
        'Yes. Matrimony platforms have historically been targeted by fake-profile fraud. Both the primary user and the family contact (if separate) should pass OTP verification before profile is published.',
    },
    {
      question: 'How do we handle the family member who manages the profile?',
      answer:
        'Add a delegate-account model: primary user OTPs in once, then issues a time-limited delegation token to a parent or sibling. All sensitive actions still require the primary user’s fresh OTP.',
    },
    {
      question: 'Are international OTPs reliable for NRI users?',
      answer:
        'Voice OTP fallback is essential. SMS to GCC and US carriers is reliable but inconsistent in some corridors; pick a provider with multi-route delivery.',
    },
  ],
  content: (
    <>
      <p>
        Matrimony platforms are unusual in that they hold deeply personal
        family data, often have a parent or sibling acting on behalf of the
        primary user, and operate across India + NRI corridors. OTP design
        carries higher stakes than most apps — a fraudulent profile is a
        reputational disaster.
      </p>

      <h2 id="context">Why Matrimony Sites Need Strong Verification</h2>
      <ul>
        <li>Profile authenticity is the entire product proposition.</li>
        <li>Fake profiles drive churn and brand damage.</li>
        <li>NRI users span multiple country codes.</li>
        <li>DPDP Act applies to family-shared sensitive data.</li>
      </ul>

      <h2 id="flows">OTP Flows in Matrimony Apps</h2>
      <ol>
        <li>Sign-up OTP — phone of primary user.</li>
        <li>Family-contact OTP — second number for parent / sibling.</li>
        <li>Profile-publish OTP — re-verifies before listing goes live.</li>
        <li>Contact-unlock OTP — when revealing contact info to a match.</li>
        <li>Account-deletion OTP — DPDP right-to-erasure trigger.</li>
      </ol>

      <h2 id="fraud">Fraud Patterns and Defences</h2>
      <ul>
        <li>
          <strong>Bulk-account creation</strong> via virtual numbers — defend
          with per-IP and per-device rate limits.
        </li>
        <li>
          <strong>Romance-scam OTP harvesting</strong> — never read OTPs aloud
          to support staff; never share OTPs in chat.
        </li>
        <li>
          <strong>Profile takeover via SIM swap</strong> — flag accounts where
          phone has recently been ported, require step-up auth.
        </li>
      </ul>

      <h2 id="family">Family Handover and Multi-User Accounts</h2>
      <p>
        Matrimony is one of the rare consumer apps where multiple people
        legitimately use one account. Pattern:
      </p>
      <ul>
        <li>Primary phone is always the source of truth.</li>
        <li>Delegated sessions for family use a short-lived JWT, not stored credentials.</li>
        <li>Every sensitive action (publish, contact unlock, delete) requires fresh OTP to the primary phone.</li>
      </ul>

      <h2 id="compliance">DPDP and DLT Compliance</h2>
      <ul>
        <li>OTP SMS — service-implicit / transactional.</li>
        <li>Match-suggestion SMS — service-explicit, requires opt-in.</li>
        <li>Promotional SMS — only with consent.</li>
        <li>
          Personal data handling — minimal collection, purpose limitation. See{' '}
          <Link href="/blog/otp-data-privacy-india">OTP and DPDP Act</Link>.
        </li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        <Link href="/dlt-free-otp">StartMessaging</Link> handles the
        application OTP layer with multi-provider failover (essential for NRI
        delivery) and per-phone idempotency to keep your wallet safe from
        bulk-account bots.
      </p>
    </>
  ),
};
