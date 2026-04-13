import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

export const post: BlogPost = {
  slug: 'choose-otp-provider-startup-india',
  title: 'How to Choose an OTP Provider as an Indian Startup (2026)',
  description:
    'A founder\'s checklist for picking an OTP / SMS API provider in India: pricing model, DLT requirements, integration time, support, and a decision matrix.',
  category: 'business',
  keywords: [
    'choose otp provider india',
    'best otp api startup india',
    'otp provider checklist india',
    'sms api startup india',
    'otp api selection india',
    'startup sms otp india',
    'how to pick sms provider',
    'india sms otp vendor',
    'sms api evaluation india',
    'otp provider for indian startup',
  ],
  publishedAt: '2026-05-14',
  readingTime: 9,
  author: { name: 'StartMessaging Team', role: 'Business' },
  tableOfContents: [
    { id: 'why-this-matters', title: 'Why This Matters' },
    { id: 'evaluation-criteria', title: 'Evaluation Criteria' },
    { id: 'questions-to-ask', title: 'Questions to Ask Every Vendor' },
    { id: 'red-flags', title: 'Red Flags' },
    { id: 'decision-matrix', title: 'Decision Matrix' },
    { id: 'switching-cost', title: 'How to Estimate Switching Cost' },
    { id: 'faq', title: 'FAQ' },
  ],
  relatedSlugs: ['otp-api-pricing-comparison-india', 'migrate-sms-provider-checklist', 'best-otp-api-india'],
  faq: [
    {
      question: 'Should I pick the cheapest OTP provider?',
      answer:
        'Cheapest per-send is the wrong metric. Total cost = price per OTP × volume + integration time + DLT delay × opportunity cost. A provider that\'s Rs 0.05 cheaper but takes 3 weeks of paperwork to onboard is rarely the best deal for an early-stage startup.',
    },
    {
      question: 'When is it OK to start with a free tier?',
      answer:
        'Free tiers are great for prototyping but never for production. The hidden cost of a free tier is rate limits and reliability gaps that show up the day you launch on Product Hunt. Move to paid as soon as you have real users.',
    },
    {
      question: 'How long should integration take?',
      answer:
        'For a REST-only OTP API like StartMessaging, plan one afternoon for the happy path and a day for retries, idempotency, and rate limiting. If a vendor needs more than a week of integration time, the surface area is too big for a focused use case.',
    },
  ],
  content: (
    <>
      <p>
        The OTP provider you pick at week one is rarely the one you stay
        with at year one &mdash; but switching is painful. This is the
        founder&rsquo;s checklist we wish more Indian startups read before
        signing the first contract.
      </p>

      <h2 id="why-this-matters">Why This Matters</h2>
      <p>
        OTP is part of your activation funnel. A 1% drop in delivery rate
        is a 1% drop in signups, forever. Picking the wrong provider for
        your stage costs both money and conversions, and migrating later
        means duplicate templates, re-onboarding compliance, and engineering
        time you don&rsquo;t have.
      </p>

      <h2 id="evaluation-criteria">Evaluation Criteria</h2>
      <ol>
        <li>
          <strong>Time to first OTP.</strong> How many days from
          &ldquo;I want to use you&rdquo; to &ldquo;an OTP just hit my
          phone&rdquo;? DLT-required vendors lose this round to{' '}
          <Link href="/dlt-free-otp">DLT-free options</Link>.
        </li>
        <li>
          <strong>Pricing model.</strong> Flat per-OTP, per-SMS-segment, or
          tiered? Predictability beats theoretical lowest rate.
        </li>
        <li>
          <strong>API surface.</strong> A real <code>/otp/verify</code>{' '}
          endpoint, or do you store hashed codes yourself?
        </li>
        <li>
          <strong>Idempotency &amp; retries.</strong> First-class support,
          or you build it?
        </li>
        <li>
          <strong>Delivery rate.</strong> Honest reporting, ideally
          per-operator.
        </li>
        <li>
          <strong>Billing.</strong> INR + GST out of the box, or USD with
          FX surprises?
        </li>
        <li>
          <strong>Support response time.</strong> India-timezone email or a
          generic SaaS ticket queue?
        </li>
      </ol>

      <h2 id="questions-to-ask">Questions to Ask Every Vendor</h2>
      <ul>
        <li>How long does onboarding take from signup to first send?</li>
        <li>Do you require DLT registration on my side?</li>
        <li>Do you provide a dedicated OTP verify endpoint?</li>
        <li>What&rsquo;s your published delivery rate by operator?</li>
        <li>Is there a minimum monthly commit?</li>
        <li>Do you bill in INR with a GST invoice?</li>
        <li>What happens to my templates if I switch providers?</li>
        <li>Do you charge for idempotency-deduped requests?</li>
        <li>What&rsquo;s your incident response SLA?</li>
      </ul>

      <h2 id="red-flags">Red Flags</h2>
      <ul>
        <li>Quoted per-SMS price but no per-segment clarification.</li>
        <li>Refusal to share operator-level delivery numbers.</li>
        <li>Long minimum monthly commit (Rs 25,000+).</li>
        <li>Sales-led only, no public API docs you can read first.</li>
        <li>USD-only billing for an Indian-only target market.</li>
      </ul>

      <h2 id="decision-matrix">Decision Matrix</h2>
      <p>
        For most early-stage Indian startups the answer is some version of:
      </p>
      <ul>
        <li>
          <strong>OTP-first?</strong> Use a DLT-free OTP API like{' '}
          <Link href="/">StartMessaging</Link>.
        </li>
        <li>
          <strong>OTP plus marketing SMS plus voice?</strong> Use a
          full-stack CPaaS (MSG91, Exotel) and accept the DLT
          onboarding.
        </li>
        <li>
          <strong>Global from day one?</strong> Twilio, Vonage, or Plivo
          for the broad coverage; expect higher per-OTP cost.
        </li>
      </ul>

      <h2 id="switching-cost">How to Estimate Switching Cost</h2>
      <p>
        Switching cost = template re-approval time + engineering time to
        re-integrate + downtime risk. For a DLT-free API the engineering
        cost is ~1 day. For a DLT-required vendor switch, plan 1&ndash;3
        weeks of overlap and run both providers in parallel during the
        cutover. See our{' '}
        <Link href="/blog/migrate-sms-provider-checklist">
          migration checklist
        </Link>
        .
      </p>

      <h2 id="faq">FAQ</h2>
      <p>
        See the full{' '}
        <Link href="/blog/otp-api-pricing-comparison-india">
          OTP API pricing comparison
        </Link>{' '}
        and our take on the{' '}
        <Link href="/blog/best-otp-api-india">best OTP API in India</Link>.
      </p>
    </>
  ),
};
