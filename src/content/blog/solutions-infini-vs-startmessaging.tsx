import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'solutions-infini-vs-startmessaging',
  title: 'Solutions Infini vs StartMessaging for India OTP',
  description:
    'Solutions Infini (Kaleyra Now) vs StartMessaging compared for Indian OTP workloads: pricing, DLT, integration, monthly minimums and developer experience.',
  category: 'comparisons',
  keywords: [
    'solutions infini vs startmessaging',
    'kaleyra now alternative',
    'solutions infini otp',
    'solutions infini review',
  ],
  publishedAt: '2026-05-03',
  readingTime: 7,
  author: { name: 'StartMessaging Team', role: 'Engineering' },
  tableOfContents: [
    { id: 'overview', title: 'Overview' },
    { id: 'pricing', title: 'Pricing' },
    { id: 'dlt', title: 'DLT Handling' },
    { id: 'features', title: 'Features' },
    { id: 'who-suits', title: 'Who Each Suits' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: [
    'kaleyra-vs-startmessaging',
    'twilio-vs-startmessaging',
    'gupshup-vs-startmessaging',
    'best-otp-api-india',
  ],
  faq: [
    {
      question: 'Is Solutions Infini the same as Kaleyra?',
      answer:
        'Solutions Infini was acquired by Kaleyra in 2018; products are now part of the broader Kaleyra portfolio. The brand "Solutions Infini" is largely retired but the search query persists.',
    },
    {
      question: 'Does Solutions Infini handle DLT for me?',
      answer:
        'Self-service. Customer provides PE-ID and templates.',
    },
    {
      question: 'How do I migrate from Solutions Infini?',
      answer:
        'Run both in parallel for 7–14 days, monitor DLR rates, switch the default route once confidence is high. See our migration checklist.',
    },
  ],
  content: (
    <>
      <p>
        Solutions Infini was an early-mover Indian SMS provider, now folded
        into Kaleyra. StartMessaging is a newer, OTP-specialised, DLT-free
        provider. This guide compares them honestly.
      </p>

      <h2 id="overview">Overview</h2>
      <ul>
        <li>Solutions Infini — broad SMS / voice / WhatsApp under Kaleyra umbrella.</li>
        <li>StartMessaging — OTP-focused, DLT-free, pay-as-you-go.</li>
      </ul>

      <h2 id="pricing">Pricing</h2>
      <ul>
        <li>Solutions Infini — variable, contract-driven, monthly minimums common.</li>
        <li>StartMessaging — Rs 0.25 per OTP, no minimums.</li>
      </ul>

      <h2 id="dlt">DLT Handling</h2>
      <p>
        Solutions Infini routes under your DLT; StartMessaging absorbs DLT
        compliance entirely.
      </p>

      <h2 id="features">Features</h2>
      <ul>
        <li>Both: REST API, DLR, voice fallback.</li>
        <li>Kaleyra/Solutions Infini: WhatsApp + voice + RCS.</li>
        <li>StartMessaging: OTP-focused with hashed storage and idempotency.</li>
      </ul>

      <h2 id="who-suits">Who Each Suits</h2>
      <ul>
        <li>Solutions Infini / Kaleyra — large enterprise contracts.</li>
        <li>StartMessaging — agile teams, no procurement friction.</li>
      </ul>

      <h2 id="faq">FAQ</h2>
      <p>
        For most India-first products,{' '}
        <Link href="/dlt-free-otp">StartMessaging</Link> ships in five
        minutes — no contract, no DLT.
      </p>
    </>
  ),
};
